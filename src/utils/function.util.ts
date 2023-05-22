/**
 * isArray
 * @param source
 */
export const isArray = (source: any): source is Array<any> => {
    return Array.isArray(source)
}
