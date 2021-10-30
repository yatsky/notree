/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAppData = /* GraphQL */ `
  query GetAppData($id: ID!) {
    getAppData(id: $id) {
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
export const listAppDatas = /* GraphQL */ `
  query ListAppDatas(
    $filter: ModelAppDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAppData = /* GraphQL */ `
  query SyncAppData(
    $filter: ModelAppDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAppData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
