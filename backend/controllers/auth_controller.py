from flask import request

from services.otp_service import generate_otp
from services.mail_service import send_email_otp

from models.user_model import UserModel

from utils.password_utils import (
    hash_password,
    verify_password
)

otp_store = {}


def send_otp():
    try:
        data = request.get_json()

        email = data.get("email")

        if not email:
            return {
                "success": False,
                "message": "Email is required"
            }, 400

        otp = generate_otp()

        otp_store[email] = str(otp)

        email_sent = send_email_otp(email, otp)

        if not email_sent:
            return {
                "success": False,
                "message": "Failed to send OTP email"
            }, 500

        return {
            "success": True,
            "message": "OTP Sent Successfully"
        }, 200

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 500


def verify_otp():
    try:
        data = request.get_json()

        email = data.get("email")
        otp = str(data.get("otp"))

        if not email or not otp:
            return {
                "success": False,
                "message": "Email and OTP are required"
            }, 400

        saved_otp = otp_store.get(email)

        if saved_otp and saved_otp == otp:

            otp_store.pop(email, None)

            return {
                "success": True,
                "message": "OTP Verified Successfully"
            }, 200

        return {
            "success": False,
            "message": "Invalid OTP"
        }, 400

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 500


def signup():
    try:
        data = request.get_json()

        full_name = data.get("fullName")
        email = data.get("email")
        password = data.get("password")

        if not full_name or not email or not password:
            return {
                "success": False,
                "message": "All fields are required"
            }, 400

        existing_user = UserModel.find_by_email(email)

        if existing_user:
            return {
                "success": False,
                "message": "Email already exists"
            }, 400

        hashed_password = hash_password(password)

        UserModel.create_user(
            full_name,
            email,
            hashed_password
        )

        return {
            "success": True,
            "message": "Account Created Successfully"
        }, 201

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 500


def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {
                "success": False,
                "message": "Email and Password are required"
            }, 400

        user = UserModel.find_by_email(email)

        if not user:
            return {
                "success": False,
                "message": "User not found"
            }, 404

        if not verify_password(
            password,
            user["password"]
        ):
            return {
                "success": False,
                "message": "Invalid Password"
            }, 401

        return {
            "success": True,
            "message": "Login Successful",
            "user": {
                "id": user["id"],
                "fullName": user["full_name"],
                "email": user["email"]
            }
        }, 200

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 500