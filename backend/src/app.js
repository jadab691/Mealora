import express from "express"
import cors from "cors"
import cookieparser from 'cookie-parser'



const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieparser()) ;


import authManager from './routes/auth.routes.js'



app.get("/", (req, res) => {
    res.json({
        message: "The backend of messmanagement is running ......."
    })
})

app.use('/api/auth', authManager)

export default app; 