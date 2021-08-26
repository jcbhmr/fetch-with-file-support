
import fs from 'fs'
import { Request, Response, Headers } from 'node-fetch'
import assert from 'assert'
import { lookup } from 'mime-types'
import { __wrapReject } from './__wrapReject.mjs'

/**
 * Do stuff
 *
 * @param {string|URL|Request} resource resource
 * @param {object} init init
 * @returns {Promise<Response>} something
 */
async function fetchFile (resource, init) {
  const request = new Request(resource, init)
  const url = request.url
  const match = url.match(/^file:\/\/(.*)$/)
  assert(match, 'Invalid file URL. It must start with "file://"')
  const filePath = match[1]
  return new Promise((resolve, reject) => {
    const resolveError = (error) => {
      const errorMessage = error.message
      const buffer = Buffer.from(errorMessage)
      const status = (() => {
        if (error.code === 'ENOENT') {
          return 404
        } else {
          return 500
        }
      })()
      const statusText = (() => {
        if (status === 404) {
          return 'Not Found'
        } else { // 500
          return 'Internal Server Error'
        }
      })()
      resolve(new Response(buffer, {
        url: request.url,
        status,
        statusText,
        size: buffer.length,
        headers: new Headers({
          'Content-Length': `${buffer.length}`,
          'Content-Type': 'text/plain'
        }),
        timeout: request.timeout
      }))
    }
    __wrapReject(resolveError, () => {
      const readStream = fs.createReadStream(filePath)
      readStream.on('open', () => {
        __wrapReject(resolveError, async () => {
          const stat = await fs.promises.stat(filePath)
          const response = new Response(readStream, {
            url: request.url,
            status: 200,
            statusText: 'OK',
            size: stat.size,
            headers: new Headers({
              'Content-Length': stat.size,
              'Content-Type': lookup(filePath) || 'application/octet-stream'
            }),
            timeout: request.timeout
          })
          resolve(response)
        })
      })
      readStream.on('error', async (e) => {
        resolveError(e)
      })
    })
  })
}

export { fetchFile }
