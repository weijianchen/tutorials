# pyright: reportUnusedExpression=false

{
    'name': 'estate',
    'version': '1.0',
    'category': 'Turorial/estate',
    'sequence': '15',
    'summary': 'Manage apartment',
    'description': '',
    'website': '',
    'depends': [
        'base',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
        'views/estate_menus.xml',
        'views/estate_property_type_views.xml',
        'views/estate_property_tag_views.xml',
        'views/estate_property_offer_views.xml',
    ],
    'demo': [],
    'css': [],
    'installable': True,
    'application': True,
    'auto-install': False

}