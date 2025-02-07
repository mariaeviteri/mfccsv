// not too sure what goes in here yet
// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

// // Function to check in a ticket
// export const checkInTicket = async (ticketNumber, name, tableNumber, guestType) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/check-in/`, {
//       ticket_number: ticketNumber,
//       name: name,
//       table_number: tableNumber,
//       guest_type: guestType, // New field added
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error checking in ticket:", error);
//     return { error: "Failed to check in ticket" };
//   }
// };

// // Function to get table status
// export const getTableStatus = async (tableNumber) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/table/${tableNumber}/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching table data:", error);
//     return { error: "Table not found" };
//   }
// };
