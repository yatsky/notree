/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAppData = /* GraphQL */ `
  mutation CreateAppData(
    $input: CreateAppDataInput!
    $condition: ModelAppDataConditionInput
  ) {
    createAppData(input: $input, condition: $condition) {
      id
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAppData = /* GraphQL */ `
  mutation UpdateAppData(
    $input: UpdateAppDataInput!
    $condition: ModelAppDataConditionInput
  ) {
    updateAppData(input: $input, condition: $condition) {
      id
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAppData = /* GraphQL */ `
  mutation DeleteAppData(
    $input: DeleteAppDataInput!
    $condition: ModelAppDataConditionInput
  ) {
    deleteAppData(input: $input, condition: $condition) {
      id
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
