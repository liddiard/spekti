# spekti

Type the show you want to watch in the command line – see the latest episode (or any episode you specify) playing seconds later! Finds the latest episode via the [TVDB API](http://thetvdb.com), queries [The Pirate Bay](https://thepiratebay.org), and finds the best torrent in your preferred resolution, playing it automatically with [WebTorrent](https://webtorrent.io).

Note: This application could be used to download content that infringes on copyrights. I do not endorse its use for this purpose; use it at your own risk.

## Demo

![demo](/example.gif)

## Installation and usage

1. Install [webtorrent-cli](https://github.com/webtorrent/webtorrent-cli) globally: `npm install -g webtorrent-cli`
2. Clone the repo, `cd` into it, and `npm install`
3. (Recommended) create a "watch" bash alias to `node` + [path to repo's `index.js`]. E.g., `alias watch='node ~/Developer/spekti/index.js'`.
4. [Register for a TVDB account](http://thetvdb.com/?tab=register) and [get an API key](http://thetvdb.com/?tab=apiregister).
5. Create a `config.json` file in the root of the repo with your TVDB credentials, and optionally a preferred resolution. It should look like this:

```javascript
{
  "preferredQuality": 720, // this property is optional. valid options: 720, 1080
  "tvdb": {
    "apikey": "[YOUR API KEY]", // get it from http://thetvdb.com/?tab=userinfo
    "userkey": "[YOUR USER KEY]", // a.k.a. "Account Identifier" from http://thetvdb.com/?tab=userinfo
    "username": "[YOUR USERNAME]"
  }
}
```

That's it – now watch something! Type "watch" + a TV show name to watch the latest episode, or type "watch" + a TV show name + a season and episode number in the format "sXXeXX" (like "s01e05") to watch a specific episode.

Examples:

- `watch silicon valley` > plays the latest episode of Silicon Valley
- `watch arrested development s01e10` > plays Arrested Development episode "Pier Pressure"

## The name

"Spekti" is an Esperanto translation of "watch". Not to be confused with the Finnish rapper of the same name.
