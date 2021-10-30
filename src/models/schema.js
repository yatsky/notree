export const schema = {
  models: {
    AppData: {
      name: "AppData",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        content: {
          name: "content",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "AppData",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                provider: "userPools",
                ownerField: "owner",
                allow: "owner",
                identityClaim: "cognito:username",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "6e44e2ee54b85d8081ab7542d121df82",
};
