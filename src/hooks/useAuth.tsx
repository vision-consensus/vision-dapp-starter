import { useCallback } from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useVisionWebLogin } from 'state/account/hooks'
import { ConnectorNames } from '../utils/types'
import { connectorLocalStorageKey } from 'vision-uikit'
import { connectorsByName } from '../utils/web3React'
import { setupNetwork } from '../utils/wallet'
import { useTranslation } from '../contexts/Localization'
import useActiveWeb3React from './useActiveWeb3React'
import { CHAIN_ID } from 'config'
import { useAppDispatch } from 'state/hooks'
import { clearUserStates } from 'utils/clearUserStates'

const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate, setError, account, library } = useActiveWeb3React()
  const { login: loginVtimes, logout: logoutVtimes } = useVisionWebLogin()
  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      window?.localStorage?.setItem(connectorLocalStorageKey, connectorID)
      if (connectorID === ConnectorNames.Vtimes) {
        loginVtimes()
        return
      }
      const connectorOrGetConnector = connectorsByName[connectorID]
      // const connector =
        // typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector()
      const connector = connectorOrGetConnector
      if (typeof connector !== 'function' && connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error)
            const provider = await connector.getProvider()
            const hasSetup = await setupNetwork(Number(CHAIN_ID), provider)
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = undefined
              }
            } else {
            }
          }
        })
      } else {
        window?.localStorage?.removeItem(connectorLocalStorageKey)
      }
    },
    [t, activate, setError, loginVtimes],
  )

  const logout = useCallback(() => {
    logoutVtimes();
    deactivate();
    clearUserStates()
  }, [deactivate, dispatch, chainId, logoutVtimes])

  return { login, logout }
}

export default useAuth
