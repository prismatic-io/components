import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getMessageTemplateByIdExamplePayload,
  listMessageTemplatesExamplePayload,
  postMessageTemplatesExamplePayload,
  sendMessageExamplePayload,
  updateMessageTemplateByIdExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getMessageTemplateById } from "./getMessageTemplateById";
import { listMessageTemplates } from "./listMessageTemplates";
import { postMessageTemplates } from "./postMessageTemplates";
import { sendMessage } from "./sendMessage";
import { updateMessageTemplateById } from "./updateMessageTemplateById";

const SERVICE = "/ccx/connect/v2";

const emailDetail = {
  name: "Welcome Email",
  subject: "Welcome",
  body: "Hello",
  replyTo: "hr@example.com",
};
const pushDetail = {
  message: "Hello",
  redirectURL: "https://wd.example.com/welcome",
  id: "push-1",
};

const templateBody = {
  createdBy: { id: "cb-1" },
  emailDetail,
  pushDetail,
  name: "Welcome Template",
  notificationType: { id: "nt-1" },
  referenceID: "ref-1",
  inactive: false,
  descriptor: "Welcome",
  id: "tmpl-1",
  category: "Onboarding",
};

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe("getMessageTemplateById", () => {
  const params = {
    connection: oauthTestConnection(),
    messageTemplateId: "tmpl-1",
  };

  it("returns the message template", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/messageTemplates/tmpl-1`)
      .reply(200, getMessageTemplateByIdExamplePayload.data);

    const { result } = await invoke(getMessageTemplateById, params);
    expect(result).toEqual(getMessageTemplateByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/messageTemplates/tmpl-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(getMessageTemplateById, params)).rejects.toThrow();
  });
});

describe("listMessageTemplates", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { inactive: "false" },
  };

  it("returns message templates with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/messageTemplates`)
      .query({ inactive: "false", limit: 10, offset: 20 })
      .reply(200, listMessageTemplatesExamplePayload.data);

    const { result } = await invoke(listMessageTemplates, params);
    expect(result).toEqual(listMessageTemplatesExamplePayload);
  });

  it("reads every page with Fetch All", async () => {
    const [row] = listMessageTemplatesExamplePayload.data.data;
    nock(TEST_HOST)
      .get(`${SERVICE}/messageTemplates`)
      .query({ inactive: "false", limit: 1, offset: 0 })
      .reply(200, { total: 2, data: [row] })
      .get(`${SERVICE}/messageTemplates`)
      .query({ inactive: "false", limit: 1, offset: 1 })
      .reply(200, { total: 2, data: [row] });

    const { result } = await invoke(listMessageTemplates, {
      ...params,
      fetchAll: true,
      pagination: { limit: 1, offset: undefined },
    });
    expect(result).toEqual({ data: [row, row] });
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/messageTemplates`)
      .query(true)
      .reply(500, { error: "server error" });

    await expect(invoke(listMessageTemplates, params)).rejects.toThrow();
  });
});

describe("postMessageTemplates", () => {
  const params = {
    connection: oauthTestConnection(),
    messageTemplateName: "Welcome Template",
    notificationTypeId: "nt-1",
    createdById: "cb-1",
    emailDetail,
    pushDetail,
    referenceId: "ref-1",
    templateInactive: false,
    templateDescriptor: "Welcome",
    templateId: "tmpl-1",
    extraBody: { category: "Onboarding" },
  };

  it("sends the mapped body merged with Extra Body", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/messageTemplates`, templateBody)
      .reply(200, postMessageTemplatesExamplePayload.data);

    const { result } = await invoke(postMessageTemplates, params);
    expect(result).toEqual(postMessageTemplatesExamplePayload);
  });

  it("omits Email Detail and Push Detail when no field is set", async () => {
    const {
      emailDetail: _email,
      pushDetail: _push,
      ...bodyWithoutDetails
    } = templateBody;
    nock(TEST_HOST)
      .post(`${SERVICE}/messageTemplates`, bodyWithoutDetails)
      .reply(200, postMessageTemplatesExamplePayload.data);

    const { result } = await invoke(postMessageTemplates, {
      ...params,
      emailDetail: {
        name: undefined,
        subject: "",
        body: undefined,
        replyTo: undefined,
      },
      pushDetail: { message: undefined, redirectURL: undefined, id: undefined },
    });
    expect(result).toEqual(postMessageTemplatesExamplePayload);
  });

  it("does not throw when Email Detail and Push Detail are not set", async () => {
    const {
      emailDetail: _email,
      pushDetail: _push,
      ...bodyWithoutDetails
    } = templateBody;
    const { emailDetail: _e, pushDetail: _p, ...withoutKeys } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/messageTemplates`, bodyWithoutDetails)
      .reply(200, postMessageTemplatesExamplePayload.data);

    const { result } = await invoke(
      postMessageTemplates,
      withoutKeys as typeof params,
    );
    expect(result).toEqual(postMessageTemplatesExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/messageTemplates`)
      .reply(400, { error: "invalid" });

    await expect(invoke(postMessageTemplates, params)).rejects.toThrow();
  });
});

