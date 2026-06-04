export type CreateAccountBody = {
  name: string;
  type: {
    id: string;
    properties: {
      password: string;
      authenticateBy: string;
      url: string;
      username: string;
    };
  };
};
