









const warehouse = {
  id: "kjU72LCJexvrqL7G4TMHHN",
  workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
  enabled: true,
  metadata: {
    id: "55d3d3aea3c",
    slug: "postgres",
    name: "Postgres",
    description: "Open source data warehouse",
    logos: {
      default:
        "https://d3hotuclm6if1r.cloudfront.net/logos/postgres-default.svg",
      mark: "",
      alt: "",
    },
    options: [
      {
        name: "port",
        required: true,
        type: "string",
      },
      {
        name: "database",
        required: true,
        type: "string",
      },
      {
        name: "hostname",
        required: true,
        type: "string",
      },
      {
        name: "password",
        required: true,
        type: "string",
      },
      {
        name: "username",
        required: true,
        type: "string",
      },
      {
        name: "ciphertext",
        required: true,
        type: "string",
      },
    ],
  },
  settings: {
    host: "aws.redshift.dev",
    name: "Redshift Dev",
  },
};





export const getWarehouseExamplePayload = {
  data: {
    warehouse,
  },
};





export const listWarehousesExamplePayload = {
  data: {
    warehouses: [warehouse, warehouse],
    pagination: {
      current: "MA==",
      totalEntries: 2,
    },
  },
};





export const addConnectionFromSourceExamplePayload = {
  data: {
    status: "CONNECTED",
  },
};





export const deleteExamplePayload = {
  data: {
    status: "SUCCESS",
  },
};





export const createWarehouseExamplePayload = {
  data: {
    warehouse,
  },
};





export const updateWarehouseExamplePayload = {
  data: {
    warehouse,
  },
};



const source = {
  id: "qQEHquLrjRDN9j1ByrChyn",
  slug: "ios",
  name: "",
  workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
  enabled: true,
  writeKeys: ["3YdEudTwjouyC5WPjpbTik"],
  metadata: {
    id: "UBrsG9RVzw",
    slug: "ios",
    name: "iOS",
    categories: ["Mobile"],
    description: "",
    logos: {
      default: "https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u",
      alt: "https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u",
    },
    options: [],
    isCloudEventSource: false,
  },
  settings: {},
  labels: [],
};





export const getSourceExamplePayload = {
  data: {
    source,
  },
};





export const listSourcesExamplePayload = {
  data: {
    sources: [
      {
        id: "qQEHquLrjRDN9j1ByrChyn",
        slug: "ios",
        name: "",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        enabled: true,
        writeKeys: ["3YdEudTwjouyC5WPjpbTik"],
        metadata: {
          id: "UBrsG9RVzw",
          slug: "ios",
          name: "iOS",
          categories: ["Mobile"],
          description: "",
          logos: {
            default: "https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u",
            alt: "https://cdn.filepicker.io/api/file/qWgSP5cpS7eeW2voq13u",
          },
          options: [],
          isCloudEventSource: false,
        },
        settings: {},
        labels: [],
      },
      source,
    ],
    pagination: {
      current: "MA==",
      totalEntries: 2,
    },
  },
};



