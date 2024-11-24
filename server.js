const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse JSON bodies

// Create a transporter for NodeMailer (Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',  // Your Gmail email address
        pass: 'your-email-password'    // Your Gmail password or app-specific password
    }
});

// Route to send the email
app.post('/send-email', (req, res) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: 'tpsarora@gmail.com',     // Recipient address
        subject: 'Test Email from NodeMailer', // Email subject
        text: 'This is a test email sent using NodeMailer.' // Email body
    };

    // Send email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
