import express from "express";
import { randomUUID } from "node:crypto";
import { validateUser } from "./schemas/user.js";
const app = express();


const PORT = process.env.PORT ?? 1234

app.disable("x-powered-by") // borramos publicidad de express
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    })
})

// USER 
app.post("/user", (req, res) => {
    
    const validatedUser = validateUser(req.body)

    if(validatedUser.error){
        return res.status(400).json({ error: validatedUser.error.message })
    }

    const newUser = {
        userID: randomUUID(), // random ID
        ...validatedUser.data
    }

    res.status(201).json(newUser)
})


app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})