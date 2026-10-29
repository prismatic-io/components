import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";

const shortName = input({
  label: "Short Name",
  type: "string",
  comments: "Customer short name.",
  required: false,
  placeholder: "John",
  example: "John",
  clean: cleanStringInput,
});

const onHold = input({
  label: "On Hold",
  type: "boolean",
  comments: "True if customer account is on hold, else False.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const statusReason = input({
  label: "Status Reason",
  type: "string",
  comments: "Reason for change in account status.",
  required: false,
  placeholder: "Suspended due to non-payment",
  example: "Suspended due to non-payment",
  clean: cleanStringInput,
});

const accountStatusType = input({
  label: "Account Status Type",
  type: "string",
  comments:
    "The status of the customer account (Sage 200 Standard and versions of Professional released after July 2017). See [Sage 200 API documentation](https://developer.sage.com/200/reference/account_status_types) for more information.",
  required: false,
  placeholder: "AccountStatusActive",
  example: "AccountStatusActive",
  clean: cleanStringInput,
});

const currencyId = input({
  label: "Currency ID",
  type: "string",
  comments:
    "Currency record Id. This defaults to the base currency Id. See [Sage 200 API documentation](https://developer.sage.com/200/reference/currencies) for more information.",
  required: false,
  placeholder: "2103",
  example: "2103",
  clean: cleanNumberInput,
});

const exchangeRateType = input({
  label: "Exchange Rate Type",
  type: "string",
  comments:
    "The type of exchange rate used on the customer account. See [Sage 200 API documentation](https://developer.sage.com/200/reference/exchange_rate_types) for more information.",
  required: false,
  placeholder: "ExchangeRateSingle",
  example: "ExchangeRateSingle",
  clean: cleanStringInput,
});

const telephoneCountryCode = input({
  label: "Telephone Country Code",
  type: "string",
  comments: "Telephone country code.",
  required: false,
  placeholder: "+1",
  example: "+1",
  clean: cleanStringInput,
});

const telephoneAreaCode = input({
  label: "Telephone Area Code",
  type: "string",
  comments: "Telephone area code.",
  required: false,
  placeholder: "806",
  example: "806",
  clean: cleanStringInput,
});

const telephoneSubscriberNumber = input({
  label: "Telephone Subscriber Number",
  type: "string",
  comments: "Telephone subscriber number.",
  required: false,
  placeholder: "123-4567",
  example: "123-4567",
  clean: cleanStringInput,
});

const faxCountryCode = input({
  label: "Fax Country Code",
  type: "string",
  comments: "Fax country code.",
  required: false,
  placeholder: "+1",
  example: "+1",
  clean: cleanStringInput,
});

const faxAreaCode = input({
  label: "Fax Area Code",
  type: "string",
  comments: "Fax area code.",
  required: false,
  placeholder: "806",
  example: "806",
  clean: cleanStringInput,
});

const faxSubscriberNumber = input({
  label: "Fax Subscriber Number",
  type: "string",
  comments: "Fax subscriber number.",
  required: false,
  placeholder: "123-4567",
  example: "123-4567",
  clean: cleanStringInput,
});

const website = input({
  label: "Website",
  type: "string",
  comments: "Website address.",
  required: false,
  placeholder: "https://www.example.com",
  example: "https://www.example.com",
  clean: cleanStringInput,
});

const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that are not covered by the standard inputs. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customers) for more information.",
  required: false,
  example: JSON.stringify({ credit_limit: 30.0 }, null, 2),
  clean: cleanCodeInput,
});

export default {
  shortName,
  onHold,
  statusReason,
  accountStatusType,
  currencyId,
  exchangeRateType,
  telephoneCountryCode,
  telephoneAreaCode,
  telephoneSubscriberNumber,
  faxCountryCode,
  faxAreaCode,
  faxSubscriberNumber,
  website,
  additionalFields,
};
