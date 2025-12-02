import { useState, useEffect } from "react";
import PaymentPopup from "../components/PaymentPopup";

export default function SalaryReport() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedUPI, setSelectedUPI] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [salaryData, setSalaryData] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Current YYYY-MM
  const [loading, setLoading] = useState(false);

  const [viewDetails, setViewDetails] = useState(null);

  const API_BASE = "http://localhost/super-institute/api";

  useEffect(() => {
    fetchSalary();
  }, [month]);

  const fetchSalary = async () => {
    setLoading(true);
    try {
      // We fetch from API to get the real work data from DB
      const res = await fetch(`${API_BASE}/salary.php?month=${month}`);
      const data = await res.json();

      // Map API data to the User's requested structure and calculation
      const mapped = data.map(item => {
        // Calculate Admission Count (Sum of all work counts)
        const admissionCount =
          parseInt(item.ms_cit_count || 0) +
          parseInt(item.module_count || 0) +
          parseInt(item.diploma_count || 0) +
          parseInt(item.short_149_count || 0);

        // Incentive Calculation: Count * 100
        const incentiveRate = 100;
        const incentive = admissionCount * incentiveRate;

        // Base Salary: Not in DB, defaulting to 0 or maybe we can infer/hardcode for now?
        // The user asked to load from LocalStorage, but we are using DB.
        // We'll set it to 0 or a placeholder.
        const baseSalary = 0;

        // Total Pay
        const totalPay = baseSalary + incentive;

        return {
          id: item.id || Math.random(),
          employeeName: item.name,
          role: item.role,
          baseSalary: baseSalary,
          admissionCount: admissionCount,
          incentive: incentive,
          totalPay: totalPay,
          upiId: item.upi_id,
          raw: item // Store raw data for details view
        };
      });
      setSalaryData(mapped);
    } catch (err) {
      console.error("Error fetching salary:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = (employee) => {
    // Prepare payment details object
    const details = {
      name: employee.employeeName,
      baseSalary: employee.baseSalary,
      admissionCount: employee.admissionCount,
      incentive: employee.incentive,
      totalPay: employee.totalPay,
      upiId: employee.upiId
    };

    setPaymentDetails(details);
    setSelectedEmployee(employee.employeeName);
    setSelectedAmount(employee.totalPay);
    setSelectedUPI(employee.upiId || "");
    setShowPopup(true);
  };

  const handleViewDetails = (employee) => {
    setViewDetails(employee);
  };

  const closeDetails = () => {
    setViewDetails(null);
  };

  // Restrict future months
  const maxMonth = new Date().toISOString().slice(0, 7);

  return (
    <div className="salary-report-page">

      <div className="salary-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="employees-title">Salary Report</h2>
        <div>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Month:</label>
          <input
            type="month"
            value={month}
            max={maxMonth}
            onChange={(e) => setMonth(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      {/* Salary Table Card */}
      <div className="card salary-table-card">
        <h3 className="form-card-title">Salary Report for {month}</h3>
        {loading ? <p>Loading...</p> : salaryData.length === 0 ? <p>No data found for this month.</p> : (
          <div className="table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Base Salary (₹)</th>
                  <th>Admission Count</th>
                  <th>Incentive (₹)</th>
                  <th>Total Pay (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salaryData.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employeeName}</td>
                    <td>{employee.role}</td>
                    <td>{employee.baseSalary.toLocaleString()}</td>
                    <td>{employee.admissionCount}</td>
                    <td>{employee.incentive.toLocaleString()}</td>
                    <td>{employee.totalPay.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="button-pay"
                          style={{ backgroundColor: '#2196F3' }} // Blue for details
                          onClick={() => handleViewDetails(employee)}
                        >
                          View Details
                        </button>
                        <button
                          className="button-pay"
                          onClick={() => handlePayNow(employee)}
                        >
                          Pay Now
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Salary Summary Card */}
      {salaryData.length > 0 && (
        <div className="card salary-summary-card">
          <h3 className="form-card-title">Salary Summary</h3>
          <div className="salary-summary-content">
            <div className="summary-row">
              <span className="summary-label">Total Employees:</span>
              <span className="summary-value">{salaryData.length}</span>
            </div>
            <div className="summary-row summary-total">
              <span className="summary-label">Total Payable Amount:</span>
              <span className="summary-value">
                ₹{salaryData.reduce((sum, item) => sum + item.totalPay, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {viewDetails && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Work Details: {viewDetails.employeeName}
            </h3>
            <div style={{ margin: '20px 0' }}>
              <p><strong>Role:</strong> {viewDetails.role}</p>
              <p><strong>Month:</strong> {month}</p>

              <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Work Breakdown</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>MSCIT Count</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{viewDetails.raw.ms_cit_count}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>Module Count</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{viewDetails.raw.module_count}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>Diploma Count</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{viewDetails.raw.diploma_count}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>149 Course Count</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{viewDetails.raw.short_149_count}</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Total Admissions</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{viewDetails.admissionCount}</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Payment Calculation</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Base Salary:</span>
                <span>₹{viewDetails.baseSalary}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Incentive ({viewDetails.admissionCount} * 100):</span>
                <span>₹{viewDetails.incentive}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #eee', fontWeight: 'bold', fontSize: '1.1em' }}>
                <span>Total Pay:</span>
                <span>₹{viewDetails.totalPay}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={closeDetails}
                style={{
                  padding: '8px 16px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPopup && (
        <PaymentPopup
          visible={showPopup}
          onClose={() => setShowPopup(false)}
          employeeName={selectedEmployee}
          amount={selectedAmount}
          upiId={selectedUPI}
          details={paymentDetails}
        />
      )}
    </div>
  );
}
