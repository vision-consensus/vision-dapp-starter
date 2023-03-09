import { Token } from "state/types"

const tokens: Token[] = [
  {
    name: 'Tether USDT',
    symbol: 'USDT',
    address: '0xAb4bC354e564c41A31BeF90e0116bF52f512122c', // VSGxEWcmLk6wynC5eJXaTcortyY6hR5qAg
    chainId: 666666,
    decimals: 18,
    logoURI: ''
  },
 
  {
    name: 'Tether USDT',
    symbol: 'USDT',
    address: '0x1Db6Cdc620388a0b6046B20CD59503a0839AdCFF', // VDNLWbXGMX2tfZxV8iMkTz4qe7FYu6mVD7
    chainId: 888888,
    decimals: 18,
    logoURI: ''
  },

]

export const getChainIdTokens = (chainId: number = 888888) => {
  return tokens.filter(token => token.chainId === chainId)
}

export default tokens