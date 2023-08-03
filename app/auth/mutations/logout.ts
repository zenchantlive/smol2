import { session } from "blitz"

export default async function logout(_ = null, { session: $session } = {}) {
  await session.$revoke()
  return true
}