from flask import Flask, jsonify
import odoorpc

app = Flask(__name__)

# Kết nối với Odoo
odoo = odoorpc.ODOO('localhost', port=8069)  
try:
    odoo.login('odoopilot-22102024', 'itseacorp@gmail.com', '1') 
    print("Kết nối thành công!")
except Exception as e:
    print(f"Không thể kết nối với Odoo: {e}")

@app.route('/api/products', methods=['GET'])
def get_products():
    product_ids = odoo.env['product.product'].search([]) 
    products = odoo.env['product.product'].read(product_ids, ['name', 'list_price', 'qty_available', 'standard_price'])
    print("check: ", products[0])
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)

