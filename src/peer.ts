import { PeerErrorType } from "./enums";
import { LogLevel } from "./logger";
import { PeerJSOption } from "./optionInterface";
import { EventEmitterWithError, PeerError } from "./peerError";

class PeerOptions implements PeerJSOption {
  debug?: LogLevel;
  host?: string; // default to `0.peerjs.com`.
  port?: number; // default `443`.
  path?: string;
  key?: string; // deprecated?
  token?: string;
  config?: any;
  secure?: boolean;
  pingInterval?: number;
  referrerPolicy?: ReferrerPolicy;
  logFunction?: (logLevel: LogLevel, ...rest: any[]) => void;
  //serializers?:
}

export { type PeerOptions };

// export interface SerializerMapping {

// }

export interface PeerEvents {
  /**
   * 피어 서버에 대한 연결이 설정될 때 발생합니다.
   *
   * 이 메시지가 전송되기 전에 피어를 사용할 수 있지만 서버로 보내는 메시지는 대기열에 추가됩니다.
   * id는 피어(생성자에서 제공되었거나 서버에서 할당된)의 brokering ID입니다.
   * 연결 속도가 중요한 경우 다른 피어에 연결하기 전에 이 이벤트를 기다리지 않아야 합니다.
   */
  open: (id: string) => void;
  /**
   * 원격 피어에서 새 데이터 연결이 설정될 때 발생하는 이벤트입니다.
   */
  //connection: (dataConnection: DataConnection) => void;
  /**
   * 원격 상대방이 전화를 걸려고 할 때 발신됩니다.
   */
  //call

  /**
   * 피어가 파괴되어 더 이상 새 연결을 수락하거나 생성할 수 없을 때 발생하는 이벤트입니다.
   */
  close: () => void;
  /**
   * 피어가 시그널링 서버에서 연결이 끊어졌을 때 발생하는 이벤트입니다.
   */
  disconnected: (currentId: string) => void;
  /**
   * 피어의 오류는 거의 항상 치명적이며 피어를 파괴합니다.
   *
   * 기본 소켓 및 피어 연결의 오류는 여기로 전달됩니다.
   */
  error: (error: PeerError<`${PeerErrorType}`>) => void;
}

export class Peer extends EventEmitterWithError<PeerErrorType, PeerEvents> {
  private static readonly DEFAULT_KEY = "peerjs";

  private readonly _options: PeerOptions;
  //private

  constructor();
  constructor(options: PeerOptions);
  constructor(id: string, options?: PeerOptions);
  constructor(id?: string | PeerOptions, options?: PeerOptions) {
    options = {
      debug: 0,
      //
    };

    super();
  }
}
