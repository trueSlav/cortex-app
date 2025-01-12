const express = require('express')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/employees/', require('./routes/employees'));
app.use('/api/departments/', require('./routes/departments'));
app.use('/api/letter/', require('./routes/letter'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

