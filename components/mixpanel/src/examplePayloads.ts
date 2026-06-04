


















export const trackEventsExamplePayload = {
  data: {
    code: 200,
    num_records_imported: 2000,
    status: "OK",
  },
};







export const importEventsExamplePayload = {
  data: {
    code: 200,
    num_records_imported: 2000,
    status: "OK",
  },
};











export const createProfileExamplePayload = {
  data: {
    code: 200,
    num_records_imported: 2000,
    status: "OK",
  },
};







export const queryProfilesExamplePayload = {
  data: {
    page: 0,
    page_size: 1000,
    results: [
      {
        $distinct_id: 4,
        $properties: {
          $created: "2008-12-12T11:20:47",
          $email: "example@mixpanel.com",
          $first_name: "Example",
          $last_name: "Name",
          $last_seen: "2008-06-09T23:08:40",
        },
      },
    ],
    session_id: "1234567890-EXAMPL",
    status: "ok",
    total: 1,
  },
};







export const updateMultipleProfilesExamplePayload = {
  data: 1,
};







export const deleteProfileExamplePayload = {
  data: {
    code: 200,
    num_records_imported: 2000,
    status: "OK",
  },
};











export const createIdentityExamplePayload = {
  data: 1,
};







export const createAliasExamplePayload = {
  data: 1,
};











export const listPipelinesExamplePayload = {
  data: {
    "9876543210": [
      {
        name: "events-daily-bigquery-monoschema",
        Dispatcher: "backfill",
        last_dispatched: "2019-02-01 12:00:00 US/Pacific",
        frequency: "hourly",
        sync_enabled: "true",
      },
    ],
  },
};







export const getPipelineExamplePayload = {
  data: {
    canceled: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
    retried: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
    succeeded: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
  },
};







export const createGCSPipelineExamplePayload = {
  data: {
    canceled: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
    retried: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
    succeeded: [
      {
        project_id: 0,
        name: "string",
        state: "string",
        last_finish: "string",
        run_at: "string",
        from_date: "string",
        to_date: "string",
      },
    ],
  },
};







export const editGCSPipelineExamplePayload = {
  data: null,
};







export const deletePipelineExamplePayload = {
  data: null,
};











export const listSavedFunnelsExamplePayload = {
  data: [
    {
      funnel_id: 7509,
      name: "Signup funnel",
    },
    {
      funnel_id: 9070,
      name: "Funnel tutorial",
    },
  ],
};







export const queryFunnelSavedReportsExamplePayload = {
  data: {
    meta: {
      dates: ["2016-09-12", "2016-09-19", "2016-09-26"],
    },
    data: {
      "2016-09-12": {
        steps: [
          {
            count: 32688,
            avg_time: 2,
            avg_time_from_start: 5,
            step_conv_ratio: 1,
            goal: "App Open",
            overall_conv_ratio: 1,
            event: "App Open",
          },
          {
            count: 20524,
            avg_time: 133,
            avg_time_from_start: 133,
            step_conv_ratio: 0.627875673029858,
            goal: "$custom_event:12345",
            step_label: "Game Played",
            custom_event: true,
            custom_event_id: 12345,
            overall_conv_ratio: 0.627875673029858,
            event: "$custom_event:12345",
          },
        ],
        analysis: {
          completion: 20524,
          starting_amount: 32688,
          steps: 2,
          worst: 1,
        },
      },
      "2016-09-19": {
        steps: [
          {
            count: 32486,
            avg_time: 10,
            avg_time_from_start: 10,
            step_conv_ratio: 1,
            goal: "App Open",
            overall_conv_ratio: 1,
            event: "App Open",
          },
          {
            count: 20809,
            avg_time: 75,
            avg_time_from_start: 75,
            step_conv_ratio: 0.6405528535369082,
            goal: "$custom_event:12345",
            step_label: "Game Played",
            custom_event: true,
            custom_event_id: 12345,
            overall_conv_ratio: 0.6405528535369082,
            event: "$custom_event:12345",
          },
        ],
        analysis: {
          completion: 20809,
          starting_amount: 32486,
          steps: 2,
          worst: 1,
        },
      },
      "2016-09-26": {
        steps: [
          {
            count: 16103,
            avg_time: 10,
            avg_time_from_start: 5,
            step_conv_ratio: 1,
            goal: "App Open",
            overall_conv_ratio: 1,
            event: "App Open",
          },
          {
            count: 12679,
            avg_time: 571,
            avg_time_from_start: 571,
            step_conv_ratio: 0.7873688132646091,
            goal: "$custom_event:12345",
            step_label: "Game Played",
            custom_event: true,
            custom_event_id: 12345,
            overall_conv_ratio: 0.7873688132646091,
            event: "$custom_event:12345",
          },
        ],
        analysis: {
          completion: 12679,
          starting_amount: 16103,
          steps: 2,
          worst: 1,
        },
      },
    },
  },
};











export const queryInsightsSavedReportsExamplePayload = {
  data: {
    computed_at: "2020-09-21T16:35:41.252314+00:00",
    date_range: {
      from_date: "2020-08-31T00:00:00-07:00",
      to_date: "2020-09-12T23:59:59.999000-07:00",
    },
    headers: ["$event"],
    series: {
      "Logged in": {
        "2020-08-31T00:00:00-07:00": 9852,
        "2020-09-07T00:00:00-07:00": 4325,
      },
      "Viewed page": {
        "2020-08-31T00:00:00-07:00": 10246,
        "2020-09-07T00:00:00-07:00": 11432,
      },
    },
  },
};











export const downloadDataExamplePayload = {
  data: [
    {
      event: "Signed up",
      properties: {
        time: 1602611311,
        $insert_id: "hpuDqcvpltpCjBsebtxwadtEBDnFAdycabFb",
        mp_processing_time_ms: 1602625711874,
      },
    },
    {
      event: "Signed up",
      properties: {
        time: 1602787121,
        $insert_id: "jajcebutltmvhbbholfhxtCcycwnBjDtndha",
        mp_processing_time_ms: 1602801521561,
      },
    },
  ],
};












export const customJQLQueryExamplePayload = {
  data: 1,
};
