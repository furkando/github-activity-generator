import child_process from "child_process";

const exec = function (cmd, cb) {
  var p = child_process.exec(cmd);
  p.on("exit", function (code) {
    var err = null;
    if (code) {
      err = new Error(
        'command "' + cmd + '" exited with wrong status code "' + code + '"'
      );
      err.code = code;
      err.cmd = cmd;
    }
    if (cb) cb(err);
  });
};

// execute multiple commands in series
export const execSeriesOfCommands = function (cmds, cb) {
  var execNext = function () {
    exec(cmds.shift(), function (err) {
      if (err) {
        cb(err);
      } else {
        if (cmds.length) execNext();
        else cb(null);
      }
    });
  };
  execNext();
};

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
