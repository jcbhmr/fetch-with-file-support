
import { expect, test } from '@jest/globals'
import { fetchFile } from './fetch-file-scheme.mjs'
import { join } from 'path'
import fs from 'fs'
import tmp from 'tmp-promise'
import { Request } from 'node-fetch'

const dataPath = join(__dirname, '__test_data')

test('base', async () => {
  const path = join(dataPath, 'test-base.txt')
  const referenceText = await fs.promises.readFile(path, 'utf8')
  const referenceSize = (await fs.promises.stat(path)).size

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

test('multiple request types', async () => {
  const path = join(dataPath, 'test-base.txt')
  const referenceText = await fs.promises.readFile(path, 'utf8')
  let res = await fetchFile(`file://${path}`)
  let text = await res.text()
  expect(text).toStrictEqual(referenceText)
  res = await fetchFile(new URL(`file://${path}`))
  text = await res.text()
  expect(text).toStrictEqual(referenceText)
  res = await fetchFile(new Request(`file://${path}`))
  text = await res.text()
  expect(text).toStrictEqual(referenceText)
  res = await fetchFile(new Request(new URL(`file://${path}`)))
  text = await res.text()
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

test('file access rules forbid read', async () => {
  const tmpDir = await tmp.dir({
    unsafeCleanup: true
  })
  try {
    const tmpPath = tmpDir.path
    const path = join(tmpPath, 'test-no-read.txt')
    await fs.promises.writeFile(path, 'test data')
    const restest = await fetchFile(`file://${path}`)
    expect(restest.ok).toStrictEqual(true)
    await fs.promises.chmod(path, 0o000)

    const res = await fetchFile(`file://${path}`)
    expect(res.url).toStrictEqual(`file://${path}`)
    expect(res.ok).toStrictEqual(false)
    expect(res.status).toStrictEqual(403)
    expect(res.statusText).toStrictEqual('Forbidden')
    expect(res.redirected).toStrictEqual(false)
    expect(res.headers.get('Content-Type')).toStrictEqual('text/plain')
    expect(res.body).toBeDefined()
    expect(res.bodyUsed).toStrictEqual(false)
    await res.text()
    expect(res.bodyUsed).toStrictEqual(true)
  } finally {
    tmpDir.cleanup()
  }
})
