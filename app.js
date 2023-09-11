const express = require('express');
const app = express();
require('express-async-errors');
const db = require('./models');
const fileUpload = require('express-fileupload');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/authRoute');
const booksRouter = require('./routes/bookRoute');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

//image upload
app.use(
    fileUpload({
        limits: {
            fileSize: 1024 * 1024, // 1 MB
        },
        abortOnLimit: true,
        createParentPath: true,
    })
);

// routes
app.use('/api/v1/', authRouter);
app.use('/api/v1/books', authenticateUser, booksRouter);
app.use('/api/v1/uploads', express.static('uploads'));

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sequelize
    .sync()
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Synced db.');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Failed to sync db: ' + err.message);
    });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}.`);
});