import { ethers } from 'ethers'
import { getMulticallContract, getWeb3NoAccount } from './contractHelper'

import { MultiCallResponse } from './types'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
  try {
    const multi = getMulticallContract()
    const itf = new ethers.utils.Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.aggregate(calldata)
    const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))
    return res
  } catch (error) {
    console.log(error)
    return calls.map(() => null) as any
  }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options
  const multi = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call: any, i: number) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}
export function makeBatchRequest(calls: any[]) {
  const web3 = getWeb3NoAccount()
  let batch = new web3.BatchRequest();

  let promises = calls.map(call => {
      return new Promise((res, rej) => {
          let req = call.request({}, (err: any, data: any) => {
              if(err) rej(err);
              else res(data)
          });
          batch.add(req)
      })
  })
  batch.execute()

  return Promise.all(promises)
}


export default multicall
