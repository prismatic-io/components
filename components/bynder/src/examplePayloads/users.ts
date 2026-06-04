






export const listUsersResponse = [
  {
    email2: "john.doe@example.com",
    salesrepId: "",
    name: "David",
    id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    active: 1,
    isSSOOnly: false,
    username: "jane.smith",
    email: "jane.smith@example.com",
    profileId: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    groups: [
      {
        name: "Bynder",
        id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
      },
      {
        name: "Product",
        id: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
      },
    ],
  },
  {
    email2: "john.doe@example.com",
    salesrepId: "",
    name: "Jake",
    id: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
    active: 1,
    isSSOOnly: true,
    username: "jane.smith",
    email: "jane.smith@example.com",
    profileId: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    groups: [
      {
        name: "Bynder",
        id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
      },
    ],
  },
];

export const getUserResponse = {
  phoneNumber: "+1 5551234567",
  profileId: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
  lastLogin: "2017-03-10T15:42:03Z",
  department: "Development",
  job: "Developer",
  state: "",
  firstname: "John",
  city: "Amsterdam",
  infix: "",
  timeZone: "Europe/Amsterdam",
  username: "jane.smith",
  email: "jane.smith@example.com",
  persisted: true,
  legalEntity: "",
  county: "",
  postalCode: "",
  language: "en_GB",
  country: "Netherlands",
  costCenter: "",
  groups: [
    {
      name: "Bynder",
      id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    },
    {
      name: "Product",
      id: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
    },
  ],
  lastname: "Smith",
  cellphoneNumber: "",
  employeeNumber: "",
  departmentCode: "",
  gender: "U",
  id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  companyName: "Bynder",
  active: true,
  isSSOOnly: false,
  address: "",
  terms:
    "Digital Asset Management System Terms and Conditions <br/>\n<br/>\n  Overview<br/><br/>\n  All assets are free to use as long as these terms and conditions and license rules are followed.\nAll assets can not be used in paid advertising without the permission of Bynder.<br/><br/>",
};

export const createUserResponse = {
  id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  username: "jane.smith",
};

export const getSecurityProfileResponse = {
  name: "Internal Limited user",
  id: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
  roles: ["MEDIADOWNLOAD", "SHARING", "MEDIAOVERVIEW", "MEDIAHIGHRES"],
};

export const listSecurityProfilesResponse = [
  getSecurityProfileResponse,
  {
    name: "Content/Brand Manager",
    id: "A7B8C9D0-E1F2-3456-A7B8-C9D0E1F23456",
    roles: ["PUBLICCOLLECTIONS", "GROUPSHARING", "COLLECTIONS"],
  },
];
