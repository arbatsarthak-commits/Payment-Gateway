import { useState, useEffect } from "react";

export default function WorkEntry() {
  const [workEntries, setWorkEntries] = useState([]);
  const [employees, setEmployees] = useState([]);

  const API_BASE = "http://localhost/super-institute/api";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/employees.php`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const [formData, setFormData] = useState({
    date: "",
    employeeId: "",
    courseBatch: "",
    mode: "Online",
    hours: "",
    studentsCount: "",
    remarks: "",
    category: "mscit" // Default category to map studentsCount to
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.date) errors.date = "Date is required";
    if (!formData.employeeId) errors.employeeId = "Employee is required";

    if (formData.hours && parseFloat(formData.hours) < 0) {
      errors.hours = "Hours cannot be negative";
    }
    if (formData.studentsCount && parseInt(formData.studentsCount) < 0) {
      errors.studentsCount = "Count cannot be negative";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Map to backend fields
    const payload = {
      employee_id: formData.employeeId,
      month: formData.date.substring(0, 7), // YYYY-MM
      mscit: formData.category === 'mscit' ? parseInt(formData.studentsCount) || 0 : 0,
      module: formData.category === 'module' ? parseInt(formData.studentsCount) || 0 : 0,
      diploma: formData.category === 'diploma' ? parseInt(formData.studentsCount) || 0 : 0,
      short149: formData.category === 'short149' ? parseInt(formData.studentsCount) || 0 : 0
    };

    try {
      const response = await fetch(`${API_BASE}/work_entries.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save work");
      }

      alert("Work saved successfully!");

      // Add to local list for display (mocking the object structure)
      const empName = employees.find(e => e.id === formData.employeeId)?.name || "Unknown";
      const newEntry = {
        id: Date.now(),
        date: formData.date,
        employeeName: empName,
        courseBatch: formData.category, // Showing category as batch for now
        mode: formData.mode,
        hours: formData.hours,
        studentsCount: formData.studentsCount,
        remarks: formData.remarks
      };
      setWorkEntries([newEntry, ...workEntries]);

      setFormData({
        date: "",
        employeeId: "",
        courseBatch: "",
        mode: "Online",
        hours: "",
        studentsCount: "",
        remarks: "",
        category: "mscit"
      });

    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="work-entry-page">
      {/* Form Card */}
      <div className="card work-entry-form-card">
        <h3 className="form-card-title">Add Work Entry</h3>
        <form onSubmit={handleSubmit} className="work-entry-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-input ${formErrors.date ? 'input-error' : ''}`}
                required
              />
              {formErrors.date && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="employeeId" className="form-label">
                Employee
              </label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className={`form-input ${formErrors.employeeId ? 'input-error' : ''}`}
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              {formErrors.employeeId && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.employeeId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category (for Salary)
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="mscit">MSCIT</option>
                <option value="module">Module</option>
                <option value="diploma">Diploma</option>
                <option value="short149">149 Course</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mode" className="form-label">
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hours" className="form-label">
                Hours
              </label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                className={`form-input ${formErrors.hours ? 'input-error' : ''}`}
                placeholder="e.g., 2.0"
                step="0.5"
                min="0"
              />
              {formErrors.hours && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.hours}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="studentsCount" className="form-label">
                Students Count / Batches
              </label>
              <input
                type="number"
                id="studentsCount"
                name="studentsCount"
                value={formData.studentsCount}
                onChange={handleInputChange}
                className={`form-input ${formErrors.studentsCount ? 'input-error' : ''}`}
                placeholder="Count"
                min="0"
              />
              {formErrors.studentsCount && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.studentsCount}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="remarks" className="form-label">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Additional notes (optional)"
              rows="3"
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Save Work Entry
          </button>
        </form>
      </div>

      {/* Table Card */}
      <div className="card work-entry-table-card">
        <h3 className="form-card-title">Recent Work Entries (Session)</h3>
        <div className="table-wrapper">
          {workEntries.length === 0 ? (
            <div className="empty-state">No work entries added in this session.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Hours</th>
                  <th>Count</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {workEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{entry.employeeName}</td>
                    <td>{entry.courseBatch}</td>
                    <td>{entry.mode}</td>
                    <td>{entry.hours}</td>
                    <td>{entry.studentsCount}</td>
                    <td>{entry.remarks || "-"}</td>
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
