'use strict'

const assert = require('assert')
// We make sure Unix paths are passed to filters, even on Windows
const {
  posix: { basename, normalize },
} = require('path')

// Normalize string `opts.*Filter` to RegExps
const normalizeFilters = function({ opts }) {
  const filterOpts = FILTER_OPTS.map(name => normalizeFilter({ name, opts }))
  const filterOptsA = Object.assign({}, ...filterOpts)
  return { ...opts, ...filterOptsA }
}

const normalizeFilter = function({ name, opts }) {
  const filterOpt = opts[name]
  const filterOptA = normalizeRegExpString({ filterOpt, name })
  return { [name]: filterOptA }
}

const normalizeRegExpString = function({ filterOpt, name }) {
  if (typeof filterOpt !== 'string') {
    return filterOpt
  }

  try {
    return new RegExp(filterOpt, 'u')
  } catch (error) {
    throw new Error(
      `Option '${name}' is an invalid regular expression: ${filterOpt}`,
    )
  }
}

// `opts.*Filter` options validation
const isFilterOption = function(option, validOption) {
  return validOption === EXAMPLE_FILTER && isFilter(option)
}

const isFilter = function(filter) {
  return filter instanceof RegExp || typeof filter === 'function'
}

const EXAMPLE_FILTER = '[a-z]'

// Validate a filename or path against `opts.filenameFilter|pathFilter`
// They can either:
//   - a RegExp
//   - a function returning `true`, `false` or a error message string
const checkFilters = function(path, opts) {
  FILTER_OPTS.forEach(name => checkFilter(path, name, opts))
}

const checkFilter = function(path, name, { [name]: filter }) {
  if (filter === undefined) {
    return
  }

  const value = getFilterValue[name](path)

  if (typeof filter === 'function') {
    return checkFilterFunc({ filter, value, name, path })
  }

  checkFilterRegExp({ filter, value, name, path })
}

const checkFilterFunc = function({ filter, value, name, path }) {
  const message = filter(value)

  if (typeof message === 'string') {
    throw new TypeError(`${message}: ${path}`)
  }

  assert(Boolean(message), `Path must match ${name}: ${path}`)
}

const checkFilterRegExp = function({ filter, value, name, path }) {
  assert(
    filter.test(value),
    `Path must match ${name} '${filter.source}': ${path}`,
  )
}

// Retrieve the filename of path
const getFilterValue = {
  filenameFilter: path => basename(path),
  pathFilter: path => normalize(path),
}

// All available filter options
const FILTER_OPTS = Object.keys(getFilterValue)

module.exports = {
  isFilterOption,
  normalizeFilters,
  EXAMPLE_FILTER,
  checkFilters,
  checkFilterFunc,
}
