from flask import Flask, request, jsonify, send_file
import json
from datetime import datetime

app = Flask(__name__)

data = []

def save_data():
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return "Harita Projesi Backend"

@app.route('/add_point', methods=['POST'])
def add_point():
    try:
        lat = request.json['lat']
        lng = request.json['lng']
        now = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

        new_point = {
            "id": len(data),
            "lat": lat,
            "lng": lng,
            "datetime": now
        }

        data.append(new_point)
        save_data()

        return jsonify({"message": "Nokta başarıyla eklendi."}), 201
    except:
        return jsonify({"message": "Nokta eklenirken bir hata oluştu."}), 500

@app.route('/get_points', methods=['GET'])
def get_points():
    return jsonify(data)

@app.route('/download_json', methods=['GET'])
def download_json():
    return send_file('data.json', as_attachment=True)

if __name__ == '__main__':
    try:
        with open('data.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    app.run(debug=True)
