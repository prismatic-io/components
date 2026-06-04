import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, fileIdInput } from "../../inputs";

export const getFile = action({
  display: {
    label: "Get File Metadata by ID",
    description: "Gets metadata about one file by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/files/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: fileIdInput,
  },
  examplePayload: {
    data: {
      success: true,
      data: {
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
        org_name: "",
        product_name: "",
        lead_name: "Test lead name",
        url: "https://2a7f.pipedrive.com/v1/files/123/download",
        name: "test file name",
        description: "test file description",
      },
    },
  },
});
