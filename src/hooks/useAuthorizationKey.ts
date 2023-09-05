import Pathname from '@/types/Pathname'

const useAuthorizationKey = (pathname: Pathname) => {
  let authorizationKey = null

  pathname === 'chubb' &&
    (authorizationKey = process.env.CHUBB_AUTHORIZATION_KEY!)
  pathname === 'dblife' &&
    (authorizationKey = process.env.DBLIFE_AUTHORIZATION_KEY!)
  pathname === 'hana' &&
    (authorizationKey = process.env.HANA_AUTHORIZATION_KEY!)
  pathname === 'kb' && (authorizationKey = process.env.KB_AUTHORIZATION_KEY!)
  pathname === 'lina' &&
    (authorizationKey = process.env.LINA_AUTHORIZATION_KEY!)
  pathname === 'shinhan' &&
    (authorizationKey = process.env.SHINHAN_AUTHORIZATION_KEY!)
  pathname === 'zilink' &&
    (authorizationKey = process.env.ZILINK_AUTHORIZATION_KEY!)

  return authorizationKey
}

export default useAuthorizationKey
