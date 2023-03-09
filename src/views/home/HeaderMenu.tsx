import { Button, ConnectButton } from 'components/button'
import React from 'react'

import { useTranslation } from 'contexts/Localization'

const HeaderMenu: React.FC<{
  title?: string
}> = ({
  title = ''
}) => {
  const { t } = useTranslation()

  return (
    <div className='h-[58px] mb-6 md:mb-0 md:h-auto'>
      <div className='min-w-[375px] h-[58px] w-full flex items-center px-[20px] xl:px-[52px] bg-white z-50'>
        <div className='w-full flex items-center justify-end'>
          
          <div className='flex'>
            <ConnectButton className=' ml-1 h-[36px] text-xs '>{t('connect wallet')}</ConnectButton>
          </div>
        </div> 
      </div>
    </div>

  )
}

export default HeaderMenu