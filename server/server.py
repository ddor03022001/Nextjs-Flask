from flask import Flask, jsonify
from flask_cors import CORS
import odoorpc
import threading
import time

app = Flask(__name__)
CORS(app)

# Kết nối với Odoo
odoo = odoorpc.ODOO('localhost', port=8069)
odoo.login('odoopilot-22102024', 'itseacorp@gmail.com', '1')

# Biến toàn cục để lưu trữ dữ liệu sản phẩm
cached_products = None

# Hàm tải dữ liệu sản phẩm từ Odoo
def load_products():
    global cached_products
    print("Loading products from Odoo...")
    product_ids = odoo.env['product.product'].search([('available_in_pos', '=', True)])
    products = odoo.env['product.product'].read(product_ids, ['name', 'list_price', 'qty_available', 'image_medium'])
    cached_products = products
    print("Products loaded.")

# Hàm làm mới dữ liệu mỗi giờ
def refresh_data_every_hour():
    while True:
        load_products() 
        time.sleep(3600)  

# Tải dữ liệu sản phẩm ngay khi khởi động server
load_products()

# Tạo một luồng nền để làm mới dữ liệu mỗi giờ
refresh_thread = threading.Thread(target=refresh_data_every_hour)
refresh_thread.daemon = True  # Đảm bảo luồng nền sẽ dừng khi server dừng
refresh_thread.start()

@app.route('/api/products', methods=['GET'])
def get_products():
    if cached_products is None:
        return jsonify({'message': 'No products found'}), 404
    return jsonify(cached_products)

if __name__ == '__main__':
    app.run(debug=True)