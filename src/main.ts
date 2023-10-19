// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope1() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enum LogLevel {
    DEBUG,
    WARNING,
    ERROR,
  }

  //   const LOG_LEVEL = {
  //     DEBUG: 0,
  //     WARNING: 1,
  //     ERROR: 2,
  //   };

  const LOG_LEVEL = {
    DEBUG: 0,
    0: "DEBUG",
    WARNING: 1,
    1: "WARNING",
    ERROR: 2,
    2: "ERROR",
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope2() {
  // One way around around this...
  enum LogLevel {
    DEBUG = "DEBUG",
    WARNING = "WARNING",
    ERROR = "ERROR",
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function log(msg: string, lvl: LogLevel) {
    //
  }

  log("Hello, World!", "DEBUG");
  log("Hello, World!", LogLevel.DEBUG);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope3() {
  // The best solution:
  const LOG_LEVEL = {
    DEBUG: "DEBUG",
    WARNING: "WARNING",
    ERROR: "ERROR",
  } as const; // object is now immutable.

  type LogLevelValues<T> = T[keyof T];
  type LogLevel = LogLevelValues<typeof LOG_LEVEL>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function log(msg: string, lvl: LogLevel) {
    //
  }

  // Works on the type level the same way you expect it to work on the
  // runtime level. No need to import 'LOG_LEVEL'.
  log("Hello, World!", LOG_LEVEL.DEBUG);
  log("Hello, World!", "DEBUG");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope4() {
  // mapping between level and human readable version:
  const LOG_LEVEL = {
    DEBUG: "Debug",
    WARNING: "Warning",
    ERROR: "Error",
  } as const;

  // The LogLevel is now being extracted from the keys rather than the values
  type LogLevel = keyof typeof LOG_LEVEL;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function log(msg: string, lvl: LogLevel) {
    // can now using mapping between sematic key and human readable version
    console.log(`${LOG_LEVEL[lvl]}: ${msg}`);
  }
  log("Hello, World!", "DEBUG");
  log("Hello TJ", "ERROR");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scope5() {
  // To match scope4 w/enum:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enum LogLevel {
    DEBUG,
    WARNING,
    ERROR,
  }

  const titlesMap = {
    [LogLevel.DEBUG]: "Debug",
    [LogLevel.WARNING]: "Warning",
    [LogLevel.ERROR]: "Error",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function log(msg: string, lvl: LogLevel) {
    // can now using mapping between sematic key and human readable version
    console.log(`${titlesMap[lvl]}: ${msg}`);
  }
  log("Hello, World!", LogLevel.DEBUG);
}
