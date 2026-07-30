import { Request } from "express";
import { ParsedUrlQuery } from "querystring";

interface requestprops {
  body?: object;
  query?: object;
  params?: object;
  locals?: Record<string, unknown>;
  cookies?: object;
}

type CustomRequest<C extends requestprops = Record<string, unknown>> = Request<
  C["params"] extends object
    ? C["params"] & Record<string, unknown>
    : Record<string, unknown>,
  unknown,
  C["body"] extends object ? C["body"] : Record<string, unknown>,
  C["query"] extends object
    ? C["query"] & Record<string, unknown>
    : Record<string, unknown>,
  C["locals"] extends Record<string, unknown>
    ? C["locals"]
    : Record<string, unknown>
> & {
  app: Request["app"] & {
    locals?: { user?: string } & C["locals"] extends Record<string, unknown>
      ? Partial<C["locals"]>
      : Record<string, unknown>;
  };
  cookies: {
    refresh_token: string;
    access_token: string;
  } & C["cookies"];
};

export type { CustomRequest };
