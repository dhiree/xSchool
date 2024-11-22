const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./config/config');

const app = express();

app.use(bodyParser.json());

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api', schoolRoutes);

app.get("/", (req, res) => {
    res.send("App is running")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
