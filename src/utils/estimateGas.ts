import { Contract, PayableOverrides } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'

// generic contract types

export type MaybeContract<C extends Contract = Contract> = C | null | undefined
export type ContractMethodName<C extends Contract = Contract> = keyof C['callStatic'] & string

export type ContractMethodParams<
  C extends Contract = Contract,
  N extends ContractMethodName<C> = ContractMethodName<C>,
> = Parameters<C['callStatic'][N]>


export enum GAS_PRICE {
  default = '10',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000))
}
/**
 * Estimate the gas needed to call a function, and add a 10% margin
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param gasMarginPer10000 The gasMargin per 10000 (i.e. 10% -> 1000)
 * @param args An array of arguments to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export const estimateGas = async <C extends Contract = Contract, N extends ContractMethodName<C> = any>(
  contract: MaybeContract<C>,
  methodName: N,
  methodArgs: ContractMethodParams<C, N>,
  overrides: PayableOverrides = {},
  gasMarginPer10000 = 1000
) => {
  if (!contract || !contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract?.address}`)
  }
  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs, overrides)
  // By convention, BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = calculateGasMargin(rawGasEstimation, gasMarginPer10000)
  return gasEstimation
}

/**
 * Perform a contract call with a gas value returned from estimateGas
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param methodArgs An array of arguments to pass to the method
 * @param overrides An overrides object to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export const callWithEstimateGas = async <C extends Contract = Contract, N extends ContractMethodName<C> = any>(
  contract: MaybeContract<C>,
  methodName: N,
  methodArgs: ContractMethodParams<C, N>,
  overrides: PayableOverrides = {},
  gasMarginPer10000 = 1000,
): Promise<TransactionResponse | null> => {
  if (!contract) return null
  const gasEstimation = await estimateGas(contract, methodName, methodArgs, overrides, gasMarginPer10000)
  const tx = await contract[methodName](...methodArgs, {
    gasLimit: gasEstimation,
    ...overrides,
  })
  return tx
}
