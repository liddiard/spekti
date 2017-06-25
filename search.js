const request = require('superagent');
const cheerio = require('cheerio');

module.exports = query => {
  return request
  .get(`https://thepiratebay.org/search/${encodeURIComponent(query)}/0/99/0`)
  .then(res => {
    const $ = cheerio.load(res.text);
    const results = $('#searchResult tbody tr')
    .map(function(index, el) { 
      return {
        name: $(this).find('.detLink').text(),
        magnet: $(this).find('a[href^=magnet]').attr('href'),
        seeders: parseInt($(this).find('td:nth-child(3)').text()),
        leechers: parseInt($(this).find('td:nth-child(4)').text())
      }
    }).get();
    return results;
  })
  .catch(err => console.error(err));
};