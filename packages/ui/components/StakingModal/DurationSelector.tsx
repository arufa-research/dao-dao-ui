import clsx from 'clsx'

import { Button } from '../Button'

export interface DurationSelectorProps {
  max: number
  amount: number
  tokenDecimals: number
  setAmount: (newAmount: number) => void
}

export const DurationSelector = (props: DurationSelectorProps) => (
  <div className="grid grid-cols-5 gap-1">
    <DurationButton label="7 days" duration={7} {...props} />
    <DurationButton label="14 days" duration={14} {...props} />
    <DurationButton label="28 days" duration={28} {...props} />
    <DurationButton label="56 days" duration={56} {...props} />
  </div>
)

export interface DurationButtonProps {
  label: string
  max: number
  duration: number
  amount: number
  setAmount: (newAmount: number) => void
  tokenDecimals: number
  className?: string
  absoluteOffset?: number
}

export const DurationButton = ({
  label,
  max,
  duration,
  amount,
  setAmount,
  tokenDecimals,
  className,
  absoluteOffset,
}: DurationButtonProps) => (
  <Button
    active={
      (max * duration + (absoluteOffset ?? 0)).toFixed(tokenDecimals) ===
      amount.toFixed(tokenDecimals)
    }
    className={clsx('flex flex-row justify-center w-full', className)}
    onClick={() =>
      setAmount(
        Math.min(
          Math.max(
            Number(
              (max * duration + (absoluteOffset ?? 0)).toFixed(tokenDecimals)
            ),
            1 / Math.pow(10, tokenDecimals)
          ),
          max
        )
      )
    }
    variant="secondary"
  >
    {label}
  </Button>
)
