export const listResponsesPayload = {
  items: [
    {
      answers: [
        {
          field: {
            id: "hVONkQcnSNRj",
            ref: "my_custom_dropdown_reference",
            type: "dropdown",
          },
          text: "Job opportunities",
          type: "text",
        },
        {
          boolean: false,
          field: {
            id: "RUqkXSeXBXSd",
            ref: "my_custom_yes_no_reference",
            type: "yes_no",
          },
          type: "boolean",
        },
        {
          boolean: true,
          field: {
            id: "gFFf3xAkJKsr",
            ref: "my_custom_legal_reference",
            type: "legal",
          },
          type: "boolean",
        },
        {
          field: {
            id: "JwWggjAKtOkA",
            ref: "my_custom_short_text_reference",
            type: "short_text",
          },
          text: "Lian",
          type: "text",
        },
        {
          email: "lian1078@other.com",
          field: {
            id: "SMEUb7VJz92Q",
            ref: "my_custom_email_reference",
            type: "email",
          },
          type: "email",
        },
        {
          field: {
            id: "pn48RmPazVdM",
            ref: "my_custom_number_reference",
            type: "number",
          },
          number: 1,
          type: "number",
        },
        {
          field: {
            id: "Q7M2XAwY04dW",
            ref: "my_custom_number2_reference",
            type: "number",
          },
          number: 1,
          type: "number",
        },
        {
          field: {
            id: "WOTdC00F8A3h",
            ref: "my_custom_rating_reference",
            type: "rating",
          },
          number: 3,
          type: "number",
        },
        {
          field: {
            id: "DlXFaesGBpoF",
            ref: "my_custom_long_text_reference",
            type: "long_text",
          },
          text: "It's a big, busy city. I moved here for a job, but I like it, so I am planning to stay. I have made good friends here.",
          type: "text",
        },
        {
          field: {
            id: "NRsxU591jIW9",
            ref: "my_custom_opinion_scale_reference",
            type: "opinion_scale",
          },
          number: 1,
          type: "number",
        },
        {
          choices: {
            labels: ["New York", "Tokyo"],
          },
          field: {
            id: "PNe8ZKBK8C2Q",
            ref: "my_custom_picture_choice_reference",
            type: "picture_choice",
          },
          type: "choices",
        },
        {
          date: "2012-03-20T00:00:00Z",
          field: {
            id: "KoJxDM3c6x8h",
            ref: "my_custom_date_reference",
            type: "date",
          },
          type: "date",
        },
        {
          choice: {
            label: "A friend's experience in Sydney",
          },
          field: {
            id: "ceIXxpbP3t2q",
            ref: "my_custom_multiple_choice_reference",
            type: "multiple_choice",
          },
          type: "choice",
        },
        {
          choices: {
            labels: ["New York", "Tokyo"],
          },
          field: {
            id: "abISxvbD5t1p",
            ref: "my_custom_ranking_reference",
            type: "ranking",
          },
          type: "choices",
        },
        {
          choice: {
            label: "Tokyo",
          },
          field: {
            id: "k6TP9oLGgHjl",
            ref: "my_custom_multiple_choice2_reference",
            type: "multiple_choice",
          },
          type: "choice",
        },
      ],
      calculated: {
        score: 2,
      },
      hidden: {},
      landed_at: "2017-09-14T22:33:59Z",
      landing_id: "21085286190ffad1248d17c4135ee56f",
      metadata: {
        browser: "default",
        network_id: "respondent_network_id",
        platform: "other",
        referer: "https://user_id.typeform.com/to/lR6F4j",
        user_agent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
      },
      response_id: "21085286190ffad1248d17c4135ee56f",
      submitted_at: "2017-09-14T22:38:22Z",
      token: "test21085286190ffad1248d17c4135ee56f",
      variables: [
        {
          key: "score",
          number: 2,
          type: "number",
        },
        {
          key: "name",
          text: "typeform",
          type: "text",
        },
      ],
    },
  ],
  page_count: 1,
  total_items: 4,
};

export const getFileResponse = Buffer.from("file content");