export const destination = {
  id: "5GFhvtz8fha42Cm4B9E6L8",
  enabled: true,
  name: "",
  settings: {
    region: "us-west",
    roleAddress: "arn::...",
    secretId: "secrettt",
    stream: "bla",
  },
  metadata: {
    id: "57da359580412f644ff33fb9",
    name: "Amazon Kinesis",
    description:
      "Amazon Kinesis Streams enables you to build custom applications that process or analyze streaming data for specialized needs. Amazon Kinesis Streams can continuously capture and store terabytes of data per hour from hundreds of thousands of sources such as website clickstreams, financial transactions, social media feeds, IT logs, and location-tracking events.",
    slug: "amazon-kinesis",
    logos: {
      default: "https://cdn.filepicker.io/api/file/qr7D6jkLQvd1KAJlY8Zp",
      mark: "https://cdn.filepicker.io/api/file/zLZbfcBeSZTfX4CsgBvA",
    },
    options: [
      {
        name: "region",
        type: "string",
        defaultValue: "us-west-2",
        description: "The Kinesis Stream's AWS region key",
        required: true,
        label: "AWS Kinesis Stream Region",
      },
      {
        name: "roleAddress",
        type: "string",
        defaultValue: "",
        description:
          "The address of the AWS role that will be writing to Kinesis (ex: arn:aws:iam::874699288871:role/example-role)",
        required: true,
        label: "Role Address",
      },
      {
        name: "secretId",
        type: "string",
        defaultValue: "#SEGMENT_WORKSPACE_ID",
        description:
          "The External ID to your IAM role. This value is read-only. Reach out to support if you wish to change it. This value is also a secret and should be treated as a password.",
        required: true,
        label: "Secret ID (Read-Only)",
      },
      {
        name: "stream",
        type: "string",
        defaultValue: "",
        description: "The Kinesis Stream Name",
        required: true,
        label: "AWS Kinesis Stream Name",
      },
      {
        name: "useMessageId",
        type: "boolean",
        defaultValue: false,
        description:
          "You can enable this option if you want to use the Segment generated `messageId` for the **Partition Key**. If you have issues with too many `provisionedthroughputexceededexceptions` errors, this means that your Segment events are not being evenly distributed across your buckets as you do not have even user event distribution (*default partition key is `userId` or `anonymousId`*). This option should provide much more stable and even distribution.",
        required: false,
        label: "Use Segment Message ID",
      },
    ],
    status: "PUBLIC",
    categories: ["Analytics", "Raw Data"],
    website: "https://aws.amazon.com/kinesis/streams/",
    components: [
      {
        code: "https://github.com/segmentio/integrations/tree/master/integrations/amazon-kinesis",
        type: "SERVER",
      },
    ],
    previousNames: ["Amazon Kinesis"],
    supportedMethods: {
      track: true,
      pageview: true,
      identify: true,
      group: true,
      alias: true,
    },
    supportedPlatforms: {
      browser: true,
      mobile: true,
      server: true,
      warehouse: false,
    },
    supportedFeatures: {
      cloudModeInstances: "0",
      deviceModeInstances: "0",
      replay: true,
      browserUnbundling: false,
      browserUnbundlingPublic: true,
    },
    actions: [],
    presets: [],
    contacts: [],
    partnerOwned: false,
  },
  sourceId: "rh5BDZp6QDHvXFCkibm1pR",
};





export const getDestinationExamplePayload = {
  data: {
    destination,
  },
};





export const listDestinationsExamplePayload = {
  data: {
    destinations: [destination, destination],
    pagination: {
      current: "MA==",
      next: "MQ==",
      totalEntries: 2,
    },
  },
};



const destinationSubscription = {
  id: "eoeXaMeAYcB2XvEApJDrQs",
  name: "Test Subscription",
  actionId: "uD9jEQ4DxJZzhzVqppM7UD",
  actionSlug: "Public API Slug",
  destinationId: "fP7qoQw2HTWt9WdMr718gn",
  modelId: "",
  enabled: true,
  trigger: 'type = "track"',
  settings: {},
};





export const getDestinationSubscriptionExamplePayload = {
  data: {
    subscription: destinationSubscription,
  },
};





export const listDestinationSubscriptionsExamplePayload = {
  data: {
    pagination: {
      current: "MA==",
      totalEntries: 1,
    },
    subscriptions: [destinationSubscription, destinationSubscription],
  },
};



const functionData = {
  id: "sfnc_wXzcDGFR3KmjLDrtSawNHf",
  workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
  displayName: "PAPI Source Function",
  description: "My source function",
  logoUrl: "https://placekitten.com/200/139",
  code: "// Learn more about source functions API at https://segment.com/docs/connections/sources/source-functions",
  createdAt: "2006-01-02T15:04:05.000Z",
  createdBy: "sgJDWk3K21k6LE3tLU9nRK",
  previewWebhookUrl: "",
  settings: [
    {
      name: "apiKey",
      label: "api key",
      description: "api key",
      type: "STRING",
      required: false,
      sensitive: false,
    },
    {
      name: "mySecret",
      label: "my secret key",
      description: "secret key",
      type: "STRING",
      required: false,
      sensitive: true,
    },
  ],
  buildpack: "",
  catalogId: "wXzcDGFR3KmjLDrtSawNHf",
  batchMaxCount: 0,
  resourceType: "SOURCE",
};





