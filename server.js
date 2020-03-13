const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Tutorial = require('./controller/tutorial.controller.js');
const app = express();

const corsOptions = {
  origin: 'https://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models/index.js');
db.sequelize.sync();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  console.log(req.body);
  Tutorial.create(req, res);
});

require('./routes/tutorial.routes.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
