export const getTimeOffDetailsExamplePayload = {
  data: {
    data: [
      {
        position: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Senior Sales Representative",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/positions/3aa5550b7fe348b98d7b5741afc65534",
        },
        comment: "Monthly office supplies",
        timeOffType: {
          descriptor: "Vacation",
          id: "0e44c92412d34b01ace61e80a47aaf6d",
        },
        reason: {
          id: "cc67c47133894e099a5f1c0aa88efc47",
          descriptor: "Personal",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/reasons/cc67c47133894e099a5f1c0aa88efc47",
        },
        quantity: "8",
        status: {
          id: "51c4a636bcbc4331b921a1e37b18f6f0",
          descriptor: "Approved",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/51c4a636bcbc4331b921a1e37b18f6f0",
        },
        date: "2024-06-08T07:00:00.000Z",
        unit: {
          id: "9541750bc8964e529feb5c6d7bb3d0e4",
          descriptor: "Hours",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/units/9541750bc8964e529feb5c6d7bb3d0e4",
        },
        worker: {
          id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/1f2e3d4c5b6a7988990a1b2c3d4e5f60",
        },
      },
    ],
    total: 1,
  },
};
export const postTimeOffRequestExamplePayload = {
  data: {
    businessProcessParameters: {
      action: {
        id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        descriptor: "Submit",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/actions/a1b2c3d4e5f60718293a4b5c6d7e8f90",
      },
      overallBusinessProcess: {
        id: "7c6b5a4938271605f4e3d2c1b0a99887",
        descriptor: "Request Time Off",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/businessProcesses/7c6b5a4938271605f4e3d2c1b0a99887",
      },
      comment: "Monthly office supplies",
      comments: [
        {
          commentDate: "2024-06-08T07:00:00.000Z",
          comment: "Monthly office supplies",
          person: {
            id: "2b3c4d5e6f708192a3b4c5d6e7f80912",
            descriptor: "Betty Liu",
            href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/people/2b3c4d5e6f708192a3b4c5d6e7f80912",
          },
        },
      ],
      transactionStatus: {
        id: "4f5e6d7c8b9a0b1c2d3e4f5a6b7c8d9e",
        descriptor: "In Progress",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/4f5e6d7c8b9a0b1c2d3e4f5a6b7c8d9e",
      },
      warningValidations: "No warnings",
      attachments: [
        {
          description: "Signed contract",
          contentType: {
            id: "8a7b6c5d4e3f20110f9e8d7c6b5a4938",
            descriptor: "PDF",
            href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/contentTypes/8a7b6c5d4e3f20110f9e8d7c6b5a4938",
          },
          fileLength: "20480",
          uploadDate: "2024-06-08T07:00:00.000Z",
          fileName: "invoice-2024-06.pdf",
          uploadedBy: {
            id: "b0a1c2d3e4f5061728394a5b6c7d8e9f",
            descriptor: "Steve Morgan",
            href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/b0a1c2d3e4f5061728394a5b6c7d8e9f",
          },
          category: {
            id: "6d5c4b3a2918077665544332211009ff",
            descriptor: "Supporting Documents",
            href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/categories/6d5c4b3a2918077665544332211009ff",
          },
          id: "e1d2c3b4a5960718293a4b5c6d7e8f01",
        },
      ],
      overallStatus: "In Progress",
      criticalValidations: "No critical validations",
      for: {
        id: "3f2e1d0c9b8a7766554433221100aabb",
        descriptor: "Logan McNeil",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/3f2e1d0c9b8a7766554433221100aabb",
      },
    },
    days: [
      {
        date: "2024-06-08T07:00:00.000Z",
        start: "2024-06-08T07:00:00.000Z",
        position: {
          id: "5a4b3c2d1e0f9887766554433221100a",
          descriptor: "Senior Sales Representative",
        },
        end: "2024-06-08T07:00:00.000Z",
        reason: {
          id: "c9b8a7d6e5f40312233445566778899a",
          descriptor: "Personal",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/reasons/c9b8a7d6e5f40312233445566778899a",
        },
        dailyQuantity: "8",
        comment: "Monthly office supplies",
        timeOffType: {
          id: "d4c3b2a1908f7e6d5c4b3a2918070605",
          descriptor: "Vacation",
        },
        id: "f0e1d2c3b4a5968778695a4b3c2d1e0f",
        descriptor: "Time Off Entry",
      },
    ],
  },
};
export const getTimeOffBalanceByIdExamplePayload = {
  data: {
    unit: {
      id: "7788990011223344556677889900aabb",
      descriptor: "Hours",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/units/7788990011223344556677889900aabb",
    },
    position: {
      id: "a0b1c2d3e4f5687990a1b2c3d4e5f607",
      descriptor: "Senior Sales Representative",
    },
    quantity: "40",
    absencePlan: {
      timeoffs: "Vacation",
      descriptor: "Vacation Plan",
      absenceTable: [
        {
          id: "1a2b3c4d5e6f70819293a4b5c6d7e8f9",
          descriptor: "Vacation",
        },
      ],
      id: "909182736455647382910a0b1c2d3e4f",
    },
    dateOfFirstAbsence: "2024-06-08T07:00:00.000Z",
    effectiveDate: "2024-06-08T07:00:00.000Z",
    category: {
      id: "5f6e7d8c9b0a1122334455667788990a",
      descriptor: "Time Off",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/categories/5f6e7d8c9b0a1122334455667788990a",
    },
    worker: {
      id: "0a1b2c3d4e5f60718293a4b5c6d7e8f0",
      descriptor: "Logan McNeil",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/0a1b2c3d4e5f60718293a4b5c6d7e8f0",
    },
  },
};
