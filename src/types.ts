import { Robot } from "hubot";
import { Options, ScopedClient } from "scoped-http-client";

export type EhancedRobot = Robot<{ options: { token: string } }> & {
  http(url: string, options?: Options): ScopedClient;
  logger: {
    info(input: string): void;
  };
};

export type EnhancedResponse = Hubot.Response<EhancedRobot> & {
  robot: EhancedRobot;
};

export type PostMessageResponse = {
  ok: boolean;
  channel: string;
  ts: string;
  message: {
    text: string;
    username: string;
    bot_id: string;
    attachments: [
      {
        text: string;
        id: number;
        fallback: string;
      }
    ];
    type: string;
    subtype: string;
    ts: string;
  };
};

export type TimeNode = {
  $: { datatype: string; from: string; to: string };
  location: {
    $: { latitude: string; longitude: string };
    precipitation: {
      $: {
        unit: string;
        value: string;
      };
    };
  };
};

export type NowCastResponse = {
  weatherdata: {
    $: {
      "xmlns:xsi": string;
      "xsi:noNamespaceSchemaLocation": string;
      created: string;
    };
    meta: {
      model: {
        $: {
          name: "NowCast";
          termin: string;
          runended: string;
          nextrun: string;
          from: string;
          to: string;
        };
      };
    };
    product: {
      $: {
        class: string;
      };
      time: TimeNode[];
    };
  };
};
