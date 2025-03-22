
import * as React from "react"

type SidebarMobileContextType = {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMobileContext = React.createContext<SidebarMobileContextType | undefined>(undefined);

export const SidebarMobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  return (
    <SidebarMobileContext.Provider value={{ isMobile, isOpen, setIsOpen }}>
      {children}
    </SidebarMobileContext.Provider>
  );
};

export const useSidebarMobile = () => {
  const context = React.useContext(SidebarMobileContext);
  if (context === undefined) {
    throw new Error("useSidebarMobile must be used within a SidebarMobileProvider");
  }
  return context;
};
