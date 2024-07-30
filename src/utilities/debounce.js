export function debounce(func, wait) {
  let timeout;
  function debounced(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  }
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return debounced;
}
