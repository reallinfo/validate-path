'use strict'

const yargs = require('yargs')

const defineCli = function() {
  return yargs
    .options(CONFIG)
    .usage(USAGE)
    .example(MAIN_EXAMPLE, 'Validate and normalize a file path')
    .help()
    .version()
    .strict()
}

const CONFIG = {
  'default-value': {
    string: true,
    alias: 'd',
    describe: 'Path default value',
  },
  base: {
    string: true,
    alias: 'b',
    requiresArg: true,
    describe: `Base directory to resolve relative paths.
Defaults to current directory.`,
  },
  inside: {
    boolean: true,
    alias: 'i',
    describe: `Validate that the path is inside of its base directory or not.
Defaults to undefined.`,
  },
  lowercase: {
    boolean: true,
    alias: 'l',
    describe: `Validate that the path is lowercase.
Defaults to false.`,
  },
  platform: {
    string: true,
    alias: 'p',
    requiresArg: true,
    describe: `Target OS ("unix" or "windows"), used to determine path delimiters.
Defaults to current OS.`,
  },
  'path-filter': {
    string: true,
    requiresArg: true,
    describe: 'Validate that the path matches a regular expression',
  },
  'filename-filter': {
    string: true,
    requiresArg: true,
    describe: 'Validate that the filename matches a regular expression',
  },
  exist: {
    boolean: true,
    describe: `Validate that the file exists or does not exist.
Defaults to undefined.`,
  },
  dir: {
    boolean: true,
    describe: `Validate that the file is a directory or not.
Defaults to undefined.`,
  },
  'allow-special': {
    boolean: true,
    describe: `Allow files that are special like sockets, FIFOs, block devices and character devices.
Defaults to false.`,
  },
  'can-read': {
    boolean: true,
    describe: `Validates that the file can be read.
Defaults to true.`,
  },
  'can-write': {
    boolean: true,
    describe: `Validates that the file can be written to.
Defaults to undefined.`,
  },
  'can-execute': {
    boolean: true,
    describe: `Validates that the file can be executed.
Defaults to undefined.`,
  },
}

const USAGE = `$0 [OPTS] PATH

File path validation and normalization.`

const MAIN_EXAMPLE = '$0'

module.exports = {
  defineCli,
}
