import smtplib
from email.mime.text import MIMEText
from config import Config


def send_email_otp(receiver_email, otp):

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>

    <body style="
        margin:0;
        padding:0;
        background:#fff5f5;
        font-family:Arial,sans-serif;
    ">

    <div style="
        max-width:650px;
        margin:40px auto;
        background:white;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 15px 40px rgba(220,38,38,0.15);
    ">

        <!-- HEADER -->
        <div style="
            background:linear-gradient(135deg,#ef4444,#dc2626);
            padding:40px;
            text-align:center;
            color:white;
        ">
            <h1 style="
                margin:0;
                font-size:34px;
                font-weight:900;
            ">
                🎧 TeleSupport Hub
            </h1>

            <p style="
                margin-top:10px;
                font-size:15px;
            ">
                Secure Email Verification
            </p>
        </div>

        <!-- BODY -->
        <div style="padding:40px;">

            <h2 style="
                color:#991b1b;
                margin-top:0;
            ">
                Verify Your Email Address
            </h2>

            <p style="
                color:#4b5563;
                font-size:15px;
                line-height:28px;
            ">
                Welcome to <b>TeleSupport Hub</b> 
                <br><br>
                Use the OTP below to complete your account verification.
                This OTP is valid for 10 minutes.
            </p>

            <div style="
                text-align:center;
                margin:35px 0;
            ">
                <div style="
                    display:inline-block;
                    padding:22px 45px;
                    background:#fee2e2;
                    border:2px dashed #dc2626;
                    border-radius:16px;
                ">
                    <span style="
                        font-size:38px;
                        font-weight:900;
                        letter-spacing:8px;
                        color:#dc2626;
                    ">
                        {otp}
                    </span>
                </div>
            </div>

            <div style="
                background:#fef2f2;
                border-left:5px solid #ef4444;
                padding:18px;
                border-radius:10px;
                margin-bottom:25px;
            ">
                <p style="
                    margin:0;
                    color:#7f1d1d;
                    font-size:14px;
                ">
                    🔒 Never share this OTP with anyone.
                    TeleSupport Hub will never ask for your OTP.
                </p>
            </div>

            <p style="
                color:#6b7280;
                line-height:26px;
                font-size:14px;
            ">
                If you did not request this verification,
                please ignore this email.
            </p>

        </div>

        <!-- FOOTER -->
        <div style="
            background:#fafafa;
            padding:25px;
            text-align:center;
            border-top:1px solid #e5e7eb;
        ">
            <p style="
                margin:0;
                color:#6b7280;
                font-size:13px;
            ">
                © 2026 TeleSupport Hub
            </p>

            <p style="
                margin-top:8px;
                color:#9ca3af;
                font-size:12px;
            ">
                Smart Telecom Support & Ticket Management Platform
            </p>
        </div>

    </div>

    </body>
    </html>
    """

    msg = MIMEText(html_content, "html")

    msg["Subject"] = "🔐 TeleSupport Hub - Email Verification OTP"
    msg["From"] = Config.MAIL_EMAIL
    msg["To"] = receiver_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(
            Config.MAIL_EMAIL,
            Config.MAIL_PASSWORD
        )

        server.send_message(msg)

        server.quit()

        return True

    except Exception as e:
        print("Email Error:", str(e))
        return False