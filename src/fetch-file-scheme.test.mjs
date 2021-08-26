
import { expect, test } from '@jest/globals'
import { fetchFile } from './fetch-file-scheme.mjs'
import { join } from 'path'
import { readFileSync, statSync } from 'fs'

const dataPath = join(__dirname, '__test_data')

test('base', async () => {
  const path = join(dataPath, 'test-base.txt')
  const referenceText = readFileSync(path, 'utf8')
  const referenceSize = statSync(path).size

  const res = await fetchFile(`file://${path}`)
  expect(res.body).toBeDefined()
  expect(res.status).toStrictEqual(200)
  expect(res.statusText).toStrictEqual('OK')
  expect(res.ok).toBeTruthy()
  expect(res.redirected).toBeFalsy()
  expect(res.url).toStrictEqual(`file://${path}`)
  expect(res.headers.get('Content-Length')).toStrictEqual(`${referenceSize}`)
  expect(res.headers.get('Content-Type')).toStrictEqual('text/plain')
  // not implemented in node-fetch's Response object
  // expect(res.type).toStrictEqual('basic')
  expect(res.bodyUsed).toBeFalsy()
  const text = await res.text()
  expect(res.bodyUsed).toBeTruthy()
  expect(text).toStrictEqual(referenceText)
})
