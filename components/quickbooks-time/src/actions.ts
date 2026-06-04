import { stringify } from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import urljoin from "url-join";
import { createClient } from "./client";
import {
  active,
  additionalParams,
  connection,
  endDate,
  endDateISO,
  endDateISOReq,
  firstName,
  id,
  idReq,
  jobCodeIds,
  jobCodeIdsReq,
  jobcodeId,
  jobcodeIdReq,
  lastName,
  page,
  perPage,
  startDate,
  startDateISO,
  startDateISOReq,
  timesheetId,
  userIds,
  userName,
  userNameReq,
} from "./inputs";

interface RequestProps {
  object: string;
}
interface DeleteRequestProps extends RequestProps {
  queryParams: Record<string, string>;
}
interface GetRequestProps extends RequestProps {
  queryParams?: Record<string, string>;
}
interface PutRequestProps extends RequestProps {
  data: Record<string, unknown>;
}
interface PostRequestProps extends RequestProps {
  data: Record<string, unknown>;
}

const filterQueryParams = (params: Record<string, string>): Record<string, string> => {
  return Object.fromEntries(Object.entries(params).filter(([, v]) => Boolean(v)));
};
const buildPayload = (
  fieldValuesInput: { key: string; value: unknown }[],
): Record<string, unknown> => {
  return (fieldValuesInput || []).reduce(
    (results, { key, value }) => ({ ...results, [key]: value }),
    {},
  );
};
const constructFullUrl = (object: string, queryParams?: Record<string, string>): string => {
  let url = object;
  if (queryParams) {
    const filteredParams = filterQueryParams(queryParams);
    if (Object.keys(filteredParams).length > 0) {
      url = urljoin(url, `?${stringify(filteredParams)}`);
    }
  }

  return url;
};
const createRequest = async (client: HttpClient, requestConfig: PostRequestProps) => {
  const { object, data } = requestConfig;
  const url = constructFullUrl(object);
  const response = await client.post(url, { data: [data] });
  const { results } = await response.data;
  return results;
};
const deleteRequest = async (client: HttpClient, requestConfig: DeleteRequestProps) => {
  const { object, queryParams } = requestConfig;
  const url = constructFullUrl(object, queryParams);
  const response = await client.delete(url);
  const { results } = await response.data;
  return results;
};
const updateRequest = async (client: HttpClient, requestConfig: PutRequestProps) => {
  const { object, data } = requestConfig;
  const url = constructFullUrl(object);
  const response = await client.put(url, { data: [data] });
  const { results } = await response.data;
  return results;
};

const getRequest = async (client: HttpClient, requestConfig: GetRequestProps) => {
  const { object, queryParams } = requestConfig;
  const url = constructFullUrl(object, queryParams);
  const response = await client.get(url);
  const { results } = await response.data;
  return results;
};

export const getUsers = action({
  display: {
    label: "Get Users",
    description: "Gets a list of Users with optional filters",
  },
  perform: async (context, { connection, active, perPage, page, additionalParams }) => {
    const queryParams = {
      active: util.types.toString(active),
      per_page: util.types.toString(perPage),
      page: util.types.toString(page),
      ...buildPayload(additionalParams),
    };

    const client = createClient(connection, context.debug.enabled);
    const results = await getRequest(client, {
      object: "users",
      queryParams,
    });
    return {
      data: results,
    };
  },
  inputs: { connection, active, perPage, page, additionalParams },
});

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a specified User",
  },
  perform: async (context, { connection, id, userName, additionalParams }) => {
    if (!util.types.isInt(id) && !util.types.toString(userName))
      throw new Error("Id or Username must be supplied.");

    const client = createClient(connection, context.debug.enabled);
    const results = await updateRequest(client, {
      object: "users",
      data: {
        [`${util.types.isInt(id) ? "id" : "username"}`]: util.types.isInt(id) ? id : userName,
        ...buildPayload(additionalParams),
      },
    });
    return {
      data: results,
    };
  },
  inputs: { connection, id, userName, additionalParams },
});

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a User from the provided data",
  },
  perform: async (
    context,
    { connection, userNameReq: userName, firstName, lastName, additionalParams },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const results = await createRequest(client, {
      object: "users",
      data: {
        [`${util.types.isInt(id) ? "id" : "username"}`]: util.types.isInt(id) ? id : userName,
        first_name: firstName,
        last_name: lastName,
        ...buildPayload(additionalParams),
      },
    });
    return {
      data: results,
    };
  },
  inputs: { connection, userNameReq, firstName, lastName, additionalParams },
});

