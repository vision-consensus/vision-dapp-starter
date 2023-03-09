// @ts-ignore
import QueryString from "qs"
import { chainIdUrls, bakChain, bakRpc } from 'config/constants/networks'
import { CHAIN_ID } from "config"
export const ChainId = {
    MAINNET: 888888,
    VPIONEER: 666666,
    TESTNET: 20211012
}
export const chainIds = {
    mainnet: 888888,
    vpioneer: 666666,
    vtest: 20211012
}

export const hostChaidId = {
    'https://infragrid.v.network': 888888,
    'https://vpioneer.infragrid.v.network': 666666,
    'https://vtest.infragrid.v.network': 20211012
}

export const chainByIds = {
    888888: 'mainnet',
    666666: 'vpioneer',
    20211012: 'vtest'
}

export const chainNameByIds = {
    888888: 'Vision Mainnet',
    666666: 'Vision Vpioneer',
    20211012: 'Vision Vtest'
}

export const getUrl = (urls: {[key: string]: string}): string => {
    const chainId = getChainId()
    return urls[chainId] ? urls[chainId] : urls[ChainId.MAINNET]
}


export const getChain = () => {
    return 'mainnet'
}


export const getChainId = () => {
    return CHAIN_ID
}

export const getChainIdByHost = (host: string) => {
    // @ts-ignore
    return hostChaidId[host] || chainIds[ChainId.MAINNET]
}

export const isBakHost = () => {
    return window.location.href.indexOf('vanswap.visionapi.io') > -1
}

export const getRpcUrl = () => {
    return getUrl(chainIdUrls.rpc)
}

export const getChainUrl = () => {
    return getUrl(chainIdUrls.chain)
}