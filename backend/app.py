from flask import Flask
from flask_cors import CORS

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

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )