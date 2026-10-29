export const addMeetingRegistrantExamplePayload = {
  data: {
    id: 85746065,
    join_url: "https://example.com/j/11111",
    registrant_id: "fdgsfh2ey82fuh",
    start_time: "2021-07-13T21:44:51Z",
    topic: "My Meeting",
    occurrences: [
      {
        duration: 60,
        occurrence_id: "1648194360000",
        start_time: "2022-03-25T07:46:00Z",
        status: "available",
      },
    ],
    participant_pin_code: 380303,
  },
};

export const createMeetingExamplePayload = {
  data: {
    assistant_id: "kFFvsJc-Q1OSxaJQLvaa_A",
    host_email: "jchill@example.com",
    id: 92674392836,
    registration_url:
      "https://example.com/meeting/register/7ksAkRCoEpt1Jm0wa-E6lICLur9e7Lde5oW6",
    agenda: "My Meeting",
    created_at: "2022-03-25T07:29:29Z",
    duration: 60,
    encrypted_password: "8pEkRweVXPV3Ob2KJYgFTRlDtl1gSn.1",
    pstn_password: "123456",
    h323_password: "123456",
    join_url: "https://example.com/j/11111",
    chat_join_url: "https://example.com/launch/jc/11111",
    occurrences: [
      {
        duration: 60,
        occurrence_id: "1648194360000",
        start_time: "2022-03-25T07:46:00Z",
        status: "available",
      },
    ],
    password: "123456",
    pmi: "97891943927",
    pre_schedule: false,
    recurrence: {
      end_date_time: "2022-04-02T15:59:00Z",
      end_times: 7,
      monthly_day: 1,
      monthly_week: 1,
      monthly_week_day: 1,
      repeat_interval: 1,
      type: 1,
      weekly_days: "1",
    },
    settings: {
      allow_multiple_devices: true,
      alternative_hosts: "jchill@example.com;thill@example.com",
      alternative_hosts_email_notification: true,
      alternative_host_update_polls: true,
      approval_type: 0,
      approved_or_denied_countries_or_regions: {
        approved_list: ["CX"],
        denied_list: ["CA"],
        enable: true,
        method: "approve",
      },
      audio: "telephony",
      audio_conference_info: "test",
      authentication_domains: "example.com",
      authentication_exception: [
        {
          email: "jchill@example.com",
          name: "Jill Chill",
          join_url: "https://example.com/s/11111",
        },
      ],
      authentication_name: "Sign in to Zoom",
      authentication_option: "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
      auto_recording: "cloud",
      breakout_room: {
        enable: true,
        rooms: [
          {
            name: "room1",
            participants: ["jchill@example.com"],
          },
        ],
      },
      calendar_type: 1,
      close_registration: false,
      contact_email: "jchill@example.com",
      contact_name: "Jill Chill",
      custom_keys: [
        {
          key: "key1",
          value: "value1",
        },
      ],
      email_notification: true,
      encryption_type: "enhanced_encryption",
      focus_mode: true,
      global_dial_in_countries: ["US"],
      global_dial_in_numbers: [
        {
          city: "New York",
          country: "US",
          country_name: "US",
          number: "+1 1000200200",
          type: "toll",
        },
      ],
      host_video: true,
      jbh_time: 0,
      join_before_host: true,
      language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            languages: "US,FR",
          },
        ],
      },
      sign_language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            sign_language: "American",
          },
        ],
      },
      meeting_authentication: true,
      mute_upon_entry: false,
      participant_video: false,
      private_meeting: false,
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      registration_type: 1,
      show_share_button: true,
      use_pmi: false,
      waiting_room: false,
      watermark: false,
      host_save_video_order: true,
      internal_meeting: false,
      meeting_invitees: [
        {
          email: "jchill@example.com",
        },
      ],
      continuous_meeting_chat: {
        enable: true,
        auto_add_invited_external_users: true,
        channel_id: "cabc1234567defghijkl01234",
      },
      participant_focused_meeting: false,
      push_change_to_calendar: false,
      resources: [
        {
          resource_type: "whiteboard",
          resource_id: "X4Hy02w3QUOdskKofgb9Jg",
          permission_level: "editor",
        },
      ],
      auto_start_meeting_summary: false,
      auto_start_ai_companion_questions: false,
    },
    start_time: "2022-03-25T07:29:29Z",
    start_url: "https://example.com/s/11111",
    timezone: "America/Los_Angeles",
    topic: "My Meeting",
    tracking_fields: [
      {
        field: "field1",
        value: "value1",
        visible: true,
      },
    ],
    type: 2,
  },
};

export const getMeetingExamplePayload = {
  data: {
    assistant_id: "kFFvsJc-Q1OSxaJQLvaa_A",
    host_email: "jchill@example.com",
    host_id: "30R7kT7bTIKSNUFEuH_Qlg",
    id: 97763643886,
    uuid: "aDYlohsHRtCd4ii1uC2+hA==",
    agenda: "My Meeting",
    created_at: "2022-03-25T07:29:29Z",
    duration: 60,
    encrypted_password: "8pEkRweVXPV3Ob2KJYgFTRlDtl1gSn.1",
    pstn_password: "123456",
    h323_password: "123456",
    join_url: "https://example.com/j/11111",
    chat_join_url: "https://example.com/launch/jc/11111",
    occurrences: [
      {
        duration: 60,
        occurrence_id: "1648194360000",
        start_time: "2022-03-25T07:46:00Z",
        status: "available",
      },
    ],
    password: "123456",
    pmi: "97891943927",
    pre_schedule: false,
    recurrence: {
      end_date_time: "2022-04-02T15:59:00Z",
      end_times: 7,
      monthly_day: 1,
      monthly_week: 1,
      monthly_week_day: 1,
      repeat_interval: 1,
      type: 1,
      weekly_days: "1",
    },
    settings: {
      allow_multiple_devices: true,
      alternative_hosts: "jchill@example.com;thill@example.com",
      alternative_hosts_email_notification: true,
      alternative_host_update_polls: true,
      approval_type: 0,
      approved_or_denied_countries_or_regions: {
        approved_list: ["CX"],
        denied_list: ["CA"],
        enable: true,
        method: "approve",
      },
      audio: "telephony",
      audio_conference_info: "test",
      authentication_domains: "example.com",
      authentication_exception: [
        {
          email: "jchill@example.com",
          name: "Jill Chill",
          join_url: "https://example.com/s/11111",
        },
      ],
      authentication_name: "Sign in to Zoom",
      authentication_option: "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
      auto_recording: "cloud",
      breakout_room: {
        enable: true,
        rooms: [
          {
            name: "room1",
            participants: ["jchill@example.com"],
          },
        ],
      },
      calendar_type: 1,
      close_registration: false,
      contact_email: "jchill@example.com",
      contact_name: "Jill Chill",
      custom_keys: [
        {
          key: "key1",
          value: "value1",
        },
      ],
      email_notification: true,
      encryption_type: "enhanced_encryption",
      focus_mode: true,
      global_dial_in_countries: ["US"],
      global_dial_in_numbers: [
        {
          city: "New York",
          country: "US",
          country_name: "US",
          number: "+1 1000200200",
          type: "toll",
        },
      ],
      host_video: true,
      jbh_time: 0,
      join_before_host: true,
      language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            languages: "US,FR",
          },
        ],
      },
      sign_language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            sign_language: "American",
          },
        ],
      },
      meeting_authentication: true,
      mute_upon_entry: false,
      participant_video: false,
      private_meeting: false,
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      registration_type: 1,
      show_share_button: true,
      use_pmi: false,
      waiting_room: false,
      watermark: false,
      host_save_video_order: true,
      internal_meeting: false,
      meeting_invitees: [
        {
          email: "jchill@example.com",
        },
      ],
      continuous_meeting_chat: {
        enable: true,
        auto_add_invited_external_users: true,
        channel_id: "cabc1234567defghijkl01234",
      },
      participant_focused_meeting: false,
      push_change_to_calendar: false,
      resources: [
        {
          resource_type: "whiteboard",
          resource_id: "X4Hy02w3QUOdskKofgb9Jg",
          permission_level: "editor",
        },
      ],
      auto_start_meeting_summary: false,
      auto_start_ai_companion_questions: false,
    },
    start_time: "2022-03-25T07:29:29Z",
    start_url: "https://example.com/s/11111",
    status: "waiting",
    timezone: "America/Los_Angeles",
    topic: "My Meeting",
    tracking_fields: [
      {
        field: "field1",
        value: "value1",
        visible: true,
      },
    ],
    type: 2,
  },
};

export const getMeetingInvitationExamplePayload = {
  data: {
    invitation:
      "Jill Chill is inviting you to a scheduled Zoom meeting.\r\n\r\nTopic: My Meeting\r\nTime: Mar 25, 2022 03:32 PM America, Los_Angeles\r\n\r\nJoin Zoom Meeting\r\nhttps://zoom.us/j/55544443210?pwd=8pEkRweVXPV3Ob2KJYgFTRlDtl1gSn.1\r\n\r\nMeeting ID: 555 4444 3210\r\nPasscode: 123456\r\nOne tap mobile\r\n+5678901234,,55544443210#,,,,*123456# US (gg)\r\n\r\nDial by your location\r\n+1 15550100 US (gg)\r\nMeeting ID: 555 4444 3210\r\nPasscode: 123456\r\nFind your local number: https://zoom.us/u/ab12cdef34jh\r\n\r\nJoin by SIP\r\n5550100@zoomcrc.com\r\n\r\nJoin by H.323\r\n192.0.2.1 (US West)\r\nMeeting ID: 555 4444 3210\r\nPasscode: 123456\r\n\r\n",
    sip_links: ["5550100@zoomcrc.com"],
  },
};

export const getMeetingRecordingsExamplePayload = {
  data: {
    account_id: "Cx3wERazSgup7ZWRHQM8-w",
    duration: 20,
    host_id: "_0ctZtY0REqWalTmwvrdIw",
    id: 6840331990,
    recording_count: 22,
    start_time: "2021-03-18T05:41:36Z",
    topic: "My Personal Meeting",
    total_size: 22,
    type: "1",
    uuid: "BOKXuumlTAGXuqwr3bLyuQ==",
    recording_play_passcode: "yNYIS408EJygs7rE5vVsJwXIz4-VW7MH",
    recording_files: [
      {
        deleted_time: "2021-03-18T05:41:36Z",
        download_url:
          "https://example.com/rec/download/Qg75t7xZBtEbAkjdlgbfdngBBBB",
        file_path: "/9090876528/path01/demo.mp4",
        file_size: 7220,
        file_type: "MP4",
        file_extension: "M4A",
        id: "72576a1f-4e66-4a77-87c4-f13f9808bd76",
        meeting_id: "L0AGOEPVR9m5WSOOs/d+FQ==",
        play_url: "https://example.com/rec/play/Qg75t7xZBtEbAkjdlgbfdngBBBB",
        recording_end: "2021-03-18T05:41:36Z",
        recording_start: "2021-03-18T05:41:36Z",
        recording_type: "shared_screen_with_speaker_view",
        status: "completed",
      },
    ],
    download_access_token:
      "abJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL2V2ZW50Lnpvb20udXMiLCJhY2NvdW50SWQiOiJNdDZzdjR1MFRBeVBrd2dzTDJseGlBIiwiYXVkIjoiaHR0cHM6Ly9vYXV0aC56b29tLnVzIiwibWlkIjoieFp3SEc0c3BRU2VuekdZWG16dnpiUT09IiwiZXhwIjoxNjI2MTM5NTA3LCJ1c2VySWQiOiJEWUhyZHBqclMzdWFPZjdkUGtrZzh3In0.a6KetiC6BlkDhf1dP4KBGUE1bb2brMeraoD45yhFx0eSSSTFdkHQnsKmlJQ-hdo9Zy-4vQw3rOxlyoHv583JyZ",
    password: "981651",
    participant_audio_files: [
      {
        download_url:
          "https://example.com/rec/download/Qg75t7xZBtEbAkjdlgbfdngBBBB",
        file_name: "test.json",
        file_path: "/9090876528/path01/demo.mp4",
        file_size: 65536,
        file_type: "M4A",
        id: "a2f19f96-9294-4f51-8134-6f0eea108eb2",
        play_url: "https://example.com/rec/play/Qg75t7xZBtEbAkjdlgbfdngBBBB",
        recording_end: "2021-06-30T22:14:57Z",
        recording_start: "2021-06-30T22:14:57Z",
        status: "completed",
      },
    ],
  },
};

