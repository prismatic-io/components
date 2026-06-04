import { input, util } from "@prismatic-io/spectral";
import { cleanString, connectionInput, userId } from "./common";





export const trigger_id = input({
  label: "Trigger ID",
  placeholder: "Enter trigger ID",
  type: "string",
  required: true,
  comments:
    "The short-lived token used to exchange for posting a view to the user.",
  example: "12345.98765.abcd2358fdea",
  clean: util.types.toString,
});

export const view_id = input({
  label: "View ID",
  placeholder: "Enter view ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier of the view to be updated. Either view_id or external_id is required.",
  example: "VMM512F2U",
  clean: cleanString,
});

export const external_id = input({
  label: "External ID",
  placeholder: "Enter external ID",
  type: "string",
  required: false,
  comments:
    "A custom external identifier assigned to the view. Either view_id or external_id is required.",
  example: "bmarley_view2",
  clean: cleanString,
});

export const view = input({
  label: "View",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Modal title",
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "It's Block Kit...but _in a modal_",
          },
          block_id: "section1",
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click me",
            },
            action_id: "button_abc",
            value: "Button value",
            style: "danger",
          },
        },
        {
          type: "input",
          label: {
            type: "plain_text",
            text: "Input label",
          },
          element: {
            type: "plain_text_input",
            action_id: "input1",
            placeholder: {
              type: "plain_text",
              text: "Type in here",
            },
            multiline: false,
          },
          optional: false,
        },
      ],
      close: {
        type: "plain_text",
        text: "Cancel",
      },
      submit: {
        type: "plain_text",
        text: "Save",
      },
      private_metadata: "Shhhhhhhh",
      callback_id: "view_identifier_12",
    },
    null,
    2
  ),
  comments:
    "A [view payload](https://docs.slack.dev/reference/views). This must be a JSON-encoded string.",
  clean: (value: unknown) => {
    return JSON.parse(util.types.toString(value));
  },
});





export const openViewInputs = {
  connection: connectionInput,
  trigger_id,
  view,
};

export const publishViewInputs = {
  connection: connectionInput,
  userId,
  view,
};

export const pushViewInputs = {
  connection: connectionInput,
  trigger_id,
  view,
};

export const updateViewInputs = {
  connection: connectionInput,
  view,
  view_id,
  external_id,
};
