import styled from 'styled-components'

export const Button = styled.button`
    background-color: ${ props => props.light ? '#fff' : 'var(--color-crimson)' };
    display: inline-block;
    border: ${ props => props.light ? '2px solid var(--color-crimson)' : '0' };
    color: ${ props => props.light ? 'var(--color-crimson) !important' : '#fff' };
    padding: 1rem 1.5rem;
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    cursor: pointer;
    ${ props => props.fullWidth ? `width: 100%;` : undefined }
    position: relative;
    transition: filter 250ms;
    filter: brightness(1.0) opacity(1.0);
    &:hover, &:focus {
        filter: brightness(1.2);
    }
    &:disabled {
        cursor: default;
        filter: brightness(1.0) opacity(0.33);
    }
`
