export default (size: number) => {
  if (size > 1024 * 1024 * 1024) {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + 'Gb';
  }
  if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + 'Mb';
  }
  if (size > 1024) {
    return (size / 1024).toFixed(2) + 'Kb';
  }
  return size + 'B';
};
