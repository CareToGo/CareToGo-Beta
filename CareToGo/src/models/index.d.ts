import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  ARRIVED = "ARRIVED",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}

export enum TransportationModes {
  BICYCLE = "BICYCLE",
  CAR = "CAR",
  WALK = "WALK"
}

export enum CareType {
  TOTALCARE = "TOTALCARE",
  SOMEASSISTANCE = "SOMEASSISTANCE",
  INDEPENDENT = "INDEPENDENT"
}

type OrderViewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PSWServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NurseServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerOrderView = {
  readonly id: string;
  readonly date: string;
  readonly lat: number;
  readonly lng: number;
  readonly address: string;
  readonly name: string;
  readonly userID: string;
  readonly services: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderView = {
  readonly id: string;
  readonly date: string;
  readonly lat: number;
  readonly lng: number;
  readonly address: string;
  readonly name: string;
  readonly userID: string;
  readonly services: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderView = LazyLoading extends LazyLoadingDisabled ? EagerOrderView : LazyOrderView

export declare const OrderView: (new (init: ModelInit<OrderView, OrderViewMetaData>) => OrderView) & {
  copyOf(source: OrderView, mutator: (draft: MutableModel<OrderView, OrderViewMetaData>) => MutableModel<OrderView, OrderViewMetaData> | void): OrderView;
}

type EagerPSWService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly type: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSWService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly type: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PSWService = LazyLoading extends LazyLoadingDisabled ? EagerPSWService : LazyPSWService

export declare const PSWService: (new (init: ModelInit<PSWService, PSWServiceMetaData>) => PSWService) & {
  copyOf(source: PSWService, mutator: (draft: MutableModel<PSWService, PSWServiceMetaData>) => MutableModel<PSWService, PSWServiceMetaData> | void): PSWService;
}

type EagerNurseService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly type: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNurseService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly type: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NurseService = LazyLoading extends LazyLoadingDisabled ? EagerNurseService : LazyNurseService

export declare const NurseService: (new (init: ModelInit<NurseService, NurseServiceMetaData>) => NurseService) & {
  copyOf(source: NurseService, mutator: (draft: MutableModel<NurseService, NurseServiceMetaData>) => MutableModel<NurseService, NurseServiceMetaData> | void): NurseService;
}

type EagerOrder = {
  readonly id: string;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly Worker?: Worker | null;
  readonly userID: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
}

type LazyOrder = {
  readonly id: string;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly Worker: AsyncItem<Worker | undefined>;
  readonly userID: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order, OrderMetaData>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

type EagerWorker = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly rating?: number | null;
  readonly lat: number;
  readonly lng: number;
  readonly pswServices?: string | null;
  readonly nursingServices?: string | null;
  readonly profession?: string | null;
  readonly experience?: number | null;
  readonly bio: string;
  readonly sub: string;
  readonly isVerified: boolean;
  readonly transportationMode?: TransportationModes | keyof typeof TransportationModes | null;
  readonly gender: string;
  readonly isInsured: boolean;
  readonly languages?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorker = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly rating?: number | null;
  readonly lat: number;
  readonly lng: number;
  readonly pswServices?: string | null;
  readonly nursingServices?: string | null;
  readonly profession?: string | null;
  readonly experience?: number | null;
  readonly bio: string;
  readonly sub: string;
  readonly isVerified: boolean;
  readonly transportationMode?: TransportationModes | keyof typeof TransportationModes | null;
  readonly gender: string;
  readonly isInsured: boolean;
  readonly languages?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Worker = LazyLoading extends LazyLoadingDisabled ? EagerWorker : LazyWorker

export declare const Worker: (new (init: ModelInit<Worker, WorkerMetaData>) => Worker) & {
  copyOf(source: Worker, mutator: (draft: MutableModel<Worker, WorkerMetaData>) => MutableModel<Worker, WorkerMetaData> | void): Worker;
}

type EagerUser = {
  readonly id: string;
  readonly ver: number;
  readonly sub: string;
  readonly lat: number;
  readonly lng: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly gender: string;
  readonly dob: string;
  readonly email: string;
  readonly contactnum: string;
  readonly emergency: string;
  readonly address: string;
  readonly detailedaddress?: string | null;
  readonly postalcode: string;
  readonly bio?: string | null;
  readonly grooming: CareType | keyof typeof CareType;
  readonly toileting: CareType | keyof typeof CareType;
  readonly feeding: CareType | keyof typeof CareType;
  readonly bathing: CareType | keyof typeof CareType;
  readonly mealprep: CareType | keyof typeof CareType;
  readonly mobility: CareType | keyof typeof CareType;
  readonly diagnosis: string;
  readonly Orders?: (Order | null)[] | null;
  readonly allergies: string;
  readonly OrderViews?: (OrderView | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly ver: number;
  readonly sub: string;
  readonly lat: number;
  readonly lng: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly gender: string;
  readonly dob: string;
  readonly email: string;
  readonly contactnum: string;
  readonly emergency: string;
  readonly address: string;
  readonly detailedaddress?: string | null;
  readonly postalcode: string;
  readonly bio?: string | null;
  readonly grooming: CareType | keyof typeof CareType;
  readonly toileting: CareType | keyof typeof CareType;
  readonly feeding: CareType | keyof typeof CareType;
  readonly bathing: CareType | keyof typeof CareType;
  readonly mealprep: CareType | keyof typeof CareType;
  readonly mobility: CareType | keyof typeof CareType;
  readonly diagnosis: string;
  readonly Orders: AsyncCollection<Order>;
  readonly allergies: string;
  readonly OrderViews: AsyncCollection<OrderView>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}