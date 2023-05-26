/**
 * isArray
 * @param source
 */
export const isArray = (source: any): source is any[] => {
  return Array.isArray(source);
};
