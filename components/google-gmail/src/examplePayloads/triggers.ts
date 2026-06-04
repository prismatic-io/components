import type {
  TriggerBaseResult,
  TriggerBranchingResult,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { getEventHistoryExamplePayload } from "./actions";














export const managedPushNotificationEventsExamplePayload: TriggerBranchingResult<TriggerPayload> = {
  response: {
    statusCode: 200,
    contentType: "text/plain",
  },
  branch: "Notification",
  payload: {
    flow: {
      id: "SW5zdGFuY2VGbG93Q29uZmlnOjEyMzQ1Njc4OTA==",
      name: "Gmail Notifications Flow",
    },
    startedAt: "2024-11-06T15:30:45.123Z",
    integration: {
      id: "SW50ZWdyYXRpb246OTg3NjU0MzIxMA==",
      name: "Gmail Integration",
      externalVersion: "1.0.0",
      versionSequenceId: "SW50ZWdyYXRpb25WZXJzaW9uU2VxdWVuY2U6MTIzNDU2Nzg5MA==",
    },
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      From: "noreply@google.com",
      Host: "hooks.example.com",
      "User-Agent": "APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)",
      "X-Amz-Cf-Id": "xYzAbCdEfGhIjKlMnOpQrStUvW1234567890-Example-CloudFront-ID==",
      "X-Amzn-Trace-Id": "Root=1-65abc123-1234567890abcdef12345678",
    },
    queryParameters: {},
    rawBody: { data: {}, contentType: "application/json" },
    body: {
      data: {
        message: {
          
          data: "eyJlbWFpbEFkZHJlc3MiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaGlzdG9yeUlkIjoiMTIzNDU2Nzg5MCJ9",
          decodedData: {
            emailAddress: "user@example.com",
            historyId: "1234567890",
          },
          messageId: "1234567890123456",
          message_id: "1234567890123456",
          publishTime: "2024-11-06T15:30:45.123Z",
          publish_time: "2024-11-06T15:30:45.123Z",
        },
        subscription: "projects/example-project-123456/subscriptions/gmail-notifications-sub",
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Gmail Notifications Flow": "https://hooks.example.com/trigger/aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    },
    webhookApiKeys: {
      "Gmail Notifications Flow": ["example_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890"],
    },
    invokeUrl: "https://hooks.example.com/trigger/aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    executionId: "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6OTg3NjU0MzIxMA==",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU2Nzg5MA==",
      name: "Acme Corporation",
      externalId: "acme-corp-ext-12345",
    },
    instance: {
      id: "SW5zdGFuY2U6OTg3NjU0MzIxMA==",
      name: "Gmail Integration - Acme Corp",
    },
    user: {
      id: "VXNlcjo5ODc2NTQzMjEw",
      email: "admin@example.com",
      name: "Admin User",
      externalId: "admin-user-ext-67890",
    },
    globalDebug: false,
  },
};





export const pushNotificationWebhookExamplePayload: TriggerBaseResult<TriggerPayload> =
  managedPushNotificationEventsExamplePayload;

export const pollChangesTriggerExamplePayload: TriggerBaseResult<TriggerPayload> = {
  response: {
    statusCode: 200,
    contentType: "application/json",
  },
  payload: {
    headers: {
      "prismatic-invoke-type": "Integration Flow Test",
      "prismatic-simulated-test-execution": "true",
      "Content-Type": "application/json",
      "Prismatic-Synchronous": "false",
    },
    queryParameters: null,
    rawBody: { data: {}, contentType: "application/json" },
    body: {
      data: {
        history: [
          {
            id: "123456",
            messages: [
              {
                id: "1234567890abcdef",
                threadId: "1234567890abcdef",
                message: {
                  headers: {
                    "delivered-to": {
                      value: [
                        {
                          address: "example@email.com",
                          name: "",
                        },
                      ],
                      html: '<span class="mp_address_group"><a href="mailto:example@email.com" class="mp_address_email">example@email.com</a></span>',
                      text: "example@email.com",
                    },
                    received: [
                      "by 2002:a05:1234:0:b0:123:4567:89ab with SMTP id x1csp123456abc; Wed, 12 Nov 2025 16:24:42 -0800 (PST)",
                      "from mail-example.google.com (mail-example.google.com. [209.85.220.100]) by mx.google.com with SMTPS id example123-abcdef123456sor12345678.1.2025.11.12.16.24.41 for <example@email.com> (Google Transport Security); Wed, 12 Nov 2025 16:24:42 -0800 (PST)",
                    ],
                    "x-received": [
                      "by 2002:a05:1234:5678:b0:123:abcd:efgh with SMTP id example123-abc123def456mr123456789.33.1234567890123; Wed, 12 Nov 2025 16:24:42 -0800 (PST)",
                      "by 2002:a05:1234:4321:b0:abc:def1:2345 with SMTP id example456-def456ghi789mr987654321.4.1234567890456; Wed, 12 Nov 2025 16:24:41 -0800 (PST)",
                    ],
                    "arc-seal":
                      "i=1; a=rsa-sha256; t=1234567890; cv=none; d=google.com; s=arc-20240605; b=ExampleSignatureABCD1234/5678EFGH+ijklMNOP/qrstUVWX+yzABCDEF/ GHIJKLmnopQRSTuvwxYZ012345+6789abcdefGHIJKL/mnopqrstUVWXyz0123/ 456789ABCDEFghijklMNOPqrstUVWXyz+0123456789abcDEFGHijklMNOP/qrst UVWXyzABCDEF0123456789+abcdefGHIJKLmnopQRSTuvwxYZ0123456789/ABCD EFGHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRSTuvwx/ YZ012==",
                    "arc-message-signature":
                      "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605; h=to:subject:message-id:date:from:mime-version:dkim-signature; bh=ExampleHashABCD1234/EFGH5678/ijklMNOPqrstUVWXyz0123456789=; fh=Example0123456789ABCDEFGHijklMNOPqrstUVWXyz=; b=ExampleMessageSignatureABCD/1234567890EFGH+ijklMNOPqrstUVWX/yz01 23456789ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789/abcdefGHIJKL+mn opQRSTuvwxYZ0123456789ABCDEFGHijklMNOPqrstUVWXyz/0123456789abcDEF GHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRSTuvwxYZ/01 23456789ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKL/mn opQRS==; dara=google.com",
                    "arc-authentication-results":
                      "i=1; mx.google.com; dkim=pass header.i=@example.com header.s=google header.b=ExampleAB; spf=pass (google.com: domain of example@email.com designates 209.85.220.100 as permitted sender) smtp.mailfrom=example@email.com; dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.com; dara=pass header.i=@gmail.com",
                    "return-path": {
                      value: [
                        {
                          address: "example@email.com",
                          name: "",
                        },
                      ],
                      html: '<span class="mp_address_group"><a href="mailto:example@email.com" class="mp_address_email">example@email.com</a></span>',
                      text: "example@email.com",
                    },
                    "received-spf":
                      "pass (google.com: domain of example@email.com designates 209.85.220.100 as permitted sender) client-ip=209.85.220.100;",
                    "authentication-results":
                      "mx.google.com; dkim=pass header.i=@example.com header.s=google header.b=ExampleAB; spf=pass (google.com: domain of example@email.com designates 209.85.220.100 as permitted sender) smtp.mailfrom=example@email.com; dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.com; dara=pass header.i=@gmail.com",
                    "dkim-signature": {
                      value: "v=1",
                      params: {
                        a: "rsa-sha256",
                        c: "relaxed/relaxed",
                        d: "example.com",
                        s: "google",
                        t: "1234567890",
                        x: "1234567891",
                        dara: "google.com",
                        h: "to:subject:message-id:date:from:mime-version:from:to:cc:subject :date:message-id:reply-to",
                        bh: "ExampleHashABCD1234EFGH5678ijklMNOPqrstUVWXyz=",
                        b: "ExampleDKIMSignature123/ABCD456EFGH789ijkl/MNOP0123qrstUVWXyz4567 89ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRST uvwxYZ0123456789ABCDEFGHijklMNOPqrstUVWXyz/0123456789Example=",
                      },
                    },
                    "x-google-dkim-signature":
                      "v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20230601; t=1234567890; x=1234567891; h=to:subject:message-id:date:from:mime-version:x-gm-gg :x-gm-message-state:from:to:cc:subject:date:message-id:reply-to; bh=ExampleHashABCD1234EFGH5678ijklMNOPqrstUVWXyz=; b=ExampleGoogleDKIMSignature/ABCD1234EFGH5678+ijklMNOPqrstUVWXyz01 23456789ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789/abcdefGHIJKLmn opQRSTuvwxYZ0123456789ABCDEFGHijklMNOPqrstUVWXyz/0123456789abcDEF GHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRSTuvwxYZ/01 23456789ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKL/Ex ample==",
                    "x-gm-message-state":
                      "ExampleMessageState123ABCD456EFGH789ijklMNOPqrstUVWXyz012345 6789ABCDEFGHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRST uvwxYZ0123456789ABCDEFGHijklMNOPqrstUVWXyz/ExampleStateEnd",
                    "x-gm-gg":
                      "ExampleGmGg123ABCD456EFGH789ijklMNOPqrstUVWXyz0123456789ABCDEF GHijklMNOPqrstUVWXyzABCDEF0123456789abcdefGHIJKLmnopQRSTuvwxYZ012 3456789ABCDEFGHijklMNOPqrstUVWXyz0123456789abcDEFGHijklMNOPqrstUV WXyzABCDEF0123456789abcdefGHIJKLmnopQRSTuvwxYZ0123456789ABCDEFGH ijklMNOPqrstUVWXyzExampleEnd",
                    "x-google-smtp-source":
                      "ExampleSMTPSource+ABCD1234EFGH5678ijklMNOPqrstUVWXyz0123456789ABCDEFGHijklMNOPqrstUVWXyz=",
                    "mime-version": "1.0",
                    from: {
                      value: [
                        {
                          address: "example@email.com",
                          name: "Example User",
                        },
                      ],
                      html: '<span class="mp_address_group"><span class="mp_address_name">Example User</span> &lt;<a href="mailto:example@email.com" class="mp_address_email">example@email.com</a>&gt;</span>',
                      text: "Example User <example@email.com>",
                    },
                    date: "2025-11-13T00:24:30.000Z",
                    "x-gm-features": "ExampleFeatures123ABCD456EFGH789ijklMNOPqrstUVWXyz0123456789",
                    "message-id":
                      "<ExampleMessageID123456789ABCDEFGH+ijklMNOPqrstUVWX@mail.gmail.com>",
                    subject: "test",
                    to: {
                      value: [
                        {
                          address: "example@email.com",
                          name: "",
                        },
                      ],
                      html: '<span class="mp_address_group"><a href="mailto:example@email.com" class="mp_address_email">example@email.com</a></span>',
                      text: "example@email.com",
                    },
                    "content-type": {
                      value: "multipart/alternative",
                      params: {
                        boundary: "000000000000abcdef123456789012",
                      },
                    },
                  },
                  attachments: [],
                  text: "example.com/overview.pdf\nhttps://example.com/\n",
                  html: '<div dir="ltr"><div><br clear="all"></div><div><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><img width="420" height="140" src="https://ci3.googleusercontent.com/mail-sig/ExampleImageSignatureABCD1234EFGH5678ijklMNOPqrstUVWXyz0123456789"><br><div><a href="http://example.com/overview.pdf" target="_blank">example.com/overview.pdf</a></div><div><a href="https://example.com/" target="_blank">https://example.com/</a></div></div></div></div></div>\n',
                },
              },
            ],
          },
        ],
        historyId: "123457",
      },
    },
    pathFragment: "",
    webhookUrls: {
      Renew:
        "https://hooks.example.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjEyMzQ1Njc4LTkwYWItY2RlZi0xMjM0LTU2Nzg5MGFiY2RlZg==",
    },
    webhookApiKeys: {
      Renew: [],
    },
    invokeUrl:
      "https://hooks.example.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmFiY2RlZjEyLTM0NTYtNzg5MC1hYmNkLWVmMTIzNDU2Nzg5MA==",
    executionId: "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6YWJjZGVmMTItMzQ1Ni03ODkwLWFiY2QtZWYxMjM0NTY3ODkw",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU2NzgtOTBhYi1jZGVmLTEyMzQtNTY3ODkwYWJjZGVm",
      name: "Gmail Integration - Polling",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "SW50ZWdyYXRpb246YWJjZGVmMTItMzQ1Ni03ODkwLWFiY2QtZWYxMjM0NTY3ODkw",
      name: "Gmail Integration",
      versionSequenceId: "testIntegrationVersionSequenceId",
      externalVersion: "",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OjEyMzQ1Njc4LTkwYWItY2RlZi0xMjM0LTU2Nzg5MGFiY2RlZg==",
      name: "Polling",
    },
    startedAt: "2025-11-13 00:44:12.13497+00",
    globalDebug: true,
  },
};
