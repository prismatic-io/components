import { action, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  createLineItemPayload,
  deleteLineItemPayload,
  listLineItemsPayload,
  updateLineItemPayload,
} from "../examplePayloads";
import {
  additionalProperties,
  after,
  archived,
  associationsList,
  connectionInput,
  dynamicValues,
  fetchAll,
  fieldValues,
  limit,
  lineItemId,
  lineItemName,
  price,
  productId,
  quantity,
  recurringBillingFrequency,
  recurringBillingPeriod,
  timeout,
  updateLineItemName,
  updatePrice,
  updateProductId,
} from "../inputs";
import { getAllPaginatedData, getProps, toStringList } from "../util";

export const listLineItems = action({
  display: {
    label: "List Line Items",
    description: "Retrieve a list of all line items",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(["name"], params.additionalProperties || []);

    return {
      data: await getAllPaginatedData(
        client,
        "/crm/v3/objects/line_items",
        params.fetchAll,
        false,
        {
          params: {
            ...parameterizedProperties,
            limit: util.types.toInt(params.limit) || undefined,
            after: util.types.toString(params.after) || undefined,
            associations: toStringList(params.associationsList || []).join(",") || undefined,
            archived: util.types.toBool(params.archived) || false,
          },
        },
      ),
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    archived,
    additionalProperties,
    associationsList,
    timeout,
    fetchAll,
    limit,
    after,
  },
  examplePayload: listLineItemsPayload,
});

export const getLineItem = action({
  display: {
    label: "Get Line Item",
    description: "Retrieve the information and metadata of a line item by Id",
  },
  perform: async (
    context,
    {
      additionalProperties,
      lineItemId,
      lineItemName,
      timeout,
      hubspotConnection,
      archived,
      associationsList,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const id = util.types.toString(lineItemId);
    const name = util.types.toString(lineItemName);

    if (!id && !name) {
      throw new Error("You must supply an Id or name to retrieve a line item record.");
    }
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(["name"], additionalProperties || []);

    const params = {
      ...parameterizedProperties,
      associations: toStringList(associationsList || []).join(",") || undefined,
      archived: util.types.toBool(archived) || false,
    };

    if (name) {
      const result = await client.get("/crm/v3/objects/line_items", {
        params,
      });
      const { results: lineItems } = result.data;

      const filteredLineItems = (lineItems || []).filter((item) => {
        return item?.properties?.name === name;
      });

      if (filteredLineItems.length === 0) {
        throw new Error(`No line items found matching ${name}`);
      }
      return { data: filteredLineItems };
    }

    return {
      data: (
        await client.get(`/crm/v3/objects/line_items/${lineItemId}`, {
          params,
        })
      ).data,
    };
  },
  inputs: {
    lineItemId: { ...lineItemId, required: false },
    lineItemName: { ...lineItemName, required: false },
    additionalProperties,
    associationsList,
    archived,
    timeout,
    hubspotConnection: connectionInput,
  },
  
});

export const deleteLineItem = action({
  display: {
    label: "Delete Line Item",
    description: "Delete an existing line item by Id",
  },
  perform: async (context, { lineItemId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.get(`/crm/v3/objects/line_items/${lineItemId}`)).data,
    };
  },
  inputs: {
    lineItemId,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: deleteLineItemPayload,
});

export const createLineItem = action({
  display: {
    label: "Create Line Item",
    description: "Create a new line item",
  },
  perform: async (
    context,
    {
      lineItemName,
      productId,
      recurringBillingPeriod,
      recurringBillingFrequency,
      quantity,
      price,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest: context.debug.enabled,
    });

    return {
      data: (
        await client.post("/crm/v3/objects/line_items", {
          properties: {
            name: lineItemName,
            hs_product_id: productId,
            hs_recurring_billing_period: recurringBillingPeriod,
            recurringbillingfrequency: recurringBillingFrequency,
            quantity,
            price,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    lineItemName,
    productId,
    recurringBillingPeriod,
    recurringBillingFrequency,
    quantity,
    price,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: createLineItemPayload,
});

export const updateLineItem = action({
  display: {
    label: "Update Line Item",
    description: "Update an the information and metadata of an existing line item",
  },
  perform: async (
    context,
    {
      lineItemId,
      updateLineItemName,
      updateProductId,
      recurringBillingPeriod,
      recurringBillingFrequency,
      quantity,
      updatePrice,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest: context.debug.enabled,
    });

    return {
      data: (
        await client.patch(`/crm/v3/objects/line_items/${lineItemId}`, {
          properties: {
            name: updateLineItemName || undefined,
            hs_product_id: updateProductId || undefined,
            hs_recurring_billing_period: recurringBillingPeriod || undefined,
            recurringbillingfrequency: recurringBillingFrequency || undefined,
            quantity: quantity || undefined,
            price: updatePrice || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    lineItemId,
    updateLineItemName,
    updateProductId,
    recurringBillingPeriod,
    recurringBillingFrequency,
    quantity,
    updatePrice,
    fieldValues,
    dynamicValues,
    timeout,
    hubspotConnection: connectionInput,
  },
  examplePayload: updateLineItemPayload,
});
