const projectTasksList = {
  "@odata.etag": '"{3A3C0F6A-86DA-4567-94D4-3B939DA63200},12"',
  id: "3a3c0f6a-86da-4567-94d4-3b939da63200",
  displayName: "Project Tasks",
  name: "ProjectTasks",
  createdDateTime: "2026-03-05T08:30:00Z",
  lastModifiedDateTime: "2026-11-06T10:15:00Z",
  webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks",
  list: {
    contentTypesEnabled: true,
    hidden: false,
    template: "genericList",
  },
};

const announcementsList = {
  "@odata.etag": '"{7D1E5B2C-4A8F-4C3E-9B6D-2F0A1E8C5D47},4"',
  id: "7d1e5b2c-4a8f-4c3e-9b6d-2f0a1e8c5d47",
  displayName: "Announcements",
  name: "Announcements",
  createdDateTime: "2026-03-12T12:00:00Z",
  lastModifiedDateTime: "2026-11-04T16:30:00Z",
  webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/Announcements",
  list: {
    contentTypesEnabled: true,
    hidden: false,
    template: "announcements",
  },
};

export const listSiteListsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/lists",
    value: [projectTasksList, announcementsList],
  },
};

export const selectSiteListExamplePayload = {
  result: [
    {
      key: "7d1e5b2c-4a8f-4c3e-9b6d-2f0a1e8c5d47",
      label: "Announcements",
    },
    {
      key: "3a3c0f6a-86da-4567-94d4-3b939da63200",
      label: "Project Tasks",
    },
  ],
};

export const getListExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/lists/$entity",
    ...projectTasksList,
  },
};

export const getListItemsInSiteExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/lists('3a3c0f6a-86da-4567-94d4-3b939da63200')/items",
    value: [
      {
        "@odata.etag": '"{4F6A2C8E-1B3D-4E5F-A7C9-0D2E4F6A8B1C},1"',
        id: "1",
        createdDateTime: "2026-10-26T09:00:00Z",
        lastModifiedDateTime: "2026-11-03T11:30:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/1_.000",
        fields: {
          "@odata.etag": '"{4F6A2C8E-1B3D-4E5F-A7C9-0D2E4F6A8B1C},1"',
          id: "1",
          Title: "Design new homepage",
          Status: "In Progress",
          AssignedTo: "john.doe@example.com",
          DueDate: "2026-11-15T00:00:00Z",
        },
      },
      {
        "@odata.etag": '"{7C9E1A3B-5D7F-4A2C-8E4B-6F8A0C2E4D6A},2"',
        id: "2",
        createdDateTime: "2026-10-30T14:20:00Z",
        lastModifiedDateTime: "2026-11-04T16:45:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/2_.000",
        fields: {
          "@odata.etag": '"{7C9E1A3B-5D7F-4A2C-8E4B-6F8A0C2E4D6A},2"',
          id: "2",
          Title: "Update documentation",
          Status: "Not Started",
          AssignedTo: "jane.smith@example.com",
          DueDate: "2026-11-20T00:00:00Z",
        },
      },
    ],
  },
};

export const listItemsInSiteListExamplePayload = {
  result: [
    {
      key: "1",
      label: "Design new homepage",
    },
    {
      key: "2",
      label: "Update documentation",
    },
  ],
};

export const getItemInSiteExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/lists('3a3c0f6a-86da-4567-94d4-3b939da63200')/items/$entity",
    "@odata.etag": '"{2B4D6F8A-0C1E-4A3B-9D5F-7E9A1C3B5D7F},3"',
    id: "5",
    createdDateTime: "2026-11-02T10:30:00Z",
    lastModifiedDateTime: "2026-11-06T14:15:00Z",
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/5_.000",
    fields: {
      "@odata.etag": '"{2B4D6F8A-0C1E-4A3B-9D5F-7E9A1C3B5D7F},3"',
      id: "5",
      Title: "Review Q4 metrics",
      Status: "Completed",
      AssignedTo: "john.doe@example.com",
      DueDate: "2026-11-06T00:00:00Z",
      CompletedDate: "2026-11-06T14:15:00Z",
    },
  },
};

export const createItemInSiteExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/lists('3a3c0f6a-86da-4567-94d4-3b939da63200')/items/$entity",
    "@odata.etag": '"{9E1C3A5B-7D9F-4B2E-8A4C-6E8A0B2D4F6C},1"',
    id: "15",
    createdDateTime: "2026-11-09T16:30:00Z",
    lastModifiedDateTime: "2026-11-09T16:30:00Z",
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/15_.000",
    fields: {
      "@odata.etag": '"{9E1C3A5B-7D9F-4B2E-8A4C-6E8A0B2D4F6C},1"',
      id: "15",
      Title: "Prepare presentation",
      Status: "Not Started",
      AssignedTo: "jane.smith@example.com",
      DueDate: "2026-11-18T00:00:00Z",
    },
  },
};
