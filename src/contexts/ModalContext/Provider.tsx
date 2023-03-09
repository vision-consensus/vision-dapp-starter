import React, { createContext, useEffect, useState } from "react";

interface ModalsContext {
  isOpen: boolean;
  nodeId: string;
  modalNode: React.ReactNode;
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  onPresent: (node: React.ReactNode, newNodeId: string) => void;
  onDismiss: () => void;
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: "",
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
});

const ModalProvider: React.FC<any> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>();
  const [nodeId, setNodeId] = useState("");
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);

  const handlePresent = (node: React.ReactNode, newNodeId: string) => {
    setModalNode(node);
    setIsOpen(true);
    setNodeId(newNodeId);
  };

  const handleDismiss = () => {
    setModalNode(undefined);
    setIsOpen(false);
    setNodeId("");
  };

  const handleOverlayDismiss = () => {
    // if (closeOnOverlayClick) {
    //   handleDismiss();
    // }
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <Context.Provider
      value={{
        isOpen,
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      
      {children}
      
      <div className={`fixed top-0 left-0 flex justify-center items-center
        ${isOpen ? 'w-full h-full' : 'w-0 h-0'}
        ${isOpen ? ' opacity-100' : ' opacity-0'}
      `} style={{zIndex: 999, transition: 'opacity ease-in 0.15s'}}>
        <div
          style={{backgroundColor: 'rgba(0,0,0,0.35)'}}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center "
          onClick={handleOverlayDismiss} ></div>
        <div className="relative z-50">
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              // @ts-ignore
              onDismiss: handleDismiss,
            })}
        </div>
        
      </div>
      
    </Context.Provider>
  );
};

export default ModalProvider;