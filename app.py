from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
# CORS configuration ni update chesam
CORS(app, resources={r"/*": {"origins": "*"}})

# Methods lo 'OPTIONS' add cheyandi
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    # OPTIONS request vachinappudu ventane success return cheyali
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    data = request.json
    email = data.get('email')
    mobile = data.get('mobile')
    
    # Coordinates handling
    lat = float(data.get('lat')) if data.get('lat') else 0.0
    lon = float(data.get('lon')) if data.get('lon') else 0.0
    alt = float(data.get('alt')) if data.get('alt') is not None else 0.0

    # --- MATH LOGIC ---
    R = 6371000 
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)
    
    y_meters = lat_rad * R
    x_meters = lon_rad * R * math.cos(lat_rad)

    # --- OUTPUT ---
    print("\n" + "═"*45)
    print("         🚀 USER TRACKING DATA")
    print("═"*45)
    print(f"👤 USER    : {email}")
    print(f"📱 MOBILE  : {mobile}")
    print(f"📍 X-AXIS  : {x_meters:.2f} meters")
    print(f"📍 Y-AXIS  : {y_meters:.2f} meters")
    print(f"⛰️ ALTITUDE: {alt:.2f} meters")
    print("═"*45 + "\n")

    return jsonify({
        "status": "Success",
        "message": "3D Location Logged"
    }), 200

if __name__ == '__main__':
    app.run(port=10000, host='0.0.0.0') # Render needs host='0.0.0.0'
