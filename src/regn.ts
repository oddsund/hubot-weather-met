import { EnhancedResponse, ApiMet, timeType } from "./types";
import { CanvasRenderService } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";
import i18next from "i18next";

export function checkPrecipitationForPicture(dataJson: ApiMet): Promise<Buffer | undefined> {
  const precipitation = extractOrderedPrecipitation(dataJson);
  const max = Math.max(...precipitation);
  if (max === 0) {
    return Promise.resolve(undefined);
  } else {
    return makeAPicture(precipitation, max);
  }
}

export function checkPrecipitationForRainDescription(dataJson: ApiMet): string {
  const precipitation = extractOrderedPrecipitation(dataJson);
  const max = Math.max(...precipitation);
  if (max === 0) {
    return i18next.t("No rain");
  } else {
    console.log(max);
    return createAnswerFromPrecipitation(precipitation, max);
  }
}

export function checkPrecipitationForUmbrella(dataJson: ApiMet, response: EnhancedResponse): string {
  const precipitation = extractOrderedPrecipitation(dataJson);
  const firstRain = precipitation.findIndex(rain => rain > 0);
  if (firstRain == -1) {
    return i18next.t("No umbrella");
  } else if (firstRain == 0) {
    return i18next.t("Need umbrella now");
  } else {
    return i18next.t("Umbrella later", { rainStart: firstRain * 7.5 + 7.5 });
  }
}

function createAnswerFromPrecipitation(precipitation: number[], max: number): string {
  if (precipitation[0] === 0) {
    return noCurrentRain(precipitation, max);
  }
  return currentlyRaining(precipitation, max);
}

function noCurrentRain(precipitation: number[], max: number): string {
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

function currentlyRaining(precipitation: number[], max: number): string {
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

  return answer + i18next.t("Rain will increase", { rainMm: max, timeleft });
}

async function makeAPicture(precipitation: number[], max: number): Promise<Buffer> {
  const width = 400; //px
  const height = 200; //px
  const canvasRenderService = new CanvasRenderService(width, height, ChartJS => {
    ChartJS.plugins.register({
      beforeDraw: (chart, options) => {
        const ctx = chart.ctx;
        if (ctx == null) return;
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
  return await canvasRenderService.renderToBuffer(configuration);
}

function extractOrderedPrecipitation(data: ApiMet): number[] {
  if (data.weatherdata.product == null) return [];
  const orderedTimePoints = data.weatherdata.product.flatMap(val => val.time).sort(orderTimeNodes);
  return orderedTimePoints.flatMap(val => val.location.flatMap(val => val.precipitation.flatMap(val => val.value)));
  /*   return [
    0.52,
    0.46,
    3.98,
    2.55,
    2.05,
    0.39,
    2.48,
    0.71,
    1.43,
    3.11,
    2.73,
    2.27,
    1.95,
    0.21,
    4.37
  ]; */
}

const orderTimeNodes = (first: timeType, second: timeType): number => {
  if (first.from < second.from) {
    return -1;
  } else if (first.from > second.from) {
    return 1;
  }
  return 0;
};
