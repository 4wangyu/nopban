import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import route from './route';

// Setup express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization ,Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../fe/build')));

// Routes & Handlers
app.use('/api', route);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname + '/../fe/build/index.html'));
});

const port = process.env.PORT || 3001;
// Start server
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
