from odoo import models, fields, api
from odoo.exceptions import UserError
from odoo.exceptions import ValidationError

class Property(models.Model):
    _name = "estate_property"
    _description = "try for fun"

    name = fields.Char(required=True, default='Unknown')
    description = fields.Text()
    postcode = fields.Char()
    date_availability = fields.Date(copy=False, default=fields.Date.today)
    expected_price = fields.Float(required=True)
    selling_price = fields.Float(readonly=True, copy=False)
    bedrooms = fields.Integer(default=2)
    living_area = fields.Integer()
    facades = fields.Integer()
    garage = fields.Boolean()
    garden = fields.Boolean()
    garden_area = fields.Integer()
    garden_orientation = fields.Selection(selection=[('east','东'),('south','南'),('west','西'),('north','北')]) # type: ignore[arg-type]
    active = fields.Boolean(default=True)
    state = fields.Selection(selection=[('new','New'),('offer_received','Offer Received'),('offer_accepted','Offer Accepted'),('sold','Sold'),('cancelled','Cancelled')], default='new') # type: ignore[arg-type]
    property_type_id = fields.Many2one("estate_property_type", string="Type")
    buyer_id = fields.Many2one("res.partner", string="Buyer", copy=False)
    salesperson_id = fields.Many2one("res.users", string="Saplesperson", default=lambda self:self.env.user)
    tags_id = fields.Many2many("estate_property_tag", string="Tag")
    offers_id = fields.One2many("estate_property_offer", "property_id") # not partner_id
    total_area = fields.Float(compute="_compute_total_area")
    best_price = fields.Float(compute="_compute_max_price")
    _order = "id dec"

    @api.depends('living_area','garden_area')
    def _compute_total_area(self):
        for record in self:
            record.total_area = record.living_area + record.garden_area

    @api.depends('offers_id.price')
    def _compute_max_price(self):
        for record in self:
            record.best_price = max(record.mapped('offers_id.price'), default=0.0)

    @api.onchange('garden')
    def _onchange_garden(self):  # note that we do not loop on self, this is because the method is only triggered in a form view, where self is always a single record
        if self.garden:
            self.garden_area = 10
            self.garden_orientation = 'north'
        else:
            self.garden_area = 0
            self.garden_orientation = False

    def action_sell(self):
        for record in self:
            if record.state == "cancelled":
                raise UserError("被取消的房产不能再卖出！")
            record.state = "sold"

    def action_cancell(self):
        for record in self:
            if record.state == "sold":
                raise UserError("被售出的房产不能再被取消")
            record.state = "cancelled"

    _check_price = models.Constraint(
        'CHECK(expected_price > 0 AND selling_price > 0)',
        '期望价格及销售价格均需正'
    )

    @api.constrains('selling_price', 'expected_price')
    def _check_selling_price(self):
        for record in self:
            if record.selling_price:
                if record.selling_price < record.expected_price * 0.9:
                    raise ValidationError("价格太低")



    
