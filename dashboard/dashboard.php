<?php
// dashboard.php
include "db_connect.php";

// Total employees
$empSql = "SELECT COUNT(*) AS total_emp FROM employees";
$empRes = $conn->query($empSql);
$empRow = $empRes ? $empRes->fetch_assoc() : ['total_emp' => 0];
$totalEmp = $empRow['total_emp'] ?? 0;

// Total work entries
$workSql = "SELECT COUNT(*) AS total_work FROM employee_work";
$workRes = $conn->query($workSql);
$workRow = $workRes ? $workRes->fetch_assoc() : ['total_work' => 0];
$totalWork = $workRow['total_work'] ?? 0;
?>
<!DOCTYPE html>
<html>
<head>
    <title>Super Institute – Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Super Institute – Admin Dashboard</h1>
        <p class="sub-title">Employees, Work Entries & Salary Management</p>

        <div class="cards">
            <div class="card">
                <h2>Total Employees</h2>
                <p class="number"><?php echo (int)$totalEmp; ?></p>
                <a href="employees_list.php" class="btn">View Employees</a>
            </div>

            <div class="card">
                <h2>Total Work Entries</h2>
                <p class="number"><?php echo (int)$totalWork; ?></p>
                <a href="work_list.php" class="btn">View Work</a>
            </div>
        </div>

        <div class="links">
            <a href="add_employee.php" class="link-btn">➕ Add Employee</a>
            <a href="add_work.php" class="link-btn">📝 Add Work</a>
            <a href="generate_salary.php" class="link-btn">🧮 Salary Generator</a>
            <a href="salary_report.php" class="link-btn">📊 Salary Report</a>
            <a href="salary_payments.php" class="link-btn">💸 Salary Payments</a>
        </div>
    </div>
</body>
</html>
