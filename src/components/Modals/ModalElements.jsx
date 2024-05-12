import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export const ModalModifier = styled(Modal)`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
`

export const ModalHeader = styled(Modal.Header)`
    border-bottom: 0px;
`

export const ModalFooter = styled(Modal.Footer)`
    border-top: 0px;
`

export const ModalTextBold = styled.div`
    font-weight: 500;
`

export const ModalTextLight = styled.div`
    color: #8A8A8A;
`

export const ModalText = styled.div`
    font-weight: 400;
`

export const ModalFoto = styled.div`
    background: #D0D0D0;
    border: 5px solid #D0D0D0;
    border-radius: 16px;

    height: 5em;
    width: 5em;
`

