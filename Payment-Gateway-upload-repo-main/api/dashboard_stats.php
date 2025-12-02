<?php
include 'db.php';

// Initialize response array
$stats = [
    "total_employees" => 0,
    "active_batches" => 0, // Placeholder as we don't have batches table yet
    "salary_payout" => 0,
    "pending_work" => 0 // Placeholder or logic to count pending
];

// 1. Total Employees
$sql = "SELECT COUNT(*) as count FROM employees";
$result = $conn->query($sql);
if ($row = $result->fetch_assoc()) {
    $stats['total_employees'] = intval($row['count']);
}

// 2. This Month Salary Payout (Sum of Net Salary for current month)
$currentMonth = date('m');
$currentYear = date('Y');
$sql = "SELECT SUM(net_salary) as total FROM salaries WHERE month = $currentMonth AND year = $currentYear";
$result = $conn->query($sql);
if ($row = $result->fetch_assoc()) {
    $stats['salary_payout'] = floatval($row['total']);
}

// 3. Pending Work Entries (Just a count of work entries for now, or maybe unapproved ones if we had approval)
// For now, let's just count total work entries for this month as a proxy for activity
$sql = "SELECT COUNT(*) as count FROM work_entries WHERE month = $currentMonth AND year = $currentYear";
$result = $conn->query($sql);
if ($row = $result->fetch_assoc()) {
    $stats['pending_work'] = intval($row['count']);
}

// 4. Active Batches (Mock for now as we don't have batches table)
$stats['active_batches'] = 5; 

echo json_encode($stats);
?>
