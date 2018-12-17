'use strict'

const { validateInside } = require('./inside')
const { validateLowerCase } = require('./lowercase')
const { validateFilters } = require('./path_filter')

// Validate file path.
// Only validate the path string, i.e. does not check if file exists.
const pathValidate = function(path, opts) {
  PATH_VALIDATORS.forEach(validator => validator(path, opts))
}

const PATH_VALIDATORS = [validateInside, validateLowerCase, validateFilters]

module.exports = {
  pathValidate,
}