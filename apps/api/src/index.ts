import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
});

app.listen(port, () => {
  console.log(`API demo listening on ${port}`);
});
