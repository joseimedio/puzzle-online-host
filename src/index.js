const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/tasks.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});