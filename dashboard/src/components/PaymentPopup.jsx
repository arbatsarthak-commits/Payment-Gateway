import { useState, useEffect } from "react";

export default function PaymentPopup({
  visible,
  onClose,
  employeeName,
  amount,
  upiId = "",
}) {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!visible) {
      // Reset states when modal closes
      setIsLoading(false);
      setIsSuccess(false);
      setPaymentMethod("UPI");
    }
  }, [visible]);

  const handleProceed = () => {
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Save to payment history
      const paymentRecord = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        employeeName: employeeName,
        amount: amount,
        method: paymentMethod,
        status: "Success",
      };

      const existingPayments = JSON.parse(
        localStorage.getItem("paymentHistory") || "[]"
      );
      existingPayments.unshift(paymentRecord);
      localStorage.setItem("paymentHistory", JSON.stringify(existingPayments));

      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  const handleDirectUPIPay = () => {
    if (!upiId) return;
    const link = `upi://pay?pa=${encodeURIComponent(
      upiId
    )}&pn=${encodeURIComponent(employeeName)}&am=${encodeURIComponent(
      amount
    )}&cu=INR`;
    window.location.href = link;
  };

  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card fade-scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {!isSuccess ? (
          <>
            <h2 className="modal-title">Pay Salary</h2>
            <div className="modal-content">
              <div className="modal-info">
                <div className="modal-info-row">
                  <span className="modal-label">Employee:</span>
                  <span className="modal-value">{employeeName}</span>
                </div>
                <div className="modal-info-row">
                  <span className="modal-label">Amount:</span>
                  <span className="modal-value">₹{amount.toLocaleString()}</span>
                </div>
                {upiId && (
                  <div className="modal-info-row">
                    <span className="modal-label">UPI ID:</span>
                    <span className="modal-value">{upiId}</span>
                  </div>
                )}
              </div>

              {upiId && (
                <>
                  <p className="upi-text">Pay to UPI ID: {upiId}</p>
                  <button
                    type="button"
                    className="button-primary"
                    style={{ width: "100%" }}
                    onClick={handleDirectUPIPay}
                  >
                    Pay Using UPI App
                  </button>
                </>
              )}

              <div className="payment-methods">
                <h3 className="payment-methods-title">Select Payment Method</h3>
                <div className="payment-options">
                  <button
                    className={`payment-option ${
                      paymentMethod === "UPI" ? "payment-option-active" : ""
                    }`}
                    onClick={() => setPaymentMethod("UPI")}
                  >
                    UPI
                  </button>
                  <button
                    className={`payment-option ${
                      paymentMethod === "QR" ? "payment-option-active" : ""
                    }`}
                    onClick={() => setPaymentMethod("QR")}
                  >
                    QR Code
                  </button>
                  <button
                    className={`payment-option ${
                      paymentMethod === "Card" ? "payment-option-active" : ""
                    }`}
                    onClick={() => setPaymentMethod("Card")}
                  >
                    Debit/Credit Card
                  </button>
                </div>

                {paymentMethod === "QR" && upiId && (
                  <div className="qr-container">
                    <img
                      src={`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodeURIComponent(
                        `upi://pay?pa=${upiId}&pn=${employeeName}&am=${amount}&cu=INR`
                      )}`}
                      alt="UPI QR"
                      className="qr-box"
                    />
                  </div>
                )}
                {paymentMethod === "QR" && !upiId && (
                  <div className="qr-container">
                    <p className="upi-text">UPI ID not available for QR.</p>
                  </div>
                )}

                {isLoading ? (
                  <div className="payment-loading">
                    <div className="spinner"></div>
                    <p>Processing payment...</p>
                  </div>
                ) : (
                  <button className="button-pay button-pay-modal" onClick={handleProceed}>
                    Proceed to Pay
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="payment-success fade-scale-in">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Payment Successful</h2>
            <p className="success-message">
              ₹{amount.toLocaleString()} has been paid to {employeeName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

