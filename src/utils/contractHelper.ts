import { ethers } from 'ethers'
import { vsers } from 'vsers'
import { simpleRpcProvider, visionWeb } from 'utils/providers'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import Web3 from 'web3';
import bep20Abi from '../config/abi/erc20.json';
import CommetAbi from '../config/abi/Comet.json';
import MultiCallAbi from '../config/abi/Multicall.json';
import getRpcUrl from './getRpcUrl'
import { ConnectorNames } from './types'
import { getCometAddress, getMulticallAddress } from './addressHelpers'
import { connectorLocalStorageKey } from 'vision-uikit'

const httpProvider = new Web3.providers.HttpProvider(getRpcUrl() as string, { timeout: 10000 })
const web3NoAccount = new Web3(httpProvider)

export const getWeb3NoAccount = () => {
  return web3NoAccount
}

export const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider, connectorID?: ConnectorNames | null): any => {
  const signerOrProvider = signer ?? simpleRpcProvider
  if (typeof window !== 'undefined' && localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Vtimes) {
    return new vsers.Contract(address, abi, new vsers.VisionWebProvider(window.visionWeb || visionWeb).provider)
  }
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider, connectorID?: ConnectorNames | null) => {
  // @ts-ignore
  return getContract(bep20Abi, address, signer, connectorID)
}

export const getCometContract = (signer?: Signer | Provider, connectorID?: ConnectorNames | null) => {
  // @ts-ignore
  return getContract(CommetAbi, getCometAddress(), signer, connectorID)
}



