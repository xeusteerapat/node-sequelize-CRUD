const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models/index.js');
db.sequelize.sync();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to my app' });
});

require('./routes/tutorial.routes.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
