import { ComponentType } from 'react'

export interface ProposalInfoStatProps {
  Icon: ComponentType<{ className: string }>
  title: string
  value?: string
}

export const ProposalInfoStat = ({
  Icon,
  value,
  title,
}: ProposalInfoStatProps) => (
  <div className="flex gap-4 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="items-center">
      <span className="text-base secondary-text">{title}</span><br></br>
      <span className="text-lg link-text">{value ?? '...'}</span>
    </div>
    
  </div>
)
