import Pathname from '@/types/Pathname'

const useClientName = (pathname: Pathname) => {
  let clientName = ''

  pathname === 'chubb' && (clientName = '처브 CDM')
  pathname === 'dblife' && (clientName = 'DB 생명')
  pathname === 'hana' && (clientName = '하나손해보험')
  pathname === 'kb' && (clientName = 'KB 손해보험')
  pathname === 'lina' && (clientName = '라이나 생명')
  pathname === 'shinhan' && (clientName = '신한카드')
  pathname === 'zilink' && (clientName = '지링크')

  return clientName
}

export default useClientName
