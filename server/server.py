from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from werkzeug.security import check_password_hash, generate_password_hash
from psycopg2.errors import UniqueViolation



app = Flask(__name__)
cors = CORS(app, origins="*")
conn = psycopg2.connect(database="users", port="5432")
cur = conn.cursor()

@app.route("/api/login", methods=["POST","GET"])
def test():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username or " " in username:
            return jsonify({"error": "Please Enter a Valid Username"})
        if not password or " " in password:
            return jsonify({"error": "Please Enter a Valid Password"})
        try:
            cur.execute("INSERT INTO users (username, hash) VALUES (%s, %s)", (username, generate_password_hash(password)))
        except UniqueViolation:
             conn.rollback()
             return jsonify({"error": "Username already exists"})
        conn.commit()
        return jsonify({"success": "Successfully Registered!", "username": username})
        

if __name__ == "__main__":
    app.run(debug=True, port=8080)