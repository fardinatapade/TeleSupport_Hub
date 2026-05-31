from flask import request

from models.ticket_model import (
    TicketModel
)



def create_ticket():

    try:
        data = request.get_json()

        user_id = data.get("user_id")
        full_name = data.get("full_name")
        email = data.get("email")
        phone = data.get("phone")
        issue_type = data.get("issue_type")
        subject = data.get("subject")
        description = data.get("description")

        
        if not all([user_id, full_name, email, phone, issue_type, subject, description]):
            return {
                "success": False,
                "message": "All fields are required"
            }, 400

     
        TicketModel.create_ticket(
            user_id,
            full_name,
            email,
            phone,
            issue_type,
            subject,
            description
        )

        return {
            "success": True,
            "message": "Ticket Created Successfully"
        }, 201

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500



def get_all_tickets():

    try:

        tickets = TicketModel.get_all_tickets()

        return {
            "success": True,
            "tickets": tickets
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500



def get_ticket():

    try:

        ticket_id = request.view_args["id"]

        ticket = TicketModel.get_ticket_by_id(
            ticket_id
        )

        if not ticket:
            return {
                "success": False,
                "message": "Ticket not found"
            }, 404

        return {
            "success": True,
            "ticket": ticket
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500



def update_ticket(id):
    try:
        data = request.get_json()

        subject = data.get("subject")
        description = data.get("description")
        status = data.get("status")

        TicketModel.update_ticket(
            id,
            subject,
            description,
            status
        )

        return {
            "success": True,
            "message": "Ticket Updated Successfully"
        }, 200

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }, 500



def delete_ticket():

    try:

        ticket_id = request.view_args["id"]

        TicketModel.delete_ticket(
            ticket_id
        )

        return {
            "success": True,
            "message": "Ticket Deleted Successfully"
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500