export interface JSONApi {
  id: string;
  stale: boolean;
  storeKey: string;
  errors: any;
  isPersisted: boolean;
  isMarkedForDestruction: boolean;
  isMarkedForDisassociation: boolean;
}
export type JSONLinks = { self: string; related?: string };
export type JSONApiVersion = { version: string };

export interface JSONApiSuccess {
  included?: any[];
  meta?: any;
  raw?: any;
  _collections?: any;
  jsonapi?: { version: string };
  // meta?: {waev_api_version: string; [k: string ]: any }
  // data
  // included
}

export interface JSONApiFailure {
  errors?: any;
  data?: any;
  [key: string]: any;
}


export interface WaevError extends Error {
  name: string;
  message: string;
  detail?: string | object;
  source?: object;
  status?: string;
  title?: string;
  code?: number;
  data?: object;
  type?: string;
}

export interface WaevErrors extends Error {
  errors: WaevError[];
}
export interface Relationships {
  [key: string]: { data: { type: string; id: string } };
}

