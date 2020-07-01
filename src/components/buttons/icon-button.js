import styled from 'styled-components'

export const IconButton = styled.button(({ disabled }) => `
    background-color: transparent;
    border: 0;
    padding: 0.5rem;
    cursor: pointer;
    cursor: ${ disabled ? 'default' : 'pointer' };;
    opacity: ${ disabled ? '0.5' : '1.0' };
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 250ms;
    ${
        !disabled ? `
            &:hover, &:focus {
                filter: brightness(0.75);
            }
        ` : undefined
    }
    &:active {
        filter: brightness(0.5);
    }
`)
