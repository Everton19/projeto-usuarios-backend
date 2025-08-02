const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { USERS_LIST_BD } = require('./utils/users-list-bd');
const { JWT_TOKEN } = require('./utils/jwt-manager');
const { authToken } = require('./middlewares/auth-token');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const USER_FOUND = USERS_LIST_BD.find(
    user => user.username === username && user.password === password
  );

  if (!USER_FOUND) {
    return res.status(401).json({
      message: 'Invalid username or password'
    })
  }

  const TOKEN = JWT_TOKEN(USER_FOUND.username);

  return res.json({
    message: 'Login successful',
    token: TOKEN
  });
})

app.post('/validate-token', authToken, (req, res) => {
  res.json({
    message: 'Token valid',
    username: req.username
  });
})

app.put('/update-user', authToken, (req, res) => {
  const NEW_USER_INFO = req.body;

  const { username, name, email, password } = NEW_USER_INFO;

  if (!username || !name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
 
  const USER_FOUND = USERS_LIST_BD.findIndex(user => user.username === req.username);

  if (USER_FOUND === -1) {
    return res.status(403).json({
      message: 'User not found'
    });
  }

  USERS_LIST_BD[USER_FOUND] = NEW_USER_INFO;

  const TOKEN = JWT_TOKEN(username);

  return res.json({
    message: 'User updated successfully',
    token: TOKEN
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
