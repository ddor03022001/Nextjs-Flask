from flask import Flask, jsonify
from flask_cors import CORS 
import odoorpc
import base64

app = Flask(__name__)
CORS(app)

# Kết nối với Odoo
odoo = odoorpc.ODOO('localhost', port=8069)  
odoo.login('odoopilot-22102024', 'itseacorp@gmail.com', '1')  

@app.route('/api/products', methods=['GET'])
def get_products():
    product_ids = odoo.env['product.product'].search([('available_in_pos', '=', True)]) 
    products = odoo.env['product.product'].read(product_ids, ['name', 'list_price', 'qty_available', 'image_medium']) 
    if not products:
        return jsonify({'message': 'No products found'}), 404  
    print("check product: ", products[0])
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)

