import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const appsGetSubscriptionPlanForAccount = action({
  display: {
    label: "Apps Get Subscription Plan For Account",
    description: "Get a subscription plan for an account",
  },
  perform: async (context, { connection, accountId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/marketplace_listing/accounts/${accountId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    accountId: {
      label: "Account Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "account_id parameter",
    },
  },
});

const appsListPlans = action({
  display: {
    label: "Apps List Plans",
    description: "List plans",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/marketplace_listing/plans`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const appsListAccountsForPlan = action({
  display: {
    label: "Apps List Accounts For Plan",
    description: "List accounts for a plan",
  },
  perform: async (
    context,
    { connection, planId, sort, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/marketplace_listing/plans/${planId}/accounts`,
      {
        params: { sort, direction, per_page: perPage, page },
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    planId: {
      label: "Plan Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the plan",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The property to sort the results by",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'To return the oldest accounts first, set to "asc"',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const appsGetSubscriptionPlanForAccountStubbed = action({
  display: {
    label: "Apps Get Subscription Plan For Account Stubbed",
    description: "Get a subscription plan for an account (stubbed)",
  },
  perform: async (context, { connection, accountId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/marketplace_listing/stubbed/accounts/${accountId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    accountId: {
      label: "Account Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "account_id parameter",
    },
  },
});

const appsListPlansStubbed = action({
  display: {
    label: "Apps List Plans Stubbed",
    description: "List plans (stubbed)",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/marketplace_listing/stubbed/plans`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const appsListAccountsForPlanStubbed = action({
  display: {
    label: "Apps List Accounts For Plan Stubbed",
    description: "List accounts for a plan (stubbed)",
  },
  perform: async (
    context,
    { connection, planId, sort, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/marketplace_listing/stubbed/plans/${planId}/accounts`,
      { params: { sort, direction, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    planId: {
      label: "Plan Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the plan",
    },
    sort: {
      label: "Sort",
      type: "string",
      required: false,
      default: "created",
      model: [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The property to sort the results by",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'To return the oldest accounts first, set to "asc"',
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

export default {
  appsGetSubscriptionPlanForAccount,
  appsListPlans,
  appsListAccountsForPlan,
  appsGetSubscriptionPlanForAccountStubbed,
  appsListPlansStubbed,
  appsListAccountsForPlanStubbed,
};
