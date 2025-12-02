import { useState } from "react";

export default function Batches() {
  const [batches, setBatches] = useState([
    {
      id: 1,
      batchName: "MSCIT Batch 1",
      teacherName: "Rajesh Kumar",
      mode: "Online",
      date: "2024-01-20",
      time: "10:00 AM",
    },
    {
      id: 2,
      batchName: "Module Batch 2",
      teacherName: "Priya Sharma",
      mode: "Offline",
      date: "2024-01-21",
      time: "2:00 PM",
    },
  ]);

  const [formData, setFormData] = useState({
    batchName: "",
    teacherName: "",
    mode: "Online",
    date: "",
    time: "",
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

    const newBatch = {
      id: batches.length + 1,
      batchName: formData.batchName,
      teacherName: formData.teacherName,
      mode: formData.mode,
      date: formData.date,
      time: formData.time,
    };

    setBatches([newBatch, ...batches]);
    setFormData({
      batchName: "",
      teacherName: "",
      mode: "Online",
      date: "",
      time: "",
    });
  };

  return (
    <div className="batches-page">
      <div className="page-header">
        <h2 className="page-title">Batch Scheduling</h2>
        <p className="page-subtitle">Manage teacher batch schedules.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Batch Schedule</h3>
        <form onSubmit={handleSubmit} className="batches-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="batchName" className="form-label">
                Batch Name
              </label>
              <input
                type="text"
                id="batchName"
                name="batchName"
                value={formData.batchName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., MSCIT Batch 1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="teacherName" className="form-label">
                Teacher Name
              </label>
              <input
                type="text"
                id="teacherName"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="batchMode" className="form-label">
                Mode
              </label>
              <select
                id="batchMode"
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="batchDate" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="batchDate"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="batchTime" className="form-label">
                Time
              </label>
              <input
                type="time"
                id="batchTime"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Add Batch
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Batch Schedules</h3>
        <div className="table-wrapper">
          {batches.length === 0 ? (
            <div className="empty-state">No batch schedules yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Batch Name</th>
                  <th>Teacher</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id}>
                    <td>{batch.batchName}</td>
                    <td>{batch.teacherName}</td>
                    <td>{batch.mode}</td>
                    <td>{batch.date}</td>
                    <td>{batch.time}</td>
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

