import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSearch } from '../../hooks'
import { Subheading, Paragraph } from '../typography'
import { Collapser } from '../collapser'
import { KnowledgeGraphs } from '../search'
import { VariablesList } from './study-variables-list'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-eggplant-light);
    }
`

// Name

const Name = styled(Subheading)`
    padding: 1rem;
    margin: 0;
`

// Details

const Instructions = styled(Paragraph)`
    margin: 1rem;
`


const collapserStyles = {
    titleStyle: {
        backgroundColor: '#eee',
        borderWidth: '1px 0',
        borderStyle: 'solid',
        borderColor: 'var(--color-lightgrey)',
    },
    bodyStyle: {
        backgroundColor: '#ddd',
    },
}

const CollapserHeader = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 920px) {
        flex-direction: row;
    }
    justify-content: space-between;
    padding: 0.5rem 1rem;
`

const StudyName = styled.div``
const StudyAccession = styled.div``

export const Result = ({ result, query }) => {
    const { name, instructions, tag_id } = result // other properties: description, identifiers, optional_targets, search_targets, pk, studies
    const [knowledgeGraphs, setKnowledgeGraphs] = useState()
    const { fetchKnowledgeGraphs } = useSearch()

    const handleExpandKnowledgeGraphs = () => {
        const getKgs = async () => {
            const kgs = await fetchKnowledgeGraphs(tag_id, query)
            console.log(kgs)
            setKnowledgeGraphs(kgs)
        }
        if (!knowledgeGraphs) { getKgs() }
    }

    const handleCollapseKnowledgeGraphs = () => { console.log('closing kgs...') }

    return (
        <Wrapper>
            <Name>Harmonized Variable: { name }</Name>
            <Instructions>
                <strong>Instructions</strong>: { instructions }
            </Instructions>
            {
                result.studies.map(({ study_id, study_name, variables }) => (
                    <Collapser key={ `${ name } ${ study_id }` } ariaId={ 'studies' } { ...collapserStyles }
                        title={
                            <CollapserHeader>
                                <StudyName><strong>Study</strong>: { study_name }</StudyName>
                                <StudyAccession><strong>Accession</strong>: { study_id.replace(/^TOPMED\.STUDY:/, '') }</StudyAccession>
                            </CollapserHeader>
                        }
                    >
                        <VariablesList studyId={ study_id.replace(/^TOPMED\.STUDY:/, '') } variables={ variables } />
                    </Collapser>
                ))
            }
            <Collapser key={ `${ name } kg` } ariaId={ `${ name } kg` } { ...collapserStyles }
                title={ <CollapserHeader>Knowledge Graph</CollapserHeader> }
                openHandler={ handleExpandKnowledgeGraphs }
                closeHandler={ handleCollapseKnowledgeGraphs }
            >
                { knowledgeGraphs ? <KnowledgeGraphs graphs={ knowledgeGraphs } /> : 'Fetching Knowlege Graphs...' }
            </Collapser>
        </Wrapper>
    )
}

Result.propTypes = {
    result: PropTypes.shape({
        name:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        identifiers:PropTypes.array.isRequired,
        instructions:PropTypes.string.isRequired,
        knowledge_graph:PropTypes.object.isRequired,
        optional_targets:PropTypes.array.isRequired,
        search_targets:PropTypes.array.isRequired,
        pk:PropTypes.number.isRequired,
        studies:PropTypes.array.isRequired,
        tag_id:PropTypes.string.isRequired,
    })
}
