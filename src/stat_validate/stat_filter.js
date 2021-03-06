import { validateFilterFunc } from '../utils/filter.js'

// Validate a file `stat` according to `opts.statFilter` function
export const validateStatFilter = function(path, stat, { statFilter }) {
  if (stat === undefined || statFilter === undefined) {
    return
  }

  validateFilterFunc({
    filter: statFilter,
    value: stat,
    name: 'statFilter',
    path,
  })
}
