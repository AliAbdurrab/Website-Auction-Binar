import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const CardModified = styled(Card)`
    margin: 8px 20px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: 0;
    width: 10em;
`

export const CardTitle = styled(Card.Title)`
    font-size: 0.75em;
    line-height: 1.25em;
`

export const CardCategories = styled(Card.Subtitle)`
    margin: 4px 0 8px 0;
    font-size: 0.625em;
    line-height: 0.75em;
    color: #8A8A8A;
`

export const CardPrices = styled(Card.Text)`
    font-size: 0.75em;
    line-height: 1.25em;
`

export const CardModal = styled(Card)`
    border: 0;
`

export const CardModalHeader = styled(Card.Header)`
    background: none;
    border-bottom: 0;
`