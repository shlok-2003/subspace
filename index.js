const express = require('express');
require('dotenv').config();

const blogRoutes = require('./routes/blog');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', blogRoutes);


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error: ", err);
        return console.error(err);
    }

    console.log(`Server is running on port: ${PORT}`);
})