export const getFunctionExamplePayload = {
  data: {
    function: functionData,
  },
};





export const listFunctionsExamplePayload = {
  data: {
    functions: [
      {
        id: "sfnc_wXzcDGFR3KmjLDrtSawNHf",
        displayName: "PAPI Source Function",
        description: "My source function",
        logoUrl: "https://placekitten.com/200/139",
        createdAt: "2006-01-02T15:04:05.000Z",
        createdBy: "sgJDWk3K21k6LE3tLU9nRK",
        catalogId: "wXzcDGFR3KmjLDrtSawNHf",
        resourceType: "SOURCE",
      },
    ],
    pagination: {
      current: "MQ==",
    },
  },
};







export const listDestinationCatalogExamplePayload = {
  data: {
    destinationsCatalog: [
      {
        id: "54521fd525e721e32a72ee8e",
        name: "AdRoll",
        description:
          "AdRoll is a retargeting network that allows you to show ads to visitors who've landed on your site while browsing the web. ",
        slug: "adroll",
        logos: {
          default:
            "https://d3hotuclm6if1r.cloudfront.net/logos/adroll-default.svg",
          mark: "https://cdn.filepicker.io/api/file/IKo2fU59RROBsNtj4lHs",
        },
        options: [
          {
            name: "_version",
            type: "number",
            defaultValue: 2,
            description: "",
            required: false,
            label: "_version",
          },
          {
            name: "advId",
            type: "string",
            defaultValue: "",
            description:
              "You can find your Advertiser ID in your AdRoll dashboard by clicking the **green or red dot** in the lower-left corner. In the Javascript snippet, the Advertiser ID appears as `adroll_avd_id = 'XXXXXXX'` on line 2. It should be 22 characters long and look something like this: `WYJD6WNIAJC2XG6PT7UK4B`.",
            required: true,
            label: "Advertiser ID",
          },
          {
            name: "events",
            type: "text-map",
            defaultValue: {},
            description:
              "AdRoll allows you to create a Segment Name and ID for conversions events. Use this mapping to trigger the *AdRoll Segment ID* (on the right) when the Event Name (on the left) is passed in a Track method.",
            required: false,
            label: "Events",
          },
          {
            name: "pixId",
            type: "string",
            defaultValue: "",
            description:
              "You can find your Pixel ID in your AdRoll dashboard by clicking the **green or red dot** in the lower-left corner. In the Javascript snippet, the Pixel ID appears as `adroll_pix_id = 'XXXXXXX'` on line 3. It should be 22 characters long, and look something like this: `6UUA5LKILFESVE44XH6SVX`.",
            required: true,
            label: "Pixel ID",
          },
        ],
        status: "PUBLIC",
        categories: ["Advertising"],
        website: "http://adroll.com",
        components: [
          {
            code: "https://github.com/segment-integrations/analytics.js-integration-adroll",
            type: "BROWSER",
          },
        ],
        previousNames: ["AdRoll"],
        supportedMethods: {
          track: true,
          pageview: true,
          identify: true,
          group: false,
          alias: false,
        },
        supportedPlatforms: {
          browser: true,
          mobile: false,
          server: false,
          warehouse: false,
        },
        supportedFeatures: {
          cloudModeInstances: "0",
          deviceModeInstances: "0",
          replay: false,
          browserUnbundling: false,
          browserUnbundlingPublic: true,
        },
        actions: [],
        presets: [],
        contacts: [
          {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "VP of engineering",
            isPrimary: true,
          },
        ],
        partnerOwned: false,
      },
      {
        id: "54521fd525e721e32a72ee8f",
        name: "AppsFlyer",
        description: "Mobile app measurement and tracking.",
        slug: "appsflyer",
        logos: {
          default:
            "https://d3hotuclm6if1r.cloudfront.net/logos/appsflyer-default.svg",
          mark: "https://cdn.filepicker.io/api/file/AnJUEBvxRouLLOvIeQuK",
        },
        options: [
          {
            name: "androidAppID",
            type: "string",
            defaultValue: "",
            description:
              "Your Android App's ID. Find this in your AppsFlyer's 'My App' dashboard. It should look something like 'com.appsflyer.myapp'. This is required for Android projects if you want to send events using the server side integration.",
            required: true,
            label: "Android App ID",
          },
          {
            name: "appleAppID",
            type: "string",
            defaultValue: "",
            description:
              "Your App's ID, which is accessible from iTunes or in AppsFlyer's 'My App' dashboard. This is optional for Android projects, and only required for iOS projects.",
            required: true,
            label: "Apple App ID (iOS)",
          },
          {
            name: "appsFlyerDevKey",
            type: "string",
            defaultValue: "",
            description:
              "Your unique developer ID from AppsFlyer, which is accessible from your AppsFlyer account.",
            required: true,
            label: "AppsFlyer Dev Key",
          },
          {
            name: "canOmitAppsFlyerId",
            type: "boolean",
            defaultValue: false,
            description:
              "*Only applicable for Appsflyer's Business Tiers customers using server-side or cloud mode destination.* Please contact your AppsFlyer representative for more information. This setting allows to use the advertising ID as appsflyer ID.",
            required: false,
            label: "Can Omit AppsFlyerId",
          },
          {
            name: "fallbackToIdfv",
            type: "boolean",
            defaultValue: false,
            description:
              'With the update to use analytics-ios v4.x SDK if adTrackingEnabled is set to false, the advertisingId key will be deleted from the event. If you have the setting enabled "Can Omit AppsFlyerId", these events will fail when sent to AppsFlyer API. To prevent these event failures in this scenario enable this send the IDFV instead. When the "Can Omit AppsFlyerId" setting is enabled if the IDFA is zeroed out, we will also send an IDFV when this setting is enabled. ',
            required: false,
            label:
              "Fallback to send IDFV when advertisingId key not present (Server-Side Only)",
          },
        ],
        status: "PUBLIC",
        categories: ["Attribution", "Deep Linking"],
        website: "http://www.appsflyer.com/",
        components: [
          {
            code: "https://github.com/AppsFlyerSDK/segment-appsflyer-ios",
            owner: "PARTNER",
            type: "IOS",
          },
          {
            code: "https://github.com/AppsFlyerSDK/AppsFlyer-Segment-Integration",
            owner: "PARTNER",
            type: "ANDROID",
          },
          {
            code: "https://github.com/segmentio/integrations/tree/master/integrations/appsflyer",
            owner: "SEGMENT",
            type: "SERVER",
          },
        ],
        previousNames: ["AppsFlyer"],
        supportedMethods: {
          track: true,
          pageview: true,
          identify: true,
          group: true,
          alias: true,
        },
        supportedPlatforms: {
          browser: false,
          mobile: true,
          server: true,
          warehouse: false,
        },
        supportedFeatures: {
          cloudModeInstances: "0",
          deviceModeInstances: "0",
          replay: false,
          browserUnbundling: false,
          browserUnbundlingPublic: true,
        },
        actions: [],
        presets: [],
        contacts: [],
        partnerOwned: false,
      },
    ],
    pagination: {
      current: "MA==",
      next: "Mg==",
      totalEntries: 400,
    },
  },
};





