import { Robot } from "hubot";
import { Options, ScopedClient } from "scoped-http-client";
export * from "./metApiTypes";
export { document as ApiMet } from "./metApiTypes";

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
