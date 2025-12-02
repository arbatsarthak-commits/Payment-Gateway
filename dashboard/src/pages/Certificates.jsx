import { useState } from "react";

export default function Certificates() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      course: "MSCIT",
      examCompleted: "Yes",
      certificateIssued: true,
      status: "Delivered",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      course: "Module",
      examCompleted: "Yes",
      certificateIssued: true,
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    examCompleted: "No",
    certificateIssued: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCertificate = {
      id: certificates.length + 1,
      studentName: formData.studentName,
      course: formData.course,
      examCompleted: formData.examCompleted,
      certificateIssued: formData.certificateIssued,
      status: formData.certificateIssued ? "Pending" : "Pending",
    };

    setCertificates([newCertificate, ...certificates]);
    setFormData({
      studentName: "",
      course: "",
      examCompleted: "No",
      certificateIssued: false,
    });
  };

  const handleMarkDelivered = (id) => {
    setCertificates(
      certificates.map((cert) =>
        cert.id === id ? { ...cert, status: "Delivered" } : cert
      )
    );
  };

  return (
    <div className="certificates-page">
      <div className="page-header">
        <h2 className="page-title">Certificate Distribution</h2>
        <p className="page-subtitle">Manage student certificates and delivery status.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Certificate Record</h3>
        <form onSubmit={handleSubmit} className="certificates-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="certStudentName" className="form-label">
                Student Name
              </label>
              <input
                type="text"
                id="certStudentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="certCourse" className="form-label">
                Course
              </label>
              <input
                type="text"
                id="certCourse"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="examCompleted" className="form-label">
                Exam Completed
              </label>
              <select
                id="examCompleted"
                name="examCompleted"
                value={formData.examCompleted}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Certificate Issued</label>
              <div style={{ paddingTop: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="certificateIssued"
                    checked={formData.certificateIssued}
                    onChange={handleInputChange}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <span style={{ color: "var(--text-main)" }}>Certificate Issued</span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Record
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Certificate Records</h3>
        <div className="table-wrapper">
          {certificates.length === 0 ? (
            <div className="empty-state">No certificate records yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Exam</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>{cert.studentName}</td>
                    <td>{cert.course}</td>
                    <td>{cert.examCompleted}</td>
                    <td>
                      <span
                        className={`badge ${
                          cert.status === "Delivered"
                            ? "badge-success"
                            : "badge-leave"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </td>
                    <td>
                      {cert.status === "Pending" && (
                        <button
                          className="form-submit-btn"
                          style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                          onClick={() => handleMarkDelivered(cert.id)}
                        >
                          Mark Delivered
                        </button>
                      )}
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

