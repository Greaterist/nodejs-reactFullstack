const express = require('express');
const config = require('config');
const path = require('path');

//48:00



const PORT = config.get('port') || 5555;

const app = express();

app.listen(PORT, () => console.log(`server started on port:${PORT}...`));

app.use(express.static(path.join(__dirname, '../public'))) //Адрес статики для сайта (например для CSS)
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', require('./src/routes/auth.routes')); 