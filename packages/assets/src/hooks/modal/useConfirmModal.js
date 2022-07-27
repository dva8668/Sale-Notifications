import React, {useState} from 'react';
import {Modal} from '@shopify/polaris';

/**
 * @param confirmAction
 * @param cancelAction
 * @param title
 * @param content
 * @param loading
 * @param destructive
 * @param buttonTitle
 * @param closeTitle
 * @param closeCallback
 * @returns {{openModal: openModal, closeModal: (function(): void), modal: JSX.Element, open: boolean}}
 */
export default function useConfirmModal({
  confirmAction,
  cancelAction,
  title = 'Are you sure to delete?',
  content = 'Please be careful because you cannot undo this action.',
  buttonTitle = 'Confirm',
  closeTitle = 'Cancel',
  loading = false,
  destructive = false,
  closeCallback = () => {}
}) {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const openModal = (id = null) => {
    setOpen(true);
    if (id) setCurrentId(id);
  };

  const closeModal = () => {
    if (!loading) setOpen(false);
  };

  const modal = (
    <Modal
      sectioned
      open={open}
      onClose={() => {
        closeModal();
        closeCallback();
      }}
      title={title}
      primaryAction={{
        content: buttonTitle,
        loading,
        destructive,
        onAction: () => {
          confirmAction(currentId);
        }
      }}
      secondaryActions={[
        {
          content: closeTitle,
          loading,
          onAction: () => {
            if (cancelAction) {
              cancelAction();
              return;
            }
            closeModal();
            closeCallback();
          }
        }
      ]}
    >
      {content}
    </Modal>
  );

  return {modal, open, closeModal, openModal};
}
