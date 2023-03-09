import { chainIdUrls, CHAIN_ID } from '../config'

// Array of available nodes to connect to
// @ts-ignore
export const nodes = [chainIdUrls.rpc[CHAIN_ID]]

const getNodeUrl = () => {
  // @ts-ignore
  return chainIdUrls.rpc[CHAIN_ID]
}

export default getNodeUrl