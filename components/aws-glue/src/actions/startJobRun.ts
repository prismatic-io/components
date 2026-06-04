import { StartJobRunCommand } from "@aws-sdk/client-glue";
import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { startJobRunExamplePayload } from "../examplePayloads";
import {
  args,
  awsRegion,
  capacity,
  connectionInput,
  name,
  security,
} from "../inputs";

export const startJobRun = action({
  display: {
    label: "Start Job Run",
    description: "Starts a job run using a AWS Glue job definition.",
  },
  perform: async (
    context,
    { awsRegion, name, capacity, security, args, awsConnection },
  ) => {
    const glue = await createClient({ awsRegion, awsConnection });
    const argumentsData: Record<string, string> =
      util.types.keyValPairListToObject(args);
    const startCrawlerParams = {
      JobName: util.types.toString(name),
      MaxCapacity: util.types.toInt(capacity),
      Arguments: argumentsData,
      SecurityConfiguration:
        typeof security === "undefined"
          ? util.types.toString(security)
          : undefined,
    };
    const command = new StartJobRunCommand(startCrawlerParams);
    const response = await glue.send(command);
    return {
      data: response,
    };
  },
  inputs: {
    awsRegion,
    name: { ...name, dataSource: "selectJob" },
    capacity,
    security,
    args,
    awsConnection: connectionInput,
  },
  examplePayload: startJobRunExamplePayload,
});
