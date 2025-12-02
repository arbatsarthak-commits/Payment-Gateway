<?php
// 1. Connect to database
$servername = "localhost";
$username   = "root";
$password   = ""; // default for XAMPP
$dbname     = "institute_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 2. Choose month & year
$month = 11;      // November
$year  = 2025;    // 2025

// 3. Fetch work entries for that month
$sql = "
    SELECT w.*, e.name 
    FROM work_entries w
    JOIN employees e ON w.employee_id = e.id
    WHERE w.month = $month AND w.year = $year
";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $employeeId = $row['employee_id'];
        $name       = $row['name'];

        $msCit      = $row['ms_cit_count'];
        $module     = $row['module_count'];
        $diploma    = $row['diploma_count'];
        $short149   = $row['short_149_count'];

        // 4. Apply rules
        $payMsCit   = $msCit    * 80;
        $payModule  = $module   * 90;
        $payDiploma = $diploma  * 400;
        $pay149     = $short149 * 74.5;

        $grossSalary = $payMsCit + $payModule + $payDiploma + $pay149;
        $netSalary   = $grossSalary; // future: deductions if any

        // 5. Save result in salaries table
        $stmt = $conn->prepare("
            INSERT INTO salaries (employee_id, month, year, gross_salary, net_salary, generated_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->bind_param("iiidd", $employeeId, $month, $year, $grossSalary, $netSalary);
        $stmt->execute();

        // 6. Show it on screen
        echo "Employee: <b>" . $name . "</b><br>";
        echo "MS-CIT: $msCit, Module: $module, Diploma: $diploma, 149-Courses: $short149<br>";
        echo "Gross Salary: <b>Rs. $grossSalary</b><br><br>";
    }

} else {
    echo "No work entries found for this month.";
}

$conn->close();
?>
