













export const bindExamplePayload = {
  data: "Successfully bound to LDAP server.",
};

export const searchExamplePayload = {
  data: {
    entries: [
      {
        dn: "OU=Users,DC=example,DC=com",
        ou: "Users",
        name: "Users",
      },
    ],
    references: [],
  },
};

export const deleteEntryExamplePayload = {
  data: "Successfully deleted entry at CN=Temp User,OU=Users,DC=example,DC=com.",
};

export const addEntryExamplePayload = {
  data: "Entry added at CN=New Entry,OU=Users,DC=example,DC=com.",
};

export const isAuthenticatedExamplePayload = {
  data: true,
};



export const extendedOperationExamplePayload = {
  data: {
    oid: "1.3.6.1.4.1.4203.1.11.3",
    value: "dn:CN=Administrator,CN=Users,DC=example,DC=com",
  },
};

export const searchUsersExamplePayload = {
  data: {
    users: [
      {
        dn: "CN=John Smith,OU=Users,DC=example,DC=com",
        cn: "John Smith",
        mail: ["john.smith@example.com"],
      },
    ],
  },
};

export const searchGroupsExamplePayload = {
  data: {
    groups: [
      {
        dn: "CN=Administrators,CN=Builtin,DC=example,DC=com",
        cn: "Administrators",
        name: "Administrators",
      },
    ],
  },
};

export const updateEntryExamplePayload = {
  data: "Successfully updated entry at CN=John Smith,OU=Users,DC=example,DC=com.",
};

export const updateUserExamplePayload = {
  data: "Successfully updated user at CN=Jane Doe,OU=Users,DC=example,DC=com.",
};

export const removeUserFromGroupExamplePayload = {
  data: "User CN=John Smith,OU=Users,DC=example,DC=com removed from group CN=Developers,OU=Groups,DC=example,DC=com.",
};

export const setPasswordToUserExamplePayload = {
  data: "Password set successfully for user CN=Jane Doe,OU=Users,DC=example,DC=com.",
};

export const moveUserToOrganizationalUnitExamplePayload = {
  data: "Successfully moved user to CN=Jane Doe,OU=Admins,DC=example,DC=com.",
};

export const addUserToGroupExamplePayload = {
  data: "User CN=John Smith,OU=Users,DC=example,DC=com added to group CN=Developers,OU=Groups,DC=example,DC=com.",
};

export const disableUserAccountExamplePayload = {
  data: "User CN=Bob Wilson,OU=Users,DC=example,DC=com has been disabled.",
};

export const addGroupExamplePayload = {
  data: "Group Developers has been added successfully.",
};

export const addUserExamplePayload = {
  data: "User Alice Johnson has been created successfully.",
};

export const renameEntryExamplePayload = {
  data: "Successfully renamed entry to CN=Alice Johnson-Smith,OU=Users,DC=example,DC=com.",
};
