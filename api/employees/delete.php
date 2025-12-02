<?php
// delete_employee.php
include "../config/db.php";

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header("Location: employees_list.php");
    exit;
}

// Optionally, you can also delete related work entries if needed:
// $delWork = $conn->prepare("DELETE FROM employee_work WHERE employee_id = ?");
// $delWork->bind_param("i", $id);
// $delWork->execute();

$stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

header("Location: employees_list.php");
exit;
?>


