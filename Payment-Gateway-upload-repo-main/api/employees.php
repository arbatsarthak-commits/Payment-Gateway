<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT * FROM employees ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $employees = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $employees[] = $row;
        }
    }
    echo json_encode($employees);
}

elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // 1. Sanitize inputs
    $name = isset($data['name']) ? trim(htmlspecialchars($data['name'])) : '';
    $role = isset($data['role']) ? trim(htmlspecialchars($data['role'])) : '';
    $mobile = isset($data['mobile']) ? trim(htmlspecialchars($data['mobile'])) : '';
    $upi_id = isset($data['upi_id']) ? trim(htmlspecialchars($data['upi_id'])) : '';

    // 2. Strict Validation
    $errors = [];

    if (empty($name)) {
        $errors[] = "Name is required.";
    }
    if (empty($role)) {
        $errors[] = "Role is required.";
    }
    
    // Validate Mobile (must be 10 digits if provided)
    if (!empty($mobile)) {
        if (!preg_match('/^[0-9]{10}$/', $mobile)) {
            $errors[] = "Mobile number must be exactly 10 digits.";
        }
    }

    // Validate UPI ID (simple format check)
    if (!empty($upi_id)) {
        if (!preg_match('/^[\w\.\-]+@[\w\-]+$/', $upi_id)) {
            $errors[] = "Invalid UPI ID format.";
        }
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["error" => implode(" ", $errors)]);
        exit();
    }
    
    // Check for duplicate UPI ID if provided
    if (!empty($upi_id)) {
        $checkStmt = $conn->prepare("SELECT id FROM employees WHERE upi_id = ?");
        $checkStmt->bind_param("s", $upi_id);
        $checkStmt->execute();
        $checkStmt->store_result();
        if ($checkStmt->num_rows > 0) {
            http_response_code(409); // Conflict
            echo json_encode(["error" => "UPI ID already exists."]);
            exit();
        }
        $checkStmt->close();
    }

    $stmt = $conn->prepare("INSERT INTO employees (name, role, mobile, upi_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $role, $mobile, $upi_id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Employee added successfully", "id" => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
    $stmt->close();
}

elseif ($method === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        
        if ($id <= 0) {
             http_response_code(400);
             echo json_encode(["error" => "Invalid ID."]);
             exit();
        }

        $stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["message" => "Employee deleted successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Employee not found."]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error deleting employee"]);
        }
        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID required"]);
    }
}

$conn->close();
?>
