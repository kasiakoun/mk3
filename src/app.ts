import express from 'express';
import path from 'path';

const app = express();

app.use('/src', express.static(path.join(process.cwd(), '/src'), {
  extensions: ['js', 'json', 'ts', 'png'],
}));

app.use('/dist', express.static(path.join(process.cwd(), '/dist'), {
  extensions: ['js', 'json', 'ts', 'png'],
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/index.html'));
});

app.listen(8080, () => console.log('Server running'));