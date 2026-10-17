# Macave Mining — Repository v2

This is a cleaned source snapshot prepared for a second audit. It is **not yet certified production-ready**.

## Requirements
- Node.js 18 or newer
- npm
- MongoDB for deposit persistence (configure `MONGO_URI` if needed)

## Setup
1. Copy `.env.example` to `.env`.
2. Set a unique `JWT_SECRET` and any required service credentials locally. Never commit `.env`.
3. Install dependencies with `npm install`.
4. Run syntax checks with `npm run check`.
5. Start with `npm start`.
6. Test `http://localhost:3000/ping`; it should return `{"status":"ok"}`.

## Entry point
`index.js` is the configured entry point. It mounts the deposit and contact routes whose files exist in this snapshot. Other legacy server files remain in the source tree but are not the configured startup path and need separate review before use.

## Security and limitations
- Do not use real wallet/API credentials until they have been rotated and stored outside source control.
- Deposit creation currently records a pending deposit; it does not prove that a blockchain payment has been received.
- This snapshot has not undergone a full dependency installation, runtime, database, payment, authentication, or penetration test.
- Review every route and controller before handling real funds or user data.
