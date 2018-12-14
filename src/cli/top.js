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
    describe: 'Validate that the path is inside of its base directory.',
  },
  lowercase: {
    boolean: true,
    alias: 'l',
    describe: 'Validate that the path is lowercase',
  },
  platform: {
    string: true,
    alias: 'p',
    requiresArg: true,
    describe: `Target OS ("unix" or "windows"), used to determine path delimiters.
Defaults to current OS.`,
  },
}

const USAGE = `$0 [OPTS] PATH

File path validation and normalization.`

const MAIN_EXAMPLE = '$0'

module.exports = {
  defineCli,
}
