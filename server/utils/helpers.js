export function getFileExtension(path) {
  // returns the file extension of a file given its directory
  return dir.slice((Math.max(0, dir.lastIndexOf(".")) || Infinity) + 1);
}

export function getFileName(str) {
  return str.replace(/^.*(\\|\/|\:)/, "");
}
