require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()
app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Catch all.
app.use('*', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html');
});

//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/businessRouter'))

//Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology:true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT)
})
