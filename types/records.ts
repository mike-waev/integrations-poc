import { JSONApiSuccess, JSONApiFailure, JSONLinks, JSONApiVersion } from './network';

export declare type WaevData = {
  data: { [name: string]: any };
  meta?: { [name: string]: any };
};

export interface WaevConfig {
  data: {
    type: 'deployments';
    id?: string;
    api_key?: string;
    attributes: {
      name: string;
      config: DeploymentConfig;
    };
  };
}

export interface DeploymentConfig {
  form_selector: string;
  user_field?: string;
  fields?: WaevField[];
  private_fields?: WaevField[];
}

export interface WaevField {
  name: string;
  required?: boolean;
  opt_in?: boolean;
}

// Record Network Responses

export type ResponseWaevRecord = ResponseWaevRecordPayload | JSONApiFailure;

interface ResponseWaevRecordPayload extends JSONApiSuccess {
  data: WaevRecordAttributes;
  included?: any[];
}

export interface WaevRecord {
  attributes: WaevRecordAttributes;
  api_key?: string;
  type?: 'records';
  id?: string;
  relationships?: object;
  links?: JSONLinks;
}


export interface WaevRecordAttributes {
  //record?: RecordRecord;
  anon?: WaevDataAttributes;
  dateTime?: string | Date;
  deployment_id?: string;
  meta?: WaevDataAttributes;
  pii?: WaevDataAttributes;

  source_id?: number;
  store_id?: string;
  timestamp?: number;
  transactions?: WaevRecordTransactions;
  uid?: string;
  v?: number;
}


export interface WaevDataAttributes {
  data?: RecordDataEntry;
  salt?: string;
  sig?: {
    sig: string;
    keyType: string;
  };
}

export interface RecordDataEntry {
  [key: string]: any;
}

export interface WaevRecordTransactions {
  announce_tx?: string;
  flags_meta_transaction_id?: string;
  flags_update_transaction_id?: string;
}
