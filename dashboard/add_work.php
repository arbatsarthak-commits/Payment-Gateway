<?php
// add_work.php
include "db_connect.php";

// Employees dropdown ke liye data
$empSql = "SELECT id, name FROM employees ORDER BY name";
$empResult = $conn->query($empSql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Work</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <div class="container">
        <h1>Add Monthly Work</h1>
        <p class="sub-title">Enter monthly work counts – used by Salary Generator.</p>

        <form method="post" action="save_work.php">
            <p>
                <label>
                    Employee<br>
                    <select name="employee_id" required>
                        <option value="">-- Select Employee --</option>
                        <?php if ($empResult && $empResult->num_rows > 0): ?>
                            <?php while ($e = $empResult->fetch_assoc()): ?>
                                <option value="<?php echo (int)$e['id']; ?>">
                                    <?php echo htmlspecialchars($e['name']); ?>
                                </option>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </select>
                </label>
            </p>

            <p>
                <label>
                    Month<br>
                    <input type="month" name="month" required>
                </label>
            </p>

            <p>
                <label>
                    MS-CIT Batches<br>
                    <input type="number" name="mscit" value="0" min="0">
                </label>
            </p>

            <p>
                <label>
                    Module Batches<br>
                    <input type="number" name="module" value="0" min="0">
                </label>
            </p>

            <p>
                <label>
                    DCFA/DCP/DDA/DGDA Batches<br>
                    <input type="number" name="diploma" value="0" min="0">
                </label>
            </p>

            <p>
                <label>
                    ₹149 Short Course Students<br>
                    <input type="number" name="short149" value="0" min="0">
                </label>
            </p>

            <button type="submit" class="btn">Save Work</button>
            <a href="work_list.php" class="link-btn">Cancel</a>
        </form>

        <p style="margin-top:20px;">
            <a href="work_list.php" class="link-btn">View Work List</a>
            <a href="dashboard.php" class="link-btn">Back to Dashboard</a>
        </p>
    </div>
</body>
</html>
