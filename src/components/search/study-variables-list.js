import React from 'react'
import styled from 'styled-components'

const DB_GAP_URL = `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/variable.cgi`

const dbGapStudyLink = (studyId, variable) => {
    // variable always has the form "phv987654321.v12.p23"
    // and the "987654321" portion is used in the dbGap link
    const matches = variable.match(/phv(\d+)\.v\d+\.p\d+$/)
    if (matches) {
        const [, variableDigits] = matches
        return variableDigits ? `${ DB_GAP_URL }?study_id=${ studyId }&phv=${ variableDigits }` : `${ DB_GAP_URL }?studyId=${ studyId }&phv=${ variable }`
    } else {
        return null
    }
}

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

const List = styled.ul`
    padding: 0 1rem;
`

const ListItem = styled.li``

export const VariablesList = ({ studyId, variables }) => {
    return (
        <Wrapper>
            <strong>Variables</strong>
            <List>
                {
                    variables.map(variable => (
                        <ListItem key={ variable }>
                            <VariableLink to={ dbGapStudyLink(studyId, variable) || null }>{ variable }</VariableLink>
                        </ListItem>
                    ))
                }
            </List>
        </Wrapper>
    )
}
