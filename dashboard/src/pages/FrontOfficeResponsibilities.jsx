export default function FrontOfficeResponsibilities() {
  const responsibilities = [
    "आलेल्या इन्क्वायरीचे मनःपूर्वक स्वागत करणे व त्याला योग्य कोर्स निवडण्यास मार्गदर्शन करून प्रवेश देणे.",
    "शिक्षकांच्या मदतीने वेळेत fees कलेक्शन करणे.",
    "नोटीस बोर्ड मेंटेन करणे.",
    "सर्टिफिकेट वितरण करणे.",
    "टायपिंगच्या कोर्सचे लेक्चर घेणे.",
    "Duty time: 9.30am - 8.30 pm",
    "शिक्षकांच्या पेमेंटच्या हिशोब मा. संचालकांना देणे व सर्व हिशोब चोख ठेवणे.",
    "इन्स्टिट्यूटच्या कार्यात मदत करणे.",
  ];

  return (
    <div className="front-office-responsibilities-page">
      {/* Page Header */}
      <div className="responsibilities-header">
        <h2 className="responsibilities-title">
          फ्रंट ऑफिस एक्झिक्यूटिव्ह ची जबाबदारी
        </h2>
        <p className="responsibilities-subtitle">
          Daily duties and responsibilities for front office.
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

