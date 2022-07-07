const http=require('http');
const mongoose=require('mongoose');
require('dotenv').config();

const app=require('./app');
const PORT=process.env.PORT || 8080;

const server=http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

const option={
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useNewUrlParser: true,
    poolSize: 4
};

// mongoose.Promise=global.Promise;
// mongoose.connect(db, option).then(() => console.log(`DB connected`))
//     .catch((err) => {
//         console.log(err);
//         process.exit(1);
//     });