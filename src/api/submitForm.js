import nodemailer from 'nodemailer';
const submitForm = async (req, res) => {
// export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'nimarmzwow@gmail.com',
        pass: 'iseedeadpeople81',
      },
    });

    const mailOptions = {
      from: 'Your Website <nimarmzwow@gmail.com>',
      to: 'fatemeh.nima.0002@gmail.com',
      subject: `New Form Submission from ${formData.name}`,
      text: `You have received a new form submission from ${formData.name}.

      Email: ${formData.email}
      Message: ${formData.message}

      Full form data:
      ${JSON.stringify(formData, null, 2)}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted and email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed.' });
  }
};

export default submitForm;

//   if (req.method === 'POST') {
//     const formData = req.body; // Get form data from request body

//     // Create a Nodemailer transporter using SMTP
//     let transporter = nodemailer.createTransport({
//       service: 'Gmail', // Use Gmail as the email service (you can use others like SMTP, etc.)
//       auth: {
//         user: 'nimarmzwow@gmail.com', // Your Gmail address
//         pass: 'iseedeadpeople81', // Your Gmail password or App Password
//         // user: process.env.EMAIL_USER, // Your Gmail address
//         // pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
//       },
//     });

//     // Email options (how the email will look)
//     let mailOptions = {
//       from: `"Your Website" <${process.env.EMAIL_USER}>`, // Sender's email and name
//       to: 'fatemeh.nima.0002@gmail.com', // The email where you want to receive submissions
//       subject: `New Form Submission from ${formData.name}`, // Email subject
//       text: `You have received a new form submission from ${formData.name}.
      
//       Email: ${formData.email}
//       Message: ${formData.message}
      
//       Full form data:
//       ${JSON.stringify(formData, null, 2)}`,
//     };

//     try {
//       // Send email using the transporter
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Form submitted and email sent successfully!' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Failed to send email.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Only POST requests are allowed.' });
//   }
// }
