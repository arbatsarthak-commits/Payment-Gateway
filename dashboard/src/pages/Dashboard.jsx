import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const quotes = [
    "शिकणं थांबवलं की वाढणं थांबतं.",
    "मेहनत म्हणजे यशाची पूजा आहे.",
    "आजचा प्रयत्न उद्याचं यश ठरवतो.",
    "तुम्ही स्वतःवर विश्वास ठेवा, बाकी सर्व घडतं.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const [stats, setStats] = useState({
    total_employees: 0,
    active_batches: 0,
    salary_payout: 0,
    pending_work: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost/super-institute/Payment-Gateway-upload-repo-main/api/dashboard_stats.php");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  return (
    <div className="dashboard">
      {/* Banner */}
      <img src="/banner.png" alt="MSCIT Banner" className="msc-banner" onError={(e) => {
        e.target.style.display = 'none';
      }} />

      {/* Welcome Section */}
      <section className="dashboard-welcome">
        <h2 className="dashboard-welcome-title">
          Welcome to Super Computer Institute
        </h2>
        <p className="dashboard-welcome-subtitle">
          Manage employees, work entries, and salary data all in one place.
        </p>
      </section>

      {/* Motivational Quotes Card */}
      <div className="card quote-card">
        <h3 className="quote-card-title">💡 Daily Motivation</h3>
        <p className="quote-text" key={currentQuoteIndex}>
          {quotes[currentQuoteIndex]}
        </p>
      </div>

      {/* Summary Cards Grid */}
      <section className="dashboard-cards">
        <SummaryCard
          icon="👨‍🏫"
          label="Total Employees"
          value={stats.total_employees}
          description="Active staff members"
        />
        <SummaryCard
          icon="💼"
          label="Active Batches Today"
          value={stats.active_batches}
          description="Currently running"
        />
        <SummaryCard
          icon="💰"
          label="This Month Salary Payout"
          value={`₹ ${stats.salary_payout.toLocaleString()}`}
          description="Total disbursed"
        />
        <SummaryCard
          icon="📋"
          label="Work Entries (This Month)"
          value={stats.pending_work}
          description="Total entries logged"
        />
      </section>

      {/* Quick Links Section */}
      <section className="dashboard-quick-links">
        <h3 className="quick-links-title">Quick Links</h3>
        <div className="quick-links-buttons">
          <Link to="/employees" className="quick-link-button">
            Employees
          </Link>
          <Link to="/work-entry" className="quick-link-button">
            Work Entry
          </Link>
          <Link to="/salary-report" className="quick-link-button">
            Salary Report
          </Link>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ icon, label, value, description }) {
  return (
    <div className="summary-card">
      <div className="summary-card-icon">{icon}</div>
      <div className="summary-card-content">
        <div className="summary-card-label">{label}</div>
        <div className="summary-card-value">{value}</div>
        <div className="summary-card-description">{description}</div>
      </div>
    </div>
  );
}

