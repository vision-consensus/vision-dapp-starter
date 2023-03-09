import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import { Web3Provider } from '@ethersproject/providers'
import useWeb3Provider from '../hooks/useActiveWeb3React'
import { ConnectorNames } from './types'
import getNodeUrl from './getRpcUrl'
import { CHAIN_ID } from 'config'

const POLLING_INTERVAL = 12000

const SUPPORTED_CHAIN_ID = [ Number(CHAIN_ID) ]

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_ID })

const walletconnect = new WalletConnectConnector({
  qrcode: true,
  rpc: { [CHAIN_ID]: getNodeUrl() },
  // pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: SUPPORTED_CHAIN_ID })

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Vtimes]: null,
} as const

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

export function useSignMessage() {
  const { library, connector, account } = useWeb3Provider()
  if (!library || !account) return
  const signMessage = async ({ message} : any) => {
    // @ts-ignore
    if (window.BinanceChain && window.BinanceChain.bnbSign && connector instanceof BscConnector && account) {
      // @ts-ignore
      const { signature } = await window.BinanceChain?.bnbSign(account, message)
      return signature
    }

    // @ts-ignore
    if (library.provider?.wc) {
      const wcMessage = hexlify(toUtf8Bytes(message))
      // @ts-ignore
      const signature = await library.provider?.wc.signPersonalMessage([wcMessage, account])
      return signature
    }

    return library.getSigner(account).signMessage(message)
  }

  return {
    signMessageAsync: signMessage,
  }
}

export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  // @ts-ignore
  if (window.BinanceChain && window.BinanceChain.bnbSign && connector instanceof BscConnector) {
    // @ts-ignore
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  if (provider.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
