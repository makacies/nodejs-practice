const express = require('express');
const cookieParser = require('cookie-parser')
const postsRouter = require('./routers/posts.js');
const userRouter = require('./routers/user.js');
const authRouter = require('./routers/auth.js');
const statsRouter = require('./routers/stats.js');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8'));

const app = express();
const port = 3000;

app.use(express.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/stats', statsRouter);
app.use('/', authRouter);
app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Listening on port ${port}.`));
