import { getAddress } from '@ethersproject/address'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Token } from 'state/types'
import { CHAIN_ID, VISION_SCAN_URL } from "../config"
import { ChainId } from './chainIdHelpers'
import { TxType } from "./types"

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isAddress(value: any): string {
  try {
    return getAddress(value)
  } catch {
    return ''
  }
}

export function getVisionScanLink(
  data: string | number,
  type: TxType,
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || ChainId.MAINNET
  if (type === 'transaction') {
    
    return `${VISION_SCAN_URL}/${type}/${data}${CHAIN_ID === '888888' ? '' : '?chain=vpioneer'}`
  }
  return ''
}


export function getScanLink(
  data: string | number,
  type: TxType,
  chainIdOverride?: number,
): string {
  return getVisionScanLink(data, type, chainIdOverride)
}

export function openBrowser(
  data: string | number,
  type: TxType,
  chainIdOverride?: number,
) {
  const link = getScanLink(data, type, chainIdOverride)
  window.open(link, document.body.clientWidth < 640 ? '_self' : '_blank')
}


export function copyToClipboard(text: string) {
  return new Promise((resolve) => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(text).then(() => {
        resolve(text)
      })
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = text
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      resolve(text)
    }
  })
}

export function balanceToPrice(value: string, price: string) {
  return new BigNumber(value).times(new BigNumber(price)).toString()
}

export function parseEtherValue(value: string, decimals = 18) {

  return new BigNumber(new BigNumber(value).toFixed(decimals)).times(10 ** decimals).toString(10)
  return ethers.utils.parseUnits(value, decimals)
}
// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string | null): any {
  return account ? getSigner(library, account) : library
}

export function getSymbolLogo(token: Token) {
  return {
    symbol: token.symbol === 'LenLen' ? 'LEN' : token.symbol
  }
}