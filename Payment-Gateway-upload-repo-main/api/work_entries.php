<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // 1. Validate Inputs
    $errors = [];

    if (!isset($data['employee_id']) || !is_numeric($data['employee_id'])) {
        $errors[] = "Valid Employee ID is required.";
    }
    
    if (empty($data['month'])) {
        $errors[] = "Month is required.";
    } else {
        // Validate YYYY-MM format
        if (!preg_match('/^\d{4}-\d{2}$/', $data['month'])) {
            $errors[] = "Invalid month format. Use YYYY-MM.";
        }
    }

    // Validate Counts (Must be non-negative integers)
    $mscit = isset($data['mscit']) ? intval($data['mscit']) : 0;
    $module = isset($data['module']) ? intval($data['module']) : 0;
    $diploma = isset($data['diploma']) ? intval($data['diploma']) : 0;
    $short149 = isset($data['short149']) ? intval($data['short149']) : 0;

    if ($mscit < 0 || $module < 0 || $diploma < 0 || $short149 < 0) {
        $errors[] = "Counts cannot be negative.";
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["error" => implode(" ", $errors)]);
        exit();
    }
    
    $employee_id = intval($data['employee_id']);
    $month = $data['month']; // Format: "2025-11"
    
    // Split YYYY-MM
    $parts = explode('-', $month);
    $yearVal = intval($parts[0]);
    $monthVal = intval($parts[1]);

    // Check if employee exists
    $empCheck = $conn->prepare("SELECT id FROM employees WHERE id = ?");
    $empCheck->bind_param("i", $employee_id);
    $empCheck->execute();
    $empCheck->store_result();
    if ($empCheck->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "Employee not found."]);
        exit();
    }
    $empCheck->close();

    $stmt = $conn->prepare("INSERT INTO work_entries (employee_id, month, year, ms_cit_count, module_count, diploma_count, short_149_count) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iiiiiii", $employee_id, $monthVal, $yearVal, $mscit, $module, $diploma, $short149);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Work entry saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
    $stmt->close();
}
$conn->close();
?>
