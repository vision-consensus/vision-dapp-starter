import { connectorsByName } from './web3React'
import { connectorLocalStorageKey } from 'vision-uikit'

export const clearUserStates = () => {
  // dispatch(resetUserNftState())
  // This localStorage key is set by @web3-react/walletconnect-connector
  if (window.localStorage.getItem('walletconnect') && connectorsByName.walletconnect) {
    connectorsByName.walletconnect.close()
    connectorsByName.walletconnect.walletConnectProvider = undefined
  }
  window.localStorage.removeItem(connectorLocalStorageKey)

}
