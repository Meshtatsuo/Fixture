export function getFileExtension(fileName) {
  // returns the file extension of a file given its directory
  return fileName.slice(
    (Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1
  );
}

export function getFileName(str) {
  return str.replace(/^.*(\\|\/|\:)/, "");
}
