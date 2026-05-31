from database.db import get_connection


class TicketModel:

    @staticmethod
    def create_ticket(
        user_id,
        full_name,
        email,
        phone,
        issue_type,
        subject,
        description
    ):

        conn = get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO tickets
        (
            user_id,
            full_name,
            email,
            phone,
            issue_type,
            subject,
            description
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(
            query,
            (
                user_id,
                full_name,
                email,
                phone,
                issue_type,
                subject,
                description
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

    @staticmethod
    def get_all_tickets():

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT *
            FROM tickets
            ORDER BY id DESC
            """
        )

        data = cursor.fetchall()

        cursor.close()
        conn.close()

        return data

    @staticmethod
    def get_ticket_by_id(ticket_id):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT *
            FROM tickets
            WHERE id=%s
            """,
            (ticket_id,)
        )

        ticket = cursor.fetchone()

        cursor.close()
        conn.close()

        return ticket

    @staticmethod
    def update_ticket(
        ticket_id,
        subject,
        description,
        status
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE tickets
            SET
            subject=%s,
            description=%s,
            status=%s
            WHERE id=%s
            """,
            (
                subject,
                description,
                status,
                ticket_id
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

    @staticmethod
    def delete_ticket(ticket_id):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            DELETE FROM tickets
            WHERE id=%s
            """,
            (ticket_id,)
        )

        conn.commit()

        cursor.close()
        conn.close()