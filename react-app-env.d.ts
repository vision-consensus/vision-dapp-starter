/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    on(arg0: string, arg1: (accounts: any) => void);
    isMetaMask?: true
    request?: (...args: any[]) => Promise<void>
  }
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
  },
  visionWeb?: {
    defaultAddress: {
      base58: string | boolean,
      hex: string | boolean
    },
    address: any,
    contract: any,
    isVtimesApp?: boolean,
    fullNode: any,
    extension: any,
    solidityNode: any,
    eventServer: any
  }
  [key: string]: any
}

type SerializedBigNumber = string

declare let __NEZHA_BRIDGE__: any

declare module visionweb {
  
}

