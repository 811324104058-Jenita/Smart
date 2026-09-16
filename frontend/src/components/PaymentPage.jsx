import { useEffect, useState } from "react";
import "./Dashboard.css";

function PaymentPage({ email, onBack }) {
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState(2500);
  const [billingMonth, setBillingMonth] = useState("September 2026");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/payments/resident/${email}`
      );
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error loading payments", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [email]);

  const makePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          residentEmail: email,
          billingMonth: billingMonth,
          amount: Number(amount),
          paymentMethod: paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      setMessage("Payment successful! ✅");
      fetchPayments();
    } catch (error) {
      setMessage("Unable to make payment ❌");
    }
  };

  return (
    <div className="complaint-page">
      <div className="complaint-header">
        <div>
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
          <h1>💳 Maintenance Payments</h1>
          <p>Pay your maintenance and view payment history</p>
        </div>
      </div>

      <div className="complaint-container">
        <div className="complaint-form-card">
          <h2>Make Payment</h2>

          <form onSubmit={makePayment}>
            <input
              type="text"
              value={billingMonth}
              onChange={(e) => setBillingMonth(e.target.value)}
              placeholder="Billing Month"
              required
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>

            <button type="submit">Pay ₹{amount}</button>
          </form>

          {message && (
            <p className="complaint-message">{message}</p>
          )}
        </div>

        <div className="complaints-list">
          <h2>Payment History</h2>

          {payments.length === 0 ? (
            <p>No payment history found.</p>
          ) : (
            payments.map((payment) => (
              <div className="complaint-item" key={payment.id}>
                <div>
                  <h3>₹{payment.amount}</h3>
                  <p>{payment.billingMonth}</p>
                  <small>
                    Method: {payment.paymentMethod}
                  </small>
                  <br />
                  <small>
                    Date: {payment.paymentDate}
                  </small>
                </div>

                <span className="status">
                  {payment.paymentStatus}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;