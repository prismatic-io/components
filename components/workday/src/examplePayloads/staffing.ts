export const getStaffingWorkersExamplePayload = {
  data: {
    data: [
      {
        workerType: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Regular",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workerTypes/3aa5550b7fe348b98d7b5741afc65534",
        },
        additionalJobs: [
          {
            location: {
              country: {
                descriptor: "United States of America",
              },
              descriptor: "San Francisco",
              id: "0e44c92412d34b01ace61e80a47aaf6d",
            },
            jobProfile: {
              descriptor: "Sales Representative",
              id: "cc67c47133894e099a5f1c0aa88efc47",
            },
            workSpace: {
              locationChain: "USA > California > San Bruno",
              descriptor: "San Bruno - Floor 2",
              id: "51c4a636bcbc4331b921a1e37b18f6f0",
            },
            businessTitle: "Senior Sales Representative",
            jobType: {
              descriptor: "Regular",
            },
            supervisoryOrganization: {
              descriptor: "Field Sales - Southern Europe (Jared Ellis)",
              id: "9541750bc8964e529feb5c6d7bb3d0e4",
            },
            descriptor: "Senior Sales Representative",
            id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          },
        ],
        primaryJob: {
          location: {
            country: {
              descriptor: "United States of America",
            },
            descriptor: "San Bruno",
            id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
          },
          jobProfile: {
            descriptor: "Sales Representative",
            id: "7c6b5a4938271605f4e3d2c1b0a99887",
          },
          workSpace: {
            locationChain: "USA > California > San Bruno",
            descriptor: "San Bruno - Floor 3",
            id: "2b9d1e5f7a3c4680bd21f4e6c8a09b13",
          },
          businessTitle: "Senior Sales Representative",
          jobType: {
            descriptor: "Regular",
          },
          supervisoryOrganization: {
            descriptor: "Field Sales - Southern Europe (Jared Ellis)",
            id: "4d6f8a0c2e1b3957ad8c6e4f2b0d1a39",
          },
          descriptor: "Senior Sales Representative",
          id: "6e2a4c8b0d1f3759ce7b5a3d9f01e246",
        },
        person: {
          phone: "+1 (415) 555-0100",
          email: "logan.mcneil@example.com",
          id: "8f0b2d4a6c9e1357bf3d5a7c9e1b0d24",
        },
        workerId: "21001",
        descriptor: "Logan McNeil",
        id: "5a7c9e1b3d5f7092ac4e6b8d0f2a1c36",
      },
    ],
    total: 1,
  },
};
export const getStaffingWorkerByIdExamplePayload = {
  data: {
    workerType: {
      id: "9c1e3a5b7d9f0246be8c0a2d4f6b8e17",
      descriptor: "Employee",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workerTypes/9c1e3a5b7d9f0246be8c0a2d4f6b8e17",
    },
    additionalJobs: [
      {
        location: {
          country: {
            descriptor: "United States of America",
          },
          descriptor: "San Francisco",
          id: "0b2d4f6a8c0e1359df7a9c1e3b5d7f02",
        },
        jobProfile: {
          descriptor: "Sales Representative",
          id: "3d5f7a9c1e0b2468ca6e8d0f2a4c6e19",
        },
        workSpace: {
          locationChain: "USA > California > San Bruno",
          descriptor: "San Bruno - Floor 2",
          id: "7e9a0c2b4d6f8135ac9e1b3d5f7a0c28",
        },
        businessTitle: "Senior Sales Representative",
        jobType: {
          descriptor: "Regular",
        },
        supervisoryOrganization: {
          descriptor: "Field Sales - Southern Europe (Jared Ellis)",
          id: "1c3e5a7b9d0f2468be0a2c4e6d8f1b39",
        },
        descriptor: "Senior Sales Representative",
        id: "4f6a8c0e2b1d3579ca8e0b2d4f6a9c13",
      },
    ],
    primaryJob: {
      location: {
        country: {
          descriptor: "United States of America",
        },
        descriptor: "San Bruno",
        id: "6a8c0e2b4d6f1357df1a3c5e7b9d0f24",
      },
      jobProfile: {
        descriptor: "Sales Representative",
        id: "8c0e2a4b6d8f0135ce3a5c7e9b1d0f26",
      },
      workSpace: {
        locationChain: "USA > California > San Bruno",
        descriptor: "San Bruno - Floor 3",
        id: "2e4a6c8b0d1f3579af5c7e9b1d3f0a28",
      },
      businessTitle: "Senior Sales Representative",
      jobType: {
        descriptor: "Regular",
      },
      supervisoryOrganization: {
        descriptor: "Field Sales - Southern Europe (Jared Ellis)",
        id: "5c7e9a1b3d5f0246bd7a9c1e3b5f7d09",
      },
      descriptor: "Senior Sales Representative",
      id: "9a1c3e5b7d9f0248cf0b2d4a6c8e1f30",
    },
    person: {
      phone: "+1 (415) 555-0100",
      email: "betty.liu@example.com",
      id: "0d2f4a6c8e1b3579de9a1c3e5b7d0f42",
    },
    workerId: "21002",
    descriptor: "Betty Liu",
    id: "3f5a7c9e1b0d2468ca1e3b5d7f9a0c31",
  },
};
export const getWorkerServiceDatesExamplePayload = {
  data: {
    data: [
      {
        hireDate: "2020-01-20T16:00:00.000Z",
        continuousServiceDate: "2020-01-20T16:00:00.000Z",
      },
    ],
    total: 1,
  },
};
export const getWorkerExplicitSkillsExamplePayload = {
  data: {
    data: [
      {
        skillSources: [
          {
            dateCreated: "2026-04-11T07:00:00.000Z",
            sourceTypeID: "REF-0001",
            sourceType: "Self-Reported",
            descriptor: "Self-Reported",
            id: "7a9c1e3b5d7f0246bf2c4e6a8d0f1b35",
          },
        ],
        skillItem: {
          id: "1e3a5c7b9d0f2468ce4a6c8e0b2d1f37",
          descriptor: "Salesforce Administration",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/skillItems/1e3a5c7b9d0f2468ce4a6c8e0b2d1f37",
        },
        remoteID: "REF-0002",
        descriptor: "Salesforce Administration",
        id: "4c6e8a0b2d1f3579da6c8e0b2d4f9a15",
      },
    ],
    total: 1,
  },
};
export const initiateJobChangeExamplePayload = {
  data: {
    job: {
      id: "6e8a0c2b4d6f1357cf3e5a7c9b1d0f28",
      descriptor: "Senior Sales Representative",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/jobs/6e8a0c2b4d6f1357cf3e5a7c9b1d0f28",
    },
    date: "2020-01-18T01:00:00.000Z",
    supervisoryOrganization: {
      id: "8a0c2e4b6d8f0135de5c7a9e1b3d0f24",
      descriptor: "Field Sales - Southern Europe (Jared Ellis)",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/supervisoryOrganizations/8a0c2e4b6d8f0135de5c7a9e1b3d0f24",
    },
    location: {
      id: "2c4e6a8b0d1f3579bf7a9c1e3d5b0f26",
      descriptor: "San Bruno",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/locations/2c4e6a8b0d1f3579bf7a9c1e3d5b0f26",
    },
    reason: {
      id: "5e7a9c1b3d5f0248ca9c1e3b5d7f0a13",
      descriptor: "Personal",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/reasons/5e7a9c1b3d5f0248ca9c1e3b5d7f0a13",
    },
    template: {
      id: "9c1e3a5b7d0f2468df1a3c5e7b9d0f42",
      descriptor: "New Hire Welcome",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/templates/9c1e3a5b7d0f2468df1a3c5e7b9d0f42",
    },
    descriptor: "Senior Sales Representative",
    id: "0a2c4e6b8d1f3579ce3a5c7e9b1d0f26",
  },
};
export const initiateOrganizationAssignmentChangeExamplePayload = {
  data: {
    date: "2026-04-11T07:00:00.000Z",
    position: {
      id: "3c5e7a9b1d0f2468da5c7e9b1d3f0a28",
      descriptor: "Senior Sales Representative",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/positions/3c5e7a9b1d0f2468da5c7e9b1d3f0a28",
    },
    descriptor: "Senior Sales Representative",
    id: "7e9c1a3b5d7f0246cf7a9c1e3b5d0f31",
  },
};
