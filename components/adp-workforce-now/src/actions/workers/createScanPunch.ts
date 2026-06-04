import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPunchResponse } from "../../examplePayloads";
import { badgeID, clockingType, connection } from "../../inputs";

export const createScanPunch = action({
  display: {
    label: "Create Scan/Punch",
    description:
      "Performs a scan punch operation where the first scan represents an “IN” punch and the next scan represents an “OUT” punch.",
  },
  inputs: {
    badgeID,
    clockingType,
    connection,
  },
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
  examplePayload: {
    data: createPunchResponse,
  },
});
