
/**
 * ignore
 *
 * @param {any} reject ignore
 * @param {any} fct ignore
 * @returns {any} ignore
 */
function __wrapReject (reject, fct) {
  try {
    return fct()
  } catch (e) {
    reject(e)
  }
}

export { __wrapReject }
