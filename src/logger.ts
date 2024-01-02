const LOG_PREFIX = "PeerJS: ";

export enum LogLevel {
  /**
   * Prints no logs.
   */
  Disabled,
  /**
   * Prints only errors.
   */
  Errors,
  /**
   * Prints errors and warnings.
   */
  Warnings,
  /**
   * Prints all logs.
   */
  All,
}

class Logger {
  private _logLevel = LogLevel.Disabled;

  get logLevel(): LogLevel {
    return this._logLevel;
  }

  set logLevel(logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  log(...args: any[]) {
    if (this._logLevel >= LogLevel.All) {
      this._print(LogLevel.All, ...args);
    }
  }

  warn(...args: any[]) {
    if (this._logLevel >= LogLevel.Warnings) {
      this._print(LogLevel.Warnings, ...args);
    }
  }

  error(...args: any[]) {
    if (this._logLevel >= LogLevel.Errors) {
      this._print(LogLevel.Errors, ...args);
    }
  }

  setLogFunction(fn: (logLevel: LogLevel, ..._: any[]) => void): void {
    this._print = fn;
  }

  private _print(logLevel: LogLevel, ...rest: any[]): void {
    const copy = [LOG_PREFIX, ...rest];

    for (const i in copy) {
      if (copy[i] instanceof Error) {
        copy[i] = `(${copy[i].name}) ${copy[i].message}`;
      }
    }

    if (logLevel >= LogLevel.All) {
      console.log(...copy);
    } else if (logLevel >= LogLevel.Warnings) {
      console.log("WARNING", ...copy);
    } else if (logLevel >= LogLevel.Errors) {
      console.log("ERROR", ...copy);
    }
  }
}

export default new Logger();
