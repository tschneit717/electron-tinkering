import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import cn from 'classnames'
import { ReactComponent as Sun } from './../../../assets/icons/sun.svg'
import { ReactComponent as Moon } from './../../../assets/icons/moon.svg'
import { Button } from "renderer/components/Button";
import { BUTTON_ELEMENT_TYPES, BUTTON_TYPES } from "shared/types";

interface ViewContextType {
  isDark: boolean
  toggleIsDark: Dispatch<SetStateAction<boolean>> | (() => void)
}

export const ViewContext = createContext<ViewContextType>({
  isDark: false,
  toggleIsDark: () => void 0
})

export const ViewContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isDark, toggleIsDark] = useState(false)
  
  const handleDarkModeToggle = () => {
    toggleIsDark(!isDark)
  }

  const values = {
    isDark,
    toggleIsDark
  }
  return (
    <ViewContext.Provider value={values}>
      <div className={cn('h-screen', isDark ? 'is-dark' : '' )}>
        {children}
      </div>
      <div className='fixed bottom-4 right-4 w-16'>
        <Button status={isDark ? BUTTON_TYPES.DARK : BUTTON_TYPES.STANDARD} as={BUTTON_ELEMENT_TYPES.BUTTON} callback={handleDarkModeToggle}>
          {isDark ? <Sun className='w-6 h-6 fill-white'/> : <Moon className='w-6 h-6 fill-black'/>}
        </Button>
      </div>
    </ViewContext.Provider>
  )
}                                           
