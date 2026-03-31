import { createContext, useContext, useState } from 'react';

interface ModalCtx {
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ModalContext = createContext<ModalCtx>({
  isContactOpen: false,
  openContact: () => {},
  closeContact: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <ModalContext.Provider value={{ isContactOpen, openContact, closeContact }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
