
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks'
import { isAddress } from 'utils'
import { getChainUrl } from 'utils/chainIdHelpers'

import { setAccount } from '.'
import { RootState } from '../'
import { connectorLocalStorageKey, ConnectorNames, useVisionweb } from 'vision-uikit'
import { CHAIN_ID } from 'config'

export const useVisionWebLogin = () => {

  const dispatch = useAppDispatch()
  const { visionWeb, account, chainId } = useVisionweb()

  const login = useCallback(() => {
    // @ts-ignore
    if (account) {
      // @ts-ignore
      if (chainId !== CHAIN_ID) {
        alert('Please switch to the Mainet')
        // 浏览器端支持自动切换链，并刷新页面
        if (visionWeb && visionWeb.isVtimesApp) {
          alert('Please switch to the Mainet')
        } else {
          const chainUrl = getChainUrl()
          // @ts-ignore
          visionWeb.extension.changeNode({
            "fullNode": chainUrl,
            "solidityNode": chainUrl,
            "eventServer": chainUrl
          })
          window.location.reload()
        }
        
      }
      // @ts-ignore
      const { address } = visionWeb
     
      dispatch(setAccount({
        address: isAddress(address.toEth(account))
      }))

    } else {
      alert('Please connect the wallet first')
    }
  }, [dispatch, visionWeb, account, chainId])

  const logout = useCallback(() => {
    dispatch(setAccount({ address: "" }));

  }, [dispatch])

  useEffect(() => {
    if (localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Vtimes && visionWeb && account) {
      const { address } = visionWeb
      dispatch(setAccount({
        address: isAddress(address.toEth(account))
      }))
    }
    
  }, [dispatch, visionWeb, account, chainId])

  return { login, logout}
}

export const useAccount = () => {
  return useSelector((state: RootState) => state.account.address)
}


