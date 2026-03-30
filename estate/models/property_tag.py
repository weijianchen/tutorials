from odoo import models, fields

class PropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Property Tags"

    name = fields.Char(required=True)
    _order = "name"

    _check_name = models.Constraint(
        "UNIQUE(name)",
        "名字需唯一"
    )