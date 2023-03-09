import { ethers } from 'ethers'
// @ts-ignore
import VisionWeb from 'visionweb'
import getRpcUrl from 'utils/getRpcUrl'
import { ChainId, getChainUrl } from 'utils/chainIdHelpers'
import { CHAIN_ID } from 'config'

const RPC_URL = getRpcUrl()
export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

const CHAIN_URL = Number(CHAIN_ID) === ChainId.MAINNET ? 'https://infragrid.v.network' : 'https://vpioneer.infragrid.v.network'

const HttpProvider = VisionWeb.providers.HttpProvider;
const FullNode = new HttpProvider(CHAIN_URL)
const SolidityNode = new HttpProvider(CHAIN_URL)
const EventServer = new HttpProvider(CHAIN_URL)

export const visionWeb = new VisionWeb(FullNode, SolidityNode, EventServer)

export default null