export const listMeetingRegistrantsExamplePayload = {
  data: {
    registrants: [
      {
        id: "9tboDiHUQAeOnbmudzWa5g",
        address: "1800 Amphibious Blvd.",
        city: "Mountain View",
        comments: "Looking forward to the discussion.",
        country: "US",
        custom_questions: [
          {
            title: "What do you hope to learn from this?",
            value:
              "Look forward to learning how you come up with new recipes and what other services you offer.",
          },
        ],
        email: "jchill@example.com",
        first_name: "Jill",
        industry: "Food",
        job_title: "Chef",
        last_name: "Chill",
        no_of_employees: "1-20",
        org: "Cooking Org",
        phone: "5550100",
        purchasing_time_frame: "1-3 months",
        role_in_purchase_process: "Influencer",
        state: "CA",
        status: "approved",
        zip: "94045",
        create_time: "2022-03-22T05:59:09Z",
        join_url: "https://example.com/j/11111",
        participant_pin_code: 380303,
      },
    ],
  },
};

export const listMeetingsExamplePayload = {
  data: {
    meetings: [
      {
        agenda: "My Meeting",
        created_at: "2022-03-23T05:31:16Z",
        duration: 60,
        host_id: "30R7kT7bTIKSNUFEuH_Qlg",
        id: 97763643886,
        join_url: "https://example.com/j/11111",
        pmi: "97891943927",
        start_time: "2022-03-23T06:00:00Z",
        timezone: "America/Los_Angeles",
        topic: "My Meeting",
        type: 2,
        uuid: "aDYlohsHRtCd4ii1uC2+hA==",
      },
    ],
  },
};

export const getPhoneRecordingsExamplePayload = {
  data: {
    recordings: [
      {
        call_id: "7025841973929235024",
        call_log_id: "8f7345c5-0a65-4182-ab16-72fdb3be61ff",
        callee_name: "User A",
        callee_number: "1000001004",
        callee_number_type: 1,
        caller_name: "User B",
        caller_number: "1000001028",
        caller_number_type: 1,
        outgoing_by: {
          name: "User B",
          extension_number: "123476",
        },
        accepted_by: {
          name: "User A",
          extension_number: "101001",
        },
        date_time: "2021-11-02T05:35:20Z",
        direction: "inbound",
        download_url:
          "https://domain/recording/download/EvVNLihbQ1WpeG_ALwnNzg",
        duration: 11,
        id: "8f7345c50a654182ab1672fdb3be61ff",
        transcript_download_url:
          "https://domain/recording_transcript/download/8f7345c50a654182ab1672fdb3be61ff",
      },
    ],
  },
};

export const createUserExamplePayload = {
  data: {
    email: "jchill@example.com",
    first_name: "Jill",
    id: "KDcuGIm1QgePTO8WbOqwIQ",
    last_name: "Chill",
    type: 1,
  },
};

