import { CHAIN_ID } from "config/index"
import { Token } from "state/types"
import { ChainId } from "utils/chainIdHelpers"
import defaultTokens from './defaultTokens'

interface TokenList {
  [key: string]: Token
}

const findToken = (key: string, chainId: number, list: Token[]) => {
  return list.find(token => token.symbol.toLowerCase() === key && token.chainId === chainId) as Token
}


const defineTokens = <T extends TokenList>(t: T) => t

export const vpioneerTokens = defineTokens({
  usdt: findToken('usdt', ChainId.VPIONEER, defaultTokens),
} as const)

export const mainTokens = defineTokens({
  usdt: findToken('usdt', ChainId.MAINNET, defaultTokens),
} as const)

export const chainTokens = Number(CHAIN_ID) === ChainId.MAINNET ? mainTokens : vpioneerTokens

export default {}