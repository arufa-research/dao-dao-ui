import { SuspenseLoader } from '@dao-dao/common'

import { VoteHeroContent, VoteHeroContentLoader } from './VoteHeroContent'

export const VoteHero = () => (
  <div className="overflow-visible relative planetbg rounded-lg">
    <div
      className="flex absolute inset-0 z-[-1] flex-col justify-center items-center"
      style={{
        background:
          '#111527',
      }}
    ></div>

    <SuspenseLoader fallback={<VoteHeroContentLoader />}>
      <VoteHeroContent />
    </SuspenseLoader>
  </div>
)
