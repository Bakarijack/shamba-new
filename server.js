const app = require('./express')
const port = process.env.PORT || 3001


app.listen(port, () => console.log(
    `http://localhost:${port}`
))