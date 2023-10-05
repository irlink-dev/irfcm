import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  console.log(code)

  const clientId = process.env.LPOINT_CLIENT_ID
  const clientSecret = process.env.LPOINT_CLIENT_SECRET
  const redirectUri = `http://localhost:3000/lpoint/oauth`
  const grantType = 'authorization_code'

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=${grantType}&code=${code}`,
  })
  const data = await response.json()
  console.log(data)
  return NextResponse.json(data)
}
