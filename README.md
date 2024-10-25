# pureQuery

## Description
Just a simple search engine with no data collection.

## Installation
Clone repo.
```sh
git clone https://github.com/TheBattleDog/pureQuery.git
```
Download all dependencies.
```sh
npm install
```
Set up the .env file (an example .env.example is given)
```
VITE_GOOGLE_SEARCH_API_KEY = "your-google-search-api-key-here"
VITE_YOUTUBE_API_KEY = "your-youtube-api-key-here"
VITE_GOOGLE_SEARCH_API_URI = "google-api31.p.rapidapi.com"
VITE_YOUTUBE_API_URI = "yt-api.p.rapidapi.com"
```
You can get API keys from Rapid API. <br />
Youtube API Link - https://rapidapi.com/ytjar/api/yt-api <br />
Google API Link - https://rapidapi.com/rphrp1985/api/google-api31 <br />

## Note

The ```safesearch``` mode is set to ```moderate```, it can be changed in ```ResultContextProvider.tsx``` by setting <br />
```searchMode``` at line 127 to ```'off' | 'moderate' | 'on'```.

## Screenshots
![Web Search](./Screenshots/WebSearchPanel.png?raw=true "Web Search")