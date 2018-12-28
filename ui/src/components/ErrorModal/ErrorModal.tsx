import * as React from 'react';
import Modal from 'react-modal';
import {Button, ButtonType} from '../Button/Button';

interface IModalProps {
  content: string;
  isOpen: boolean;
  onCloseClick: () => void;
}

Modal.setAppElement('#root');

export const ErrorModal: React.SFC<IModalProps> = ({
  content,
  isOpen,
  onCloseClick
}) => (
  <Modal isOpen={isOpen} className='Modal' overlayClassName='Overlay'>
    <span>{content}</span>
    <Button onClick={onCloseClick} text='Close' type={ButtonType.ERROR} />
  </Modal>
);
