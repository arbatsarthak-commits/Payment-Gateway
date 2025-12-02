import { useState, useEffect } from "react";

export default function WorkReport() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [workHistory, setWorkHistory] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("work"); // 'work' or 'payment'

    const API_BASE = "http://localhost/super-institute/api";

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            fetchHistory(selectedEmployee);
        } else {
            setWorkHistory([]);
            setPaymentHistory([]);
        }
    }, [selectedEmployee]);

    const fetchEmployees = async () => {
        try {
            const res = await fetch(`${API_BASE}/employees.php`);
            const data = await res.json();
            setEmployees(data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    const fetchHistory = async (empId) => {
        setLoading(true);
        try {
            // Fetch Work History
            const workRes = await fetch(`${API_BASE}/work_entries.php?employee_id=${empId}`);
            const workData = await workRes.json();
            setWorkHistory(Array.isArray(workData) ? workData : []);

            // Fetch Payment History
            const payRes = await fetch(`${API_BASE}/salary.php?employee_id=${empId}`);
            const payData = await payRes.json();
            setPaymentHistory(Array.isArray(payData) ? payData : []);

        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsPaid = async (salaryId) => {
        if (!confirm("Are you sure you want to mark this as Paid?")) return;

        try {
            const res = await fetch(`${API_BASE}/salary.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: salaryId, status: "Paid" })
            });

            if (res.ok) {
                alert("Status updated successfully!");
                fetchHistory(selectedEmployee); // Refresh data
            } else {
                alert("Failed to update status.");
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <div className="work-report-page">
            <div className="report-header" style={{ marginBottom: "20px" }}>
                <h2 className="page-title">Employee Work Report</h2>
                <div className="employee-selector" style={{ marginTop: "10px" }}>
                    <label style={{ fontWeight: "bold", marginRight: "10px" }}>Select Employee:</label>
                    <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
                    >
                        <option value="">-- Select Employee --</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} ({emp.role})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedEmployee && (
                <div className="report-content">
                    {/* Tabs */}
                    <div className="tabs" style={{ display: "flex", borderBottom: "1px solid #ddd", marginBottom: "20px" }}>
                        <button
                            className={`tab-btn ${activeTab === "work" ? "active" : ""}`}
                            onClick={() => setActiveTab("work")}
                            style={{
                                padding: "10px 20px",
                                border: "none",
                                background: activeTab === "work" ? "#007bff" : "transparent",
                                color: activeTab === "work" ? "white" : "#333",
                                cursor: "pointer",
                                borderRadius: "4px 4px 0 0"
                            }}
                        >
                            Work History
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
                            onClick={() => setActiveTab("payment")}
                            style={{
                                padding: "10px 20px",
                                border: "none",
                                background: activeTab === "payment" ? "#007bff" : "transparent",
                                color: activeTab === "payment" ? "white" : "#333",
                                cursor: "pointer",
                                borderRadius: "4px 4px 0 0",
                                marginLeft: "5px"
                            }}
                        >
                            Payment History
                        </button>
                    </div>

                    {loading ? (
                        <p>Loading history...</p>
                    ) : (
                        <div className="tab-content">
                            {activeTab === "work" && (
                                <div className="card">
                                    <h3 className="form-card-title">Work Entries</h3>
                                    {workHistory.length === 0 ? (
                                        <p>No work entries found.</p>
                                    ) : (
                                        <div className="table-wrapper">
                                            <table className="employees-table">
                                                <thead>
                                                    <tr>
                                                        <th>Month</th>
                                                        <th>MSCIT</th>
                                                        <th>Module</th>
                                                        <th>Diploma</th>
                                                        <th>149 Course</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {workHistory.map((entry) => (
                                                        <tr key={entry.id}>
                                                            <td>{entry.year}-{String(entry.month).padStart(2, '0')}</td>
                                                            <td>{entry.ms_cit_count}</td>
                                                            <td>{entry.module_count}</td>
                                                            <td>{entry.diploma_count}</td>
                                                            <td>{entry.short_149_count}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "payment" && (
                                <div className="card">
                                    <h3 className="form-card-title">Payment History</h3>
                                    {paymentHistory.length === 0 ? (
                                        <p>No payment records found.</p>
                                    ) : (
                                        <div className="table-wrapper">
                                            <table className="employees-table">
                                                <thead>
                                                    <tr>
                                                        <th>Month</th>
                                                        <th>Gross Salary</th>
                                                        <th>Net Salary</th>
                                                        <th>Status</th>
                                                        <th>Paid At</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paymentHistory.map((pay) => (
                                                        <tr key={pay.id}>
                                                            <td>{pay.year}-{String(pay.month).padStart(2, '0')}</td>
                                                            <td>₹{parseFloat(pay.gross_salary).toLocaleString()}</td>
                                                            <td>₹{parseFloat(pay.net_salary).toLocaleString()}</td>
                                                            <td>
                                                                <span
                                                                    style={{
                                                                        padding: "4px 8px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: pay.status === "Paid" ? "#d4edda" : "#fff3cd",
                                                                        color: pay.status === "Paid" ? "#155724" : "#856404",
                                                                        fontWeight: "bold",
                                                                        fontSize: "0.85rem"
                                                                    }}
                                                                >
                                                                    {pay.status || "Pending"}
                                                                </span>
                                                            </td>
                                                            <td>{pay.paid_at || "-"}</td>
                                                            <td>
                                                                {pay.status !== "Paid" && (
                                                                    <button
                                                                        onClick={() => handleMarkAsPaid(pay.id)}
                                                                        style={{
                                                                            padding: "5px 10px",
                                                                            backgroundColor: "#28a745",
                                                                            color: "white",
                                                                            border: "none",
                                                                            borderRadius: "4px",
                                                                            cursor: "pointer"
                                                                        }}
                                                                    >
                                                                        Mark as Paid
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
