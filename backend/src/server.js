import app from   "./app.js"
import "dotenv/config.js"

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
