const express = require('express');
const axios = require('axios');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/fetch-articles', async (req, res) => {
    try {
        const response = await axios.get('https://harmex.ru/api/articles/getArticles?main=true');
        
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});