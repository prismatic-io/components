




import type {
  GetEventResponse,
  ListEventsResponse,
} from "../interfaces/events";

export const getEventExamplePayload: { data: GetEventResponse } = {
  data: {
    id: 501,
    context: "User logged into the system from a new device.",
    created_datetime: "2024-08-20T19:15:00Z",
    data: {
      ipAddress: "192.168.1.100",
      deviceType: "Smartphone",
      os: "iOS",
    },
    object_id: 12345,
    object_type: "UserSession",
    type: "LoginEvent",
    user_id: 7890,
    url: "https://www.example.com/login",
  },
};

export const listEventsExamplePayload: { data: ListEventsResponse } = {
  data: {
    data: [
      {
        id: 1024,
        context: "User updated account settings.",
        created_datetime: "2024-08-20T10:45:00Z",
        data: {
          settingsChanged: { emailNotifications: true, theme: "dark" },
          actionPerformedBy: "Admin",
        },
        object_id: 2048,
        object_type: "UserProfile",
        type: "UpdateSettings",
        user_id: 256,
        url: "https://www.example.com/settings",
      },
    ],
    object: "list",
    uri: "/events",
    meta: {
      prev_cursor: null,
      next_cursor: null,
    },
  },
};
