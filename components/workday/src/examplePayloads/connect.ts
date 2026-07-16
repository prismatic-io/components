export const listMessageTemplatesExamplePayload = {
  data: {
    data: [
      {
        createdBy: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/3aa5550b7fe348b98d7b5741afc65534",
        },
        emailDetail: {
          name: "New Hire Welcome",
          body: "Please review the attached document.",
          subject: "Welcome to the team",
          replyTo: "no-reply@example.com",
        },
        lastUpdated: "2024-06-08T07:00:00.000Z",
        pushDetail: {
          redirectURL:
            "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/messageTemplates",
          message: "Please review the attached document.",
          id: "0e44c92412d34b01ace61e80a47aaf6d",
        },
        usageCount: "12",
        createdOn: "2024-06-08T07:00:00.000Z",
        notificationType: {
          id: "cc67c47133894e099a5f1c0aa88efc47",
          descriptor: "Alert",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/notificationTypes/cc67c47133894e099a5f1c0aa88efc47",
        },
        name: "New Hire Welcome",
        lastUpdatedBy: {
          id: "51c4a636bcbc4331b921a1e37b18f6f0",
          descriptor: "Betty Liu",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/51c4a636bcbc4331b921a1e37b18f6f0",
        },
        referenceID: "REF-0001",
        inactive: true,
        descriptor: "New Hire Welcome",
        id: "9541750bc8964e529feb5c6d7bb3d0e4",
      },
    ],
    total: 1,
  },
};
export const postMessageTemplatesExamplePayload = {
  data: {
    createdBy: {
      id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
      descriptor: "Logan McNeil",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/1f2e3d4c5b6a7988990a1b2c3d4e5f60",
    },
    emailDetail: {
      name: "New Hire Welcome",
      body: "Please review the attached document.",
      subject: "Welcome to the team",
      replyTo: "no-reply@example.com",
    },
    lastUpdated: "2024-06-08T07:00:00.000Z",
    pushDetail: {
      redirectURL:
        "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/messageTemplates",
      message: "Please review the attached document.",
      id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
    },
    usageCount: "12",
    createdOn: "2024-06-08T07:00:00.000Z",
    notificationType: {
      id: "7c6b5a4938271605f4e3d2c1b0a99887",
      descriptor: "Alert",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/notificationTypes/7c6b5a4938271605f4e3d2c1b0a99887",
    },
    name: "New Hire Welcome",
    lastUpdatedBy: {
      id: "8d7b5741afc655343aa5550b7fe348b9",
      descriptor: "Betty Liu",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/8d7b5741afc655343aa5550b7fe348b9",
    },
    referenceID: "REF-0001",
    inactive: true,
    descriptor: "New Hire Welcome",
    id: "ace61e80a47aaf6d0e44c92412d34b01",
  },
};
export const updateMessageTemplateByIdExamplePayload =
  postMessageTemplatesExamplePayload;
export const getMessageTemplateByIdExamplePayload = {
  data: {
    createdBy: {
      id: "9a5f1c0aa88efc47cc67c47133894e09",
      descriptor: "Logan McNeil",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/9a5f1c0aa88efc47cc67c47133894e09",
    },
    emailDetail: {
      name: "New Hire Welcome",
      body: "Please review the attached document.",
      subject: "Welcome to the team",
      replyTo: "no-reply@example.com",
    },
    lastUpdated: "2024-06-08T07:00:00.000Z",
    pushDetail: {
      redirectURL:
        "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/messageTemplates",
      message: "Please review the attached document.",
      id: "b921a1e37b18f6f051c4a636bcbc4331",
    },
    usageCount: "12",
    createdOn: "2024-06-08T07:00:00.000Z",
    notificationType: {
      id: "9feb5c6d7bb3d0e49541750bc8964e52",
      descriptor: "Alert",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/notificationTypes/9feb5c6d7bb3d0e49541750bc8964e52",
    },
    name: "New Hire Welcome",
    lastUpdatedBy: {
      id: "990a1b2c3d4e5f601f2e3d4c5b6a7988",
      descriptor: "Betty Liu",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/990a1b2c3d4e5f601f2e3d4c5b6a7988",
    },
    referenceID: "REF-0001",
    inactive: true,
    descriptor: "New Hire Welcome",
    id: "293a4b5c6d7e8f90a1b2c3d4e5f60718",
  },
};
export const sendMessageExamplePayload = {
  data: {
    senderOverride: {
      id: "f4e3d2c1b0a998877c6b5a4938271605",
      descriptor: "Steve Morgan",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/f4e3d2c1b0a998877c6b5a4938271605",
    },
    commID: {
      id: "7fe348b98d7b5741afc655343aa5550b",
      descriptor: "Message Communication",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/communications/7fe348b98d7b5741afc655343aa5550b",
    },
    emailDetail: {
      name: "New Hire Welcome",
      body: "Please review the attached document.",
      subject: "Welcome to the team",
      replyTo: "no-reply@example.com",
    },
    recipients: {
      contacts: [
        {
          descriptor: "Logan McNeil",
          id: "c8964e529feb5c6d7bb3d0e49541750b",
        },
      ],
    },
    messageTemplate: {
      id: "12d34b01ace61e80a47aaf6d0e44c924",
      descriptor: "New Hire Welcome",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/messageTemplates/12d34b01ace61e80a47aaf6d0e44c924",
    },
    notificationType: {
      id: "33894e099a5f1c0aa88efc47cc67c471",
      descriptor: "Alert",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/notificationTypes/33894e099a5f1c0aa88efc47cc67c471",
    },
    pushDetail: {
      redirectURL:
        "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/messageTemplates",
      message: "Please review the attached document.",
      id: "bcbc4331b921a1e37b18f6f051c4a636",
    },
  },
};
