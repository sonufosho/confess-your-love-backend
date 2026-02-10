import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

// Catch-all route for any unmatched routes
app.get(/.*/, (req, res) => {
  res.send('Confess your love API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});