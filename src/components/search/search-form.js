import React from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
`

export const SearchButton = styled(Button)`
    border: 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: var(--color-crimson);
    color: #eee;
`

export const SearchInput = styled.input`
    background-color: #ddd;
    height: 3rem;
    border-width: 1px;
    border-color: var(--color-crimson);
    border-right: 0;
    overflow: hidden;
    padding: 1rem;
    line-height: 1.5rem;
    letter-spacing: 1px;
    color: #777;
    &::placeholder {
        text-transform: uppercase;
    }
    border-color: var(--color-lightgrey);
    transition: border-color 250ms;
    &:focus {
        border-color: var(--color-crimson);
    }
    flex: 1;
    font-weight: bold;
`

export const SearchForm = ({ value = '', placeholder, changeHandler, keyDownHandler, submitHandler }) => {
    return (
        <Wrapper>
            <SearchInput value={ value } placeholder={ placeholder } onChange={ changeHandler } onKeyDown={ keyDownHandler } />
            <SearchButton onClick={ submitHandler }>SEARCH</SearchButton>
        </Wrapper>
    )
}