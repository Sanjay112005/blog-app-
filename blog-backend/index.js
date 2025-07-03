const pool = require('./config/db')
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
app.use(cors())


app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes);
app.use('/api/comments',commentRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});



const port = process.env.PORT || 5000
app.listen(port,() => console.log(`server running on http://localhost:${port}`))
