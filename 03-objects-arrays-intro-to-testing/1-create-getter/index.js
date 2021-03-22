/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return function setGetter(obj) {

    const field = path.split('.');
    for (let i = 0; i < field.length; i++) {
      obj = obj[field[i]];
      if(!obj){
          return undefined;
      }
    }   
    return obj;
  };

}
