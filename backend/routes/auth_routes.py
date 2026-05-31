from flask import Blueprint

from controllers.auth_controller import (
    send_otp,
    verify_otp,
    signup,
    login
)

auth = Blueprint("auth", __name__)

auth.route("/send-otp", methods=["POST"])(send_otp)
auth.route("/verify-otp", methods=["POST"])(verify_otp)
auth.route("/signup", methods=["POST"])(signup)
auth.route("/login", methods=["POST"])(login)