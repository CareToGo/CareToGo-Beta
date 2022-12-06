// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "ARRIVED": "ARRIVED",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED"
};

const TransportationModes = {
  "BICYCLE": "BICYCLE",
  "CAR": "CAR",
  "WALK": "WALK"
};

const CareType = {
  "TOTALCARE": "TOTALCARE",
  "SOMEASSISTANCE": "SOMEASSISTANCE",
  "INDEPENDENT": "INDEPENDENT"
};

const { OrderView, PSWService, NurseService, Order, Worker, User } = initSchema(schema);

export {
  OrderView,
  PSWService,
  NurseService,
  Order,
  Worker,
  User,
  OrderStatus,
  TransportationModes,
  CareType
};