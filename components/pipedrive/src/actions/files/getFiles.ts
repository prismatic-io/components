import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getFiles = action({
  display: {
    label: "List Files",
    description: "Lists all files attached to all entities.",
  },
  perform: async (context, { connection, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/files", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
  examplePayload: {
    data: {
      success: true,
      data: [
        {
          id: 123,
          user_id: 456,
          deal_id: 1,
          person_id: 789,
          org_id: 1,
          product_id: 1,
          activity_id: 1,
          lead_id: "adf21080-0e10-11eb-879b-05d71fb426ec",
          log_id: null,
          add_time: "2020-02-20 14:36:35",
          update_time: "2020-02-20 14:57:33",
          file_name: "IMG_8189_52233498214699de9579e7b304a81b157b2eb2137e8062.jpg",
          file_type: "img",
          file_size: 7801780,
          active_flag: true,
          inline_flag: false,
          remote_location: "googledocs",
          remote_id: "1mT6jshiv6537IirwOExXJuG1jdR4F0FQ",
          cid: "",
          s3_bucket: "",
          mail_message_id: "",
          mail_template_id: "",
          deal_name: "",
          person_name: "Person",
          lead_name: "Test lead name",
          org_name: "",
          product_name: "",
          url: "https://2a7f.pipedrive.com/v1/files/123/download",
          name: "test file name",
          description: "test file description",
        },
      ],
      additional_data: {
        pagination: {
          start: 0,
          limit: 100,
          more_items_in_collection: true,
          next_start: 100,
        },
      },
    },
  },
});
