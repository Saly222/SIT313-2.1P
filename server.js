const express = require("express");
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const mailgun = new Mailgun(formData);
const apiKey = '9f463dbdcddbafc10a383561d1923d2d-afce6020-b5bdafde'; 
const domain = 'sandbox88b092e3c25a4750a323dba85511cc10.mailgun.org'; 
const mg = mailgun.client({ username: 'api', key: apiKey });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/sign-up', async (req, res) => {
  const { email } = req.body;

  const emailData = {
    from: 'salykeu2017@gmail.com',
    to: email,
    subject: 'Welcome to DEV@Deakin!',
    text: 'Welcome to DEV@Deakin! We are excited to have you.',
    html: '<h1>Welcome to DEV@Deakin!</h1><p>We are excited to have you.</p>'
  };

  try {
    const body = await mg.messages.create(domain, emailData);
    res.send(`Email sent successfully: ${body.message}`);
  } catch (error) {
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
