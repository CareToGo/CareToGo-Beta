/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPSWService = /* GraphQL */ `
  query GetPSWService($id: ID!) {
    getPSWService(id: $id) {
      id
      name
      description
      price
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPSWServices = /* GraphQL */ `
  query ListPSWServices(
    $filter: ModelPSWServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPSWServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPSWServices = /* GraphQL */ `
  query SyncPSWServices(
    $filter: ModelPSWServiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPSWServices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNurseService = /* GraphQL */ `
  query GetNurseService($id: ID!) {
    getNurseService(id: $id) {
      id
      name
      description
      price
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNurseServices = /* GraphQL */ `
  query ListNurseServices(
    $filter: ModelNurseServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNurseServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNurseServices = /* GraphQL */ `
  query SyncNurseServices(
    $filter: ModelNurseServiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNurseServices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      total
      service
      lat
      lng
      name
      address
      status
      Worker {
        id
        firstName
        lastName
        rating
        lat
        lng
        services
        gender
        profession
        experienceDescription
        bio
        sub
        isVerified
        transportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderWorkerId
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        total
        service
        lat
        lng
        name
        address
        status
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderWorkerId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        total
        service
        lat
        lng
        name
        address
        status
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        orderWorkerId
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ver
      sub
      lat
      lng
      firstname
      lastname
      gender
      dob
      email
      contactnum
      emergency
      address
      detailedaddress
      postalcode
      bio
      mobility
      toileting
      feeding
      bathing
      mealprep
      allergies
      diagnosis
      Orders {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ver
        sub
        lat
        lng
        firstname
        lastname
        gender
        dob
        email
        contactnum
        emergency
        address
        detailedaddress
        postalcode
        bio
        mobility
        toileting
        feeding
        bathing
        mealprep
        allergies
        diagnosis
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ver
        sub
        lat
        lng
        firstname
        lastname
        gender
        dob
        email
        contactnum
        emergency
        address
        detailedaddress
        postalcode
        bio
        mobility
        toileting
        feeding
        bathing
        mealprep
        allergies
        diagnosis
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWorker = /* GraphQL */ `
  query GetWorker($id: ID!) {
    getWorker(id: $id) {
      id
      firstName
      lastName
      rating
      lat
      lng
      services
      gender
      profession
      experienceDescription
      bio
      sub
      isVerified
      transportationMode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listWorkers = /* GraphQL */ `
  query ListWorkers(
    $filter: ModelWorkerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        rating
        lat
        lng
        services
        gender
        profession
        experienceDescription
        bio
        sub
        isVerified
        transportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorkers = /* GraphQL */ `
  query SyncWorkers(
    $filter: ModelWorkerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        rating
        lat
        lng
        services
        gender
        profession
        experienceDescription
        bio
        sub
        isVerified
        transportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