export const getDestinationMetadataExamplePayload = {
  data: {
    destinationMetadata: {
      id: "54521fd525e721e32a72ee91",
      name: "Amplitude",
      description:
        "Amplitude is an event tracking and segmentation platform for your web and mobile apps. By analyzing the actions your users perform, you can gain a better understanding to drive retention, engagement, and conversion.",
      slug: "amplitude",
      logos: {
        default:
          "https://d3hotuclm6if1r.cloudfront.net/logos/amplitude-default.svg",
        mark: "https://cdn.filepicker.io/api/file/Nmj7LgOQR62rdAmlbnLO",
      },
      options: [
        {
          name: "apiKey",
          type: "string",
          defaultValue: "",
          description:
            "You can find your API Key on your Amplitude [Settings page](https://amplitude.com/settings).",
          required: true,
          label: "API Key",
        },
        {
          name: "appendFieldsToEventProps",
          type: "text-map",
          defaultValue: {},
          description:
            "Web Device-mode only. Configure event fields to be appended to `event_props` for all track calls. For example, entering `context.page.title` on the left and `pageTitle` on the right will set the value of `context.page.title` at `event_properties.pageTitle`.",
          required: false,
          label: "Append Fields To Event Properties",
        },
        {
          name: "batchEvents",
          type: "boolean",
          defaultValue: false,
          description:
            "If true, events are batched together and uploaded only when the number of unsent events is greater than or equal to `eventUploadThreshold` or after `eventUploadPeriodMillis` milliseconds have passed since the first unsent event was logged.",
          required: false,
          label: "Batch Events",
        },
        {
          name: "deviceIdFromUrlParam",
          type: "boolean",
          defaultValue: false,
          description:
            "If true, the SDK will parse device ID values from url parameter `amp_device_id` if available.",
          required: false,
          label: "Set Device ID From URL Parameter amp_device_id",
        },
        {
          name: "enableLocationListening",
          type: "boolean",
          defaultValue: true,
          description:
            "Mobile Only. If a user has granted your app location permissions, enable this setting so that the SDK will also grab the location of the user. Amplitude will never prompt the user for location permission, so this must be done by your app. ",
          required: false,
          label: "Enable Location Listening",
        },
      ],
      status: "PUBLIC",
      categories: ["Analytics"],
      website: "http://amplitude.com",
      components: [
        {
          code: "https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/amplitude",
          owner: "SEGMENT",
          type: "BROWSER",
        },
        {
          code: "https://github.com/segment-integrations/analytics-ios-integration-amplitude",
          owner: "SEGMENT",
          type: "IOS",
        },
        {
          code: "https://github.com/segment-integrations/analytics-android-integration-amplitude",
          owner: "SEGMENT",
          type: "ANDROID",
        },
        {
          code: "https://github.com/segmentio/integrations/tree/master/integrations/amplitude",
          owner: "SEGMENT",
          type: "SERVER",
        },
      ],
      previousNames: ["Amplitude"],
      supportedMethods: {
        track: true,
        pageview: true,
        identify: true,
        group: true,
        alias: false,
      },
      supportedPlatforms: {
        browser: true,
        mobile: true,
        server: true,
        warehouse: false,
      },
      supportedFeatures: {
        cloudModeInstances: "0",
        deviceModeInstances: "0",
        replay: false,
        browserUnbundling: true,
        browserUnbundlingPublic: true,
      },
      actions: [],
      presets: [],
      contacts: [
        {
          name: "Mike Ottavi-Brannon",
          email: "mike@amplitude.com",
          role: "Principle Product Manager",
          isPrimary: true,
        },
        {
          name: "Kurt Norwood",
          email: "kurt@amplitude.com",
          role: "Software Engineer",
          isPrimary: false,
        },
      ],
      partnerOwned: false,
      supportedRegions: ["eu-west-1", "us-west-2"],
      regionEndpoints: ["US", "EU"],
    },
  },
};





