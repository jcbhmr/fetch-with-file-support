
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
  expect(res.url).toStrictEqual(`file://${path}`)
  expect(res.ok).toStrictEqual(true)
  expect(res.status).toStrictEqual(200)
  expect(res.statusText).toStrictEqual('OK')
  expect(res.redirected).toStrictEqual(false)
  expect(res.headers.get('Content-Length')).toStrictEqual(`${referenceSize}`)
  expect(res.headers.get('Content-Type')).toStrictEqual('text/plain')
  // not implemented in node-fetch's Response object
  // expect(res.type).toStrictEqual('basic')
  expect(res.body).toBeDefined()
  expect(res.bodyUsed).toStrictEqual(false)
  const text = await res.text()
  expect(res.bodyUsed).toStrictEqual(true)
  expect(text).toStrictEqual(referenceText)
})

test('file doesn\'t exist', async () => {
  const path = join(dataPath, 'test-inexistent.txt')

  const res = await fetchFile(`file://${path}`)
  expect(res.url).toStrictEqual(`file://${path}`)
  expect(res.ok).toStrictEqual(false)
  expect(res.status).toStrictEqual(404)
  expect(res.statusText).toStrictEqual('Not Found')
  expect(res.redirected).toStrictEqual(false)
  expect(res.headers.get('Content-Type')).toStrictEqual('text/plain')
  expect(res.body).toBeDefined()
  expect(res.bodyUsed).toStrictEqual(false)
  await res.text()
  expect(res.bodyUsed).toStrictEqual(true)
})
