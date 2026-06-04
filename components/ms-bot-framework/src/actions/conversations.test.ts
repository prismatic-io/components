import { testing } from "@prismatic-io/spectral";
import { clientCredentials as oauth } from "../connections";

import component from "..";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("conversations", () => {
  const harness = testing.createHarness(component);
  const connection = harness.connectionValue(oauth);

  it("should list conversation members", async () => {
    const result = await harness.action("getConversationMembers", {
      connection,
      serviceUrl: "https://smba.trafficmanager.net/teams/",
      apiVersion: "3",
      conversationId: "19:Tc7ktfj4VF7CZ9grVlyNeUh-kt1GkTldtNQm_U_dgSE1@thread.tacv2",
    });
    console.log(JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it("should create a conversation with a user", async () => {
    const result = await harness.action("createConversation", {
      connection,
      serviceUrl: "https://smba.trafficmanager.net/teams/",
      apiVersion: "3",
      botId: "28:578216c1-7417-42fb-a409-4bf409927b17",
      memberId:
        "29:1ilsjgoHUI3x0icsdaXhy4DUI1-NzYvxkz5izkpbtpZT7Ew7CCut_kkyaJMZnHDON_BmKfio8HwhFAPhPzS_83Q",
      tenantId: "1fdfb076-f65d-46cc-a42a-08695435cddc",
    });
    console.log(JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it("should create an activity on a conversation", async () => {
    const result = await harness.action("sendMessage", {
      connection,
      serviceUrl: "https://smba.trafficmanager.net/teams/",
      apiVersion: "3",
      conversationId:
        "a:1-m6-i_J8YyN0_MmDD1Dw1h7R75WvLH8dHDFQCTMTWrKbjdBESL67pEV8H4pMIsQidZSZQCFUT93CL53nbu0BObsfVtd6sCLA6xJIzxFUzxbseRMQ6_hzZJ-Eya_2HQg1",
      text: "hello world",
      textFormat: "markdown",
    });
    console.log(JSON.stringify(result));
    expect(result).toBeDefined();
  });
});
