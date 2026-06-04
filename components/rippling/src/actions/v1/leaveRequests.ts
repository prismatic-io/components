import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import {
  getLeaveRequestsExamplePayload,
  processLeaveRequestsExamplePayload,
} from "../../examplePayloads";
import {
  getLeaveRequestsInputs,
  processLeaveRequestsInputs,
} from "../../inputs";

const getLeaveRequests = action({
  display: {
    label: "Get Leave Requests (V1)",
    description: "GET Leave Requests.",
  },
  inputs: getLeaveRequestsInputs,
  examplePayload: getLeaveRequestsExamplePayload,
  perform: async (
    context,
    {
      connection,
      id,
      role,
      requestedBy,
      status,
      startDate,
      endDate,
      leavePolicy,
      processedBy,
      from,
      to,
    },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get("/leave_requests", {
      params: {
        id,
        role,
        requestedBy,
        status,
        startDate,
        endDate,
        leavePolicy,
        processedBy,
        from,
        to,
      },
    });
    return { data };
  },
});

const processLeaveRequests = action({
  display: {
    label: "Process Leave Requests (V1)",
    description: "POST Process Leave Request.",
  },
  inputs: processLeaveRequestsInputs,
  examplePayload: processLeaveRequestsExamplePayload,
  perform: async (context, { connection, id, action }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/leave_requests/${id}/process`,
      {},
      { params: { action } },
    );
    return { data };
  },
});

export default {
  getLeaveRequests,
  processLeaveRequests,
};
