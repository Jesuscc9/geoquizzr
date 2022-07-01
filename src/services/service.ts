export async function updateSupabaseCookie() {
  await fetch('/api/auth', {
    method: 'POST'
  })
}
