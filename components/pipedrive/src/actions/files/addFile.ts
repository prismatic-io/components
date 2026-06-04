import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import FormData from "form-data";

export const addFile = action({
  display: {
    label: "Add File",
    description:
      "Uploads and adds a new file to a deal, person, organization, product, activity, or lead.",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const formData = new FormData();
    formData.append(`${params.entityType}_id`, params.entityId);
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await client.post("/files", formData, {
      headers: formData.getHeaders(),
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    file: input({
      label: "File",
      type: "data",
      required: true,
      comments: "The file to upload - either string contents or a binary file",
      clean: util.types.toBufferDataPayload,
    }),
    fileName: input({
      label: "File Name",
      type: "string",
      required: true,
      comments: "The name of the file to upload",
      clean: util.types.toString,
    }),
    entityType: input({
      label: "Entity Type",
      comments: "The type of entity to attach the file to",
      type: "string",
      required: true,
      model: [
        { label: "Deal", value: "deal" },
        { label: "Person", value: "person" },
        { label: "Organization", value: "org" },
        { label: "Product", value: "product" },
        { label: "Activity", value: "activity" },
        { label: "Lead", value: "lead" },
      ],
      clean: util.types.toString,
    }),
    entityId: input({
      label: "Entity ID",
      type: "string",
      required: true,
      comments:
        "The numerical ID of the deal, person, org, product or activity, or UUID of the lead to associate this file with.",
      clean: util.types.toString,
    }),
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
        update_time: "2020-02-20 14:36:31",
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
        name: "IMG_8189.jpg",
        description: "",
      },
    },
  },
});
