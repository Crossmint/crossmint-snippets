#!/usr/bin/env bash
set -euo pipefail

# Load env vars from .env (create it from .env.example)
if [[ -f ".env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source ".env"
  set +a
fi

: "${CROSSMINT_SERVER_API_KEY:?Missing CROSSMINT_SERVER_API_KEY}"
: "${CROSSMINT_BASE_URL:=https://staging.crossmint.com}"
: "${USER_LOCATOR:?Missing USER_LOCATOR}"
: "${SIGNER_EMAIL:?Missing SIGNER_EMAIL}"
: "${FIRST_NAME:?Missing FIRST_NAME}"
: "${LAST_NAME:?Missing LAST_NAME}"
: "${DATE_OF_BIRTH:?Missing DATE_OF_BIRTH}"
: "${COUNTRY_OF_RESIDENCE:?Missing COUNTRY_OF_RESIDENCE}"

# 1) Create wallet with `owner` (also creates the user)
curl -sS -X POST "$CROSSMINT_BASE_URL/api/2025-06-09/wallets" \
  -H "X-API-KEY: $CROSSMINT_SERVER_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"chainType\": \"evm\",
    \"config\": { \"adminSigner\": { \"type\": \"email\", \"email\": \"$SIGNER_EMAIL\" } },
    \"owner\": \"$USER_LOCATOR\"
  }"

echo

# 2) Attach userDetails (for compliance screening / OFAC checks)
curl -sS -X PUT "$CROSSMINT_BASE_URL/api/2025-06-09/users/$USER_LOCATOR/" \
  -H "X-API-KEY: $CROSSMINT_SERVER_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"userDetails\": {
      \"firstName\": \"$FIRST_NAME\",
      \"lastName\": \"$LAST_NAME\",
      \"dateOfBirth\": \"$DATE_OF_BIRTH\",
      \"countryOfResidence\": \"$COUNTRY_OF_RESIDENCE\"
    }
  }"

echo

