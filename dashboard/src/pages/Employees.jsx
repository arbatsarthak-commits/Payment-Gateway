import { useState, useEffect } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost/super-institute/api/employees.php";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();

      const mappedEmployees = data.map(emp => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        category: getCategoryFromRole(emp.role),
        baseSalary: 0,
        status: "Active",
        upiId: emp.upi_id,
        mobile: emp.mobile
      }));
      setEmployees(mappedEmployees);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "",
    baseSalary: "",
    upiId: "",
    mobile: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const getCategoryOptions = (role) => {
    if (role === "Teacher") {
      return ["MSCIT", "Module", "DCFA/DCP/DDA/DGDA", "Other"];
    } else if (role === "Front Office Executive" || role === "Lab Instructor") {
      return ["N/A", "Other"];
    }
    return [];
  };

  const getCategoryFromRole = (role) => {
    if (role === "Teacher") return "MSCIT";
    return "N/A";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "role") {
        updated.category = "";
      }
      return updated;
    });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.role) errors.role = "Role is required";

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile must be 10 digits";
    }

    if (formData.upiId && !/^[\w\.\-]+@[\w\-]+$/.test(formData.upiId)) {
      errors.upiId = "Invalid UPI ID format";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          mobile: formData.mobile,
          upi_id: formData.upiId
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to add employee");
      }

      await fetchEmployees();

      setFormData({
        name: "",
        role: "",
        category: "",
        baseSalary: "",
        upiId: "",
        mobile: ""
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete");
      await fetchEmployees();
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  return (
    <div className="employees-page">
      <div className="employees-header">
        <h2 className="employees-title">Employees</h2>
        <p className="employees-subtitle">
          Manage all teaching and non-teaching staff.
        </p>
      </div>

      <div className="card employees-form-card">
        <h3 className="form-card-title">Add New Employee</h3>
        <form onSubmit={handleSubmit} className="employees-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                placeholder="Enter employee name"
                required
              />
              {formErrors.name && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`form-input ${formErrors.role ? 'input-error' : ''}`}
                required
              >
                <option value="">Select Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Front Office Executive">
                  Front Office Executive
                </option>
                <option value="Lab Instructor">Lab Instructor</option>
              </select>
              {formErrors.role && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.role}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
                required
                disabled={!formData.role}
              >
                <option value="">
                  {formData.role
                    ? "Select Category"
                    : "Select Role first"}
                </option>
                {getCategoryOptions(formData.role).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`form-input ${formErrors.mobile ? 'input-error' : ''}`}
                placeholder="10-digit Mobile"
                maxLength="10"
              />
              {formErrors.mobile && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.mobile}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="upiId" className="form-label">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                className={`form-input ${formErrors.upiId ? 'input-error' : ''}`}
                placeholder="eg: name@upi"
              />
              {formErrors.upiId && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.upiId}</span>}
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Employee
          </button>
        </form>
      </div>

      <div className="card employees-table-card">
        <h3 className="form-card-title">All Employees</h3>
        {loading ? <p>Loading...</p> : error ? <p className="error-text">{error}</p> : (
          <div className="table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Category</th>
                  <th>Base Salary (₹)</th>
                  <th>Status</th>
                  <th>UPI ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.category}</td>
                    <td>{employee.baseSalary.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-active">{employee.status}</span>
                    </td>
                    <td>{employee.upiId || "-"}</td>
                    <td>
                      <button onClick={() => handleDelete(employee.id)} className="btn-delete" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

