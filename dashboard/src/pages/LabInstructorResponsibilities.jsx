export default function LabInstructorResponsibilities() {
  const responsibilities = [
    "विद्यार्थ्यांना त्यांना आवश्यक असलेले सॉफ्टवेअर व उत्तम स्पीडच्या कम्प्युटरची उपलब्धता करून देणे.",
    "विद्यार्थ्यांना प्रॅक्टिकल मध्ये येणाऱ्या अडचणी करता मदत करणे.",
    "टायपिंगच्या विद्यार्थ्यांना लेसन देणे.",
    "Duty time: 9.30am - 8.30 pm",
    "इन्स्टिट्यूटच्या कार्यात मदत करणे.",
  ];

  return (
    <div className="lab-instructor-responsibilities-page">
      {/* Page Header */}
      <div className="responsibilities-header">
        <h2 className="responsibilities-title">
          लॅब इन्स्ट्रक्टरची जबाबदारी
        </h2>
        <p className="responsibilities-subtitle">
          Computer lab support and student assistance.
        </p>
      </div>

      {/* Responsibilities Card */}
      <div className="card responsibilities-card">
        <ol className="responsibilities-list">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="responsibility-item">
              {responsibility}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

