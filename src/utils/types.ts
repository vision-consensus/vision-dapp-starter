import { FC } from "react";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
  Vtimes = "vtimes"
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: string;
  connectorId: ConnectorNames;
  priority: number | (() => number);
  href?: string;
}

export type TxType = 'transaction' | 'token' | 'address' | 'block' | 'countdown'

export type MultiCallResponse<T> = T | null