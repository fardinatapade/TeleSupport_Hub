import mysql.connector
from mysql.connector import Error
from config import Config

def get_connection():
    try:
        connection = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DATABASE,
            port=int(getattr(Config, "MYSQL_PORT", 3306))
        )

        print("MYSQL_DATABASE =", Config.MYSQL_DATABASE)

        if connection.is_connected():
            print("MySQL Connected Successfully")

        return connection

    except Error as e:
        print(f"MySQL Connection Error: {e}")
        return None