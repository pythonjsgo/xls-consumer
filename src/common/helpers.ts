export const getFileExtension = (fileName: string): string => {
  const index = fileName.lastIndexOf('.');
  return fileName.slice(index + 1);
};
