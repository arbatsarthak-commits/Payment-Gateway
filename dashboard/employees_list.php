<?php
// employees_list.php
include "db_connect.php";

$sql = "SELECT * FROM employees ORDER BY id DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Employees List</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Employees</h1>
        <p class="sub-title">Manage employee profiles, UPI and QR codes.</p>

        <p>
            <a href="add_employee.php" class="link-btn">➕ Add New Employee</a>
            <a href="dashboard.php" class="link-btn">⬅ Back to Dashboard</a>
        </p>

        <div class="cards">
            <div class="card" style="flex: 1 1 100%;">
                <div style="overflow-x:auto;">
                    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
                        <tr style="background:#e8eaf6;">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Mobile</th>
                            <th>UPI ID</th>
                            <th>QR Code</th>
                            <th>Actions</th>
                        </tr>

                        <?php if ($result && $result->num_rows > 0): ?>
                            <?php while ($row = $result->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($row['id']); ?></td>
                                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                                    <td><?php echo htmlspecialchars($row['role']); ?></td>
                                    <td><?php echo htmlspecialchars($row['mobile']); ?></td>
                                    <td><?php echo htmlspecialchars($row['upi_id'] ?? ''); ?></td>
                                    <td>
                                        <?php if (!empty($row['qr_code_path'])): ?>
                                            <img src="<?php echo htmlspecialchars($row['qr_code_path']); ?>" alt="QR" style="height:50px;">
                                        <?php else: ?>
                                            <span style="font-size:12px;color:#777;">No QR</span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <a href="edit_employee.php?id=<?php echo (int)$row['id']; ?>" class="btn">Edit</a>
                                        <a href="delete_employee.php?id=<?php echo (int)$row['id']; ?>" class="btn" onclick="return confirm('Delete this employee?');">Delete</a>
                                    </td>
                                </tr>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="7">No employees found.</td>
                            </tr>
                        <?php endif; ?>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
