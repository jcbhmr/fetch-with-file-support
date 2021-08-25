
import { expect, test } from '@jest/globals'
import { fetchFile } from './fetch-file-scheme.mjs'

test('base', () => {
  expect(fetchFile()).toBe('TODO')
})
