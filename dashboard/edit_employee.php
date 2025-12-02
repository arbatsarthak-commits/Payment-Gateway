<?php
// edit_employee.php
include "db_connect.php";

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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    die("Invalid employee ID.");
}

$message = "";

// Fetch existing employee
$stmt = $conn->prepare("SELECT * FROM employees WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$employee = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$employee) {
    die("Employee not found.");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name   = trim($_POST['name']);
    $role   = trim($_POST['role']);
    $mobile = trim($_POST['mobile']);
    $upi_id = trim($_POST['upi_id']);

    $qrPath = $employee['qr_code_path'];
    $profilePath = $employee['profile_photo_path'];

    // New QR code upload (optional)
    if (!empty($_FILES['qr_code']['name'])) {
        $qrFileName = time() . "_qr_" . basename($_FILES['qr_code']['name']);
        $qrTarget   = "uploads/qrcodes/" . $qrFileName;
        if (move_uploaded_file($_FILES['qr_code']['tmp_name'], $qrTarget)) {
            $qrPath = $qrTarget;
        }
    }

    // New profile photo upload (optional)
    if (!empty($_FILES['profile_photo']['name'])) {
        $profileFileName = time() . "_profile_" . basename($_FILES['profile_photo']['name']);
        $profileTarget   = "uploads/profiles/" . $profileFileName;
        if (move_uploaded_file($_FILES['profile_photo']['tmp_name'], $profileTarget)) {
            $profilePath = $profileTarget;
        }
    }

    $updateStmt = $conn->prepare("
        UPDATE employees
        SET name = ?, role = ?, mobile = ?, upi_id = ?, qr_code_path = ?, profile_photo_path = ?
        WHERE id = ?
    ");
    $updateStmt->bind_param(
        "ssssssi",
        $name,
        $role,
        $mobile,
        $upi_id,
        $qrPath,
        $profilePath,
        $id
    );

    if ($updateStmt->execute()) {
        $message = "Employee updated successfully!";
        // Refresh employee data
        $employee['name'] = $name;
        $employee['role'] = $role;
        $employee['mobile'] = $mobile;
        $employee['upi_id'] = $upi_id;
        $employee['qr_code_path'] = $qrPath;
        $employee['profile_photo_path'] = $profilePath;
    } else {
        $message = "Error: " . $conn->error;
    }

    $updateStmt->close();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Employee</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Edit Employee</h1>
        <p class="sub-title">Update employee details, UPI & QR code.</p>

        <?php if ($message): ?>
            <p><b><?php echo htmlspecialchars($message); ?></b></p>
        <?php endif; ?>

        <form method="post" enctype="multipart/form-data">
            <p>
                <label>
                    Employee Name<br>
                    <input type="text" name="name" required
                           value="<?php echo htmlspecialchars($employee['name']); ?>">
                </label>
            </p>

            <p>
                <label>
                    Role<br>
                    <input type="text" name="role" required
                           value="<?php echo htmlspecialchars($employee['role']); ?>">
                </label>
            </p>

            <p>
                <label>
                    Mobile<br>
                    <input type="text" name="mobile"
                           value="<?php echo htmlspecialchars($employee['mobile']); ?>">
                </label>
            </p>

            <p>
                <label>
                    UPI ID<br>
                    <input type="text" name="upi_id"
                           value="<?php echo htmlspecialchars($employee['upi_id'] ?? ''); ?>">
                </label>
            </p>

            <p>
                <label>
                    Current QR Code<br>
                    <?php if (!empty($employee['qr_code_path'])): ?>
                        <img src="<?php echo htmlspecialchars($employee['qr_code_path']); ?>" alt="QR" style="height:80px;">
                    <?php else: ?>
                        <span style="font-size:12px;color:#777;">No QR uploaded</span>
                    <?php endif; ?>
                </label>
            </p>

            <p>
                <label>
                    Upload New QR Code (optional)<br>
                    <input type="file" name="qr_code" accept="image/*">
                </label>
            </p>

            <p>
                <label>
                    Current Profile Photo<br>
                    <?php if (!empty($employee['profile_photo_path'])): ?>
                        <img src="<?php echo htmlspecialchars($employee['profile_photo_path']); ?>" alt="Profile" style="height:80px;border-radius:50%;">
                    <?php else: ?>
                        <span style="font-size:12px;color:#777;">No photo uploaded</span>
                    <?php endif; ?>
                </label>
            </p>

            <p>
                <label>
                    Upload New Profile Photo (optional)<br>
                    <input type="file" name="profile_photo" accept="image/*">
                </label>
            </p>

            <button type="submit" class="btn">Update Employee</button>
            <a href="employees_list.php" class="link-btn">Back to List</a>
        </form>
    </div>
</body>
</html>


