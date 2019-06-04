# hubot-weather-met - simple forecasts about the weather

This package is created to be used with a hubot instance, and is only developed/tested aginst Slack. As such, some features might not be working with other providers/chat-solutions.

## Caveats
- The package is in alpha, and only supports the rain forecast.
- To send pictures, it relies on the slack adapter being configured with a working token.

## Installation

In hubot project repo, run:

`npm install hubot-weather-met --save`

Then add **hubot-weather-met** to your `external-scripts.json`:

```json
["hubot-weather-met"]
```

## Configuration
The following environment variables has to be set;
- **HUBOT_WEATHER_SLACK_CHANNEL** The slack channel where this bot is active
- **HUBOT_WEATHER_LANG** The language which the bot should reply with and understand

## Kommandoer

- hubot rain(regn) -- gives a status about the rain on Grønland, Oslo. Add the word details(detaljer) to also get a graph of the rain for the next 1.5 hours.
- hubot været -- show the weather at Grønland, Oslo, right now
- hubot værvarsel -- show a forecast for the week
- hubot været imorgen -- show a forecast for tomorrow
- hubot været *dag* -- show the forecast for a given day this week(wedensday, thursday etc)

