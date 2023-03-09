import { ConnectorNames } from "utils/types"

export type AccountState = {
  address: string
}

export type CometDataProps = {
  utilization: string,
  supplyUSDT: string,
  borrowUSDT: string,
  originSupplyUSDT: string,
  originBorrowUSDT: string,
  totalBorrow: string,
  totalSupply: string
}

export type ConfiguratorDataProps = {
  collateralValue: string,
  borrowCapacity: string,
  liquidationRisk: string,
  liquidationPoint: string,
  availableBorrow: string
}

export type TokenDataStatus = {
  initStatus: boolean
}

export interface Token {
  name: string
  symbol: string
  address: string
  chainId: number
  decimals: number
  logoURI: string
  allowance?: string
  balance?: string
  price?: string
  protocalBalance?: string
  originBalance?: string
  originProtocalBalance?: string
  cometBalance?: string
}

export interface TokenWithBalance extends Token {
  balance: string
}
export interface TokenWithTotalsCollateral extends Token {
  totalsCollateral?: string,
  collateralReserves?: string
}

export interface ActionProps extends Token {
  action: string
  actionBalance: string
  isMax?:boolean
}

export interface ProjectProps {
  address: string
  symbol: string
  totalReward: string
  decimal: number
  icon: string
  price: string
  miniAPR: string
}

export interface MiningProfitProps {
  address: string
  symbol: string
  frozen_amount: string
  mining_amount: string
  released_amount: string
  recevied: string
  decimal: number
}

export interface RewardAPRProps {
  supplyRewardApr: string
  borrowRewardApr: string
}

export type AppState = {
  expandMenu: boolean,
  connectorID: ConnectorNames | null,
  defaultTokensList: Token[],
  tokenWithBalanceList: Token[],
  tokenWithBalanceOfList: Token[],
  tokenWithAllowanceList: Token[],
  tokenWithProtocalList: Token[],
  tokenWithPriceList: Token[],
  tokenWithTotalsCollateral: TokenWithTotalsCollateral[],
  tokenDataStatus: TokenDataStatus,
  lenLenToken: Token,
  latestProject: ProjectProps[],
  latestProjectSupply: ProjectProps[],
  miningProfit: MiningProfitProps[],
  rewardAPR: RewardAPRProps
}

export interface RewardDataProps {
  rewardOwed: string
  claimableAmount: string
  lockedAmount: string
}

export interface TokenWithReward extends Token {
  rewardOwed: string
  claimableAmount: string
  lockedAmount: string
  coin_icon?: string
}

export type DashboardState = {
  supplyApr: {
    supplyApr: number,
    borrowApr: number,
    utilization: number | null
  },
  cometData: CometDataProps,
  configuratorData: ConfiguratorDataProps,
  configuratorDataWithPending: ConfiguratorDataProps,
  pendingActions: ActionProps[],
  usdtEarned: string,
  showAfter: boolean,
  rewardData: RewardDataProps
}

export interface ISyrupPoolData {
  available: string,
  balanceOf: string,
  lenPerBlock: string,
  getPricePerFullShare: string,
  totalShares: string,
  calculateTotalPendingLenRewards: string,
  totalLockedAmount: string,
}

export interface ISyrupPoolDataAccount {
  calculateOverdueFee: string,
  userLockedAmount: string,
  userShares: string
  lenAtLastUserAction: string
  lockedAmount: string
  lockStartTime: string
  lockEndTime: string
  lastUserActionTime: string
  lastDepositedTime: string
}

export type VaultsState = {
  lenlen: Token,
  syrupPoolData: ISyrupPoolData,
  syrupPoolDataAccount: ISyrupPoolDataAccount,
  syrupPoolDataInit: boolean
}
