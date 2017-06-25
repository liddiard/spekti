#! /usr/bin/env node

const spawn = require('child_process').spawn;
const clear = require('clear');
const request = require('superagent');
const search = require('./search.js');
const utils = require('./utils.js');
const config = require('./config.json');

const query = process.argv.slice(2).join(' ');
if (utils.episodeProvided(query)) {
  playFromQuery(query);
}
else {
  console.log('No episode number provided; searching for the latest episode.');
  utils.getLatestEpisode(query)
  .then(episode => {
    console.log(`Playing Season ${episode.airedSeason}: Ep. ${episode.airedEpisodeNumber}, "${episode.episodeName}"`);
    playFromQuery(utils.formatEpisodeQuery(query, episode));
  });
}

function playFromQuery(query) {
  const quality = config.preferredQuality;
  console.log(`Preferring ${quality}p quality.`);
  search(`${query} ${quality}p`)
  .then(torrents => {
    if (!torrents.length) {
      console.error('No torrents found matching query:', query);
      process.exit(1);
    }
    console.log('Downloading:', torrents[0].name);
    const webtorrent = spawn('webtorrent', 
                            `download ${torrents[0].magnet} --vlc`.split(' '));
    webtorrent.stdout.on('data', data => {
      clear();
      process.stdout.write(data);
    });
    webtorrent.stderr.on('data', data => {
      process.stderr.write(data);
    });
  })
  .catch(err => console.error(err));
}
