from firebase_admin import firestore

db = firestore.client()

def update_ticket(ticket_number):
    doc_ref = db.collection("tickets").document(str(ticket_number))
    ticket_doc = doc_ref.get()

    if not ticket_doc.exists:
        return f"Ticket number {ticket_number} does not exist."

    ticket_data = ticket_doc.to_dict()

    if not ticket_data.get("paid", False):
        user_input = input("This ticket has not been paid for! Do you want to pay now? (y/n) ").strip().lower()
        if user_input == 'y': 
            doc_ref.update({"paid": True})
            print("Ticket payed.")

    doc_ref.update({"checked_in": True, "time": firestore.SERVER_TIMESTAMP})
    return f"Ticket {ticket_number} checked in successfully!"

def get_table_status(table_number):
    doc_ref = db.collection("tables").document(str(table_number))
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    return None


