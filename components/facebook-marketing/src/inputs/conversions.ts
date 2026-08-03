import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanMoreData,
  cleanString,
  eventTimeClean,
} from "../util/clean";
import { myConnectionField, version } from "./common";
const pixelId = input({
  label: "Pixel Id",
  type: "string",
  required: true,
  example: "587490763",
  comments: "Provide the Id of a pixel.",
  placeholder: "587490763",
  clean: util.types.toString,
});
const eventName = input({
  label: "Event Name",
  type: "string",
  required: true,
  comments: "A standard event or custom event name.",
  example: "Purchase",
  placeholder: "Purchase",
  clean: util.types.toString,
});
const eventTime = input({
  label: "Event Time",
  type: "string",
  required: false,
  comments:
    "A Unix timestamp in seconds indicating when the actual event occurred. The specified time may be earlier than the time you send the event to Meta Ads. You must send this date in GMT time zone. Default is the current time.",
  example: "1633552688",
  placeholder: "1633552688",
  clean: eventTimeClean,
});
const userData = input({
  label: "User Data",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      em: ["309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"],
      ph: [
        "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
        "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
      ],
      client_ip_address: "123.123.123.123",
      client_user_agent: "$CLIENT_USER_AGENT",
      fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
      fbp: "fb.1.1558571054389.1098115397",
    },
    null,
    2,
  ),
  comments:
    "A map that contains customer information data. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters) for details.",
  clean: (value) => cleanCodeInput(value, "User Data"),
});
const customData = input({
  label: "Custom Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      currency: "usd",
      value: 123.45,
      contents: [
        {
          id: "product123",
          quantity: 1,
          delivery_category: "home_delivery",
        },
      ],
    },
    null,
    2,
  ),
  comments:
    "A map that includes additional business data about the event. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data) for details.",
  clean: (value) => cleanCodeInput(value, "Custom Data"),
});
const eventSourceUrl = input({
  label: "Event Source Url",
  type: "string",
  required: false,
  comments: "The browser URL where the event happened.",
  example: "http://jaspers-market.com/product/123",
  placeholder: "http://jaspers-market.com/product/123",
  clean: cleanString,
});
const actionSource = input({
  label: "Action Source",
  type: "string",
  required: true,
  comments: "This field allows you to specify where your conversions occurred.",
  model: [
    { label: "Email — Conversion happened over email.", value: "email" },
    {
      label: "Website — Conversion was made on your website.",
      value: "website",
    },
    { label: "App — Conversion was made on your mobile app.", value: "app" },
    {
      label: "Phone Call — Conversion was made over the phone.",
      value: "phone_call",
    },
    {
      label:
        "Chat — Conversion was made via a messaging app, SMS, or online messaging feature.",
      value: "chat",
    },
    {
      label:
        "Physical Store — Conversion was made in person at your physical store.",
      value: "physical_store",
    },
    {
      label:
        "System Generated — Conversion happened automatically, e.g. a subscription renewal set to auto-pay.",
      value: "system_generated",
    },
    {
      label:
        "Business Messaging — Conversion was made from ads that click to Messenger, Instagram or WhatsApp.",
      value: "business_messaging",
    },
    {
      label: "Other — Conversion happened in a way that is not listed.",
      value: "other",
    },
  ],
  example: "website",
  placeholder: "website",
  clean: util.types.toString,
});
const moreData = input({
  label: "More Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      event_id: "event.id.123",
      event_source_url: "http://jaspers-market.com",
      opt_out: false,
    },
    null,
    2,
  ),
  comments:
    "Additional data to include with the event. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event) for details.",
  clean: cleanMoreData,
});
const events = input({
  label: "Events",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        event_name: "Purchase",
        event_time: 1633552688,
        event_id: "event.id.123",
        event_source_url: "http://jaspers-market.com/product/123",
        action_source: "website",
        user_data: {
          client_ip_address: "192.19.9.9",
          client_user_agent: "test ua",
          em: [
            "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd",
          ],
          ph: [
            "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
            "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
          ],
          fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
          fbp: "fb.1.1558571054389.1098115397",
        },
        custom_data: {
          value: 100.2,
          currency: "USD",
          content_ids: ["product.id.123"],
          content_type: "product",
        },
        opt_out: false,
      },
      {
        event_name: "Purchase",
        event_time: 1633552688,
        user_data: {
          client_ip_address: "192.88.9.9",
          client_user_agent: "test ua2",
        },
        custom_data: {
          value: 50.5,
          currency: "USD",
        },
        opt_out: false,
      },
    ],
    null,
    2,
  ),
  comments:
    "An array of server event objects. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event) for more information.",
  clean: (value) => cleanArrayCodeInput(value, "Events"),
});
export const createConversionInputs = {
  connection: myConnectionField,
  pixelId,
  eventName,
  userData,
  actionSource,
  eventTime,
  eventSourceUrl,
  customData,
  moreData,
  version,
};
export const createMultipleConversionsInputs = {
  connection: myConnectionField,
  pixelId,
  events,
  version,
};
