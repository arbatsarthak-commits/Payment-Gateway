<?php
$host = "localhost";
$user = "root";   // XAMPP ka default user
$pass = "";       // XAMPP ka default password (blank)
$db   = "super_institute_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
