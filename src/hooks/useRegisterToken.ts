import { useCallback } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import { useVisionweb } from "./useVisionweb";

export type IToken = {
  tokenAddress: string, tokenSymbol: string, tokenDecimals: number
}

export function useRegisterToken () {
  const { library } = useActiveWeb3React()
  const handleRegisterToken = useCallback(async (token: IToken | undefined | null) => {
    if (library && library.provider && token) {
      const BASE_URL = window.location.origin
      const { tokenAddress, tokenSymbol, tokenDecimals } = token
      // @ts-ignore
      const tokenAdded = await library?.provider?.request({
        method: 'wallet_watchAsset',
        params: {
          // @ts-ignore
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: `${BASE_URL}/images/tokens/${tokenAddress.toLowerCase()}.png`,
          },
        },
      })
      alert('Add Sucess')
    } else {
      alert('Please connect Metamask')
    }
  }, [library])

  return handleRegisterToken
}

export function useRegisterTokenToVtimes() {
  const visionWeb = useVisionweb()

  const handleRegisterToken = useCallback(async (token: IToken | undefined | null) => {
    if (visionWeb && token) {
      const { tokenAddress, tokenSymbol, tokenDecimals } = token
      const tokenAdded =visionWeb.extension.addSmartToken({
        tokenId: visionWeb.address.fromEth(tokenAddress),
        name: tokenSymbol,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        custom: true
      })
      alert('Add Sucess')
    } else {
      alert('Please connect Vtimes')
    }
  }, [visionWeb])

  return handleRegisterToken
}