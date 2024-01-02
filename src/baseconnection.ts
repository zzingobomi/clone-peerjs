import { ValidEventTypes } from "eventemitter3";
import { BaseConnectionErrorType, ConnectionType } from "./enums";
import { EventEmitterWithError, EventsWithError, PeerError } from "./peerError";
import { Peer } from "./peer";
import { ServerMessage } from "./servermessage";

export interface BaseConnectionEvents<
  ErrorType extends string = BaseConnectionErrorType
> extends EventsWithError<ErrorType> {
  close: () => void;
  error: (error: PeerError<`${ErrorType}`>) => void;
  iceStateChanged: (state: RTCIceConnectionState) => void;
}

export abstract class BaseConnection<
  SubClassEvents extends ValidEventTypes,
  ErrorType extends string = never
> extends EventEmitterWithError<
  ErrorType | BaseConnectionErrorType,
  SubClassEvents & BaseConnectionEvents<BaseConnectionErrorType | ErrorType>
> {
  protected _open = false;

  /**
   * 연결과 관련된 모든 유형의 메타데이터, 연결을 시작한 사람이 전달한 모든 유형의 메타데이터입니다.
   */
  readonly metadata: any;
  connectionId: string;

  peerConnection: RTCPeerConnection;
  dataChannel: RTCDataChannel;

  abstract get type(): ConnectionType;

  /**
   * 연결이 시작될 때 PeerJS에서 전달되거나 할당된 선택적 레이블입니다.
   */
  label: string;

  /**
   * 미디어 연결이 활성화되어 있는지 여부(예: 전화가 응답됨).
   * 일방 통화에 대한 최대 대기 시간을 설정하려는 경우 이 값을 체크할 수 있습니다.
   */
  get open() {
    return this._open;
  }

  protected constructor(
    readonly peer: string,
    public provider: Peer,
    readonly options: any
  ) {
    super();

    this.metadata = options.metadata;
  }

  abstract close(): void;

  abstract handleMessage(message: ServerMessage): void;

  abstract _initializeDataChannel(dc: RTCDataChannel): void;
}