describe("sendMessage", () => {
  const contacts = [{ id: "w-2" }];
  const params = {
    connection: oauthTestConnection(),
    senderOverrideId: "so-1",
    commId: "comm-1",
    messageDetails: {
      emailDetailName: emailDetail.name,
      emailDetailSubject: emailDetail.subject,
      emailDetailBody: emailDetail.body,
      emailDetailReplyTo: emailDetail.replyTo,
      pushDetailMessage: pushDetail.message,
      pushDetailRedirectURL: pushDetail.redirectURL,
      pushDetailId: pushDetail.id,
      contacts,
    },
    messageTemplateId: "tmpl-1",
    notificationTypeId: "nt-1",
  };

  it("sends the message body and returns the result", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/sendMessage`, {
        senderOverride: { id: "so-1" },
        commID: { id: "comm-1" },
        emailDetail,
        recipients: contacts,
        messageTemplate: { id: "tmpl-1" },
        notificationType: { id: "nt-1" },
        pushDetail,
      })
      .reply(200, sendMessageExamplePayload.data);

    const { result } = await invoke(sendMessage, params);
    expect(result).toEqual(sendMessageExamplePayload);
  });

  it("does not throw when messageDetails is not set", async () => {
    const { messageDetails: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/sendMessage`)
      .reply(200, sendMessageExamplePayload.data);

    const { result } = await invoke(sendMessage, withoutKey as typeof params);
    expect(result).toEqual(sendMessageExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/sendMessage`)
      .reply(400, { error: "invalid" });

    await expect(invoke(sendMessage, params)).rejects.toThrow();
  });
});

describe("updateMessageTemplateById", () => {
  const params = {
    connection: oauthTestConnection(),
    messageTemplateId: "tmpl-1",
    messageTemplateName: "Welcome Template",
    notificationTypeId: "nt-1",
    createdById: "cb-1",
    emailDetail,
    pushDetail,
    referenceId: "ref-1",
    templateInactive: false,
    templateDescriptor: "Welcome",
    templateId: "tmpl-1",
    extraBody: { category: "Onboarding" },
  };

  it("sends the mapped body with PUT and returns the template", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/messageTemplates/tmpl-1`, templateBody)
      .reply(200, updateMessageTemplateByIdExamplePayload.data);

    const { result } = await invoke(updateMessageTemplateById, params);
    expect(result).toEqual(updateMessageTemplateByIdExamplePayload);
  });

  it("does not throw when Email Detail and Push Detail are not set", async () => {
    const {
      emailDetail: _email,
      pushDetail: _push,
      ...bodyWithoutDetails
    } = templateBody;
    const { emailDetail: _e, pushDetail: _p, ...withoutKeys } = params;
    nock(TEST_HOST)
      .put(`${SERVICE}/messageTemplates/tmpl-1`, bodyWithoutDetails)
      .reply(200, updateMessageTemplateByIdExamplePayload.data);

    const { result } = await invoke(
      updateMessageTemplateById,
      withoutKeys as typeof params,
    );
    expect(result).toEqual(updateMessageTemplateByIdExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/messageTemplates/tmpl-1`)
      .reply(404, { error: "not found" });

    await expect(invoke(updateMessageTemplateById, params)).rejects.toThrow();
  });
});
