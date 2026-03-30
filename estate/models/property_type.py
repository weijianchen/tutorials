from odoo import models, fields

class PropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Property type"
    _order = "name"

    name = fields.Char(required=True)
    property_ids = fields.One2many("estate_property", "property_type_id")

    _check_name = models.Constraint(
        'UNIQUE(name)',
        '名字需唯一'
    )