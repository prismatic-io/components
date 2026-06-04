import type { PaginatedResponse } from "../types";

export const getJourneyExamplePayload = {
  data: {
    id: "69dd5e94-d963-4508-861b-8f818d6da93a",
    key: "281ba2ad-c597-4740-54f6-3cc41f629caa",
    name: "Example Journey",
    lastPublishedDate: "2020-04-30T03:54:50",
    description: "",
    version: 1,
    workflowApiVersion: 1,
    createdDate: "2020-04-30T03:54:17.993",
    modifiedDate: "2020-04-30T03:54:50.667",
    activities: [
      {
        id: "6a630227-757b-449e-9ecb-e8ef0946b714",
        key: "REST-1",
        name: "",
        description: "",
        type: "REST",
        outcomes: [
          {
            key: "12974ba8-e3e7-407f-91ec-ee93bae7dad4",
            next: "WAITBYDURATION-1",
            arguments: {},
            metaData: {
              invalid: false,
            },
          },
        ],
        arguments: {
          executionMode: "{{Context.ExecutionMode}}",
          definitionId: "{{Context.DefinitionId}}",
          activityId: "{{Activity.Id}}",
          contactKey: "{{Context.ContactKey}}",
          execute: {
            inArguments: [
              {
                emailAddress: "{{Contact.Attribute.EmailAddress}}",
                api_key: "example-api-key-123",
                title: "Example Title",
                description: "Example Description",
                image_url: "https://example.com/images/example-image.jpeg",
                push_url: "https://example.com/webhook/",
              },
            ],
            outArguments: [],
            url: "https://example.com/api/activity/execute",
            verb: "POST",
            body: "",
            header: "",
            format: "json",
            timeout: 90000,
          },
          testExecute: "",
          startActivityKey: "{{Context.StartActivityKey}}",
          definitionInstanceId: "{{Context.DefinitionInstanceId}}",
          requestObjectId: "{{Context.RequestObjectId}}",
        },
        configurationArguments: {
          applicationExtensionKey: "f10680af-8b0b-492c-8417-56a158edc788",
          applicationExtensionId: "b053f0cd-2e41-446c-9150-d34733ee446a",
          save: {
            url: "https://example.com/api/activity/save",
            verb: "POST",
            body: "",
          },
          testSave: "",
          publish: {
            url: "https://example.com/api/activity/publish",
            verb: "POST",
            body: "",
          },
          testPublish: "",
          unpublish: "",
          stop: "",
          testStop: "",
          testUnpublish: "",
          partnerActivityId: "",
          validate: {
            url: "https://example.com/api/activity/validate",
            verb: "POST",
            body: "",
          },
          testValidate: "",
          outArgumentSchema: "",
          executeSchema: "",
        },
        metaData: {
          icon: "https://example.com/images/icon.png",
          iconSmall: "https://example.com/images/iconSmall.png",
          category: "message",
          isConfigured: true,
          statsContactIcon: "",
          original_icon: "images/icon.png",
          original_iconSmall: "images/iconSmall.png",
        },
      },
    ],
    triggers: [
      {
        id: "1f9e7189-0fd9-49de-9a4d-1d45bfa8647d",
        key: "TRIGGER",
        name: "TRIGGER",
        description: "",
        type: "EmailAudience",
        outcomes: [],
        arguments: {
          startActivityKey: "{{Context.StartActivityKey}}",
          dequeueReason: "{{Context.DequeueReason}}",
          lastExecutedActivityKey: "{{Context.LastExecutedActivityKey}}",
          filterResult: "true",
        },
        configurationArguments: {
          schemaVersionId: 0,
          criteria: "",
          filterDefinitionId: "00000000-0000-0000-0000-000000000000",
        },
        metaData: {
          sourceInteractionId: "00000000-0000-0000-0000-000000000000",
          eventDefinitionId: "4b3fe563-edc3-4b89-a1b1-d3f2b2821f06",
          eventDefinitionKey: "DEAudience-b9b8d08c-91bf-4b09-fc61-ff1b60ed751c",
          chainType: "None",
          configurationRequired: false,
          iconUrl: "/images/icon-data-extension.svg",
          title: "Data Extension",
          entrySourceGroupConfigUrl:
            "jb:///data/entry/audience/entrysourcegroupconfig.json",
        },
      },
    ],
    goals: [],
    exits: [],
    notifiers: [],
    stats: {
      currentPopulation: 0,
      cumulativePopulation: 0,
      metGoal: 0,
      metExitCriteria: 0,
      goalPerformance: 0,
    },
    entryMode: "MultipleEntries",
    definitionType: "Multistep",
    channel: "",
    defaults: {
      email: [
        '{{Event.DEAudience-b9b8d08c-91bf-4b09-fc61-ff1b60ed751c."EmailAddress"}}',
      ],
      properties: {
        analyticsTracking: {
          enabled: false,
          analyticsType: "google",
          urlDomainsToTrack: [],
        },
      },
    },
    metaData: {},
    executionMode: "Production",
    categoryId: 2929,
    status: "Published",
    definitionId: "69dd5e94-d963-4508-861b-8f818d6da93a",
    scheduledStatus: "Draft",
    campaigns: [],
  },
};

export const listJourneysExamplePayload: { data: PaginatedResponse } = {
  data: {
    count: 1,
    page: 1,
    pageSize: 50,
    links: {},
    items: [
      {
        id: "69dd5e94-d963-4508-861b-8f818d6da93a",
        key: "281ba2ad-c597-4740-54f6-3cc41f629caa",
        name: "Example Journey",
        lastPublishedDate: "2020-04-30T03:54:50",
        description: "",
        version: 1,
        workflowApiVersion: 1,
        createdDate: "2020-04-30T03:54:17.993",
        modifiedDate: "2020-04-30T03:54:50.667",
        goals: [],
        exits: [],
        notifiers: [],
        stats: {
          currentPopulation: 0,
          cumulativePopulation: 0,
          metGoal: 0,
          metExitCriteria: 0,
          goalPerformance: 0,
        },
        entryMode: "MultipleEntries",
        definitionType: "Multistep",
        channel: "",
        defaults: {
          email: [
            '{{Event.DEAudience-b9b8d08c-91bf-4b09-fc61-ff1b60ed751c."EmailAddress"}}',
          ],
          properties: {
            analyticsTracking: {
              enabled: false,
              analyticsType: "google",
              urlDomainsToTrack: [],
            },
          },
        },
        metaData: {},
        executionMode: "Production",
        categoryId: 2929,
        status: "Published",
        definitionId: "69dd5e94-d963-4508-861b-8f818d6da93a",
        scheduledStatus: "Draft",
        campaigns: [],
      },
    ],
  },
};

export const createJourneyExamplePayload = getJourneyExamplePayload;

export const updateJourneyExamplePayload = getJourneyExamplePayload;

export const fireEntryEventExamplePayload = {
  data: {
    eventInstanceId: "d4e5f6a7-b8c9-0123-defa-345678901234",
  },
};

export const deleteJourneyExamplePayload = {
  data: null,
};

export const exitContactFromJourneyExamplePayload = {
  data: {
    errors: [],
  },
};
