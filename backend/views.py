from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .firestore_helper import update_ticket, get_table_status

@csrf_exempt
def check_in_ticket(request):
    if request.method == "GET":
        return JsonResponse({"message": "Check-in endpoint is working! Use POST to check in a ticket."})

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            ticket_number = data.get("ticket_number")

            if not ticket_number:
                return JsonResponse({"error": "Ticket number is required"}, status=400)

            result = update_ticket(ticket_number)

            if "not been paid" in result:
                return JsonResponse({"message": "This ticket has not been paid for!", "action": "prompt_payment"}, status=402)

            return JsonResponse({"message": result})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def get_table_info(request, table_number):
    table_data = get_table_status(table_number)
    if table_data:
        return JsonResponse(table_data)
    return JsonResponse({"error": "Table not found"}, status=404)
