from odoo import models, fields, Command

class EstateProperty(models.Model):
    _inherit = "estate_property"

    def action_sell(self):
        
        self.env['account.move'].create({
            'partner_id': self.buyer_id.id,
            'move_type': 'out_invoice',
            'invoice_line_ids': [
                Command.create({
                    'name': 'Commission',
                    'quantity': 1,
                    'price_unit': self.selling_price * 0.06,
                }
                ),
                Command.create({
                    'name': 'Administration fee',
                    'quantity': 1.0,
                    'price_unit': 100.0,
                })
            ]
        })
        return super().action_sell()