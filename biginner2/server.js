const express = require('express');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'task2secret', resave: false, saveUninitialized: true }));
app.use(express.static('public')); // Serve HTML/JS from public folder

app.get('/', (req, res) => res.sendFile(path.join(__dirname,  'vform.html')));

app.post('/submit', [
  body('name').trim().isLength({ min: 2 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Store validated data temporarily in session
  req.session.validatedData = req.body;
  res.json({ success: true, message: 'Data validated and stored in session', data: req.body });
});

app.get('/data', (req, res) => {
  res.json({ storedData: req.session.validatedData || 'No data' });
});

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
