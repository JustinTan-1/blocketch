from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from werkzeug.security import check_password_hash, generate_password_hash
from psycopg2.errors import UniqueViolation
import json



app = Flask(__name__)
cors = CORS(app, origins="*")
conn = psycopg2.connect(database="users", port="5432")
cur = conn.cursor()

@app.route("/api/save", methods=["POST"])
def save():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        grid = json.dumps(data.get("grid"))
        name = data.get("name")
        cur.execute("SELECT id FROM users WHERE username = %s", (username,))
        user_id = cur.fetchone()[0]
        cur.execute("SELECT * FROM paintings WHERE userid=%s AND name=%s",(user_id,name))
        if not cur.fetchone():
            try:
                cur.execute("INSERT INTO paintings (grid, userid, name ) VALUES (%s,%s,%s)", (grid, user_id, name))
                conn.commit()
                return jsonify({"error": "Save Success1"})
            except UniqueViolation:
                conn.rollback()
        else:
            cur.execute("UPDATE paintings SET grid=%s WHERE userid=%s AND name=%s", (grid, user_id, name))
            conn.commit()
            return jsonify({"error": "Save Success2"})
        
    #cur.execute("SELECT paintings FROM users")
    #return f"123 {cur.fetchone()[0][0]}"

@app.route("/api/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        confirm = data.get("confirm")
        if not username or " " in username:
            return jsonify({"error": "Please Enter a Valid Username"})
        if not password or " " in password:
            return jsonify({"error": "Please Enter a Valid Password"})
        if not confirm == password:
            return jsonify({"error": "Passwords do not match"})
        try:
            cur.execute("INSERT INTO users (username, hash) VALUES (%s, %s)", (username, generate_password_hash(password)))
        except UniqueViolation:
             conn.rollback()
             return jsonify({"error": "Username already exists"})
        conn.commit()
        return jsonify({"success": "Successfully Registered!", "username": username})
    
@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username or " " in username:
            return jsonify({"error": "Please Enter a Valid Username"})
        if not password or " " in password:
            return jsonify({"error": "Please Enter a Valid Password"})
        cur.execute("SELECT username FROM users WHERE username = %s", (username,))
        if not cur.fetchone():
            return jsonify({"error": "Could not find user"})
        cur.execute("SELECT hash FROM users WHERE username = %s", (username,))
        if not check_password_hash(cur.fetchone()[0], password):
            return jsonify({"error": "Wrong Password"})
        return jsonify({"success": "Successfully logged in!", "username": username})

if __name__ == "__main__":
    app.run(debug=True, port=8080)