export const getUserExamplePayload = {
  data: {
    id: "zJKyaiAyTNC-MWjiWC18KQ",
    dept: "Developers",
    email: "jchill@example.com",
    first_name: "Jill",
    last_client_version: "5.9.6.4993(mac)",
    last_login_time: "2021-05-05T20:40:30Z",
    last_name: "Chill",
    pmi: 3542471135,
    role_name: "Admin",
    timezone: "Asia/Shanghai",
    type: 1,
    use_pmi: false,
    display_name: "Jill Chill",
    account_id: "q6gBJVO5TzexKYTb_I2rpg",
    account_number: 10009239,
    cms_user_id: "KDcuGIm1QgePTO8WbOqwIQ",
    company: "Jill",
    user_created_at: "2018-10-31T04:32:37Z",
    custom_attributes: [
      {
        key: "cbf_cywdkexrtqc73f97gd4w6g",
        name: "A1",
        value: "1",
      },
    ],
    employee_unique_id: "HqDyI037Qjili1kNsSIrIg",
    group_ids: ["RSMaSp8sTEGK0_oamiA2_w"],
    im_group_ids: ["t-_-d56CSWG-7BF15LLrOw"],
    jid: "jchill@example.com",
    job_title: "API Developer",
    language: "en-US",
    location: "Paris",
    login_types: [101],
    manager: "thill@example.com",
    personal_meeting_url: "example.com",
    phone_numbers: [
      {
        code: "+1",
        country: "US",
        label: "Mobile",
        number: "800000000",
        verified: true,
      },
    ],
    pic_url: "example.com",
    plan_united_type: "1",
    pronouns: "3123",
    pronouns_option: 1,
    role_id: "0",
    status: "pending",
    vanity_url: "example.com",
    verified: 1,
    cluster: "us04",
    zoom_one_type: 4,
  },
};

export const listChatMessagesExamplePayload = {
  data: {
    messages: [
      {
        bot_message: {},
        date_time: "2020-02-10T21:39:50Z",
        files: [
          {
            download_url:
              "https://zoom.us/file/download/xBvggqyjQUal6TecwMlYwQ?filename=example.jpg&jwt=eyJhbGciOiJIUzI1NiJ9.eyJkaWciOiI3Yzg5YzBhYjIzYmZmMjdjNzE3NTQ4YzdjMTc0Njk3MWYzYjNmNjFjMzU5OTliNjE1ZjdjMWJmMzc5YTJiZThlIiwiYXVkIjoiZmlsZSIsImlzcyI6ImNyb3NzZmlsZSIsImV4cCI6MTY0ODI2NDY5N30.2fQxw3F1cEhvFJmnE2zPOdkHnPeZUktv_P0M--e-Tg8",
            file_id: "xBvggqyjQUal6TecwMlYwQ",
            file_name: "example.jpg",
            file_size: 3966,
          },
        ],
        rich_text: [
          {
            start_position: 0,
            end_position: 5,
            format_type: "Paragraph",
            format_attr: "h1",
          },
        ],
        download_url:
          "https://zoom.us/file/download/xBvggqyjQUal6TecwMlYwQ?filename=example.jpg&jwt=eyJhbGciOiJIUzI1NiJ9.eyJkaWciOiI3Yzg5YzBhYjIzYmZmMjdjNzE3NTQ4YzdjMTc0Njk3MWYzYjNmNjFjMzU5OTliNjE1ZjdjMWJmMzc5YTJiZThlIiwiYXVkIjoiZmlsZSIsImlzcyI6ImNyb3NzZmlsZSIsImV4cCI6MTY0ODI2NDY5N30.2fQxw3F1cEhvFJmnE2zPOdkHnPeZUktv_P0M--e-Tg8",
        file_id: "xBvggqyjQUal6TecwMlYwQ",
        file_name: "example.jpg",
        file_size: 3966,
        id: "EAB58B01-B35F-4F97-BA69-F9650F54679A",
        message: "hello, world!",
        reactions: [
          {
            emoji: "U+1F600",
            total_count: 1,
            senders: [
              {
                user_id: "v4iyWT1LTfy8QvPG4GTvdg",
                member_id: "R4VM29Oj0fVM2hhEmSKVM2hhezJTezJTKVM2hezJT2hezJ",
              },
            ],
          },
        ],
        reply_main_message_id: "27ED2949-6457-417C-83EA-72515DAF00BD",
        reply_main_message_timestamp: 1581370790388,
        sender: "jchill@example.com",
        sender_member_id: "R4VM29Oj0fVM2hhEmSKVM2hhezJTezJTKVM2hezJT2hezJTSK",
        sender_display_name: "Tom",
        status: "Edited",
        timestamp: 1581370790388,
        at_items: [
          {
            at_contact: "v4iyWT1LTfy8QvPG4GTvdg",
            at_contact_member_id:
              "R4VM29Oj0fVM2hhEmSKVM2hhezJTezJTKVM2hezJT2hezJTSK",
            at_type: 2,
            end_position: 8,
            start_position: 0,
          },
        ],
      },
    ],
  },
};

