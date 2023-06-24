import * as express from 'express'
import * as morgan from "morgan"
import router from './routes'
import * as cors from "cors"



const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use("/api", router)

export default app
