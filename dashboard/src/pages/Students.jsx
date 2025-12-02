import { useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      course: "MSCIT",
      fees: 10000,
      discount: 1000,
      finalFee: 9000,
    },
    {
      id: 2,
      name: "Priya Patel",
      mobile: "9876543211",
      course: "Module",
      fees: 12000,
      discount: 0,
      finalFee: 12000,
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    mobileNumber: "",
    courseName: "",
    fees: "",
    discount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateFinalFee = () => {
    const fees = parseFloat(formData.fees) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return Math.max(0, fees - discount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFee = calculateFinalFee();

    const newStudent = {
      id: students.length + 1,
      name: formData.studentName,
      mobile: formData.mobileNumber,
      course: formData.courseName,
      fees: parseFloat(formData.fees) || 0,
      discount: parseFloat(formData.discount) || 0,
      finalFee: finalFee,
    };

    setStudents([newStudent, ...students]);
    setFormData({
      studentName: "",
      mobileNumber: "",
      courseName: "",
      fees: "",
      discount: "",
    });
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <h2 className="page-title">Students</h2>
        <p className="page-subtitle">Manage student admissions and records.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Student Admission</h3>
        <form onSubmit={handleSubmit} className="students-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="studentName" className="form-label">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., MSCIT, Module"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fees" className="form-label">
                Fees (₹)
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter fees"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount" className="form-label">
                Discount (₹) - Optional
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter discount"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Final Fee (₹)</label>
              <div className="form-input" style={{ background: "rgba(15, 23, 42, 0.8)" }}>
                {calculateFinalFee().toLocaleString()}
              </div>
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Student
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Student List</h3>
        <div className="table-wrapper">
          {students.length === 0 ? (
            <div className="empty-state">No students registered yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Course</th>
                  <th>Fees (₹)</th>
                  <th>Final Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.mobile}</td>
                    <td>{student.course}</td>
                    <td>{student.fees.toLocaleString()}</td>
                    <td>{student.finalFee.toLocaleString()}</td>
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

