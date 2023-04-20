const http=require('http');
require('dotenv').config();

const app=require('./app');
const PORT=process.env.PORT || 8080;

const server=http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});