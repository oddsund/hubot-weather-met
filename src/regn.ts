import { NowCastResponse, TimeNode, EhancedRobot, EnhancedResponse } from "./types";
import { CanvasRenderService } from "chartjs-node-canvas";
import { WebClient } from "@slack/web-api";
import { ChartConfiguration } from "chart.js";

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

  let answer = `Det regner ikke nå, men det kommer til å regne om ${rainStart} minutter.`;
  if (timeleft - rainStart > 0) {
    answer += ` Det vil starte som ${firstRain} mm/t og ta seg opp til ${max} mm/t iløpet av ${timeleft -
      rainStart} minutter.`;
  } else {
    answer += `Det vil da regne ${firstRain} mm/t.`;
  }
  return answer;
}

function currentlyRaining(precipitation: number[], max: number) {
  let answer = `Det regner ${precipitation[0]} mm/t nå, `;

  const timeleft = precipitation.slice(1).indexOf(max) * 7.5 + 7.5;

  if (max > precipitation[0]) {
    answer += `og det kommer til å øke til ${max} mm/t innen(ca) ${timeleft} minutter.`;
  } else {
    const min = Math.min(...precipitation);
    const timeleftMin = precipitation.slice(1).indexOf(min) * 7.5 + 7.5;
    if (min == precipitation[0]) {
      answer += `og det er ingen ende i syne!`;
    } else {
      answer += `men det kommer til å dabbe av til ${min} mm/t innen(ca) ${timeleftMin} minutter.`;
    }
  }
  return answer;
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
    channels: "ymse",
    initial_comment: createAnswerFromPrecipitation(precipitation, max),
    file: await canvasRenderService.renderToBuffer(configuration)
  });
}

// Should change response to the send function, but context seems to be dropped.
export function parsePrecipitationAndSendAnswer(
  dataJson: NowCastResponse,
  response: EnhancedResponse,
  sendPicture: boolean
) {
  const orderedTimePoints = dataJson.weatherdata.product.time.sort(orderTimeNodes);
  const precipitation = orderedTimePoints.map(value => parseFloat(value.location.precipitation.$.value));
  const max = Math.max(...precipitation);
  if (max === 0) {
    response.send("Det kommer (antakeligvis) ikke til å regne de neste 2 timene.");
  } else if (sendPicture) {
    makeAPicture(precipitation, max, response);
  } else {
    response.send(createAnswerFromPrecipitation(precipitation, max));
  }
}
