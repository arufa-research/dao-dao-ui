import { ComponentType } from 'react'
import { Dispatch, SetStateAction } from 'react';
import Dropdown from "../../../apps/seasy-sda/components/stake/Dropdown";
import { useState } from "react";
export interface HeroStatProps {
  Icon: ComponentType<{ className?: string }>
  title: string
  value: string | undefined

  
}
export interface HeroStatDropdownProps {
  Icon: ComponentType<{ className?: string }>
  title: string
  duration: string | undefined
  setDuration: Dispatch<SetStateAction<string>>
  apr: string | undefined
  setApr: Dispatch<SetStateAction<string>>


  
}

export const HeroStat = ({ Icon, title, value }: HeroStatProps) =>{ 
  
  
  return (
 

   
  <div className="flex gap-4 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="items-center">
      <span className="text-base secondary-text">{title}</span><br></br>
    
        <span className="text-lg link-text">{value ?? '...'}</span>
      
      
      
    </div>
    
   

  </div>
)}

export const HeroStatDropdown = ({ Icon, title, duration,setDuration,apr,setApr }: HeroStatDropdownProps) =>{ 
  
  
  return (
 

   
  <div className="flex gap-4 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="items-center">
      <span className="text-base secondary-text">{title}</span><br></br>
      <Dropdown selected={duration}  apr={apr} setApr={setApr} setSelected={setDuration} />
   
    </div>
    
   

  </div>
)}

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
