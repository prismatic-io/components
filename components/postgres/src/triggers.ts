import { input, pollingTrigger, util } from "@prismatic-io/spectral";
import { connectionInput } from "./inputs";
import { createDB } from "./client";

interface PollingState extends Record<string, unknown> {
  cursor: string;
  cursorField: string;
  tableName: string;
}

export const pollTable = pollingTrigger({
  display: {
    label: "New and Updated Records to Table",
    description: "Checks for new and updated records to a table",
  },
  inputs: {
    postgresConnection: connectionInput,
    tableName: input({
      label: "Table Name",
      example: "people",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
    cursorField: input({
      label: "Cursor Field",
      default: "updated_at",
      comments:
        "A field that is used to track new results. If your table has an auto incrementing integer ID, you can use the ID. If it has a 'created at' or 'updated at' timestamp, you can use those. Each time this trigger runs, it checks for records with values that are greater than the largest value from last time it was run.",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
    castTimestampsToString: input({
      label: "Cast timestamps to strings",
      default: "true",
      comments:
        "Select this option if your cursor field is a timestamp. PostgreSQL tracks microseconds, but JavaScript dates are measured in milliseconds. When fetching TIME, TIMETZ, TIMESTAMP, TIMESTAMPTZ fields, some precision can be lost. By casting timestamp values to strings, you can retain precision.",
      type: "boolean",
      clean: util.types.toBool,
    }),
  },
  perform: async (context, payload, params) => {
    const db = createDB({
      connection: params.postgresConnection,
      castTimestampsToString: params.castTimestampsToString,
    });
    const state = context.polling.getState() as unknown as PollingState;

    if (
      !state?.cursor ||
      state.cursorField !== params.cursorField ||
      state.tableName !== params.tableName
    ) {
      try {
        const { cursor } = await db.one(
          "SELECT MAX(${cursorField:name}) AS cursor FROM ${table:name}",
          { cursorField: params.cursorField, table: params.tableName },
        );
        const newState: PollingState = {
          cursor,
          cursorField: params.cursorField,
          tableName: params.tableName,
        };
        context.polling.setState(newState);
        context.logger.log(
          `First time running. Next time records with "${params.cursorField}" greater than "${cursor}" will be fetched.`,
        );
        return {
          payload,
          polledNoChanges: true,
        };
      } finally {
        await db.$pool.end();
      }
    }

    try {
      const {
        records,
        cursorQuery: { cursor },
      } = await db.tx(async (task) => {
        return {
          records: await task.manyOrNone(
            "SELECT * FROM ${table:name} WHERE ${cursorField:name} > ${oldCursor}",
            {
              table: params.tableName,
              cursorField: params.cursorField,
              oldCursor: state.cursor,
            },
          ),
          cursorQuery: await task.one(
            "SELECT MAX(${cursorField:name}) AS cursor FROM ${table:name}",
            { cursorField: params.cursorField, table: params.tableName },
          ),
        };
      });

      if (records.length > 0) {
        const newState: PollingState = {
          cursor,
          cursorField: params.cursorField,
          tableName: params.tableName,
        };
        context.polling.setState(newState);
        return {
          payload: { ...payload, body: { data: records } },
          polledNoChanges: false,
        };
      } else {
        return { payload, polledNoChanges: true };
      }
    } finally {
      await db.$pool.end();
    }
  },
});

export default { pollTable };