export const listUserChannelsExamplePayload = {
  data: {
    channels: [
      {
        channel_settings: {
          add_member_permissions: 2,
          new_members_can_see_previous_messages_files: true,
          posting_permissions: 3,
          mention_all_permissions: 1,
          allow_to_add_external_users: 2,
        },
        id: "cabc1234567defghijkl01234",
        jid: "cabc1234567defghijkl01234@conference.xmpp.zoom.us",
        name: "Developers",
        type: 2,
        channel_url:
          "https://zoom.us/launch/chat/v2/eyJzaWQiOiIyY2RkZjNyNjU3YTY0ODUzOWVhOThkODFhNjRiODE2YkBjb25mZXJlbmNlLnhtcHBkZXYuem9vbS51cyJ1",
      },
    ],
  },
};

export const listUsersExamplePayload = {
  data: {
    users: [
      {
        user_created_at: "2019-06-01T07:58:03Z",
        custom_attributes: [
          {
            key: "cbf_cywdkexrtqc73f97gd4w6g",
            name: "A1",
            value: "2323",
          },
        ],
        dept: "Developers",
        email: "jchill@example.com",
        employee_unique_id: "HqDyI037Qjili1kNsSIrIg",
        first_name: "Jill",
        group_ids: ["t-_-d56CSWG-7BF15LLrOw"],
        host_key: "299492849",
        id: "KDcuGIm1QgePTO8WbOqwIQ",
        im_group_ids: ["t-_-d56CSWG-7BF15LLrOw"],
        last_client_version: "5.2.45120.0906(win)",
        last_login_time: "2022-03-25T05:40:55Z",
        last_name: "Chill",
        plan_united_type: "1",
        pmi: 6589310093,
        role_id: "0",
        status: "active",
        timezone: "Asia/Shanghai",
        type: 1,
        verified: 1,
        display_name: "Jill Chill",
      },
    ],
  },
};

export const addWebinarRegistrantExamplePayload = {
  data: {
    id: 92674392836,
    join_url: "https://example.com/j/22222",
    registrant_id: "fdgsfh2ey82fuh",
    start_time: "2021-07-13T21:44:51Z",
    topic: "My Webinar",
    occurrences: [
      {
        duration: 60,
        occurrence_id: "1648194360000",
        start_time: "2022-03-25T07:46:00Z",
        status: "available",
      },
    ],
  },
};

