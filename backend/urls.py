from django.urls import path
from django.http import JsonResponse
from .views import check_in_ticket, get_table_info, initialize_table, remove_ticket

def api_home(request):
    return JsonResponse({"message": "Welcome to the API. Use endpoints like /api/check-in/, /api/table/{table_number}/"})

urlpatterns = [
    path("", api_home, name="api_home"),  
    path("check-in/", check_in_ticket, name="check_in_ticket"),
    path("table/<int:table_number>/", get_table_info, name="get_table_info"),
    path("initialize-table/", initialize_table, name="initialize_table"),
    path("remove-ticket/", remove_ticket, name="remove_ticket"),
]
