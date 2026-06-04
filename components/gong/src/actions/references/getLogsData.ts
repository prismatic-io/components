import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  cursor,
  fromDateTime,
  logType,
  toDateTime,
} from "../../inputs";

export const getLogsDataByTypeAndTimeRange = action({
  display: {
    label: "Get Logs Data by Type and Time Range",
    description:
      "List log entries that took place during a specified time range.",
  },
  perform: async (
    context,
    { connection, cursor, fromDateTime, toDateTime, logType },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/logs`, {
      params: { cursor, fromDateTime, toDateTime, logType },
    });
    return { data };
  },
  inputs: {
    connection,
    cursor,
    logType,
    fromDateTime,
    toDateTime: {
      ...toDateTime,
      comments:
        "The time until which to retrieve log records, in the ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC); if not specified, the logs end with the latest recorded log.",
      required: false,
    },
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      records: {
        totalRecords: 263,
        currentPageSize: 100,
        currentPageNumber: 0,
        cursor:
          "eyJhbGciOiJIUzI1NiJ9.eyJjYWxsSWQiM1M30.6qKwpOcvnuweTZmFRzYdtjs_YwJphJU4QIwWFM",
      },
      logEntries: [
        {
          userId: "234599484848423",
          userEmailAddress: "test@test.com",
          userFullName: "Jon Snow",
          impersonatorUserId: "234599484848423",
          impersonatorEmailAddress: "test@test.com",
          impersonatorFullName: "Jon Snow",
          impersonatorCompanyId: "234599484848423",
          eventTime: "2018-02-17T02:30:00-08:00",
          logRecord: {},
        },
      ],
    },
  },
});
