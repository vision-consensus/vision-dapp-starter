import addresses from '../config/contracts'
import { ChainId } from './chainIdHelpers'
import { CHAIN_ID } from 'config'

export const getAddress = (address: any): string => {
  const chainId: string = String(CHAIN_ID)
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

export const getCometAddress = () => {
  return getAddress(addresses.comet)
}

