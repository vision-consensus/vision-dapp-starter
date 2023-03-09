import { ChainId } from "utils/chainIdHelpers";

export const CHAIN_ID: string = '666666'
// export const CHAIN_ID = '888888'


export enum SUPPORT_CHAINS {
  ETH = 'ETH',
  BSC = 'BSC'
}

export const ETH_ChainId = {
  MAIN: 1,
  TEST: 97
}


export const VISION_SCAN_URL =  'https://www.visionscan.org'

export const chainIdUrls = {
  rpc: {
    [ChainId.MAINNET]: 'https://infragrid.v.network/ethereum/compatible',
    [ChainId.VPIONEER]: 'https://vpioneer.infragrid.v.network/ethereum/compatible',
    [ChainId.TESTNET]: 'https://vtest.infragrid.v.network/ethereum/compatible'
  },
  chain: {
    [ChainId.MAINNET]: 'https://infragrid.v.network',
    [ChainId.VPIONEER]: 'https://vpioneer.infragrid.v.network',
    [ChainId.TESTNET]: 'https://vtest.infragrid.v.network'
  }
}
