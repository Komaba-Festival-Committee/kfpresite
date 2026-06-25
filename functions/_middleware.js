/**
 * Restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 * A user-id containing a colon (":") character is invalid, as the
 * first colon in a user-pass string separates user and password.
 */

import { env } from "cloudflare:workers"

const BASIC_USER = env.PRE_QA_USER
const BASIC_PASS = env.PRE_QA_PASS
const RESPONSE_UNAUTHORIZED = {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="QA Test", charset="UTF-8"',
    }
}

async function errorHandling(context) {
  try {
    return await context.next()
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

async function handleRequest({ next, request }) {
  if (request.headers.has("Authorization")) {
    const Authorization = request.headers.get('Authorization')
    const [scheme, encoded] = Authorization.split(' ')
    if (!encoded || scheme !== 'Basic') {
      return new Response(`Invalid authorization header`, RESPONSE_UNAUTHORIZED)
    }

    const buffer = Uint8Array.from(atob(encoded), (character) =>
      character.charCodeAt(0)
    )
    const decoded = new TextDecoder().decode(buffer).normalize()

    const index = decoded.indexOf(':')

    if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response('Invalid authorization value.', RESPONSE_UNAUTHORIZED)
    }

    const user = decoded.substring(0, index);
    const pass = decoded.substring(index + 1);

    if (BASIC_USER !== user) {
      return new Response('Invalid credentials.', RESPONSE_UNAUTHORIZED)
    }

    if (BASIC_PASS !== pass) {
      return new Response('Invalid credentials.', RESPONSE_UNAUTHORIZED)
    }

    return await next()
  }

  return new Response('Authentication required.', RESPONSE_UNAUTHORIZED)
}

export const onRequest = [errorHandling, handleRequest]
