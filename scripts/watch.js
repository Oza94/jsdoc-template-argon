const path = require('path');
const watch = require('watch');
const nativeSpawn = require('child_process').spawn;
const argv = require('optimist').argv;

const scriptToRunOnChange = argv.script || 'docssite';
const rebuild = () => spawn('npm', ['run', scriptToRunOnChange], {
  mapStreams: true,
});

function spawn(command, argv = [], options = {}) {
  // test if windows since spawing processes differ
  const isWin = /^win/.test(process.platform);
  let childProcess = null;
  console.log(process.platform, isWin);
  if (isWin) {
    argv.unshift('/c', command);
    childProcess = nativeSpawn(process.env.comspec, argv, options);
  } else {
    childProcess = nativeSpawn(command, argv, options);
  }

  if (options.mapStreams) {
    // if enabled map stdout and stderr to child process
    delete options.mapStreams;
    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
  }

  return childProcess;
}

const options = {
  ignoreDirectoryPattern: /(node_modules|docs|examples|scripts|.git)/i
};

watch.createMonitor(path.resolve(__dirname, '../'), options, (monitor) => {
  monitor.on('changed', (f) => {
    console.log('changed: ', f);
    rebuild();
  });
});
