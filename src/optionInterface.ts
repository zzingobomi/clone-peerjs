export interface PeerJSOption {
  key?: string;
  host?: string;
  port?: number;
  path?: string;
  secure?: boolean;
  token?: string;
  config?: RTCConfiguration;
  debug?: number;
  referrerPolicy?: ReferrerPolicy;
}
