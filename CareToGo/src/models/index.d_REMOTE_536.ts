import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum Caretype {
  TOTALCARE = "TOTALCARE",
  SOMEASSISTANCE = "SOMEASSISTANCE",
  INDEPENDENT = "INDEPENDENT"
}

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NEW = "NEW",
  ARRIVED = "ARRIVED",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
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

type EagerPSWService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPSWService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNurseService = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NurseService = LazyLoading extends LazyLoadingDisabled ? EagerNurseService : LazyNurseService

export declare const NurseService: (new (init: ModelInit<NurseService, NurseServiceMetaData>) => NurseService) & {
  copyOf(source: NurseService, mutator: (draft: MutableModel<NurseService, NurseServiceMetaData>) => MutableModel<NurseService, NurseServiceMetaData> | void): NurseService;
}

type EagerOrder = {
  readonly id: string;
  readonly Worker?: Worker | null;
  readonly userID: string;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderWorkerId?: string | null;
}

type LazyOrder = {
  readonly id: string;
  readonly Worker: AsyncItem<Worker | undefined>;
  readonly userID: string;
  readonly total: number;
  readonly service: string;
  readonly lat: number;
  readonly lng: number;
  readonly name: string;
  readonly address: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
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
  readonly transportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly services?: string | null;
  readonly gender: string;
  readonly profession: string;
  readonly languages: string;
  readonly experienceDescription: string;
  readonly bio: string;
  readonly sub: string;
  readonly isVerified: boolean;
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
  readonly transportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly services?: string | null;
  readonly gender: string;
  readonly profession: string;
  readonly languages: string;
  readonly experienceDescription: string;
  readonly bio: string;
  readonly sub: string;
  readonly isVerified: boolean;
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
  readonly Orders?: (Order | null)[] | null;
  readonly emergency: string;
  readonly address: string;
  readonly detailedaddress?: string | null;
  readonly postalcode: string;
  readonly bio?: string | null;
  readonly mobility: Caretype | keyof typeof Caretype;
  readonly toileting: Caretype | keyof typeof Caretype;
  readonly feeding: Caretype | keyof typeof Caretype;
  readonly bathing: Caretype | keyof typeof Caretype;
  readonly mealprep: Caretype | keyof typeof Caretype;
  readonly allergies: string;
  readonly diagnosis: string;
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
  readonly Orders: AsyncCollection<Order>;
  readonly emergency: string;
  readonly address: string;
  readonly detailedaddress?: string | null;
  readonly postalcode: string;
  readonly bio?: string | null;
  readonly mobility: Caretype | keyof typeof Caretype;
  readonly toileting: Caretype | keyof typeof Caretype;
  readonly feeding: Caretype | keyof typeof Caretype;
  readonly bathing: Caretype | keyof typeof Caretype;
  readonly mealprep: Caretype | keyof typeof Caretype;
  readonly allergies: string;
  readonly diagnosis: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}