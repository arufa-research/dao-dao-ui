import { useWalletManager } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'
import {
  Cw20StakedBalanceVotingSelectors,
  CwRewardsSelectors,
  StakeCw20Selectors,
  useVotingModule,
  Cw20BaseSelectors,

  StakeeasyStakeSelectors
} from '@dao-dao/state'
import { useState } from "react";
import { constSelector, useRecoilValue } from 'recoil'
import { useWallet } from '@noahsaso/cosmodal'
import { Trans } from '@dao-dao/common'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Button } from '../Button'
import { Loader } from '../Loader'
import { Logo } from '../Logo'

interface CardProps {
  setShowStakingMode: () => void
}

export const UnstakedBalanceCard = ({ setShowStakingMode }: CardProps) => {
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const { connected } = useWalletManager()
  const {
    governanceTokenInfo,
    walletBalance: _unstakedBalance,
    price,
  } = useGovernanceTokenInfo?.({
    fetchWalletBalance: true,
    fetchUSDCPrice: true,
  }) ?? {}

  if (!governanceTokenInfo || (connected && _unstakedBalance === undefined)) {
    return <BalanceCardLoader />
  }
  const tokenContractAddress = useRecoilValue(
    StakeeasyStakeSelectors.tokenContractSelector({
      contractAddress:"juno1m6qyz7z2srqzzt5243kxay9wvt4gjsgy3ndpkql0tk86pw6r5cnsha5fax",
      params:[]
    }))

    const [bal, setBal] = useState("7 Days");

   const balanceInfo=useRecoilValue(
     Cw20BaseSelectors.balanceSelector({
      contractAddress:tokenContractAddress,
      params:[{address:address}]
    }))

    setBal(balanceInfo.balance);


  const unstakedBalance = convertMicroDenomToDenomWithDecimals(
    _unstakedBalance ?? 0,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row gap-2 items-center mb-4">
        <Logo size={20} />
        <p className="text-base">
         {bal}{' '}
          {governanceTokenInfo.name}
        </p>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center">
        {price && (
          <p className="text-lg font-medium">
            ${' '}
            {(unstakedBalance * price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            USD
          </p>
        )}

        <Button
          className="text-base bg-[#f2545b]"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"

        >
          {t('button.manage')}
        </Button>
      </div>
    </>
  )
}

export const StakedBalanceCard = ({ setShowStakingMode }: CardProps) => {
  const { t } = useTranslation()
  const {
    hooks: { useGovernanceTokenInfo, useStakingInfo },
  } = useVotingModuleAdapter()
  const { connected } = useWalletManager()
  const { governanceTokenInfo, price } =
    useGovernanceTokenInfo?.({
      fetchUSDCPrice: true,
    }) ?? {}
  const { totalStakedValue, walletStakedValue } =
    useStakingInfo?.({
      fetchTotalStakedValue: true,
      fetchWalletStakedValue: true,
    }) ?? {}

  if (
    !governanceTokenInfo ||
    totalStakedValue === undefined ||
    (connected && walletStakedValue === undefined)
  ) {
    return <BalanceCardLoader />
  }

  const stakedValue = convertMicroDenomToDenomWithDecimals(
    walletStakedValue ?? 0,
    governanceTokenInfo.decimals
  )

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Logo size={20} />
          <p className="text-base">
            {stakedValue.toLocaleString(undefined, {
              maximumFractionDigits: governanceTokenInfo.decimals,
            })}{' '}
            {governanceTokenInfo.name}
          </p>
        </div>

        <p className="text-base text-secondary">
          <Trans Loader={Loader} i18nKey="info.percentOfAllVotingPower">
            {{
              percent: formatPercentOf100(
                totalStakedValue === 0
                  ? 0
                  : ((walletStakedValue ?? 0) / totalStakedValue) * 100
              ),
            }}{' '}
            <span className="text-xs text-tertiary">of all voting power</span>
          </Trans>
        </p>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center">
        {price && (
          <p className="text-lg font-medium">
            ${' '}
            {(stakedValue * price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            USD
          </p>
        )}

        <Button
          className="text-base"
          disabled={!connected}
          onClick={setShowStakingMode}
          variant="secondary"
        >
          {t('button.manage')}
        </Button>
      </div>
    </>
  )
}

export const BalanceCardLoader = () => (
  <div className="h-[5.25rem]">
    <Loader />
  </div>
)