export const listSourceCatalogExamplePayload = {
  data: {
    sourcesCatalog: [
      {
        id: "XE0vf1bTDh",
        slug: "active-campaign",
        name: "ActiveCampaign",
        categories: ["Email Marketing"],
        description: "",
        logos: {
          default: "https://cdn.filepicker.io/api/file/kpEgW84qTXiC5vma7vfF",
          alt: "https://cdn.filepicker.io/api/file/kpEgW84qTXiC5vma7vfF",
        },
        options: [],
        isCloudEventSource: true,
      },
      {
        id: "pndBZqzhCE",
        slug: "addshoppers-suppression",
        name: "AddShoppers Suppression",
        categories: ["Email Marketing", "Analytics"],
        description:
          "AddShoppers offers clients the ability to send marketing emails to users who visit their site but they have not yet identified.",
        logos: {
          default: "https://cdn.filepicker.io/api/file/RIZBQaIfSlmtOLWSCkCR",
          mark: "https://cdn.filepicker.io/api/file/8OTdK7HvRtOIXYexhtmD",
        },
        options: [],
        isCloudEventSource: true,
      },
    ],
    pagination: {
      current: "MA==",
      next: "Mg==",
      totalEntries: 167,
    },
  },
};





export const getSourceMetadataExamplePayload = {
  data: {
    sourceMetadata: {
      id: "1bow82lmk",
      slug: "stripe",
      name: "Stripe",
      categories: ["Payments"],
      description:
        "Once you have successfully OAuth'd into Stripe, we will begin syncing Stripe objects (and their corresponding properties) to any databases you have turned on (to turn on a database, navigate to the database tab in the navigation pane on the left).",
      logos: {
        default: "https://cdn.filepicker.io/api/file/jp2UV0RtRU2FZaGxX4qF",
        alt: "https://cdn.filepicker.io/api/file/7BXASJF8ReVG9pfQCX9Z",
        mark: "https://cdn.filepicker.io/api/file/oVSkzKHQ96hIQkbK18ib",
      },
      options: [],
      isCloudEventSource: false,
    },
  },
};





