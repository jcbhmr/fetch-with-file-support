
import { createReadStream, statSync } from 'fs'
import { Request, Response, Headers } from 'node-fetch'
import assert from 'assert'
import { lookup } from 'mime-types'

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
    try {
      const readStream = createReadStream(filePath)
      readStream.on('open', function () {
        try {
          const size = statSync(filePath).size
          const response = new Response(readStream, {
            url: request.url,
            status: 200,
            statusText: 'OK',
            size: size,
            headers: new Headers({
              'Content-Length': size,
              'Content-Type': lookup(filePath) || 'application/octet-stream'
            }),
            timeout: request.timeout
          })
          resolve(response)
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

export { fetchFile }
