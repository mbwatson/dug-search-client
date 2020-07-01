import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useWindowWidth } from '../../hooks'
import { Heading, Paragraph } from '../typography'
import { Collapser } from '../collapser'
import { KnowledgeGraph } from '../search'

const DB_GAP_URL = `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/variable.cgi`

const sampleResult = {
    'name': 'myocardial infarction (disease)',
    'id': 'MONDO:0005068',
    'var': 'phv00175077.v1.p3',
    'tag': '26',
    'description': 'Qualitative indicator of myocardial infarction (MI) status',
    'instructions': "Include variables that represent whether or when a subject has experienced MI. Include variables that represent prevalent and/or incident MI status. Include variables that represent MI event data, including event status and time-to-event variables. Include variables that indicate age at MI events, e.g. self-reported age at an MI event or followup time to an MI event. Include variables indicating MI status based on any method of determination, including self report, adjudication, clinical verification, medical records, ICD codes, or calculation/inference from related traits. Include variables indicating 'silent MI' status (MI status determined by EKG only). Include all instances of duplicated variables, e.g. MI events variables included in multiple datasets. Do not include variables that indicate possible MI treatments, e.g. coronary artery bypass surgery (CABG) or angioplasty. Do not include variables that indicate medication use related to MI, e.g. beta blocker, statin, or aspirin use.",
    'study': 'phs000209.v13.p3',
    'study_name': 'Multi-Ethnic Study of Atherosclerosis (MESA)',
    'knowledge_graph': { // instances
        'knowledge_graph': {
            'nodes': [{
                'id': 'MONDO:0005068',
                'name': 'myocardial infarction (disease)',
                'synonyms': ['MI', 'heart attack', 'infarction (MI), myocardial', 'MI, myocardial infarction', 'myocardial infarct', 'myocardial infarction', 'myocardial infarction, (MI)', 'Heart attack']
            }, {
                'id': 'MONDO:0005267',
                'name': 'heart disease',
                'synonyms': ['cardiac disease', 'disease of heart', 'disease or disorder of heart', 'disorder of heart', 'heart disease', 'heart disease or disorder', 'heart disorder', 'heart trouble']
            }, {
                'id': 'UBERON:0015410',
                'name': 'heart plus pericardium',
                'synonyms': ['heart/pericardium']
            }],
            'edges': [{
                'ctime': [1592295504.2402782],
                'edge_source': ['uberongraph.term_get_ancestors'],
                'id': '48cf090fa57899838eaa0972bfed119a',
                'predicate_id': 'rdfs:subClassOf',
                'publications': [], // these numbers are pubmed ids and we can construct a url from that, e.g. PMID:82216799
                'relation': ['rdfs:subClassOf'],
                'relation_label': ['subclass of'],
                'source_database': ['uberongraph'],
                'source_id': 'MONDO:0005068',
                'target_id': 'MONDO:0005267',
                'type': ['subclass_of'],
                'weight': 1,
                'reasoner': ['robokop']
            }, {
                'ctime': [1592157563.1783526, 1592174719.198391],
                'edge_source': ['uberongraph.get_anatomy_by_disease', 'uberongraph.get_disease_by_anatomy_graph'],
                'id': '204ae7517807dae05974dbcccc0a15da',
                'predicate_id': 'owl:ObjectProperty',
                'publications': [],
                'relation': ['RO:0004026', 'RO:0004026'],
                'relation_label': ['disease has location', 'disease has location'],
                'source_database': ['uberongraph', 'uberongraph'],
                'source_id': 'MONDO:0005267',
                'target_id': 'UBERON:0015410',
                'type': ['related_to'],
                'weight': 1,
                'reasoner': ['robokop']
            }]
        },
        'knowledge_map': [{
            'node_bindings': {
                'd1': ['MONDO:0005068'],
                'd2': ['MONDO:0005267'],
                'anatomical_entity': ['UBERON:0015410']
            },
            'edge_bindings': {
                'e1_d1_d2': ['48cf090fa57899838eaa0972bfed119a'],
                'e2_d2_anatomical_entity': ['204ae7517807dae05974dbcccc0a15da']
            }
        }],
        'question_graph': { // concepts
            'edges': [{
                'id': 'e1_d1_d2',
                'source_id': 'd1',
                'target_id': 'd2',
                'type': 'subclass_of'
            }, {
                'id': 'e2_d2_anatomical_entity',
                'source_id': 'd2',
                'target_id': 'anatomical_entity'
            }],
            'nodes': [{
                'id': 'd1',
                'type': 'disease',
                'curie': 'MONDO:0005068'
            }, {
                'id': 'd2',
                'type': 'disease'
            }, {
                'id': 'anatomical_entity',
                'type': 'anatomical_entity'
            }]
        }
    }
}

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

const Meta = styled.div`
    background-color: #eee;
    padding: 0.5rem;
    font-size: 90%;
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: ${ props => props.compact ? 'flex-start' : 'space-between' };
    align-items: ${ props => props.compact ? 'flex-start' : 'center' };
    ${ Detail } {
        flex: 1;
        padding: 0 0.25rem;
    }
`

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

export const Result = ({ index, name, variable, study, studyId, description, instructions }) => {
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
                <KnowledgeGraph graph={ sampleResult.knowledge_graph.knowledge_graph } />
            </Collapser>

        </Wrapper>
    )
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
}

// New shape of results
// "hits": {
//   "hits": [
//     {
//       "_type": "_doc",
//       "_id": "GO:0030431",
//       "_source": {
//         "study_name": "Cardiovascular Health Study (CHS)",
//         "description": "Quantitative measure of Apnea-Hypopnea Index (AHI), a measure of sleep apnea severity",
//         "instructions": "Include variables that represent an AHI measurement. Include variables from all time points and all repeated measures within each time point, e.g. AHI measured at multiple exams. Include all instances of duplicated variables, e.g. AHI variables included in multiple datasets. Include variables in all measurement units available, e.g. AHI in events per hour or in events per day. Include both corrected/adjusted and uncorrected/unadjusted measures. Include variables that represent subtypes of AHI, e.g. obstructive apnea hypopnea index (OAHI), obstructive apnea index (OAI), central apnea index (CAI), etc. Do not include component variables, e.g. variables representing the total number of hypopneas or apneas during sleep. If the respiratory disturbance index (RDI) was defined in the same way as AHI, then you may include RDI variables. Do not include RDI variables if they include respiratory effort related arousals (RERAs).",
//         "id": "GO:0030431",
//         "name": "sleep",
//         "study": "phs000287.v6.p1",
//         "tag": "68",
//         "var": "phv00197745.v1.p1"
//       }
//     },
//   ]
// }