export const getJobCodes = action({
  display: {
    label: "Get Job Codes",
    description: "Gets a list of Job Codes",
  },
  perform: async (context, { connection, active, perPage, page, additionalParams }) => {
    const queryParams = {
      active: util.types.toString(active),
      per_page: util.types.toString(perPage),
      page: util.types.toString(page),
      ...buildPayload(additionalParams),
    };

    const client = createClient(connection, context.debug.enabled);
    const results = await getRequest(client, {
      object: "jobcodes",
      queryParams,
    });
    return {
      data: results,
    };
  },
  inputs: { connection, active, perPage, page, additionalParams },
});
export const getJobCodeAssignments = action({
  display: {
    label: "Get Job Code Assignments",
    description: "Gets a list of Job Codes and their associated Users",
  },
  perform: async (context, { connection, active, perPage, page, userIds, additionalParams }) => {
    const queryParams = {
      active: util.types.toString(active),
      per_page: util.types.toString(perPage),
      page: util.types.toString(page),
      user_ids: util.types.toString(userIds) ? util.types.toString(userIds) : "",
      ...buildPayload(additionalParams),
    };

    const client = createClient(connection, context.debug.enabled);
    const results = await getRequest(client, {
      object: "jobcode_assignments",
      queryParams,
    });
    return {
      data: results,
    };
  },
  inputs: { connection, active, perPage, page, userIds, additionalParams },
});

export const getTimeSheets = action({
  display: {
    label: "Get Time Sheets",
    description: "Gets a list of Time Sheets",
  },
  perform: async (
    context,
    {
      connection,
      active,
      perPage,
      page,
      userIds,
      jobCodeIds,
      startDate,
      endDate,
      additionalParams,
    },
  ) => {
    const queryParams = {
      active: util.types.toString(active),
      per_page: util.types.toString(perPage),
      page: util.types.toString(page),
      user_ids: util.types.toString(userIds) ? util.types.toString(userIds) : "",
      jobcode_ids: util.types.toString(jobCodeIds) ? util.types.toString(jobCodeIds) : "",
      start_date: util.types.toString(startDate),
      end_date: util.types.toString(endDate),
      ...buildPayload(additionalParams),
    };

    const client = createClient(connection, context.debug.enabled);
    const results = await getRequest(client, {
      object: "timesheets",
      queryParams,
    });
    return {
      data: results,
    };
  },
  inputs: {
    connection,
    active,
    perPage,
    page,
    userIds,
    jobCodeIds,
    startDate,
    endDate,
    additionalParams,
  },
});

export const createTimesheet = action({
  display: {
    label: "Create Timesheet",
    description: "Creates a Timesheet",
  },
  perform: async (
    context,
    {
      connection,
      idReq: id,
      jobcodeIdReq: jobcodeId,
      startDateISOReq: startDateISO,
      endDateISOReq: endDateISO,
      additionalParams,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const results = await createRequest(client, {
      object: "timesheets",
      data: {
        user_id: id,
        jobcode_id: jobcodeId,
        type: "regular",
        start: startDateISO,
        end: endDateISO,
        ...buildPayload(additionalParams),
      },
    });
    return {
      data: results,
    };
  },
  inputs: {
    connection,
    idReq,
    jobcodeIdReq,
    startDateISOReq,
    endDateISOReq,
    additionalParams,
  },
});

export const updateTimesheet = action({
  display: {
    label: "Update Timesheet",
    description: "Updates a Timesheet",
  },
  perform: async (
    context,
    { connection, timesheetId: id, jobcodeId, startDateISO, endDateISO, additionalParams },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const results = await updateRequest(client, {
      object: "timesheets",
      data: {
        id: id,
        jobcode_id: jobcodeId,
        start: startDateISO,
        end: endDateISO,
        ...buildPayload(additionalParams),
      },
    });
    return {
      data: results,
    };
  },
  inputs: {
    connection,
    timesheetId,
    jobcodeId,
    startDateISO,
    endDateISO,
    additionalParams,
  },
});

export const deleteTimeSheet = action({
  display: {
    label: "Delete Timesheet",
    description: "Deletes a Timesheet",
  },
  perform: async (context, { connection, jobCodeIdsReq: jobCodeIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const results = await deleteRequest(client, {
      object: "timesheets",
      queryParams: {
        ids: util.types.toString(jobCodeIds),
      },
    });
    return {
      data: results,
    };
  },
  inputs: { connection, jobCodeIdsReq },
});

export default {
  getUsers,
  updateUser,
  createUser,
  getJobCodeAssignments,
  getJobCodes,
  getTimeSheets,
  createTimesheet,
  updateTimesheet,
  deleteTimeSheet,
};
