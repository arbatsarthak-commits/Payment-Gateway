import { useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: "Annual Day Celebration",
      date: "2024-02-15",
      description: "Annual day celebration with cultural programs and awards.",
    },
    {
      id: 2,
      eventName: "Workshop on Web Development",
      date: "2024-01-25",
      description: "Free workshop for all students on modern web development.",
    },
  ]);

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    description: "",
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

    const newEvent = {
      id: events.length + 1,
      eventName: formData.eventName,
      date: formData.date,
      description: formData.description,
    };

    setEvents([newEvent, ...events]);
    setFormData({
      eventName: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="events-page">
      <div className="page-header">
        <h2 className="page-title">Events</h2>
        <p className="page-subtitle">Manage institute events and activities.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Add Event</h3>
        <form onSubmit={handleSubmit} className="events-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="eventName" className="form-label">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription" className="form-label">
              Description
            </label>
            <textarea
              id="eventDescription"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter event description"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Add Event
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h3 className="form-card-title">Events List</h3>
        <div className="table-wrapper">
          {events.length === 0 ? (
            <div className="empty-state">No events scheduled yet.</div>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.eventName}</td>
                    <td>{event.date}</td>
                    <td>{event.description}</td>
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

