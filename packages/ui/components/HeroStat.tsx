import { ComponentType } from 'react'

export interface HeroStatProps {
  Icon: ComponentType<{ className?: string }>
  title: string
  value: string | undefined
}

export const HeroStat = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex gap-4 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="items-center">
      <span className="text-lg secondary-text">{title}</span><br></br>

        <span className="text-lg link-text">{value ?? '...'}</span>



    </div>
  </div>
)

export const HeroStatLink = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 secondary-text" />
    <a
      className="text-lg link-text"
      href={value ?? '#'}
      rel="noopener noreferrer"
      target="_blank"
    >
      {title}
    </a>
  </div>
)
