
import React, { useCallback, useContext, useEffect } from "react";
// @ts-ignore
import get from "lodash/get";
import { Context } from '../contexts/ModalContext'


const useModal = (
  modal: React.ReactNode,
  closeOnOverlayClick = true,
  updateOnPropsChange = false,
  modalId = "defaultNodeId"
) => {
  const { isOpen, nodeId, modalNode, setModalNode, onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context);
  const onPresentCallback = useCallback(() => {
    onPresent(modal, modalId);
  }, [modal, modalId, onPresent]);

  useEffect(() => {
    if (updateOnPropsChange && isOpen && nodeId === modalId) {
      const modalProps = get(modal, "props");
      const oldModalProps = get(modalNode, "props");
      if (modalProps && oldModalProps && JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)) {
        setModalNode(modal);
      }
    }
  }, [updateOnPropsChange, nodeId, modalId, isOpen, modal, modalNode, setModalNode]);

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick);
  }, [closeOnOverlayClick, setCloseOnOverlayClick]);

  return [onPresentCallback, onDismiss];
};

export default useModal;