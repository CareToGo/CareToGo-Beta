/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;
export const createPSWService = /* GraphQL */ `
  mutation CreatePSWService(
    $input: CreatePSWServiceInput!
    $condition: ModelPSWServiceConditionInput
  ) {
    createPSWService(input: $input, condition: $condition) {
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
export const updatePSWService = /* GraphQL */ `
  mutation UpdatePSWService(
    $input: UpdatePSWServiceInput!
    $condition: ModelPSWServiceConditionInput
  ) {
    updatePSWService(input: $input, condition: $condition) {
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
export const deletePSWService = /* GraphQL */ `
  mutation DeletePSWService(
    $input: DeletePSWServiceInput!
    $condition: ModelPSWServiceConditionInput
  ) {
    deletePSWService(input: $input, condition: $condition) {
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
export const createNurseService = /* GraphQL */ `
  mutation CreateNurseService(
    $input: CreateNurseServiceInput!
    $condition: ModelNurseServiceConditionInput
  ) {
    createNurseService(input: $input, condition: $condition) {
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
export const updateNurseService = /* GraphQL */ `
  mutation UpdateNurseService(
    $input: UpdateNurseServiceInput!
    $condition: ModelNurseServiceConditionInput
  ) {
    updateNurseService(input: $input, condition: $condition) {
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
export const deleteNurseService = /* GraphQL */ `
  mutation DeleteNurseService(
    $input: DeleteNurseServiceInput!
    $condition: ModelNurseServiceConditionInput
  ) {
    deleteNurseService(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createWorker = /* GraphQL */ `
  mutation CreateWorker(
    $input: CreateWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    createWorker(input: $input, condition: $condition) {
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
export const updateWorker = /* GraphQL */ `
  mutation UpdateWorker(
    $input: UpdateWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    updateWorker(input: $input, condition: $condition) {
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
export const deleteWorker = /* GraphQL */ `
  mutation DeleteWorker(
    $input: DeleteWorkerInput!
    $condition: ModelWorkerConditionInput
  ) {
    deleteWorker(input: $input, condition: $condition) {
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
