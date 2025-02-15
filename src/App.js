// import React from "react";
// import SeatingChart from "./SeatingChart";

// function App() {
//   return (
//     <div>
//       <h1>Event Seating Chart</h1>
//       <SeatingChart />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import SeatingChart from "./SeatingChart";
import BarcodeScanner from "./BarcodeScanner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [message, setMessage] = useState("");

  const handleScanSuccess = async (ticketNumber) => {
    if (!ticketNumber) return;

    const ticketRef = doc(db, "tickets", ticketNumber);
    const ticketSnap = await getDoc(ticketRef);

    if (!ticketSnap.exists()) {
      setMessage("Ticket does not exist.");
      return;
    }

    const ticketData = ticketSnap.data();

    if (!ticketData.paid) {
      setMessage("This ticket has not been paid for!");
      return;
    }

    await updateDoc(ticketRef, {
      checked_in: true,
      time: new Date(),
    });

    setMessage(`Ticket ${ticketNumber} checked in successfully!`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Event Check-In</h1>
      <BarcodeScanner onScanSuccess={handleScanSuccess} />
      {message && <p>{message}</p>}
      <SeatingChart />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    color: "#333",
  },
};

export default App;
