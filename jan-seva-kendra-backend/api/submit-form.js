// API to handle form submissions
app.post("/api/submit-form", upload.array("documents"), async (req, res) => {
    const { name, mobile, email, services } = req.body;
    const files = req.files;

    console.log("Backend: Received form data:", { name, mobile, email, services });
    console.log("Backend: Files received:", files);

    try {
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Sender's email
                pass: process.env.EMAIL_PASS, // Sender's email password
            },
        });

        console.log("Backend: Transporter created successfully.");

        // Email content with attachments
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "tarunbusinessmail@gmail.com", // Replace with recipient email
            subject: "New Form Submission with Documents",
            text: `You have received a new submission:
Name: ${name}
Mobile: ${mobile}
Email: ${email}
Service: ${services}
Attached documents are included.`,
            attachments: files.map((file) => ({
                filename: file.originalname,
                path: file.path,
            })),
        };

        console.log("Backend: Mail options prepared:", mailOptions);

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log("Backend: Email sent successfully!");
        res.status(200).send({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Backend: Error occurred while sending email:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});
