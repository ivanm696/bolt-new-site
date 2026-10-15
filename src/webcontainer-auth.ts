import { auth } from '@webcontainer/api'

// clientId is a public OAuth identifier (PKCE flow, no client secret),
// so it is safe to ship in the browser bundle. It is still read from
// an env variable so it is not hard-coded in the repository.
let initialized = false

export function initWebContainerAuth(): void {
  if (initialized) return
  initialized = true

  const clientId = import.meta.env.VITE_WC_CLIENT_ID
  if (!clientId) {
    console.warn('[webcontainer] VITE_WC_CLIENT_ID is not set; auth.init skipped')
    return
  }

  const result = auth.init({ clientId, scope: '' })
  if (result.status === 'auth-failed') {
    console.error('[webcontainer] auth.init failed:', result.error, result.description)
  }
}

// Redirects the page to StackBlitz to authorize this app with the user's account.
export function startWebContainerLogin(): void {
  auth.startAuthFlow()
}
