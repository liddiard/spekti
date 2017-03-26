#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const prompt = require('prompt');
const WebTorrent = require('webtorrent');
const PirateBay = require('thepiratebay');

const client = new WebTorrent();

PirateBay
.search(argv.q)
.then(torrents => {
  const formatted = torrents
  .slice(0, 10)
  .map((t, index) => { 
    return `${index}: ${t.name} [${t.seeders}/${t.leechers}]`
  })
  .join('\n');
  console.log(formatted);
  prompt.start();
  prompt.get(['#'], (err, result) => {
    const index = parseInt(result['#']);
    download(torrents[index].magnetLink);
  });
})
.catch(err => console.error(err));

function download(magnet) {
  client.add(magnet, torrent => {
    // Torrents can contain many files. Let's use the first.
    const server = torrent.createServer();
    server.listen(8001); // start the server listening to a port
    console.log('listening on 8001');
  });
}

/*

*/