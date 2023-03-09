import React, { useEffect, useState } from "react";
import HeaderMenu from "views/home/HeaderMenu";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { Button } from "components/button";
import { useApprove } from "hooks/useApprove";
import { chainTokens } from "config/tokens";

export const PageIndex = () => {
  const { account }= useActiveWeb3React()
  const { requestedApproval, handleApprove } = useApprove(chainTokens.usdt.address)

  return (
    <div className="h-full w-full flex flex-col bg-auto bg-no-repeat bg-right-bottom"
    >
      <HeaderMenu />
      
      <div>
        <Button 
          onClick={() => {
            handleApprove()
          }}
        >Approve {requestedApproval === 2 ? ' Success ' : ' '}</Button>
      </div>
      <div className="mt-5">
        <Button >Transfer</Button>
      </div>
      
      
    </div>
  )
}

export default PageIndex