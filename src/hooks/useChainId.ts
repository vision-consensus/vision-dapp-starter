
import { useRouter } from 'next/router'
// @ts-ignore
import QueryString from "qs"
import { useMemo } from 'react'
import { ChainId } from 'utils/chainIdHelpers'

export const useChainId = () => {
  const router = useRouter()
  return useMemo(() => {
    if (router.asPath) {
      const search = router.asPath.slice(2)
      if (search) {
          const chain = (QueryString.parse(search).chain || 'MAINNET')
          // @ts-ignore
          return ChainId[chain.toUpperCase()] 
      }
      return ChainId.MAINNET
    }
  }, [router])
  
}

export default useChainId