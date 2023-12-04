const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const autovote = require('./services/autovote');

const app = express();

const port = process.env.PORT || 4000;

cron.schedule('* * * * * *', function () {
  console.log('Running a task every second');
  // autovote();
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', protectedRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});