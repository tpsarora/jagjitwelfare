<?php
$to = 'tpsarora@gmail.com';  // Replace with your email address
$subject = 'PHP Mail Test';
$message = 'This is a test email sent from PHP mail() function.';
$headers = 'From: sender@example.com';  // Replace with a valid sender email

if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    echo 'Failed to send email.';
}
?>
