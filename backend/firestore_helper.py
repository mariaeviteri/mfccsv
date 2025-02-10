from firebase_admin import firestore

db = firestore.client()

def add_ticket(ticket_number, name, table_number):
    doc_ref = db.collection("tickets").document(str(ticket_number))
    doc_ref.set({
        "ticket_number": ticket_number,
        "name": name,
        "checked_in": True,
        "paid": True,
        "table_number": table_number
    })

    table_ref = db.collection("tables").document(str(table_number))
    table_doc = table_ref.get()

    if table_doc.exists:
        # Get the current data from the table document
        table_data = table_doc.to_dict()

        # Update the occupied_seats count
        new_occupied_seats = table_data['occupied_seats'] + 1
        new_status = "available" if new_occupied_seats < table_data['seats'] else "full"

        # Add the guest's ticket number and name to the guests list
        table_ref.update({
            "occupied_seats": new_occupied_seats,
            "status": new_status,
            "guests": firestore.ArrayUnion([{
                "ticket_number": ticket_number,
                "name": name
            }])
        })
        return f"Ticket {ticket_number} checked in, table {table_number} updated."
    else:
        return f"Table {table_number} does not exist."

def add_table(table_number, seats=10):
    doc_ref = db.collection("tables").document(str(table_number))
    doc = doc_ref.get()

    if not doc.exists:  # Create the table if it doesn't exist
        doc_ref.set({
            "table_number": table_number,
            "seats": seats,
            "occupied_seats": 0,
            "status": "available",  # Can be 'available' or 'full'
            "guests": []  # Empty list to hold guests
        })
        return f"Table {table_number} initialized."
    else:
        return f"Table {table_number} already exists."


def get_table_status(table_number):
    doc_ref = db.collection("tables").document(str(table_number))
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    return None


def delete_ticket(ticket_number):
    doc_ref = db.collection("tickets").document(str(ticket_number))
    doc_ref.delete()
    return f"Ticket {ticket_number} deleted."
