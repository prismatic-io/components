const pipelineRecord = {
  id: 1,
  name: "Sales Pipeline",
  url_title: "Sales-Pipeline",
  order_nr: 1,
  active: true,
  deal_probability: true,
  add_time: "2024-01-01 00:00:00",
  update_time: "2024-01-01 00:00:00",
  selected: true,
};

export const getPipelinesExamplePayload = {
  data: {
    success: true,
    data: [
      pipelineRecord,
      {
        id: 2,
        name: "Enterprise Pipeline",
        url_title: "Enterprise-Pipeline",
        order_nr: 2,
        active: true,
        deal_probability: false,
        add_time: "2024-03-15 09:00:00",
        update_time: "2024-03-15 09:00:00",
        selected: false,
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const addPipelineExamplePayload = {
  data: {
    success: true,
    data: pipelineRecord,
  },
};

export const deletePipelineExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};

export const getPipelineExamplePayload = {
  data: {
    success: true,
    data: pipelineRecord,
  },
};

export const updatePipelineExamplePayload = {
  data: {
    success: true,
    data: pipelineRecord,
  },
};

export const getPipelineConversionStatisticsExamplePayload = {
  data: {
    success: true,
    data: {
      stage_conversions: [
        {
          from_stage_id: 1,
          to_stage_id: 2,
          conversion_rate: 75,
        },
        {
          from_stage_id: 2,
          to_stage_id: 3,
          conversion_rate: 50,
        },
      ],
      won_conversion: 25,
      lost_conversion: 15,
    },
  },
};

export const getPipelineDealsExamplePayload = {
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
        owner_id: 18487521,
        expected_close_date: "2024-12-31",
        probability: null,
        active: true,
        deleted: false,
        won_time: null,
        lost_time: null,
        close_time: null,
        lost_reason: null,
        visible_to: "3",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const getPipelineMovementStatisticsExamplePayload = {
  data: {
    success: true,
    data: {
      movements_between_stages: {
        count: 12,
      },
      new_deals: {
        count: 8,
        deals_ids: [1, 2, 3, 4, 5, 6, 7, 8],
        values: {
          USD: 42000,
        },
        formatted_values: {
          USD: "$42,000",
        },
      },
      deals_left_open: {
        count: 5,
        deals_ids: [1, 2, 3, 4, 5],
        values: {
          USD: 25000,
        },
        formatted_values: {
          USD: "$25,000",
        },
      },
      won_deals: {
        count: 2,
        deals_ids: [6, 7],
        values: {
          USD: 12000,
        },
        formatted_values: {
          USD: "$12,000",
        },
      },
      lost_deals: {
        count: 1,
        deals_ids: [8],
        values: {
          USD: 5000,
        },
        formatted_values: {
          USD: "$5,000",
        },
      },
      average_age_in_days: {
        across_all_stages: 14.5,
      },
    },
  },
};
