/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePSWService = /* GraphQL */ `
  subscription OnCreatePSWService(
    $filter: ModelSubscriptionPSWServiceFilterInput
  ) {
    onCreatePSWService(filter: $filter) {
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
export const onUpdatePSWService = /* GraphQL */ `
  subscription OnUpdatePSWService(
    $filter: ModelSubscriptionPSWServiceFilterInput
  ) {
    onUpdatePSWService(filter: $filter) {
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
export const onDeletePSWService = /* GraphQL */ `
  subscription OnDeletePSWService(
    $filter: ModelSubscriptionPSWServiceFilterInput
  ) {
    onDeletePSWService(filter: $filter) {
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
export const onCreateNurseService = /* GraphQL */ `
  subscription OnCreateNurseService(
    $filter: ModelSubscriptionNurseServiceFilterInput
  ) {
    onCreateNurseService(filter: $filter) {
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
export const onUpdateNurseService = /* GraphQL */ `
  subscription OnUpdateNurseService(
    $filter: ModelSubscriptionNurseServiceFilterInput
  ) {
    onUpdateNurseService(filter: $filter) {
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
export const onDeleteNurseService = /* GraphQL */ `
  subscription OnDeleteNurseService(
    $filter: ModelSubscriptionNurseServiceFilterInput
  ) {
    onDeleteNurseService(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateWorker = /* GraphQL */ `
  subscription OnCreateWorker($filter: ModelSubscriptionWorkerFilterInput) {
    onCreateWorker(filter: $filter) {
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
export const onUpdateWorker = /* GraphQL */ `
  subscription OnUpdateWorker($filter: ModelSubscriptionWorkerFilterInput) {
    onUpdateWorker(filter: $filter) {
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
export const onDeleteWorker = /* GraphQL */ `
  subscription OnDeleteWorker($filter: ModelSubscriptionWorkerFilterInput) {
    onDeleteWorker(filter: $filter) {
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
