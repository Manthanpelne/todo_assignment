import app from './src/app'
import mongoose from './src/db';
require("dotenv").config()


app.listen(process.env.port, () => {
    console.log(`Listening on ${process.env.port}`)
    mongoose.connect(`${process.env.mongoURL}`, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log("Connected to the database")
    }).catch((e: any) => {
        console.log("Error connecting to the DB")
        console.log(e.message)
    })
})