from odoo import models, fields

class PropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Property type"
    _order = "sequence, name" #有了手动排序字段后要加上且在第一位

    name = fields.Char(required=True)
    property_ids = fields.One2many("estate_property", "property_type_id")
    sequence = fields.Integer('Sequence', default=1, help='Used to order the most convinient type.') #手动排序

    _check_name = models.Constraint(
        'UNIQUE(name)',
        '名字需唯一'
    )