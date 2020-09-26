import React from 'react'
import styled from 'styled-components'
import { dbGapLink } from '../../utils'
import { List } from '../list'

const Wrapper = styled.div`
    flex-direction: column;
    max-height: 12rem;
    margin: 0.5rem 0;
    overflow-y: auto;
    padding: 1rem;
`

const VariableLink = styled.a.attrs(props => ({ target: '_blank', rel: 'noopener noreferrer', href: props.to }))`
    display: block;
    padding: 0.5rem 0;
`

export const VariablesList = ({ studyId, variables }) => {
    return (
        <Wrapper>
            <strong>Variables</strong>
            <List items={ variables.map(variable => <VariableLink key={ variable } to={ dbGapLink.variable(studyId, variable) || null }>{ variable }</VariableLink>) } />
        </Wrapper>
    )
}
