import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'
import {
  Cw20StakedBalanceVotingSelectors,
  CwRewardsSelectors,
  StakeCw20Selectors,
  useVotingModule,
  Cw20BaseSelectors,

  StakeeasyStakeSelectors
} from '@dao-dao/state'
import { useWallet } from '@noahsaso/cosmodal'

import { DAO_ADDRESS, REWARDS_ADDRESS } from '@/util'
import { useApr } from '@/hooks'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import Dropdown from "./Dropdown";
import { useState } from "react";

export const StakeHeader = () => {
  const [selected, setSelected] = useState("7 Days");
  const [selectedApr, setSelectedApr] = useState("100");
  // const { connected, address: walletAddress } = useWallet();
  const { address } = useWallet()

  const [apr7,setApr7]=useState(0);
  const [apr14,setApr14]=useState(0);
  const [apr28,setApr28]=useState(0);
  const [apr56,setApr56]=useState(0);
  const aprArray=[];
  
  const tokenContractAddress = useRecoilValue(
    StakeeasyStakeSelectors.tokenContractSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    }))

    const bondingInfo=useRecoilValue(
    StakeeasyStakeSelectors.bondingInfoSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    }))

    

    

    const undistributedRewards=useRecoilValue(
    StakeeasyStakeSelectors.distributedRewardsSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    }))
    

   
    // for(let i=0;i<4;i++){
    //    const obj=bondingInfo[i];
    //    if(obj){
    //     aprArray.push((Number(obj.reward_multiplier)*Number(undistributedRewards.distributed)*365)/Number(obj.total_staked));
    //    }
      
    // }
    
    console.log("aprs",aprArray);
    
    

    console.log("bd",bondingInfo);
    console.log("dr",undistributedRewards);

    const totalValueStaked = useRecoilValue(
    StakeeasyStakeSelectors.totalStakedSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    })

    
  )
  
  const totalUnbonding = useRecoilValue(
    StakeeasyStakeSelectors.totalUnbondingSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    }))
console.log(tokenContractAddress);
console.log(totalValueStaked);
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo, useStakingInfo },
  } = useVotingModuleAdapter()

  const {
    governanceTokenInfo,
    treasuryBalance: treasuryBalance,
    price: governanceTokenPrice,
  } = useGovernanceTokenInfo?.({
    fetchTreasuryBalance: true,
    fetchUSDCPrice: true,
  }) ?? {}

  const { totalStakedValue } =
    useStakingInfo?.({
      fetchTotalStakedValue: true,
    }) ?? {}

  const apr = useApr()

  if (
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    treasuryBalance === undefined ||
    apr === undefined
  ) {
    return <StakeHeaderLoader />
  }

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="w-24 h-24 bg-light rounded-full border border-default">
          <Logo className="w-full h-full" />
        </div>
      </div>

      <p className="p-5 mt-12 w-full font-studiofeixen text-2xl  text-center border-t border-inactive">
        1 {governanceTokenInfo.symbol} =
        {governanceTokenPrice
          ? ' $' +
            governanceTokenPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) +
            ' USDC'
          : // eslint-disable-next-line i18next/no-literal-string
            ' $ ??'}
      </p>

      <div className="flex flex-row justify-around items-center p-5 w-full text-center border-t border-inactive md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.daoTreasury')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              treasuryBalance,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.totalStaked')}
          </p>

          <p className="text-base lg:text-xl header-text">
            {convertMicroDenomToDenomWithDecimals(
              totalValueStaked.total_staked,
              governanceTokenInfo.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.aprReward')}
            
          </p>
          <Dropdown selected={selected}  apr={selectedApr} setApr={setSelectedApr} setSelected={setSelected} />

          <p className="text-base lg:text-xl header-text">
            +
            {(Number(selectedApr) * 100).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              // eslint-disable-next-line i18next/no-literal-string
            })}
            %
          </p>
        </div>
      </div>
    </>
  )
}

export const StakeHeaderLoader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="absolute top-[0.1rem] w-full h-[1px] bg-primary"></div>
      <div className="absolute top-[0.4rem] w-full h-[1px] bg-primary"></div>

      <div className="flex absolute -top-16 justify-center items-center w-full border-b border-inactive">
        <div className="w-24 h-24 bg-light rounded-full border border-default">
          <Loader size="100%" />
        </div>
      </div>

      <div className="mt-12 w-full h-[4.5rem] border-t border-inactive"></div>

      <div className="flex flex-row justify-around items-center p-5 w-full text-center border-t border-inactive md:gap-12 md:justify-center">
        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.daoTreasury')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.totalStaked')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>

        <div className="w-[1px] h-6 bg-dark opacity-10"></div>

        <div className="flex flex-col gap-2 items-center p-2">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.aprReward')}
          </p>

          <div className="h-6 lg:h-7"></div>
        </div>
      </div>
    </>
  )
}