export const getWarehouseMetadataExamplePayload = {
  data: {
    warehouseMetadata: {
      id: "55d3d3aea3c",
      slug: "postgres",
      name: "Postgres",
      description: "Open source data warehouse",
      logos: {
        default:
          "https://d3hotuclm6if1r.cloudfront.net/logos/postgres-default.svg",
        mark: "",
        alt: "",
      },
      options: [
        {
          name: "port",
          required: true,
          type: "string",
        },
        {
          name: "database",
          required: true,
          type: "string",
        },
        {
          name: "hostname",
          required: true,
          type: "string",
        },
        {
          name: "password",
          required: true,
          type: "string",
        },
        {
          name: "username",
          required: true,
          type: "string",
        },
        {
          name: "ciphertext",
          required: true,
          type: "string",
        },
      ],
    },
  },
};





export const listWarehouseCatalogExamplePayload = {
  data: {
    warehousesCatalog: [
      {
        id: "WcjBCzUGff",
        slug: "azuresqldw",
        name: "Azure SQL Data Warehouse",
        description: "Connector for Azure SQL Data Warehouse",
        logos: {
          default: "https://cdn.filepicker.io/api/file/VKbuWjNjQPKOnOWijFe4",
          mark: "https://cdn.filepicker.io/api/file/EUJvt69Q7qMqCvGrVtiu",
          alt: "",
        },
        options: [],
      },
      {
        id: "kwX50Df0hr",
        slug: "bigquery",
        name: "BigQuery",
        description: "Powered by Google Cloud Platform",
        logos: {
          default: "https://cdn.filepicker.io/api/file/bDzeRa75SZc6FfgfoUK6",
          mark: "https://cdn.filepicker.io/api/file/Vk6iFlMvQeynbg30ZEtt",
          alt: "https://cdn.filepicker.io/api/file/TXjmvgYRUuAa5ZfzNhmK",
        },
        options: [
          {
            name: "gc-project",
            required: true,
            type: "string",
          },
        ],
      },
    ],
    pagination: {
      current: "MA==",
      next: "Mg==",
      totalEntries: 6,
    },
  },
};



const userResponse = {
  id: "i2VTJURQprNfqdwjLFPWYx",
  name: "Sloth",
  email: "sloth@segment.com",
};





export const getUserExamplePayload = {
  data: {
    user: {
      id: "sgJDWk3K21k6LE3tLU9nRK",
      name: "",
      email: "papi@segment.com",
      permissions: [
        {
          roleId: "1WDUuRLxv84rrfCNUwvkrRtkxnS",
          roleName: "Workspace Owner",
          resources: [
            {
              id: "9aQ1Lj62S4bomZKLF4DPqW",
              type: "WORKSPACE",
              labels: [],
            },
          ],
        },
      ],
    },
  },
};





export const listUsersExamplePayload = {
  data: {
    users: [
      userResponse,
      {
        id: "sgJDWk3K21k6LE3tLU9nRK",
        name: "",
        email: "papi@segment.com",
      },
    ],
    pagination: {
      current: "MA==",
      totalEntries: 2,
    },
  },
};





export const createInviteExamplePayload = {
  data: {
    emails: ["foo@example.com"],
  },
};



