const productRecord = {
  id: 1,
  name: "Professional Software License",
  code: "PROD-001",
  unit: "license",
  tax: 10,
  active_flag: true,
  selectable: true,
  visible_to: "3",
  owner_id: {
    id: 18487521,
    name: "Developer",
    email: "dev@test.dev",
    has_pic: 0,
    pic_hash: null,
    active_flag: true,
    value: 18487521,
  },
  first_char: "P",
  prices: [
    {
      id: 1,
      product_id: 1,
      price: 499,
      currency: "USD",
      cost: 100,
      overhead_cost: 25,
    },
  ],
  add_time: "2024-09-27 14:30:00",
  update_time: "2024-09-27 14:30:00",
  files_count: 0,
  followers_count: 1,
};
export const getProductsExamplePayload = {
  data: {
    success: true,
    data: [productRecord],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const addProductExamplePayload = {
  data: {
    success: true,
    data: productRecord,
  },
};
export const deleteProductExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const getProductExamplePayload = {
  data: {
    success: true,
    data: productRecord,
  },
};
export const updateProductExamplePayload = {
  data: {
    success: true,
    data: productRecord,
  },
};
export const getProductDealsExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 1,
        title: "Enterprise License Deal",
        value: 5000,
        currency: "USD",
        status: "open",
        stage_id: 1,
        pipeline_id: 1,
        add_time: "2024-09-27 14:25:27",
        update_time: "2024-09-27 14:25:28",
        person_id: 3,
        org_id: 2,
        user_id: 18487521,
        active: true,
        deleted: false,
      },
    ],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};
export const getProductFilesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 1,
        user_id: 18487521,
        deal_id: null,
        person_id: null,
        org_id: null,
        product_id: 1,
        activity_id: null,
        lead_id: null,
        log_id: null,
        add_time: "2024-09-27 14:35:00",
        update_time: "2024-09-27 14:35:00",
        file_name: "product-spec.pdf",
        file_type: "pdf",
        file_size: 102400,
        active_flag: true,
        inline_flag: false,
        remote_location: "",
        remote_id: "",
        s3_bucket: null,
        description: "Product specification document",
        name: "Product Spec",
        url: "https://app.pipedrive.com/api/v1/files/1/download",
      },
    ],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};
export const getProductFollowersExamplePayload = {
  data: {
    success: true,
    data: [
      {
        user_id: 18487521,
        id: 1,
        person_id: null,
        add_time: "2024-09-27 14:30:00",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const addProductFollowerExamplePayload = {
  data: {
    success: true,
    data: {
      user_id: 18487521,
      id: 1,
      product_id: 1,
      add_time: "2024-09-27 14:30:00",
    },
  },
};
export const deleteProductFollowerExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const getProductUsersExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 18487521,
        name: "Developer",
        email: "dev@test.dev",
        has_pic: 0,
        pic_hash: null,
        active_flag: true,
      },
    ],
  },
};
