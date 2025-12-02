import { Routes, Route, useLocation, Link } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import WorkEntry from "./pages/WorkEntry";
import WorkReport from "./pages/WorkReport";
import Attendance from "./pages/Attendance";
import SalaryReport from "./pages/SalaryReport";
import PaymentHistory from "./pages/PaymentHistory";
import IntroCourse149 from "./pages/IntroCourse149";
import Students from "./pages/Students";
import Certificates from "./pages/Certificates";
import NoticeBoard from "./pages/NoticeBoard";
import Exams from "./pages/Exams";
import Batches from "./pages/Batches";
import Events from "./pages/Events";
import Placements from "./pages/Placements";
import TeacherAds from "./pages/TeacherAds";
import TeacherResponsibilities from "./pages/TeacherResponsibilities";
import FrontOfficeResponsibilities from "./pages/FrontOfficeResponsibilities";
import LabInstructorResponsibilities from "./pages/LabInstructorResponsibilities";

export default function App() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path === "/employees") return "Employees Management";
    if (path === "/work-entry") return "Work Entry";
    if (path === "/attendance") return "Attendance";
    if (path === "/salary-report") return "Salary Report";
    if (path === "/payment-history") return "Payment History";
    if (path === "/course-149") return "₹149 Course";
    if (path === "/students") return "Students";
    if (path === "/certificates") return "Certificates";
    if (path === "/notices") return "Notice Board";
    if (path === "/exams") return "Exams & Marks";
    if (path === "/batches") return "Batch Scheduling";
    if (path === "/events") return "Events";
    if (path === "/placements") return "Placements";
    if (path === "/teacher-ads") return "Teacher Ads";
    if (path === "/teacher-responsibilities") return "Teacher Rules";
    if (path === "/front-office-rules") return "Front Office Rules";
    if (path === "/lab-rules") return "Lab Rules";
    return "Dashboard";
  };

  const getPageSubtitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") {
      return "Overview of your institute management system.";
    }
    return "Manage employees, daily work entries & salary data in one place.";
  };

  return (
    <>
      {/* Floating MSCIT Logo */}
      <div className="floating-logo mscit-logo">
        <img src="/mscit.png" alt="MSCIT" />
      </div>

      {/* Floating Tally Logo */}
      <div className="floating-logo tally-logo">
        <img src="/tally.png" alt="Tally" />
      </div>

      <div className="app-shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link to="/dashboard" className="brand-link">
            <div className="brand">
              <span className="brand-logo">SI</span>
              <div>
                <div className="brand-title">Super Institute</div>
                <div className="brand-subtitle">Admin Dashboard</div>
              </div>
            </div>
          </Link>

          <nav className="menu">
            <MenuItem
              label="Dashboard"
              to="/dashboard"
              active={location.pathname === "/" || location.pathname === "/dashboard"}
            />
            <MenuItem
              label="Employees"
              to="/employees"
              active={location.pathname === "/employees"}
            />
            <MenuItem
              label="Work Entry"
              to="/work-entry"
              active={location.pathname === "/work-entry"}
            />
            <MenuItem
              label="Work Report"
              to="/work-report"
              active={location.pathname === "/work-report"}
            />
            <MenuItem
              label="Attendance"
              to="/attendance"
              active={location.pathname === "/attendance"}
            />
            <MenuItem
              label="Salary Report"
              to="/salary-report"
              active={location.pathname === "/salary-report"}
            />
            <MenuItem
              label="Payment History"
              to="/payment-history"
              active={location.pathname === "/payment-history"}
            />
            <MenuItem
              label="₹149 Course"
              to="/course-149"
              active={location.pathname === "/course-149"}
            />

            <div className="menu-section-divider"></div>
            <div className="menu-section-title">Institute</div>

            <MenuItem
              label="Students"
              to="/students"
              active={location.pathname === "/students"}
            />
            <MenuItem
              label="Certificates"
              to="/certificates"
              active={location.pathname === "/certificates"}
            />
            <MenuItem
              label="Notice Board"
              to="/notices"
              active={location.pathname === "/notices"}
            />
            <MenuItem
              label="Exams & Marks"
              to="/exams"
              active={location.pathname === "/exams"}
            />
            <MenuItem
              label="Batch Scheduling"
              to="/batches"
              active={location.pathname === "/batches"}
            />
            <MenuItem
              label="Events"
              to="/events"
              active={location.pathname === "/events"}
            />
            <MenuItem
              label="Placements"
              to="/placements"
              active={location.pathname === "/placements"}
            />
            <MenuItem
              label="Teacher Ads"
              to="/teacher-ads"
              active={location.pathname === "/teacher-ads"}
            />

            <div className="menu-section-divider"></div>

            <MenuItem
              label="Teacher Rules"
              to="/teacher-responsibilities"
              active={location.pathname === "/teacher-responsibilities"}
            />
            <MenuItem
              label="Front Office Rules"
              to="/front-office-rules"
              active={location.pathname === "/front-office-rules"}
            />
            <MenuItem
              label="Lab Rules"
              to="/lab-rules"
              active={location.pathname === "/lab-rules"}
            />
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="user-avatar">T</div>
              <div>
                <div className="user-name">Mr. B Tanmay</div>
                <div className="user-role">Frontend / UI</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="main">
          <header className="topbar">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-subtitle">{getPageSubtitle()}</p>
          </header>

          <section className="content-card">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/work-entry" element={<WorkEntry />} />
              <Route path="/work-report" element={<WorkReport />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/salary-report" element={<SalaryReport />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              <Route path="/course-149" element={<IntroCourse149 />} />
              <Route path="/students" element={<Students />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/notices" element={<NoticeBoard />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/events" element={<Events />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/teacher-ads" element={<TeacherAds />} />
              <Route
                path="/teacher-responsibilities"
                element={<TeacherResponsibilities />}
              />
              <Route
                path="/front-office-rules"
                element={<FrontOfficeResponsibilities />}
              />
              <Route
                path="/lab-rules"
                element={<LabInstructorResponsibilities />}
              />
            </Routes>
          </section>
        </main>
      </div>
    </>
  );
}

function MenuItem({ label, to, active }) {
  return (
    <Link
      to={to}
      className={"menu-item " + (active ? "menu-item-active" : "")}
    >
      {label}
    </Link>
  );
}

/* Placeholder pages – real UI comes next (Part 2,3,4) */
