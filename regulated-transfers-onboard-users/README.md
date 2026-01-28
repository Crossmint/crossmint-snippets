# Regulated Transfers — Onboard Users

Minimal script that:
- creates an EVM wallet with `owner: <userLocator>` (this also registers the user)
- attaches `userDetails` to the user (for compliance screening)

Docs: `https://docs.crossmint.com/stablecoin-orchestration/regulated-transfers/guides/onboard-users`

## Setup

```bash
cp .env.example .env
```

## Run

```bash
bash onboard.sh
```

## Files

- `onboard.sh` - wallet + user onboarding calls
- `.env.example` - required env vars

