import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime


import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
CREDENTIALS_PATH = os.path.join(BASE_DIR, "../config/firebase_credentials.json")  

cred = credentials.Certificate(CREDENTIALS_PATH)

firebase_admin.initialize_app(cred)

db = firestore.client()


def populate_tickets():
    tickets_ref = db.collection("tickets")  

    for ticket_number in range(1, 501):  # Loop from 1 to 500
        ticket_data = {
            "checked_in": False,
            "equipo": "",
            "name": "",
            "paid": False,
            "ticket_number": ticket_number,
            "time": firestore.SERVER_TIMESTAMP  # Default timestamp from Firestore
        }

        # Create document with ticket_number as the unique ID
        tickets_ref.document(str(ticket_number)).set(ticket_data)

        print(f"Ticket {ticket_number} added.")

populate_tickets()

print("✅ All tickets have been added to Firestore!")
