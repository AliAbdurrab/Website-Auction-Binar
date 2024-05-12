import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

export const ToastModifier = styled(Toast)`
    border: 0;
    border-radius: 0.75em;
`

export const ToastHeader = styled(Toast.Header)`
    border: 0;
    border-radius: 0.75em 0.75em 0 ;

`

export const ToastTextBold = styled.div`
    font-weight: 600;
`

export const ToastTextSmall = styled.div`
    font-size: 11px;
    color: #8A8A8A;
`