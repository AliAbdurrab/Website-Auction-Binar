import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormLabel = styled(Form.Label)`
    font-size: 12px;
`

export const FormControl = styled(Form.Control)`
    background: #FFFFFF;
    border: 1px solid #D0D0D0;
    border-radius: 16px;
    padding: 0.875em 1em;
    width: 100%;
    resize: none;

    font-size: 14px;
`

export const FormSelect = styled(Form.Select)`
    background: #FFFFFF;
    border: 1px solid #D0D0D0;
    border-radius: 16px;
    padding: 0.875em 1em;

    font-size: 14px;
`