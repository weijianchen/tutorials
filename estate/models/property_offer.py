from odoo import models, fields, api
from datetime import timedelta
from odoo.exceptions import UserError

class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Property Offers"

    price = fields.Float()
    status = fields.Selection(selection=[('accepted','Accepted'),('refused','Refused')], copy=False) # type: ignore[arg-type]

    partner_id = fields.Many2one("res.partner", required=True)
    property_id = fields.Many2one("estate_property", required=True)
    validity = fields.Integer(default=7)
    date_deadline = fields.Date(compute="_compute_deadline", inverse="_inverse_deadline")
    _order = "price desc"

    @api.depends('create_date', 'validity') #自动字段create_date可以直接使用不用再重新声明
    def _compute_deadline(self): #called at each change of its dependencies
        for record in self:
            base_date = record.create_date.date() if record.create_date else fields.Date.today() #数据还未创建好时此字段为空，做好fallback
            record.date_deadline = base_date + timedelta(days=record.validity)

    def _inverse_deadline(self): #called when saving the record
        for record in self:
            base_date = record.create_date.date() if record.create_date else fields.Date.today()
            if record.date_deadline:
                record.validity = ( record.date_deadline - base_date ).days

    def action_accept(self):
        for record in self:
            accepted_offer = self.search([("property_id", "=", record.property_id.id),
                                          ("status", "=", "accepted"),
                                          ("id", "!=", record.id),
                                          ], limit=1)
            if accepted_offer:
                raise UserError("只有有一个报价被接受")
            
            record.status = "accepted"
            record.property_id.buyer_id = record.partner_id
            record.property_id.selling_price = record.price
            record.property_id.state = "offer_accepted"


    def action_refuse(self):
        for record in self:
            record.status = "refused"

    _check_price = models.Constraint(
        'CHECK(price > 0)',
        '价格需为正数'
    )



