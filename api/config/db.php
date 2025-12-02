<?php
// Central DB connection file for all PHP pages
// Update credentials here if needed.

$host = "localhost";
$user = "root";   // XAMPP default user
$pass = "";       // XAMPP default password (blank)
$db   = "super_institute_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>


