import { action, input, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, top, skip, search, filter, inlinecount } from "../inputs";

const orderByOptions = [
  "BusEventSubscriberCode",
  "BusEventSubscriberCode desc",
  "SAPObjectType",
  "SAPObjectType desc",
  "SAPObjectTaskCode",
  "SAPObjectTaskCode desc",
  "BusEventSubscriptionStateCode",
  "BusEventSubscriptionStateCode desc",
  "BusEventPriority",
  "BusEventPriority desc",
].map((option) => ({ label: option, value: option }));

const selectOptions = [
  "BusEventSubscriberCode",
  "SAPObjectType",
  "SAPObjectTaskCode",
  "BusEventSubscriptionStateCode",
  "BusEventPriority",
].map((option) => ({ label: option, value: option }));

export const listSubscriptionsOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order by property",
  collection: "valuelist",
  model: orderByOptions,
  clean: util.types.toString,
});

export const listSubscriptionsSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: selectOptions,
  clean: util.types.toString,
});

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Reads subscription information for business events.",
  },
  perform: async (
    _context,
    { connectionInput, top, skip, search, filter, inlinecount, orderBy, select },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/CA_BEH_SUBSCRIPTION_SRV/SubscriptionMaintain?${
          top.length ? `$top=${top}&` : ""
        }${skip.length ? `$skip=${skip}&` : ""}${
          search.length ? `search=${search}&` : ""
        }${filter.length ? `$filter=${filter}&` : ""}${
          inlinecount.length ? `$inlinecount=${inlinecount}&` : ""
        }${orderBy.length ? `$orderby=${orderBy}&` : ""}${
          select.length ? `$select=${select}&` : ""
        }`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    top,
    skip,
    search,
    filter,
    inlinecount,
    orderBy: listSubscriptionsOrderBy,
    select: listSubscriptionsSelect,
  },
});
