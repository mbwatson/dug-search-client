import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useWindowWidth } from '../../hooks'
import { Heading, Paragraph } from '../typography'
import { Collapser } from '../collapser'
import { KnowledgeGraph } from '../search'

const DB_GAP_URL = `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/variable.cgi`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-eggplant-light);
    }
`

// Name

const Name = styled(Heading)`
    padding: 0;
    margin: 0 0 0 1rem;
`
// Details

const Description = styled(Paragraph)`
    margin: 1rem 0 1rem 1rem;
`


const Detail = styled.span`
`

// Meta details

const Meta = styled.div(({ center, compact }) => `
    background-color: #eee;
    padding: 0.5rem;
    font-size: 90%;
    display: flex;
    flex-direction: ${ compact ? 'column' : 'row' };
    justify-content: ${ compact ? 'flex-start' : center ? 'center' : 'space-between' };
    align-items: ${ compact ? 'flex-start' : 'center' };
    ${ Detail } {
        flex: 1;
        padding: 0 0.25rem;
    }
    & svg {
        margin: 0 auto;
    }
`)

const dbGapLink = (variable, study) => {
    // variable always has the form "phv987654321.v12.p23"
    // and the "987654321" portion is used in the dbGap link
    const matches = variable.match(/^phv(\d+)\.v\d+\.p\d+$/)
    if (matches) {
        const [, variableDigits] = variable.match(/^phv(\d+)\.v\d+\.p\d+$/)
        return variableDigits ? `${ DB_GAP_URL }?study_id=${ study }&phv=${ variableDigits }` : `${ DB_GAP_URL }?study_id=${ study }&phv=${ variable }`
    } else {
        return null
    }
}

export const Result = ({ index, name, variable, study, studyId, description, instructions, graph }) => {
    const { isCompact } = useWindowWidth()

    return (
        <Wrapper compact={ isCompact }>
            <Name><strong>{ index }.</strong> { name }</Name>
            <Description>
                { description }
            </Description>
            <Collapser
                titleStyle={{ backgroundColor: '#eee' }}
                bodyStyle={{ backgroundColor: '#eee', padding: '0 1rem' }}
                title={
                    <Meta compact={ isCompact }>
                        <Detail><strong>Variable:</strong> <a href={ dbGapLink(variable, study) || null } target="_blank" rel="noopener noreferrer">{ variable }</a></Detail>
                        <Detail><strong>Study:</strong> { study }</Detail>
                    </Meta>
                }
                ariaId={ `${ index }-${ name }` }
            >
                <Paragraph>
                    <strong>Instructions:</strong> { instructions }
                </Paragraph>

                { graph && <KnowledgeGraph graph={ graph } /> }

            </Collapser>

        </Wrapper>
    )
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    studyId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    graph: PropTypes.object.isRequired,
}
