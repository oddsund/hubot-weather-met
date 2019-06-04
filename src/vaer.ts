// Description:
//   Beskriver været for et gitt område
//
// Dependencies:
//   "@slack/web-api": "^5.0.1",
//   "chart.js": "^2.8.0",
//   "chartjs-node-canvas": "^2.4.0",
//   "path": "^0.12.7",
//   "xml2js": "^0.4.19"
//
// Configuration:
//   HUBOT_WEATHER_SLACK_CHANNEL The slack channel where this bot is active
//   HUBOT_WEATHER_LANG The language which the bot should reply with and understand
//
// Commands:
//   hubot regn - gir en kort status om regn på Grønland, Oslo. Legg til ordet 'detaljer' for å få en graf over regnet.
//   hubot været - viser været på Grønland, Oslo, akkurat nå
//   hubot værvarsel - viser værvarslet for uka
//   hubot været imorgen - viser værvarslet for morgendagen
//   hubot været *dag* - viser værvarslet for en gitt dag denne uken
//
// Notes:
//   Denne er avhengig av at slack-adapteren har et gyldig token om den skal kunne sende grafen.
//
// Author:
//   oddsund

import { Parser } from "xml2js";
import { EhancedRobot, NowCastResponse, EnhancedResponse } from "./types";
import { parsePrecipitationAndSendAnswer } from "./regn";
import i18next from "i18next";

const parser = new Parser({ explicitArray: false });

function vaer(robot: EhancedRobot): void {
  robot.respond(RegExp(i18next.t("rain") + "(.*)?"), res => {
    robot
      .http("https://api.met.no/weatherapi/nowcast/0.9/?lat=59.910808&lon=10.761530")
      .header("Accept", "application/json")
      .get()((err, response, body) => {
      if (err !== null) {
        robot.logger.info(`'regn' received a http error: ${err}`);
        return;
      }
      if (response.statusCode !== 200) {
        robot.logger.info(
          `'regn' received a non-200 statuscode: ${response.statusCode} ${response.statusMessage}\nAborting..`
        );
        return;
      }
      parser.parseString(body, (_err: Error, dataJson: NowCastResponse) => {
        parsePrecipitationAndSendAnswer(
          dataJson,
          res as EnhancedResponse,
          res.match[1] && res.match[1].includes(i18next.t("details"))
        );
      });
    });
  });
}

export = vaer;
