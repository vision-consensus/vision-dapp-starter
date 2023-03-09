import { useCallback } from 'react'
// @ts-ignore
import ethers, { Contract, CallOverrides } from 'ethers'
// @ts-ignore
import { get } from 'lodash'
// @ts-ignore
import { parseUnits } from 'ethers/lib/utils'

export function useCallWithGasPrice() {
  const gasPrice =  parseUnits('10', 'gwei').toString()

  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */
  const callWithGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      overrides: CallOverrides = {},
    ): Promise<ethers.providers.TransactionResponse> => {
      const contractMethod = get(contract, methodName)
      const hasManualGasPriceOverride = overrides?.gasPrice

      const tx = await contractMethod(
        ...methodArgs,
        hasManualGasPriceOverride ? { ...overrides } : { ...overrides, gasPrice },
      )
      return tx
    },
    [gasPrice],
  )

  const callWithGasPriceWeb3 = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      overrides: any = {},
    ): Promise<ethers.providers.TransactionResponse> => {
      const contractMethod = get(contract, methodName)

      const tx = await contractMethod(
        ...methodArgs
      ).send({
        gas: "21000000", gasPrice: gasPrice, feeLimit: '999999999',
        ...overrides
      })
      return tx
    },
    [gasPrice],
  )


  return { callWithGasPrice, callWithGasPriceWeb3 }
}
