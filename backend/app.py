from flask import Flask
from flask_cors import CORS
import socket
from routes.auth_routes import auth
from routes.ticket_routes import ticket

app = Flask(__name__)

CORS(app)


app.register_blueprint(
    auth,
    url_prefix="/api/auth"
)


app.register_blueprint(
    ticket,
    url_prefix="/api/tickets"
)

@app.route("/")
def home():
    return {
        "success": True,
        "message": "TeleSupport Hub Backend Running"
    }


@app.route("/network-test")
def network_test():
    try:
        ip = socket.gethostbyname("smtp.gmail.com")

        return {
            "success": True,
            "gmail_ip": ip
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500
    
    
@app.route("/smtp-test")
def smtp_test():
    try:
        sock = socket.create_connection(
            ("smtp.gmail.com", 465),
            timeout=10
        )

        sock.close()

        return {
            "success": True,
            "message": "Port 465 reachable"
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500
    

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )