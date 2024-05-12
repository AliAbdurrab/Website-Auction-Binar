import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const BtnLogin = styled(Button)`
    background: #47b5ff;
    border-radius: 12px;
    border: 0;
    font-size: 14px;
    padding: 0.875em 1m 0.875em 1em;
    transition: background 0.15s;

    &:hover {
        background: #1363df;
    }
`

export const BtnPrimary = styled(Button)`
    background: #47b5ff;
    border-radius: 12px;
    border: 0;
    font-size: 14px;
    padding: 0.875em 1.5m 0.875em 1.5em;
    transition: background 0.15s;

    &:hover {
        background: #1363df;
    }
`

export const BtnSecondary = styled(Button)`
    background: #E2D4F0;
    color: #3C3C3C;
    border-radius: 12px;
    border: 0;
    font-size: 14px;
    padding: 0.875em 1.5m 0.875em 1.5em;
    transition: background 0.15s, color 0.15s;

    &:hover {
        background: #B1A6BD;
        color: #3C3C3C;
    }
`

export const BtnSubmit = styled(Button)`
    background: #47b5ff;
    border-radius: 12px;
    width: max-content;
    border: 0;
    font-size: 14px;
    padding: 0.875em 1.5m 0.875em 1.5em;
    transition: background 0.15s;

    &:hover {
        background: #1363df;
    }
`