export const getWebinarExamplePayload = {
  data: {
    host_email: "jchill@example.com",
    host_id: "30R7kT7bTIKSNUFEuH_Qlg",
    id: 97871060099,
    uuid: "m3WqMkvuRXyYqH+eKWhk9w==",
    agenda: "My webinar",
    created_at: "2022-03-26T07:18:32Z",
    duration: 60,
    join_url: "https://example.com/j/11111",
    occurrences: [
      {
        duration: 60,
        occurrence_id: "1648194360000",
        start_time: "2022-03-25T07:46:00Z",
        status: "available",
      },
    ],
    password: "123456",
    encrypted_passcode: "8pEkRweVXPV3Ob2KJYgFTRlDtl1gSn.1",
    h323_passcode: "123456",
    recurrence: {
      end_date_time: "2022-04-02T15:59:00Z",
      end_times: 7,
      monthly_day: 1,
      monthly_week: 1,
      monthly_week_day: 1,
      repeat_interval: 1,
      type: 1,
      weekly_days: "1",
    },
    settings: {
      allow_multiple_devices: true,
      alternative_hosts: "jchill@example.com",
      alternative_host_update_polls: true,
      approval_type: 0,
      attendees_and_panelists_reminder_email_notification: {
        enable: true,
        type: 0,
      },
      audio: "telephony",
      audio_conference_info: "test",
      authentication_domains: "example.com",
      authentication_name: "Sign in to Zoom",
      authentication_option: "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
      auto_recording: "cloud",
      contact_email: "jchill@example.com",
      contact_name: "Jill Chill",
      email_language: "en-US",
      follow_up_absentees_email_notification: {
        enable: true,
        type: 0,
      },
      follow_up_attendees_email_notification: {
        enable: true,
        type: 0,
      },
      global_dial_in_countries: ["US"],
      hd_video: false,
      hd_video_for_attendees: false,
      host_video: true,
      language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            languages: "US,CN",
          },
        ],
      },
      sign_language_interpretation: {
        enable: true,
        interpreters: [
          {
            email: "interpreter@example.com",
            sign_language: "American",
          },
        ],
      },
      panelist_authentication: true,
      meeting_authentication: true,
      add_watermark: true,
      add_audio_watermark: true,
      notify_registrants: true,
      on_demand: false,
      panelists_invitation_email_notification: true,
      panelists_video: true,
      post_webinar_survey: true,
      practice_session: false,
      question_and_answer: {
        allow_submit_questions: true,
        allow_anonymous_questions: true,
        answer_questions: "all",
        attendees_can_comment: true,
        attendees_can_upvote: true,
        allow_auto_reply: true,
        auto_reply_text:
          "Thank you for your question. We will get back to you shortly.",
        enable: true,
      },
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      registrants_restrict_number: 100,
      registration_type: 1,
      send_1080p_video_to_attendees: false,
      show_share_button: true,
      survey_url: "https://example.com",
      enable_session_branding: true,
    },
    start_time: "2022-03-26T07:18:32Z",
    start_url: "https://example.com/s/11111",
    timezone: "America/Los_Angeles",
    topic: "My Webinar",
    tracking_fields: [
      {
        field: "field1",
        value: "value1",
      },
    ],
    type: 5,
    is_simulive: true,
    record_file_id: "f09340e1-cdc3-4eae-9a74-98f9777ed908",
  },
};

export const listWebinarParticipantsExamplePayload = {
  data: {
    participants: [
      {
        id: "30R7kT7bTIKSNUFEuH_Qlg",
        name: "Jill Chill",
        user_id: "ABCDEF123456",
        registrant_id: "_f08HhPJS82MIVLuuFaJPg",
        user_email: "jchill@example.com",
        join_time: "2019-02-01T12:34:12.660Z",
        leave_time: "2019-02-01T12:54:12.660Z",
        duration: 20,
        failover: false,
        status: "in_meeting",
      },
    ],
  },
};

export const listWebinarRegistrantsExamplePayload = {
  data: {
    registrants: [
      {
        id: "9tboDiHUQAeOnbmudzWa5g",
        address: "1800 Amphibious Blvd.",
        city: "Mountain View",
        comments: "Looking forward to the discussion.",
        country: "US",
        custom_questions: [
          {
            title: "What do you hope to learn from this?",
            value:
              "Look forward to learning how you come up with new recipes and what other services you offer.",
          },
        ],
        email: "jchill@example.com",
        first_name: "Jill",
        industry: "Food",
        job_title: "Chef",
        last_name: "Chill",
        no_of_employees: "1-20",
        org: "Cooking Org",
        phone: "5550100",
        purchasing_time_frame: "1-3 months",
        role_in_purchase_process: "Influencer",
        state: "CA",
        status: "approved",
        zip: "94045",
        create_time: "2022-03-22T05:59:09Z",
        join_url: "https://example.com/j/11111",
      },
    ],
  },
};

export const listWebinarsExamplePayload = {
  data: {
    webinars: [
      {
        agenda: "Learn more about Zoom APIs",
        created_at: "2021-07-01T22:00:00Z",
        duration: 60,
        host_id: "x1yCzABCDEfg23HiJKl4mN",
        id: 1234567890,
        join_url: "https://example.com/j/11111",
        start_time: "2021-07-13T21:00:00Z",
        timezone: "America/Los_Angeles",
        topic: "My Webinar",
        type: 9,
        uuid: "4444AAAiAAAAAiAiAiiAii==",
        is_simulive: true,
      },
    ],
  },
};
