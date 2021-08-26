
import { __wrapReject } from './__wrapReject.mjs'

test('__wrapReject', () => {
  let tst = null
  const reject = (e) => {
    tst = e
  }
  __wrapReject(reject, () => {
    throw new TypeError()
  })
  expect(tst).toBeInstanceOf(TypeError)
})
