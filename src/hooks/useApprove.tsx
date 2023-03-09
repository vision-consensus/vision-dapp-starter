import React, { useCallback, useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getCometAddress } from 'utils/addressHelpers'
import { useERC20 } from './useContract'


export const useApprove = (tokenAddress: string) => {
  const [requestedApproval, setRequestedApproval] = useState(0)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const usdtToken = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    if (account && usdtToken) {
      console.log(account)
      try {
        setRequestedApproval(1)
        const tx = await callWithGasPrice(usdtToken, 'approve', [getCometAddress(), ethers.constants.MaxUint256], { from: account })
        if (!tx.hash) {
          setRequestedApproval(-1)
        }
        const receipt = await tx.wait()
        if (receipt.status) {
          setRequestedApproval(2)
        } else {
          setRequestedApproval(-1)
        }
      } catch (e) {
        console.log(e)
        setRequestedApproval(-1)
      }
    }
    
  }, [
    account,
    usdtToken,
    t,
    callWithGasPrice,
  ])

  return { handleApprove, requestedApproval }
}


