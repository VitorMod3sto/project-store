const { default: axios } = require("axios");

const apiStore = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export default apiStore