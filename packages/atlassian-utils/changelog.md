## Changelog

### 2026-10-09

The shared webhook helpers and `createAtlassianClient` now accept HTTP clients and trigger contexts from any spectral version, so Atlassian components can upgrade spectral independently of this package.

### 2026-04-23

Added shared authentication and connection factories so Atlassian components no longer duplicate auth plumbing:
- Connection factories: `getAtlassianBasicAuthConnection`, `getAtlassianOAuth2AuthorizationCodeConnection`, `getAtlassianOAuth2ClientCredentialsConnection`
- Auth helpers: `buildAuthHeaders`, `createAtlassianClient`, `resolveAtlassianHost`, `validateAtlassianConnection`, `isAtlassianBasicAuth`
- Shared types: `AccessibleResource`, `AtlassianConnectionKeys`, `BasicAuthConnectionParams`, `OAuth2AuthorizationCodeConnectionParams`, `OAuth2ClientCredentialsConnectionParams`, `ConnectionDisplayOverrides`
