import { useState } from "react";

export default function IntroCourse149() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      marks: 92,
      discountPercent: 50,
      finalFee: 5000,
    },
    {
      id: 2,
      name: "Priya Patel",
      mobile: "9876543211",
      marks: 85,
      discountPercent: 40,
      finalFee: 6000,
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    mobileNumber: "",
    email: "",
    courseInterest: "",
    testMarks: "",
    mainCourseBaseFee: "",
  });

  const [calculationResult, setCalculationResult] = useState(null);

  const calculateDiscount = (marks) => {
    if (marks >= 95 && marks <= 100) return 60;
    if (marks >= 90 && marks <= 94) return 50;
    if (marks >= 80 && marks <= 89) return 40;
    if (marks >= 70 && marks <= 79) return 30;
    if (marks >= 50 && marks <= 69) return 20;
    return 10; // participant
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = () => {
    const marks = parseFloat(formData.testMarks);
    const baseFee = parseFloat(formData.mainCourseBaseFee);

    if (!marks || !baseFee || marks < 0 || marks > 100) {
      alert("Please enter valid test marks (0-100) and base fee.");
      return;
    }

    const discountPercent = calculateDiscount(marks);
    const discountAmount = baseFee * (discountPercent / 100);
    const finalFee = baseFee - discountAmount;
    const instituteShare = Math.round(149 * 0.5);
    const teacherShare = Math.round(149 * 0.5);

    setCalculationResult({
      discountPercent,
      discountAmount,
      finalFee,
      instituteShare,
      teacherShare,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!calculationResult) {
      alert("Please calculate discount first.");
      return;
    }

    const marks = parseFloat(formData.testMarks);
    const newStudent = {
      id: students.length + 1,
      name: formData.studentName,
      mobile: formData.mobileNumber,
      marks: marks,
      discountPercent: calculationResult.discountPercent,
      finalFee: calculationResult.finalFee,
    };

    setStudents([newStudent, ...students]);

    // Reset form
    setFormData({
      studentName: "",
      mobileNumber: "",
      email: "",
      courseInterest: "",
      testMarks: "",
      mainCourseBaseFee: "",
    });
    setCalculationResult(null);
  };

  return (
    <div className="intro-course-page">
      {/* Page Header */}
      <div className="course-header">
        <h2 className="course-title">₹149 Intro Course</h2>
        <p className="course-subtitle">
          Fast 3-day, 2 hours/day course with discounts for main course.
        </p>
      </div>

      {/* Form Card */}
      <div className="card course-form-card">
        <h3 className="form-card-title">Register Student</h3>
        <form onSubmit={handleSubmit} className="course-form">
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
              <label htmlFor="email" className="form-label">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="student@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseInterest" className="form-label">
                Course Interest
              </label>
              <input
                type="text"
                id="courseInterest"
                name="courseInterest"
                value={formData.courseInterest}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., MSCIT, Module"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="testMarks" className="form-label">
                Test Marks (%)
              </label>
              <input
                type="number"
                id="testMarks"
                name="testMarks"
                value={formData.testMarks}
                onChange={handleInputChange}
                className="form-input"
                placeholder="0-100"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mainCourseBaseFee" className="form-label">
                Main Course Base Fee (₹)
              </label>
              <input
                type="number"
                id="mainCourseBaseFee"
                name="mainCourseBaseFee"
                value={formData.mainCourseBaseFee}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter base fee"
                min="0"
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="form-submit-btn"
            style={{ marginRight: "0.5rem" }}
          >
            Calculate Discount
          </button>

          {calculationResult && (
            <div className="card calculation-summary">
              <h4 className="summary-title">Calculation Summary</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Discount %</span>
                  <span className="summary-value">
                    {calculationResult.discountPercent}%
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Discount Amount</span>
                  <span className="summary-value">
                    ₹{calculationResult.discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Final Fee</span>
                  <span className="summary-value">
                    ₹{calculationResult.finalFee.toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Institute Share (₹149)</span>
                  <span className="summary-value">₹{calculationResult.instituteShare}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Teacher Share (₹149)</span>
                  <span className="summary-value">₹{calculationResult.teacherShare}</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="form-submit-btn"
            disabled={!calculationResult}
            style={{ marginTop: "1rem" }}
          >
            Register Student
          </button>
        </form>
      </div>

      {/* Students Table Card */}
      <div className="card course-table-card">
        <h3 className="form-card-title">Registered Students</h3>
        <div className="table-wrapper">
          {students.length === 0 ? (
            <div className="empty-state">No students registered yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Marks</th>
                  <th>Discount %</th>
                  <th>Final Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.mobile}</td>
                    <td>{student.marks}%</td>
                    <td>{student.discountPercent}%</td>
                    <td>₹{student.finalFee.toFixed(2)}</td>
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

