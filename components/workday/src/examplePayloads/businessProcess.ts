export const listEventsExamplePayload = {
  data: {
    data: [
      {
        subBusinessProcesses: [
          {
            id: "3aa5550b7fe348b98d7b5741afc65534",
            descriptor: "Review Documents",
          },
        ],
        initiator: {
          id: "0e44c92412d34b01ace61e80a47aaf6d",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/0e44c92412d34b01ace61e80a47aaf6d",
        },
        dueDate: "2024-06-08T07:00:00.000Z",
        for: {
          id: "cc67c47133894e099a5f1c0aa88efc47",
          descriptor: "Betty Liu",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/cc67c47133894e099a5f1c0aa88efc47",
        },
        overallBusinessProcess: {
          id: "51c4a636bcbc4331b921a1e37b18f6f0",
          descriptor: "Hire",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/businessProcesses/51c4a636bcbc4331b921a1e37b18f6f0",
        },
        completedDate: "2024-06-08T07:00:00.000Z",
        creationDate: "2024-06-08T07:00:00.000Z",
        status: {
          id: "9541750bc8964e529feb5c6d7bb3d0e4",
          descriptor: "In Progress",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/9541750bc8964e529feb5c6d7bb3d0e4",
        },
        effectiveDate: "2024-06-08T07:00:00.000Z",
        descriptor: "Hire: Betty Liu",
        id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
      },
    ],
    total: 1,
  },
};
export const getEventByIdExamplePayload = {
  data: {
    data: [
      {
        subBusinessProcesses: [
          {
            id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
            descriptor: "Review Documents",
          },
        ],
        initiator: {
          id: "7c6b5a4938271605f4e3d2c1b0a99887",
          descriptor: "Steve Morgan",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/7c6b5a4938271605f4e3d2c1b0a99887",
        },
        dueDate: "2024-06-08T07:00:00.000Z",
        for: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/3aa5550b7fe348b98d7b5741afc65534",
        },
        overallBusinessProcess: {
          id: "0e44c92412d34b01ace61e80a47aaf6d",
          descriptor: "Hire",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/businessProcesses/0e44c92412d34b01ace61e80a47aaf6d",
        },
        completedDate: "2024-06-08T07:00:00.000Z",
        creationDate: "2024-06-08T07:00:00.000Z",
        status: {
          id: "cc67c47133894e099a5f1c0aa88efc47",
          descriptor: "Approved",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/cc67c47133894e099a5f1c0aa88efc47",
        },
        effectiveDate: "2024-06-08T07:00:00.000Z",
        descriptor: "Hire: Logan McNeil",
        id: "51c4a636bcbc4331b921a1e37b18f6f0",
      },
    ],
    total: 1,
  },
};
export const getEventAttachmentsExamplePayload = {
  data: {
    data: [
      {
        uploadedBy: {
          id: "9541750bc8964e529feb5c6d7bb3d0e4",
          descriptor: "Betty Liu",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/9541750bc8964e529feb5c6d7bb3d0e4",
        },
        description: "Signed contract",
        category: {
          id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          descriptor: "Onboarding",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/categories/1f2e3d4c5b6a7988990a1b2c3d4e5f60",
        },
        contentType: {
          id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
          descriptor: "PDF",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/contentTypes/a1b2c3d4e5f60718293a4b5c6d7e8f90",
        },
        fileLength: "20480",
        fileName: "invoice-2024-06.pdf",
        uploadDate: "2024-06-08T07:00:00.000Z",
        id: "7c6b5a4938271605f4e3d2c1b0a99887",
      },
    ],
    total: 1,
  },
};
