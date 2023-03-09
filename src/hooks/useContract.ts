
import { Contract } from 'ethers';
import { useCallback, useMemo } from 'react';
import { getProviderOrSigner } from 'utils';
import { getCometAddress, getMulticallAddress } from 'utils/addressHelpers';
import CommetAbi from '../config/abi/Comet.json';
import MultiCallAbi from '../config/abi/Multicall.json';

import { 
  getBep20Contract,
  getCometContract,
  getContract,
} from '../utils/contractHelper';
import useActiveWeb3React from './useActiveWeb3React';

export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(ABI, address, withSignerIfPossible ? getProviderOrSigner(library, account) : null)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}


export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  return useMemo(
    () => getBep20Contract(address, withSignerIfPossible && library ? library.getSigner() : undefined),
    [address, library, withSignerIfPossible],
  )
}

export function useCometContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract(getCometAddress(), CommetAbi, withSignerIfPossible)
}


export const useComet = () => {
  const { library, account } = useActiveWeb3React()
  return useMemo(
    () => getCometContract(library && library.getSigner()),
    [library, account],
  )
}



export function useMulticallContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract(getMulticallAddress(), MultiCallAbi, withSignerIfPossible)
}
