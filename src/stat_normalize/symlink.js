import { pRealpath } from '../utils/fs.js'

export const followSymlink = async function(path, stat, { followSymlinks }) {
  if (stat === undefined || !followSymlinks) {
    return path
  }

  const pathA = await pRealpath(path, 'utf-8')
  return pathA
}
