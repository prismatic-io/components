export const getWorkerBusinessTitleChangesExamplePayload = {
  data: {
    data: [
      {
        currentBusinessTitle: "Senior Sales Representative",
        proposedBusinessTitle: "Senior Sales Representative",
        effective: "2024-06-01T07:00:00.000Z",
        due: "2024-06-01T07:00:00.000Z",
        initiated: "2024-06-01T07:00:00.000Z",
        initiator: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/3aa5550b7fe348b98d7b5741afc65534",
        },
        subject: {
          id: "0e44c92412d34b01ace61e80a47aaf6d",
          descriptor: "Betty Liu",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/0e44c92412d34b01ace61e80a47aaf6d",
        },
        id: "cc67c47133894e099a5f1c0aa88efc47",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/businessTitleChanges/cc67c47133894e099a5f1c0aa88efc47",
        descriptor: "Business Title Change",
      },
    ],
    total: 1,
  },
};
export const postWorkerBusinessTitleChangeExamplePayload = {
  data: {
    proposedBusinessTitle: "Senior Sales Representative",
    id: "51c4a636bcbc4331b921a1e37b18f6f0",
    href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/businessTitleChanges/51c4a636bcbc4331b921a1e37b18f6f0",
    descriptor: "Business Title Change",
  },
};
export const postJobChangesExamplePayload = {
  data: {
    supervisoryOrganization: {
      id: "9541750bc8964e529feb5c6d7bb3d0e4",
      descriptor: "Field Sales - Southern Europe (Jared Ellis)",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/organizations/9541750bc8964e529feb5c6d7bb3d0e4",
    },
    jobChangeReason: {
      id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
      descriptor: "Personal",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/jobChangeReasons/1f2e3d4c5b6a7988990a1b2c3d4e5f60",
    },
    moveManagersTeam: true,
    effective: "2024-06-01T07:00:00.000Z",
    proposedOrganizations: [
      {
        id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/organizations/a1b2c3d4e5f60718293a4b5c6d7e8f90",
        descriptor: "Field Sales - Southern Europe (Jared Ellis)",
      },
    ],
    id: "7c6b5a4938271605f4e3d2c1b0a99887",
    href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/jobChanges/7c6b5a4938271605f4e3d2c1b0a99887",
    descriptor: "Job Change",
  },
};
export const listOrganizationsExamplePayload = {
  data: {
    data: [
      {
        descriptor: "Field Sales - Southern Europe (Jared Ellis)",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/organizations/cc67c47133894e099a5f1c0aa88efc47",
        id: "cc67c47133894e099a5f1c0aa88efc47",
      },
    ],
    total: 1,
  },
};
export const getOrganizationByIdExamplePayload = {
  data: {
    descriptor: "Field Sales - Southern Europe (Jared Ellis)",
    href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/organizations/3aa5550b7fe348b98d7b5741afc65534",
    id: "3aa5550b7fe348b98d7b5741afc65534",
  },
};
export const getCustomerByIdExamplePayload = {
  data: {
    name: "Global Modern Services, Inc. (USA)",
    id: "0e44c92412d34b01ace61e80a47aaf6d",
    descriptor: "Global Modern Services, Inc. (USA)",
  },
};
