import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  events,
  ip,
  verbose,
  redirect,
  img,
  region,
  useProjectToken,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { trackEventsExamplePayload } from "../../examplePayloads";

export const trackEvents = action({
  display: {
    label: "Track Events",
    description: "Track events to Mixpanel from client devices.",
  },
  inputs: {
    connection: connectionInput,
    useProjectToken: { ...useProjectToken, default: "true" },
    region,
    ip,
    verbose,
    redirect,
    img,
    events,
  },
  perform: async (
    context,
    { connection, events, ip, verbose, redirect, img, region, useProjectToken },
  ) => {
    const client = createClient(
      region,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post("/track", events, {
      params: {
        ip: ip || undefined,
        verbose: verbose || undefined,
        redirect: redirect || undefined,
        img: img || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: trackEventsExamplePayload,
});
