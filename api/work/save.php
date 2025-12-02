<?php
// save_work.php
include "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: add_work.php");
    exit;
}

$employee_id = $_POST['employee_id'] ?? null;
$month       = $_POST['month'] ?? null; // format: YYYY-MM from <input type="month">
$mscit       = (int)($_POST['mscit'] ?? 0);
$module      = (int)($_POST['module'] ?? 0);
$diploma     = (int)($_POST['diploma'] ?? 0);
$short149    = (int)($_POST['short149'] ?? 0);

if (!$employee_id || !$month) {
    die("Invalid data.");
}

$stmt = $conn->prepare("
    INSERT INTO employee_work (employee_id, month, mscit, module, diploma, short149)
    VALUES (?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("isiiii", $employee_id, $month, $mscit, $module, $diploma, $short149);

if ($stmt->execute()) {
    header("Location: work_list.php");
    exit;
}

echo "Error saving work: " . $conn->error;
?>


