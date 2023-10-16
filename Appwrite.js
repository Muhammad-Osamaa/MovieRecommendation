import {Client, Account, Databases, Query} from 'appwrite';

export const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
export const PROJECT_ID = '652c39ee5e5168c59dd2';
export const DATABASE_ID = '652c3bb23eed25ed5f87';
export const COLLECTION_ID_USERS = '652c3bce033b674cd0c0';
export const query = Query;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
