from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .firestore_helper import add_ticket, get_table_status, add_table, delete_ticket

@csrf_exempt
def check_in_ticket(request):
    if request.method == "GET":  # Add this for debugging
        return JsonResponse({"message": "Check-in endpoint is working! Use POST to check in a ticket."})

    if request.method == "POST":
        data = json.loads(request.body)
        ticket_number = data.get("ticket_number")
        name = data.get("name")
        table_number = data.get("table_number")

        result = add_ticket(ticket_number, name, table_number)
        return JsonResponse({"message": result})

    return JsonResponse({"error": "Invalid request"}, status=400)

def get_table_info(request, table_number):
    table_data = get_table_status(table_number)
    if table_data:
        return JsonResponse(table_data)
    return JsonResponse({"error": "Table not found"}, status=404)

@csrf_exempt
def initialize_table(request):
    if request.method == "POST":
        data = json.loads(request.body)
        table_number = data.get("table_number")
        seats = data.get("seats", 10)  # Default to 10 seats

        result = add_table(table_number, seats)
        return JsonResponse({"message": result})

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def remove_ticket(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        ticket_number = data.get("ticket_number")

        result = delete_ticket(ticket_number)
        return JsonResponse({"message": result})

    return JsonResponse({"error": "Invalid request"}, status=400)
