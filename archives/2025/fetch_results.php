<?php
// Secure path outside web root
$file = '/var/data/results.csv';

// Ensure the file exists
if (!file_exists($file)) {
    http_response_code(404);
    die("File not found.");
}

// Serve CSV content securely
header('Content-Type: text/csv');
header('Content-Disposition: inline; filename="results.csv"');
readfile($file);
?>
