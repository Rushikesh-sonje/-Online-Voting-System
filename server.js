
const app = require('./app');
const dbconnection = require('./config/dbConnect');

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    dbconnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});