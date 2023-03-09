import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3';
import { getWeb3NoAccount } from '../utils/contractHelper';

const useWeb3 = () => {
  // @ts-ignore
  const library = window.ethereum;
  const refEth = useRef(library)
  // @ts-ignore
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== refEth.current) {
      // @ts-ignore
      setweb3(library ? new Web3(library) : getWeb3NoAccount())
      refEth.current = library
    }
  }, [library])

  return web3
}

export default useWeb3