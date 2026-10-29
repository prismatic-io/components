import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createScanPunchExamplePayload } from "../../examplePayloads";
import { createScanPunchInputs } from "../../inputs";
import { createScanPunchOutputSchema } from "../../outputSchemas";

export const createScanPunch = action({
  display: {
    label: "Create Scan/Punch",
    description:
      "Performs a scan punch operation where the first scan represents an “IN” punch and the next scan represents an “OUT” punch.",
  },
  inputs: createScanPunchInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, badgeID, clockingType }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const now = new Date().toISOString();
    const { data } = await axiosClient.post(
      "/events/time/v1/data-collection-entries.process",
      {
        events: [
          {
            serviceCategoryCode: {
              codeValue: "core",
            },
            data: {
              transform: {
                dataCollectionEntries: [
                  {
                    itemID: "0",
                    terminalName: "CLOCK1",
                    workerDataCollectionEntries: [
                      {
                        entryID: "0",
                        entryCode: {
                          codeValue: "",
                        },
                        badgeID,
                        deviceDateTime: now,
                        entryDateTime: now,
                        actionCode: {
                          codeValue: clockingType,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createScanPunchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createScanPunchOutputSchema,
  }),
  examplePayload: createScanPunchExamplePayload,
});
