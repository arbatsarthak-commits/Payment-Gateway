import { useState } from "react";

export default function Attendance() {
  const dummyEmployees = [
    "Rajesh Kumar",
    "Priya Sharma",
    "Amit Patel",
    "Sneha Desai",
    "Vikram Singh",
  ];

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      date: "2024-01-15",
      employeeName: "Rajesh Kumar",
      role: "Teacher",
      status: "Present",
      remarks: "",
    },
    {
      id: 2,
      date: "2024-01-15",
      employeeName: "Priya Sharma",
      role: "Teacher",
      status: "Present",
      remarks: "",
    },
    {
      id: 3,
      date: "2024-01-14",
      employeeName: "Amit Patel",
      role: "Front Office",
      status: "Absent",
      remarks: "Sick leave",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    employeeName: "",
    role: "",
    status: "Present",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: attendanceRecords.length + 1,
      date: formData.date,
      employeeName: formData.employeeName,
      role: formData.role,
      status: formData.status,
      remarks: formData.remarks || "",
    };

    // Add to top of list (latest first)
    setAttendanceRecords([newRecord, ...attendanceRecords]);

    // Reset form
    setFormData({
      date: "",
      employeeName: "",
      role: "",
      status: "Present",
      remarks: "",
    });
  };

  const getStatusBadgeClass = (status) => {
    if (status === "Present") return "badge badge-present";
    if (status === "Absent") return "badge badge-absent";
    if (status === "Leave") return "badge badge-leave";
    return "badge";
  };

  return (
    <div className="attendance-page">
      {/* Page Header */}
      <div className="attendance-header">
        <h2 className="attendance-title">Attendance</h2>
        <p className="attendance-subtitle">
          Mark daily presence of teachers and staff.
        </p>
      </div>

      {/* Form Card */}
      <div className="card attendance-form-card">
        <h3 className="form-card-title">Mark Attendance</h3>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="attendance-date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="attendance-date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="attendance-employee" className="form-label">
                Employee Name
              </label>
              <input
                type="text"
                id="attendance-employee"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter employee name"
                list="employee-list"
                required
              />
              <datalist id="employee-list">
                {dummyEmployees.map((emp, index) => (
                  <option key={index} value={emp} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label htmlFor="attendance-role" className="form-label">
                Role
              </label>
              <select
                id="attendance-role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Front Office">Front Office</option>
                <option value="Lab Instructor">Lab Instructor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="attendance-status" className="form-label">
                Status
              </label>
              <select
                id="attendance-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="attendance-remarks" className="form-label">
              Remarks (Optional)
            </label>
            <input
              type="text"
              id="attendance-remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Additional notes"
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Save Attendance
          </button>
        </form>
      </div>

      {/* Table Card */}
      <div className="card attendance-table-card">
        <h3 className="form-card-title">Attendance Records</h3>
        <div className="table-wrapper">
          {attendanceRecords.length === 0 ? (
            <div className="empty-state">No attendance records yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.role}</td>
                    <td>
                      <span className={getStatusBadgeClass(record.status)}>
                        {record.status}
                      </span>
                    </td>
                    <td>{record.remarks || "-"}</td>
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

