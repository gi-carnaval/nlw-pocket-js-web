import { createContext, useState } from 'react'

interface DialogContextType {
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialogContext = createContext<DialogContextType>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
})

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <DialogContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>
      {children}
    </DialogContext.Provider>
  )
}
