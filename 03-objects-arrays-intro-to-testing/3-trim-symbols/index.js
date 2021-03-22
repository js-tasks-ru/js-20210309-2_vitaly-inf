/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined){
    return string;
  }
  if (size === 0){
    return '';
  }
  let count = 1;
  return string.split('').reduce((prev,a,i,arr) => {
    if (arr[i-1] === a){
      if(count < size){
        count++;
        prev.push(a);
      }} else {
      count = 1;
      prev.push(a);
    }
  

    return prev;
  }, []).join('');  
}
