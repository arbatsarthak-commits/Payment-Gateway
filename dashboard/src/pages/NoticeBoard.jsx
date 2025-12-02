import { useState } from "react";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Holiday Notice",
      description: "Institute will be closed on 26th January for Republic Day.",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "Exam Schedule",
      description: "Final exams will commence from 1st February 2024.",
      date: "2024-01-18",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
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

    const newNotice = {
      id: notices.length + 1,
      title: formData.title,
      description: formData.description,
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    setNotices([newNotice, ...notices]);
    setFormData({
      title: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="notice-board-page">
      <div className="page-header">
        <h2 className="page-title">Notice Board</h2>
        <p className="page-subtitle">Post and manage institute notices.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Notice</h3>
        <form onSubmit={handleSubmit} className="notice-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="noticeTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="noticeTitle"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter notice title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="noticeDate" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="noticeDate"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="noticeDescription" className="form-label">
              Description
            </label>
            <textarea
              id="noticeDescription"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter notice description"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Post Notice
          </button>
        </form>
      </div>

      <div className="notices-list">
        {notices.length === 0 ? (
          <div className="card">
            <div className="empty-state">No notices posted yet.</div>
          </div>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="card notice-card">
              <div className="notice-header">
                <h3 className="notice-title">{notice.title}</h3>
                <span className="notice-date">{notice.date}</span>
              </div>
              <p className="notice-description">{notice.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

