import { useState } from "react";

export default function Exams() {
  const [exams, setExams] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      course: "MSCIT",
      theoryLink: "https://forms.google.com/example1",
      practicalMarks: 85,
      finalMarks: 82,
    },
    {
      id: 2,
      studentName: "Priya Patel",
      course: "Module",
      theoryLink: "https://forms.google.com/example2",
      practicalMarks: 90,
      finalMarks: 88,
    },
  ]);

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    theoryLink: "",
    practicalMarks: "",
    finalMarks: "",
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

    const newExam = {
      id: exams.length + 1,
      studentName: formData.studentName,
      course: formData.course,
      theoryLink: formData.theoryLink,
      practicalMarks: parseFloat(formData.practicalMarks) || 0,
      finalMarks: formData.finalMarks ? parseFloat(formData.finalMarks) : null,
    };

    setExams([newExam, ...exams]);
    setFormData({
      studentName: "",
      course: "",
      theoryLink: "",
      practicalMarks: "",
      finalMarks: "",
    });
  };

  return (
    <div className="exams-page">
      <div className="page-header">
        <h2 className="page-title">Exams & Marks</h2>
        <p className="page-subtitle">Manage student exams and marks.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Exam Record</h3>
        <form onSubmit={handleSubmit} className="exams-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="examStudentName" className="form-label">
                Student Name
              </label>
              <input
                type="text"
                id="examStudentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="examCourse" className="form-label">
                Course
              </label>
              <input
                type="text"
                id="examCourse"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="theoryLink" className="form-label">
                Theory Exam Link (URL)
              </label>
              <input
                type="url"
                id="theoryLink"
                name="theoryLink"
                value={formData.theoryLink}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://forms.google.com/..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="practicalMarks" className="form-label">
                Practical Marks (0-100)
              </label>
              <input
                type="number"
                id="practicalMarks"
                name="practicalMarks"
                value={formData.practicalMarks}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter marks"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="finalMarks" className="form-label">
                Final Marks (Optional)
              </label>
              <input
                type="number"
                id="finalMarks"
                name="finalMarks"
                value={formData.finalMarks}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter final marks"
                min="0"
                max="100"
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Exam Record
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Exam Records</h3>
        <div className="table-wrapper">
          {exams.length === 0 ? (
            <div className="empty-state">No exam records yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Theory Link</th>
                  <th>Practical Marks</th>
                  <th>Final Marks</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.studentName}</td>
                    <td>{exam.course}</td>
                    <td>
                      <a
                        href={exam.theoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#60a5fa", textDecoration: "underline" }}
                      >
                        View Form
                      </a>
                    </td>
                    <td>{exam.practicalMarks}</td>
                    <td>{exam.finalMarks !== null ? exam.finalMarks : "-"}</td>
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

