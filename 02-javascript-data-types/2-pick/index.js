/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    const fieldsFind = fields.find((item) => item === key);
    if (fieldsFind) {
      newObj[key] = value;
    }
  }
  return newObj;
};
