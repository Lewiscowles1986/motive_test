const app = require('./src');

const { PORT: port = 3000 } = process.env;

app.listen(port, () => console.log(`Listening on ${port}`));
