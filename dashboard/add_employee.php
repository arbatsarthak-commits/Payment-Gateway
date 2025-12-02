<?php
// add_employee.php
include "db_connect.php";

$message = "";

// Ensure upload directories exist
if (!is_dir('uploads')) {
    mkdir('uploads', 0777, true);
}
if (!is_dir('uploads/qrcodes')) {
    mkdir('uploads/qrcodes', 0777, true);
}
if (!is_dir('uploads/profiles')) {
    mkdir('uploads/profiles', 0777, true);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name   = trim($_POST['name']);
    $role   = trim($_POST['role']);
    $mobile = trim($_POST['mobile']);
    $upi_id = trim($_POST['upi_id']);

    $qrPath = null;
    $profilePath = null;

    // Handle QR code upload
    if (!empty($_FILES['qr_code']['name'])) {
        $qrFileName = time() . "_qr_" . basename($_FILES['qr_code']['name']);
        $qrTarget   = "uploads/qrcodes/" . $qrFileName;
        if (move_uploaded_file($_FILES['qr_code']['tmp_name'], $qrTarget)) {
            $qrPath = $qrTarget;
        }
    }

    // Handle profile photo upload
    if (!empty($_FILES['profile_photo']['name'])) {
        $profileFileName = time() . "_profile_" . basename($_FILES['profile_photo']['name']);
        $profileTarget   = "uploads/profiles/" . $profileFileName;
        if (move_uploaded_file($_FILES['profile_photo']['tmp_name'], $profileTarget)) {
            $profilePath = $profileTarget;
        }
    }

    // NOTE: Ensure employees table has columns: upi_id, qr_code_path, profile_photo_path
    $stmt = $conn->prepare("
        INSERT INTO employees (name, role, mobile, upi_id, qr_code_path, profile_photo_path)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param(
        "ssssss",
        $name,
        $role,
        $mobile,
        $upi_id,
        $qrPath,
        $profilePath
    );

    if ($stmt->execute()) {
        $message = "Employee added successfully!";
    } else {
        $message = "Error: " . $conn->error;
    }

    $stmt->close();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Employee</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Add Employee</h1>
        <p class="sub-title">Create employee with UPI & QR code details.</p>

        <?php if ($message): ?>
            <p><b><?php echo htmlspecialchars($message); ?></b></p>
        <?php endif; ?>

        <form method="post" enctype="multipart/form-data">
            <p>
                <label>
                    Employee Name<br>
                    <input type="text" name="name" required>
                </label>
            </p>

            <p>
                <label>
                    Role<br>
                    <input type="text" name="role" required>
                </label>
            </p>

            <p>
                <label>
                    Mobile<br>
                    <input type="text" name="mobile">
                </label>
            </p>

            <p>
                <label>
                    UPI ID<br>
                    <input type="text" name="upi_id" placeholder="eg. name@upi">
                </label>
            </p>

            <p>
                <label>
                    Upload QR Code Image<br>
                    <input type="file" name="qr_code" accept="image/*">
                </label>
            </p>

            <p>
                <label>
                    Profile Photo (optional)<br>
                    <input type="file" name="profile_photo" accept="image/*">
                </label>
            </p>

            <button type="submit" class="btn">Save Employee</button>
            <a href="employees_list.php" class="link-btn">Cancel</a>
        </form>
    </div>
</body>
</html>
