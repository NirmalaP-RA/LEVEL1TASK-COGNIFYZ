const express = require('express'); //install npm i express
const app = express();  //server setup(nodemon)

app.use(express.urlencoded({ extended: true })); //middleware to parse form data

app.get('/', (req, res) => res.sendFile(__dirname + '/Form.html')); //server side rendering to dynamically generate HTML

app.post('/submit', (req, res) => { // use post endpoints for form submission
  const { name, email, message } = req.body;
  res.send(
    `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Thank you, ${name}!</h1>
      <p>Email: ${email}</p>
      <p>Message received: ${message}</p>
      <a href="/">Back</a>
    </body>
    </html>
  `
);
//   res.status(200).send('Form submitted successfully!');
});
app.listen(7000,()=>{ //used thunderclient to get request on port: 7000
    console.log('server is running on http://localhost:7000/');
});
