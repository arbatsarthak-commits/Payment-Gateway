import { useState } from "react";

export default function Placements() {
  const [placements, setPlacements] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      companyName: "Tech Solutions Pvt Ltd",
      jobRole: "Software Developer",
      salaryPackage: 500000,
      status: "Active Job",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      companyName: "Digital Innovations",
      jobRole: "Web Designer",
      salaryPackage: 450000,
      status: "Active Job",
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    companyName: "",
    jobRole: "",
    salaryPackage: "",
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

    const newPlacement = {
      id: placements.length + 1,
      studentName: formData.studentName,
      companyName: formData.companyName,
      jobRole: formData.jobRole,
      salaryPackage: parseFloat(formData.salaryPackage) || 0,
      status: "Active Job",
    };

    setPlacements([newPlacement, ...placements]);
    setFormData({
      studentName: "",
      companyName: "",
      jobRole: "",
      salaryPackage: "",
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setPlacements(
      placements.map((placement) =>
        placement.id === id ? { ...placement, status: newStatus } : placement
      )
    );
  };

  return (
    <div className="placements-page">
      <div className="page-header">
        <h2 className="page-title">Job Placements</h2>
        <p className="page-subtitle">Track student job placements and employment.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Placement Record</h3>
        <form onSubmit={handleSubmit} className="placements-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="placementStudentName" className="form-label">
                Student Name
              </label>
              <input
                type="text"
                id="placementStudentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobRole" className="form-label">
                Job Role
              </label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter job role"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salaryPackage" className="form-label">
                Salary Package (CTC)
              </label>
              <input
                type="number"
                id="salaryPackage"
                name="salaryPackage"
                value={formData.salaryPackage}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter CTC in ₹"
                min="0"
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Placement
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Placement Records</h3>
        <div className="table-wrapper">
          {placements.length === 0 ? (
            <div className="empty-state">No placement records yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Salary (₹)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement) => (
                  <tr key={placement.id}>
                    <td>{placement.studentName}</td>
                    <td>{placement.companyName}</td>
                    <td>{placement.jobRole}</td>
                    <td>{placement.salaryPackage.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          placement.status === "Active Job"
                            ? "badge-success"
                            : "badge-leave"
                        }`}
                      >
                        {placement.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="form-submit-btn"
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                        onClick={() =>
                          handleStatusChange(
                            placement.id,
                            placement.status === "Active Job"
                              ? "Completed"
                              : "Active Job"
                          )
                        }
                      >
                        {placement.status === "Active Job"
                          ? "Mark Completed"
                          : "Mark Active"}
                      </button>
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

