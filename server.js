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
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
