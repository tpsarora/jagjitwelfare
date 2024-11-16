<?php
// This will handle the request to send the email

// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set recipient email address (this can be changed to your target email)
    $to = 'recipient@example.com'; // Replace with your email address
    $subject = 'Test Email from HTML Form';
    $message = 'This is a test email sent from your HTML page using PHP!';
    $headers = 'From: sender@example.com' . "\r\n" . // Replace with a valid sender email
               'Reply-To: sender@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send the email
    $success = mail($to, $subject, $message, $headers);

    // Send JSON response back to the frontend
    if ($success) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    // If the request is not POST, return an error
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
