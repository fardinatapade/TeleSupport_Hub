from flask import Blueprint

from controllers.ticket_controller import (
    create_ticket,
    get_all_tickets,
    get_ticket,
    update_ticket,
    delete_ticket,
)

ticket = Blueprint("ticket", __name__)

ticket.route("/", methods=["POST"])(create_ticket)
ticket.route("/", methods=["GET"])(get_all_tickets)
ticket.route("/<int:id>", methods=["GET"])(get_ticket)
ticket.route("/<int:id>", methods=["PUT"])(update_ticket)
ticket.route("/<int:id>", methods=["DELETE"])(delete_ticket)
