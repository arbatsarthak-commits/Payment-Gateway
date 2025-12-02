<?php
// work_list.php
include "../config/db.php";

// employee_work + employees ko join karke data la rahe hain
$sql = "SELECT ew.*, e.name 
        FROM employee_work ew
        JOIN employees e ON ew.employee_id = e.id
        ORDER BY ew.id DESC";

$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Work List</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Monthly Work List</h1>
        <p class="sub-title">This data is used by the Salary Generator module.</p>

        <p>
            <a href="add_work.php" class="link-btn">➕ Add New Work</a>
            <a href="employees_list.php" class="link-btn">👥 Employees List</a>
            <a href="dashboard.php" class="link-btn">⬅ Back to Dashboard</a>
        </p>

        <div class="cards">
            <div class="card" style="flex: 1 1 100%;">
                <div style="overflow-x:auto;">
                    <table border="0" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
                        <tr style="background:#e8eaf6;">
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Month</th>
                            <th>MS-CIT</th>
                            <th>Module</th>
                            <th>Diploma</th>
                            <th>₹149 Students</th>
                        </tr>

                        <?php if ($result && $result->num_rows > 0): ?>
                            <?php while ($row = $result->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($row['id']); ?></td>
                                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                                    <td><?php echo htmlspecialchars($row['month']); ?></td>
                                    <td><?php echo htmlspecialchars($row['mscit']); ?></td>
                                    <td><?php echo htmlspecialchars($row['module']); ?></td>
                                    <td><?php echo htmlspecialchars($row['diploma']); ?></td>
                                    <td><?php echo htmlspecialchars($row['short149']); ?></td>
                                </tr>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="7">No work records found.</td>
                            </tr>
                        <?php endif; ?>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
