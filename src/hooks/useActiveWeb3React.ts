import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { simpleRpcProvider } from '../utils/providers'
import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'state/account/hooks'
import { CHAIN_ID } from 'config'
import { connectorLocalStorageKey, ConnectorNames } from 'vision-uikit'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
 const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, account, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)
  const address =  useAccount()
  const [currentAccount, setCurrentAccount] = useState<string | null | undefined>('')

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
    if (localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Vtimes) {
      setCurrentAccount(address)
    } else {
      setCurrentAccount(account)
    }
  }, [library, account, address])

  return { library: provider, chainId: chainId ?? parseInt(CHAIN_ID, 10), ...web3React, account: currentAccount }
}

export default useActiveWeb3React
