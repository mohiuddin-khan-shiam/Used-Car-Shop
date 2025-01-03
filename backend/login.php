<?php
// Include the database connection
include 'db.php';

// Start the session to handle login state
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize input data
    $usernameOrEmail = trim($_POST['usernameOrEmail']);
    $password = trim($_POST['password']);

    // Validate input fields
    if (empty($usernameOrEmail) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Both fields are required.']);
        exit;
    }

    // Check if the user exists (by username or email)
    $user = fetchData("SELECT * FROM users WHERE username = ? OR email = ?", [$usernameOrEmail, $usernameOrEmail]);

    if (empty($user)) {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
        exit;
    }

    $user = $user[0]; // Extract the single user record

    // Verify the password
    if (!password_verify($password, $user['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
        exit;
    }

    // Set session variables for the logged-in user
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    echo json_encode(['status' => 'success', 'message' => 'Login successful.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
