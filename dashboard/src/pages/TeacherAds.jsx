import { useState } from "react";

export default function TeacherAds() {
  const [ads, setAds] = useState([
    {
      id: 1,
      teacherName: "Rajesh Kumar",
      description: "MSCIT course advertisement on Facebook",
      imageUrl: "https://via.placeholder.com/300x200?text=Ad+1",
    },
    {
      id: 2,
      teacherName: "Priya Sharma",
      description: "Module course poster shared on WhatsApp",
      imageUrl: "https://via.placeholder.com/300x200?text=Ad+2",
    },
  ]);

  const [formData, setFormData] = useState({
    teacherName: "",
    description: "",
    imageFile: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageUrl = formData.imagePreview || "https://via.placeholder.com/300x200";

    const newAd = {
      id: ads.length + 1,
      teacherName: formData.teacherName,
      description: formData.description,
      imageUrl: imageUrl,
    };

    setAds([newAd, ...ads]);
    setFormData({
      teacherName: "",
      description: "",
      imageFile: null,
      imagePreview: null,
    });
  };

  return (
    <div className="teacher-ads-page">
      <div className="page-header">
        <h2 className="page-title">Teacher Advertisement Upload</h2>
        <p className="page-subtitle">Upload proof of teacher marketing activities.</p>
      </div>

      <div className="card form-card">
        <h3 className="form-card-title">Upload Advertisement</h3>
        <form onSubmit={handleSubmit} className="teacher-ads-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="adTeacherName" className="form-label">
                Teacher Name
              </label>
              <input
                type="text"
                id="adTeacherName"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adDescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="adDescription"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter advertisement description"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="adImage" className="form-label">
              Upload Proof (Image)
            </label>
            <input
              type="file"
              id="adImage"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              style={{ padding: "0.5rem" }}
            />
            {formData.imagePreview && (
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "150px",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border-subtle)",
                  }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="form-submit-btn">
            Upload Advertisement
          </button>
        </form>
      </div>

      <div className="ads-grid">
        {ads.length === 0 ? (
          <div className="card">
            <div className="empty-state">No advertisements uploaded yet.</div>
          </div>
        ) : (
          ads.map((ad) => (
            <div key={ad.id} className="card ad-card">
              <div className="ad-image-container">
                <img src={ad.imageUrl} alt={ad.description} className="ad-image" />
              </div>
              <div className="ad-content">
                <h4 className="ad-teacher-name">{ad.teacherName}</h4>
                <p className="ad-description">{ad.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

