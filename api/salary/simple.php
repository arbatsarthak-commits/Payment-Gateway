<?php
// ======== Input Data (You can replace with dynamic values from DB) ========
$mscit_count    = 10; // Number of MS-CIT batches/students
$module_count   = 5;  // Number of Module batches/students
$diploma_count  = 2;  // DCFA / DCP / DDA / DGDA
$short_149_count = 3; // Number of ₹149 course students

// ======== Payment Rules ========
$rate_mscit   = 80;     // ₹80 per MS-CIT
$rate_module  = 90;     // ₹90 per Module
$rate_diploma = 400;    // ₹400 per Diploma course (DCFA, DCP, DDA, DGDA)
$rate_149     = 74.5;   // 50% share in ₹149 course = ₹74.5

// ======== Salary Calculation ========
$pay_mscit   = $mscit_count    * $rate_mscit;
$pay_module  = $module_count   * $rate_module;
$pay_diploma = $diploma_count  * $rate_diploma;
$pay_149     = $short_149_count * $rate_149;

$gross_salary = $pay_mscit + $pay_module + $pay_diploma + $pay_149;
$net_salary   = $gross_salary;  // No deductions yet

// ======== Display in Structured Table ========
echo "<h2>Teacher Salary Breakdown</h2>";

echo "<table border='1' cellpadding='6' cellspacing='0'>
        <tr><th>Work Type</th><th>Count</th><th>Rate (₹)</th><th>Amount (₹)</th></tr>
        <tr><td>MS-CIT</td>       <td>$mscit_count</td>   <td>$rate_mscit</td>   <td>$pay_mscit</td></tr>
        <tr><td>Module</td>       <td>$module_count</td>  <td>$rate_module</td>  <td>$pay_module</td></tr>
        <tr><td>Diploma Courses (DCFA/DCP/DDA/DGDA)</td>
                                  <td>$diploma_count</td><td>$rate_diploma</td> <td>$pay_diploma</td></tr>
        <tr><td>₹149 Demo Course</td>
                                  <td>$short_149_count</td><td>$rate_149</td>   <td>$pay_149</td></tr>
        <tr><th colspan='3' style='text-align:right;'>Gross Salary</th><th>₹$gross_salary</th></tr>
        <tr><th colspan='3' style='text-align:right;'>Net Salary (After Deductions)</th>
            <th>₹$net_salary</th></tr>
      </table>";
?>
