require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.set('etag', false);
app.use(
  helmet({
    noSniff: true,
    xssFilter: true,
    noCache: true,
    hidePoweredBy: { setTo: 'PHP 7.4.3' }
  })
);

const staticOptions = {
  etag: false,
  lastModified: false,
  cacheControl: false,
  acceptRanges: false,
  setHeaders: res => {
    res.setHeader('Cache-Control', 'no-store');
  }
};
app.use('/public', express.static(process.cwd() + '/public', staticOptions));
app.use('/assets', express.static(process.cwd() + '/assets', staticOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html', staticOptions);
  });

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

const io = socket(server);

let players = {};
let coin = generateCoin();

/* Generate coin */
function generateCoin() {
  return {
    id: Date.now(),
    x: Math.floor(Math.random() * 500) + 50,
    y: Math.floor(Math.random() * 300) + 50,
    value: Math.floor(Math.random() * 3) + 1
  };
}

io.on('connection', socket => {

  // Send initial state (NO PLAYER CREATED HERE)
  socket.emit('init', {
    id: socket.id,
    players: Object.values(players),
    coin
  });

  // Player registers itself
  socket.on('new-player', player => {
    players[player.id] = player;
    socket.broadcast.emit('new-player', player);
  });

  socket.on('move-player', (dir, posObj) => {
    if (!players[socket.id]) return;

    players[socket.id].x = posObj.x;
    players[socket.id].y = posObj.y;

    socket.broadcast.emit('move-player', {
      id: socket.id,
      dir,
      posObj
    });
  });

  socket.on('stop-player', (dir, posObj) => {
    socket.broadcast.emit('stop-player', {
      id: socket.id,
      dir,
      posObj
    });
  });

  socket.on('destroy-item', data => {
    if (!players[data.playerId]) return;

    players[data.playerId].score += data.coinValue;

    coin = generateCoin();

    io.emit('update-player', players[data.playerId]);
    io.emit('new-coin', coin);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('remove-player', socket.id);
  });
});

module.exports = app;
