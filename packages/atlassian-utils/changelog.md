## Changelog

### 2026-04-23

Added shared authentication and connection factories so Atlassian components no longer duplicate auth plumbing:
- Connection factories: `getAtlassianBasicAuthConnection`, `getAtlassianOAuth2AuthorizationCodeConnection`, `getAtlassianOAuth2ClientCredentialsConnection`
- Auth helpers: `buildAuthHeaders`, `createAtlassianClient`, `resolveAtlassianHost`, `validateAtlassianConnection`, `isAtlassianBasicAuth`
- Shared types: `AccessibleResource`, `AtlassianConnectionKeys`, `BasicAuthConnectionParams`, `OAuth2AuthorizationCodeConnectionParams`, `OAuth2ClientCredentialsConnectionParams`, `ConnectionDisplayOverrides`
