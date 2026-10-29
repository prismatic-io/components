const singleFile = {
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
};

export const getFilesExamplePayload = {
  data: {
    success: true,
    data: [singleFile],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: true,
        next_start: 100,
      },
    },
  },
};

export const addFileExamplePayload = {
  data: {
    success: true,
    data: {
      ...singleFile,
      add_time: "2020-02-20 14:36:35",
      update_time: "2020-02-20 14:36:31",
      name: "IMG_8189.jpg",
      description: "",
    },
  },
};

export const getFileExamplePayload = {
  data: {
    success: true,
    data: singleFile,
  },
};

export const updateFileExamplePayload = {
  data: {
    success: true,
    data: singleFile,
  },
};

export const deleteFileExamplePayload = {
  data: {
    success: true,
    data: { id: 123 },
  },
};

export const downloadFileExamplePayload = {
  data: Buffer.from("Hello, World"),
  contentType: "text/plain",
};
