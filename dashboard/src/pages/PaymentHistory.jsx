import { useState, useEffect } from "react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState(() => {
    // Load from localStorage or use dummy data
    const saved = localStorage.getItem("paymentHistory");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        date: "2024-01-15",
        employeeName: "Ayur",
        amount: 30000,
        method: "UPI",
        status: "Success",
      },
      {
        id: 2,
        date: "2024-01-14",
        employeeName: "Sarthak",
        amount: 31000,
        method: "QR",
        status: "Success",
      },
      {
        id: 3,
        date: "2024-01-13",
        employeeName: "Charu",
        amount: 26000,
        method: "Card",
        status: "Success",
      },
    ];
  });

  useEffect(() => {
    // Save to localStorage whenever payments change
    localStorage.setItem("paymentHistory", JSON.stringify(payments));
  }, [payments]);

  return (
    <div className="payment-history-page">
      {/* Page Header */}
      <div className="payment-history-header">
        <h2 className="payment-history-title">Payment History</h2>
        <p className="payment-history-subtitle">
          View all salary payment transactions.
        </p>
      </div>

      {/* Table Card */}
      <div className="card payment-history-table-card">
        <div className="table-wrapper">
          {payments.length === 0 ? (
            <div className="empty-state">No payment records found.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.date}</td>
                    <td>{payment.employeeName}</td>
                    <td>₹{payment.amount.toLocaleString()}</td>
                    <td>{payment.method}</td>
                    <td>
                      <span className="badge badge-success">{payment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

