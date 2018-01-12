const axios = require('axios');
const APIError = require('../middlewares/response').APIError;

module.exports = {
    
    async run(ctx, next) {
        const { language, code } = ctx.request.body;
        let response = await axios.post('http://localhost:5000/code', { language, code });
        ctx.ok(response.data);
    }

}