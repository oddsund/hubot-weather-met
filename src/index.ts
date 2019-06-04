import path from "path";
import { Robot } from "hubot";
"use strict";

module.exports = (robot: Robot<{}>) => {
  const scriptsPath = path.resolve(__dirname);
  robot.loadFile(scriptsPath, "vaer.js");
};
