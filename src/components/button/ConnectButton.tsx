import React, { useEffect, useState } from 'react'
// @ts-ignore
import VisionWeb from 'visionweb'
import Button from './Button'
import useModal from 'hooks/useModal';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ConnectorNames } from 'utils/types';
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
// @ts-ignore
import { ConnectModal, useVisionweb, connectorLocalStorageKey } from 'vision-uikit';

export type ButtonProps = {
  children: React.ReactNode,
  className?: string
}

const ConnectButton: React.FC<ButtonProps> = ({
  children,
  className
}) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { logout, login } = useAuth()
  const [ showOther, setShowOther ] = useState(false)
  const [ address, setAddress ] = useState('')

  const [ onPresent, onDismiss ] = useModal(<ConnectModal login={login} />)
  const { visionWeb } = useVisionweb()

  useEffect(() => {
    if (account) {
      onDismiss()
      setShowOther(false)
      let accountN = account
      if(window?.localStorage?.getItem(connectorLocalStorageKey) === ConnectorNames.Vtimes) {
        accountN = VisionWeb.address.fromEth(account)
      }
      setAddress(accountN.slice(0, 6) + '...' + accountN.slice(-4))
    } else {
      if (window?.localStorage?.getItem(connectorLocalStorageKey) === ConnectorNames.Vtimes && visionWeb) {
        login(ConnectorNames.Vtimes)
      } 
      if (window?.localStorage?.getItem(connectorLocalStorageKey) === ConnectorNames.Injected) {
        setTimeout(() => {
          login(ConnectorNames.Injected)
        }, 500)
        
      }
    }
  }, [account, visionWeb])

  return (
    <div className={`relative z-10 ${className}`}>
      <Button className={`bg-[#F2E3FF] font-bold text-[#761AC5] text-[12px] md:text-[18px] ${className}`}
        onClick={() => {
          if (!account) {
            // 此处判断是否是Vtime App打开，如果是，则直接链接钱包，其他三方钱包打开，和浏览器一样，需要有选择弹窗
            // @ts-ignore
            if (visionWeb && visionWeb.isVtimesApp) {
              login(ConnectorNames.Vtimes)
              return
            }

            onPresent()
            // onPresentConnectModal()

            return
          }
          setShowOther(!showOther)
        }}
      >{account ? address : t('connect wallet')}</Button>
      {
        showOther && <div
          onClick={() => setShowOther(false)}
          className='fixed w-full h-full z-40 left-0 top-0 opacity-0'>1</div>
      }
      {
        showOther && 
        <div 
          style={{boxShadow: '0px 10px 15px rgba(151, 151, 151, 0.08)', zIndex: 9999}}
          className='bg-white rounded-[10px] shadow-[] p-6 absolute top-[45px] right-[0px] left-auto md:right-auto md:left-0 md:top-[70px] w-full z-50 min-w-[176px]'>
            <div className='flex items-center cursor-pointer hover:opacity-80'
              onClick={e => {
                e.stopPropagation()
                logout()
                setShowOther(!showOther)
              }}
            >
              {t('Disconnect')}
            </div>
        </div>
      }
      
    </div>
  )
}

export default ConnectButton

