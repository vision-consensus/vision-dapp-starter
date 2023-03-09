import React, { useState, useTransition } from "react";
import { useTranslation } from "contexts/Localization";
import useActiveWeb3React from "hooks/useActiveWeb3React";

const Home: React.FC = () => {
  const [action, setAction] = useState('')
  const [title, setTitle] = useState('')
  const { t, setLanguage } = useTranslation()
  const { account } = useActiveWeb3React()
  const handleLogin = () => {
    // onPresent()
  }
  const handleLogin2 = () => {
    // onPresent2()
  }
  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleLogin()
          }}
        >PenadingAction</button>
      </div>
      <div>
        <button
          onClick={() => {
            handleLogin2()
          }}
        >Supply</button>
      </div>
      
      <button
        onClick={() => handleLogin2()}
      >Connect</button>
      <div></div>
      <button onClick={() => {
        setLanguage({ locale: 'zh-CN', language: '简体中文', code: 'zh-cn' })
      }}>中文</button>
      <div>{t('Home')}</div>
    </div>
  )
}

export default Home