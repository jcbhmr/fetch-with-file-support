
import { expect, test } from '@jest/globals'
import { fetchFile } from './fetch-file-scheme.mjs'
import { join } from 'path'
import { readFileSync } from 'fs'

const dataPath = join(__dirname, '__test_data')

test('base', async () => {
  const path = join(dataPath, 'test-base.txt')
  const referenceText = readFileSync(path, 'utf8')
  const res = await fetchFile(`file://${path}`)
  const text = await res.text()
  expect(text).toStrictEqual(referenceText)
})
