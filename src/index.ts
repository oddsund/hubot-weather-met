import path from "path";
import { Robot } from "hubot";
import { initializeLanguage } from "./lang";
"use strict";

initializeLanguage(process.env.HUBOT_WEATHER_LANG);
export const slackChannel = process.env.HUBOT_WEATHER_SLACK_CHANNEL;

module.exports = (robot: Robot<{}>) => {
  const scriptsPath = path.resolve(__dirname);
  robot.loadFile(scriptsPath, "vaer.js");
};
