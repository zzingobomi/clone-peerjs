export enum ConnectionType {
  Data = "data",
  Media = "media",
}

export enum PeerErrorType {
  /**
   * 클라이언트의 브라우저가 사용하려는 WebRTC 기능의 일부 또는 전부를 지원하지 않는 경우.
   */
  BrowserIncompatible = "browser-incompatible",
}

export enum BaseConnectionErrorType {
  NegotiationFailed = "negotiation-failed",
  ConnectionClosed = "connection-closed",
}

export enum ServerMessageType {
  Heartbeat = "HEARTBEAT",
  Candidate = "CANDIDATE",
  Offer = "OFFER",
}
