<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $monthStr = isset($_GET['month']) ? $_GET['month'] : ''; // "2025-11"
    
    if (empty($monthStr)) {
        http_response_code(400);
        echo json_encode(["error" => "Month parameter is required (YYYY-MM)."]);
        exit;
    }

    if (!preg_match('/^\d{4}-\d{2}$/', $monthStr)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid month format. Use YYYY-MM."]);
        exit;
    }

    $parts = explode('-', $monthStr);
    $year = intval($parts[0]);
    $month = intval($parts[1]);

    $sql = "
        SELECT w.*, e.name, e.role, e.upi_id
        FROM work_entries w
        JOIN employees e ON w.employee_id = e.id
        WHERE w.month = $month AND w.year = $year
    ";

    $result = $conn->query($sql);
    $salaries = [];

    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $msCit = intval($row['ms_cit_count']);
            $module = intval($row['module_count']);
            $diploma = intval($row['diploma_count']);
            $short149 = intval($row['short_149_count']);

            // Calculation Rules
            $payMsCit   = $msCit    * 80;
            $payModule  = $module   * 90;
            $payDiploma = $diploma  * 400;
            $pay149     = $short149 * 74.5;

            $grossSalary = $payMsCit + $payModule + $payDiploma + $pay149;
            
            $row['gross_salary'] = $grossSalary;
            $row['net_salary'] = $grossSalary; // No deductions yet
            
            $salaries[] = $row;
        }
    }
    
    echo json_encode($salaries);
}
$conn->close();
?>
