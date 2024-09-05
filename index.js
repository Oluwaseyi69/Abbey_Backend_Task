require('dotenv').config();

const express = require('express')
const app = express()
const connectDB = require('./config/Database');
const userRoutes = require('./routes/UserRoutes')
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT;

connectDB();


app.use('/api/auth', userRoutes);





app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
});