const transformationResponse = {
  id: "pHrD51Ds35Zjfka84yXQE6",
  workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
  name: "updated-name",
  enabled: true,
  sourceId: "rh5BDZp6QDHvXFCkibm1pR",
  destinationMetadataId: "547610a5db31d978f14a5c4e",
  if: 'event="my-event"',
  newEventName: "my-updated-event",
  propertyRenames: [
    {
      oldName: "old-property",
      newName: "new-property",
    },
  ],
  propertyValueTransformations: [
    {
      propertyPaths: ["properties.another-property"],
      propertyValue: "another property value",
    },
  ],
};





export const getTransformationExamplePayload = {
  data: {
    transformation: transformationResponse,
  },
};





export const listTransformationExamplePayload = {
  data: {
    transformations: [
      transformationResponse,
      {
        id: "2Nhir2nRrIQLF7T9vdzjK3e7FfV",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        name: "Name of the new transformation",
        enabled: true,
        sourceId: "qQEHquLrjRDN9j1ByrChyn",
        if: "event = 'Example Event Beta'",
        newEventName: "new-event-name",
        propertyDrops: [],
        propertyRenames: [
          {
            oldName: "old-name",
            newName: "new-name",
          },
          {
            oldName: "another-name-old",
            newName: "another-name-new",
          },
        ],
        propertyValueTransformations: [
          {
            propertyPaths: [
              "context.some-property",
              "properties.some-property",
            ],
            propertyValue: "some property value",
          },
        ],
      },
      {
        id: "c5EmPMhTGmgwoas8YCKXgs",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        name: "Order cancelled event rename in destination",
        enabled: true,
        sourceId: "qQEHquLrjRDN9j1ByrChyn",
        destinationMetadataId: "54521fd725e721e32a72eebb",
        if: "event = 'Order Cancelled'",
        newEventName: "order_cancelled",
        propertyDrops: [],
        propertyRenames: [],
        propertyValueTransformations: [],
      },
      {
        id: "ks7SJDAn4XvW4VykJSQVz7",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        name: "User clicked event rename",
        enabled: true,
        sourceId: "qQEHquLrjRDN9j1ByrChyn",
        if: "event = 'User Clicked'",
        newEventName: "user_clicked",
        propertyDrops: [],
        propertyRenames: [],
        propertyValueTransformations: [],
      },
      {
        id: "pHrD51Ds35Zjfka84yXQE6",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        name: "updated-name",
        enabled: true,
        sourceId: "rh5BDZp6QDHvXFCkibm1pR",
        destinationMetadataId: "547610a5db31d978f14a5c4e",
        if: 'event="my-event"',
        newEventName: "my-updated-event",
        propertyDrops: [],
        propertyRenames: [
          {
            oldName: "old-property",
            newName: "new-property",
          },
        ],
        propertyValueTransformations: [
          {
            propertyPaths: ["properties.another-property"],
            propertyValue: "another property value",
          },
        ],
      },
      {
        id: "rBoBnPKiAek36M192XJsYQ",
        workspaceId: "9aQ1Lj62S4bomZKLF4DPqW",
        name: "User clicked edit identify event",
        enabled: true,
        sourceId: "qQEHquLrjRDN9j1ByrChyn",
        if: "type = 'identify'",
        propertyDrops: [],
        propertyRenames: [
          {
            oldName: "Group",
            newName: "group",
          },
        ],
        propertyValueTransformations: [],
      },
    ],
    pagination: {
      current: "MA==",
      totalEntries: 6,
    },
  },
};







export const getEventsVolumeFromWorkspaceExamplePayload = {
  data: {
    path: "/observability/event_volume/v2.json",
    query: {
      workspaceId: "workspace-id",
      startTime: "2023-01-01T00:00:00Z",
      endTime: "2023-01-03T00:00:00Z",
      granularity: "DAY",
    },
    result: [
      {
        total: 32504646,
        series: [
          {
            time: "2023-01-01T00:00:00Z",
            count: 15637147,
          },
          {
            time: "2023-01-02T00:00:00Z",
            count: 16867499,
          },
        ],
      },
    ],
    pagination: {
      current: "MA==",
      totalEntries: 1,
    },
  },
};
