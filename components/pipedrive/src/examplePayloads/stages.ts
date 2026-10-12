const stageRecord = {
  id: 1,
  order_nr: 1,
  name: "Qualified",
  active_flag: true,
  deal_probability: 20,
  pipeline_id: 1,
  pipeline_name: "Sales Pipeline",
  pipeline_deal_probability: true,
  rotten_flag: false,
  rotten_days: null,
  add_time: "2024-01-01 00:00:00",
  update_time: "2024-01-01 00:00:00",
};
export const getStagesExamplePayload = {
  data: {
    success: true,
    data: [
      stageRecord,
      {
        id: 2,
        order_nr: 2,
        name: "Contact Made",
        active_flag: true,
        deal_probability: 40,
        pipeline_id: 1,
        pipeline_name: "Sales Pipeline",
        pipeline_deal_probability: true,
        rotten_flag: true,
        rotten_days: 14,
        add_time: "2024-01-01 00:00:00",
        update_time: "2024-01-01 00:00:00",
      },
      {
        id: 3,
        order_nr: 3,
        name: "Proposal Made",
        active_flag: true,
        deal_probability: 60,
        pipeline_id: 1,
        pipeline_name: "Sales Pipeline",
        pipeline_deal_probability: true,
        rotten_flag: true,
        rotten_days: 30,
        add_time: "2024-01-01 00:00:00",
        update_time: "2024-01-01 00:00:00",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const addStageExamplePayload = {
  data: {
    success: true,
    data: stageRecord,
  },
};
export const deleteStageExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};
export const getStageExamplePayload = {
  data: {
    success: true,
    data: stageRecord,
  },
};
export const updateStageExamplePayload = {
  data: {
    success: true,
    data: stageRecord,
  },
};
export const getStageDealsExamplePayload = {
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
