<?php
include 'db.php';

// Add status and paid_at columns to salaries table if they don't exist
$sql = "SHOW COLUMNS FROM `salaries` LIKE 'status'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $alterSql = "ALTER TABLE `salaries` 
                 ADD COLUMN `status` ENUM('Pending', 'Paid') NOT NULL DEFAULT 'Pending',
                 ADD COLUMN `paid_at` DATETIME NULL";
    
    if ($conn->query($alterSql) === TRUE) {
        echo json_encode(["message" => "Database updated successfully: Added status and paid_at to salaries table."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error updating database: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Database already up to date."]);
}

$conn->close();
?>
