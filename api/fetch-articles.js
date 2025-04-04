const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://harmex.ru/api/articles/getArticles?main=true');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
};
