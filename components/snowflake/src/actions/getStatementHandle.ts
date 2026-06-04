import { type ActionContext, action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { getStatementHandleCompletedExamplePayload } from "../examplePayloads";
import {
  accountLocator,
  partition,
  snowflakeConnectionInput,
  snowflakeUrl,
  statementHandleId,
} from "../inputs";

export const getStatementHandle = action({
  display: {
    label: "Get Statement Handle",
    description: "Retrieve the current status of a executed statement from Snowflake.",
  },
  perform: async (
    context: ActionContext,
    { snowflakeConnectionInput, snowflakeUrl, accountLocator, statementHandleId, partition },
  ) => {
    const snowflakeClient = getClient(
      snowflakeConnectionInput,
      snowflakeUrl,
      accountLocator,
      context.debug.enabled,
    );

    const { data } = await snowflakeClient.get(`/api/v2/statements/${statementHandleId}`, {
      params: {
        partition: partition || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    snowflakeConnectionInput,
    snowflakeUrl,
    accountLocator,
    statementHandleId,
    partition,
  },
  examplePayload: getStatementHandleCompletedExamplePayload,
});
