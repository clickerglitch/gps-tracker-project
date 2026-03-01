from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import os


app = Flask(__name__)
CORS(app)  # Allows React to talk to Python

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    mobile = data.get('mobile')
    
    # Get coordinates from the request
    lat = float(data.get('lat'))
    lon = float(data.get('lon'))
    # Altitude is height above sea level
    alt = float(data.get('alt')) if data.get('alt') is not None else 0.0

    # --- MATH LOGIC: DEGREES TO METERS ---
    # Earth Radius in meters
    R = 6371000 
    
    # Convert Degrees to Radians
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)
    
    # Calculate Meter distances from (0,0) point of Earth
    y_meters = lat_rad * R
    x_meters = lon_rad * R * math.cos(lat_rad)

    # --- OUTPUT TO VS CODE TERMINAL ---
    print("\n" + "═"*45)
    print("         🚀 USER TRACKING DATA")
    print("═"*45)
    print(f"👤 USER    : {email}")
    print(f"📱 MOBILE  : {mobile}")
    print(f"📍 X-AXIS  : {x_meters:.2f} meters (East/West)")
    print(f"📍 Y-AXIS  : {y_meters:.2f} meters (North/South)")
    print(f"⛰️ ALTITUDE: {alt:.2f} meters (Elevation)")
    print("═"*45 + "\n")

    return jsonify({
        "status": "Success",
        "message": "3D Location Logged"
    }), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)