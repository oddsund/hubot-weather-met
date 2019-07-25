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
//   hubot paraply - gir deg beskjed om du trenger en paraply nå, eller om en liten stund
//   hubot været - viser været på Grønland, Oslo, akkurat nå
//   hubot værvarsel - viser værvarslet for uka
//   hubot været imorgen - viser værvarslet for morgendagen
//   hubot været *dag* - viser værvarslet for en gitt dag denne uken
//   hubot weatherhelp - show a translated helptext for this module
//
// Notes:
//   Denne er avhengig av at slack-adapteren har et gyldig token om den skal kunne sende grafen.
//
// Author:
//   oddsund

import { Parser } from "xml2js";
import { EhancedRobot, EnhancedResponse, ApiMet } from "./types";
import {
  checkPrecipitationForUmbrella,
  checkPrecipitationForRainDescription,
  checkPrecipitationForPicture
} from "./regn";
import i18next from "i18next";
import { parseNumbers, parseBooleans } from "xml2js/lib/processors";
import { WebClient } from "@slack/web-api";

function vaer(robot: EhancedRobot): void {
  robot.respond(RegExp("weatherhelp"), res => {
    res.send(i18next.t("help"));
  });

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
      parser.parseString(body, async (_err: Error, dataJson: ApiMet) => {
        const answer = checkPrecipitationForRainDescription(dataJson);
        if (checkForDetails(res.match[1])) {
          const webClient = new WebClient(robot.adapter.options.token);
          webClient.files
            .upload({
              channels: process.env.HUBOT_WEATHER_SLACK_CHANNEL,
              initial_comment: answer,
              file: await checkPrecipitationForPicture(dataJson)
            })
            .then(val => console.log(val))
            .catch(err => console.log(err));
        } else {
          res.send(answer);
        }
      });
    });
  });

  robot.respond(RegExp(i18next.t("umbrella")), res => {
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
      parser.parseString(body, (_err: Error, dataJson: ApiMet) => {
        const result = checkPrecipitationForUmbrella(dataJson, res as EnhancedResponse);
        res.send(result);
      });
    });
  });

  robot.respond(RegExp(i18next.t("weather")), res => {
    robot
      .http("https://api.met.no/weatherapi/locationforecast/1.9/?lat=59.910808&lon=10.761530")
      .header("Accept", "application/json")
      .get()((err, response, body) => {
      if (err !== null) {
        robot.logger.info(`'weather' received a http error: ${err}`);
        return;
      }
      if (response.statusCode !== 200) {
        robot.logger.info(
          `'regn' received a non-200 statuscode: ${response.statusCode} ${response.statusMessage}\nAborting..`
        );
        return;
      }
      parser.parseString(body, (_err: Error, dataJson: ApiMet) => {
        if (dataJson.weatherdata.product == null) return;
        console.log("####");
        console.log(dataJson.weatherdata.product[0].time[0]);
        console.log("####");
        console.log(dataJson.weatherdata.product[0].time[1]);
        console.log("####");
        console.log(dataJson.weatherdata.product[0].time[2]);
        console.log("####");
        console.log(dataJson.weatherdata.product[0].time[3]);
        console.log("####");
        console.log(dataJson.weatherdata.product[0].time[4]);
      });
    });
  });
}

const checkForDetails = (match: string): boolean => !!match && match.includes(i18next.t("details"));

const parseDates = (value: string, name: string): string | Date => {
  if (name === "to" || name === "from") {
    return new Date(value);
  }
  return value;
};

const parser = new Parser({
  mergeAttrs: true,
  attrValueProcessors: [parseNumbers, parseBooleans, parseDates],
  valueProcessors: [parseNumbers, parseBooleans, parseDates]
});

export = vaer;
