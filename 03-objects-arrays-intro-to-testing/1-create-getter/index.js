/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const field = path.split('.');
  return function setGetter(obj) {
    for (let i = 0; i < field.length; i++) {
      obj = obj[field[i]];
      if(!obj){
          return;
      }
    }   
    return obj;
  };

}
