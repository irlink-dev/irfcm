'use client'

import { useSearchParams } from 'next/navigation'

const ClientOAuthPage = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  fetch(`/api/oauth?code=${encodeURIComponent(code!)}`, {
    method: 'POST',
  })

  return (
    <>
      <span>
        /oauth?code=<strong>{code}</strong>
      </span>
    </>
  )
}

export default ClientOAuthPage
