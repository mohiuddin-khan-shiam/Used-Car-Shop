<?php
// db.php

// Database credentials
$host = 'localhost';     // Replace with your host (e.g., localhost)
$user = 'root';          // Replace with your database username
$password = '';          // Replace with your database password
$dbname = 'used_car_shop'; // Replace with your database name

// Enable error reporting (useful for development)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Establish the connection
    $conn = new mysqli($host, $user, $password, $dbname);
    $conn->set_charset("utf8mb4"); // Ensure proper encoding

    // Connection successful
    // Uncomment the following line for debugging purposes:
    // echo "Database connected successfully!";
} catch (mysqli_sql_exception $e) {
    // Handle connection errors
    die("Database connection failed: " . $e->getMessage());
}

/**
 * Helper function to safely query the database.
 * 
 * @param string $query The SQL query with placeholders
 * @param array $params The parameters to bind in the query
 * @return mixed Query result or false on failure
 */
function executeQuery($query, $params = []) {
    global $conn;

    try {
        $stmt = $conn->prepare($query);
        if ($params) {
            // Dynamically bind parameters
            $types = str_repeat('s', count($params)); // Assume all params are strings; modify as needed
            $stmt->bind_param($types, ...$params);
        }
        $stmt->execute();
        return $stmt;
    } catch (mysqli_sql_exception $e) {
        // Handle query errors
        error_log("Query Error: " . $e->getMessage()); // Log errors (don't show to users)
        return false;
    }
}

/**
 * Helper function to fetch data as an associative array.
 * 
 * @param string $query The SQL query with placeholders
 * @param array $params The parameters to bind in the query
 * @return array The result set as an associative array
 */
function fetchData($query, $params = []) {
    $stmt = executeQuery($query, $params);
    if ($stmt) {
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    return [];
}

/**
 * Close the database connection when script ends
 */
register_shutdown_function(function() use ($conn) {
    if ($conn) {
        $conn->close();
    }
});
?>

