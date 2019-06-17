import { NowCastResponse, TimeNode, EhancedRobot, EnhancedResponse } from "./types";
import { CanvasRenderService } from "chartjs-node-canvas";
import { WebClient } from "@slack/web-api";
import { ChartConfiguration } from "chart.js";
import i18next from "i18next";
import { slackChannel } from ".";

const orderTimeNodes = (first: TimeNode, second: TimeNode): number => {
  if (first.$.from < second.$.from) {
    return -1;
  } else if (first.$.from > second.$.from) {
    return 1;
  }
  return 0;
};

function noCurrentRain(precipitation: number[], max: number) {
  const firstRain = precipitation.slice(1).findIndex(val => val > 0);
  const rainStart = precipitation.slice(1).indexOf(firstRain) * 7.5 + 7.5;
  const timeleft = precipitation.slice(1).indexOf(max) * 7.5 + 7.5;

  const answer = i18next.t("Not currently raining", { rainStart });
  if (timeleft - rainStart > 0) {
    return (
      answer + i18next.t("Rain starting as", { startingMm: firstRain, maxMm: max, timeleft: timeleft - rainStart })
    );
  }
  return answer + i18next.t("It will rain", { rainMm: firstRain });
}

function currentlyRaining(precipitation: number[], max: number) {
  const answer = i18next.t("Currently raining", { rainMm: precipitation[0] });
  const timeleft = precipitation.slice(1).indexOf(max) * 7.5 + 7.5;

  if (max <= precipitation[0]) {
    const min = Math.min(...precipitation);
    const timeleftMin = precipitation.slice(1).indexOf(min) * 7.5 + 7.5;
    if (min == precipitation[0]) {
      return answer + i18next.t("No end in sight");
    } else {
      return answer + i18next.t("Rain will decrease", { rainMm: precipitation[0], timeleftMin });
    }
  }

  return answer + i18next.t("Rain will increase", { rainMm: precipitation[0], timeleft });
}

function createAnswerFromPrecipitation(precipitation: number[], max: number) {
  if (precipitation[0] === 0) {
    return noCurrentRain(precipitation, max);
  }
  return currentlyRaining(precipitation, max);
}

async function makeAPicture(precipitation: number[], max: number, response: EnhancedResponse) {
  const webClient = new WebClient(response.robot.adapter.options.token);
  const width = 400; //px
  const height = 200; //px
  const canvasRenderService = new CanvasRenderService(width, height, ChartJS => {
    ChartJS.plugins.register({
      beforeDraw: (chart, options) => {
        const ctx = chart.ctx;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
      }
    });
  });
  const configuration: ChartConfiguration = {
    type: "line",
    data: {
      labels: ["0", "", "15", "", "30", "", "45", "", "60", "", "75", "", "90", "", "105"],
      datasets: [
        {
          data: precipitation,
          label: "Regn i mm/t",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Regn i mm/t"
      },
      scales: {
        gridLines: {
          color: "#000000"
        },
        xAxes: [
          {
            display: true,
            ticks: {
              fontColor: "#000000",
              fontSize: 14,
              fontStyle: "500"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              fontColor: "#000000",
              fontSize: 14,
              fontStyle: "500",
              major: {
                min: 0
              }
            }
          }
        ]
      }
    }
  };
  webClient.files.upload({
    channels: slackChannel,
    initial_comment: createAnswerFromPrecipitation(precipitation, max),
    file: await canvasRenderService.renderToBuffer(configuration)
  });
}

export function parsePrecipitationAndSendAnswer(
  dataJson: NowCastResponse,
  response: EnhancedResponse,
  sendPicture: boolean
) {
  const orderedTimePoints = dataJson.weatherdata.product.time.sort(orderTimeNodes);
  const precipitation = orderedTimePoints.map(value => parseFloat(value.location.precipitation.$.value));
  const max = Math.max(...precipitation);
  if (max === 0) {
    response.send(i18next.t("No rain"));
  } else if (sendPicture) {
    makeAPicture(precipitation, max, response);
  } else {
    response.send(createAnswerFromPrecipitation(precipitation, max));
  }
}

export function parsePrecipitationCheckForUmbrellaAndSendAnswer(
  dataJson: NowCastResponse,
  response: EnhancedResponse,
  sendPicture: boolean
) {
  const orderedTimePoints = dataJson.weatherdata.product.time.sort(orderTimeNodes);
  const precipitation = orderedTimePoints.map(value => parseFloat(value.location.precipitation.$.value));
  const firstRain = precipitation.findIndex(rain => rain > 0);
  if (firstRain == -1) {
    response.send(i18next.t("No umbrella"));
  } else if (firstRain == 0) {
    response.send(i18next.t("Need umbrella now"));
  } else {
    response.send(i18next.t("Umbrella later", { rainStart: firstRain * 7.5 + 7.5 }));
  }
}
