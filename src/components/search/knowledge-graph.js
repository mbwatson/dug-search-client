import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const WIDTH = 800
const HEIGHT = 60

const ScrollableWrapper = styled.span`
    display: block;
    overflow: auto;
    text-align: center;
    padding-bottom: 0.5rem;
    transition: opacity 250ms;
    opacity: 0.75;
    border-top: 1px solid #ccc;
    &:hover {
        opacity: 1.0;
    }
`

const EdgeLinks = styled.text`
    fill: var(--color-grey);
    font-size: 8pt;
`

const EdgeLink = styled.a.attrs({ target: '_blank', rel: 'noopener noreferrer' })`
    transition: fill 250ms;
    &:hover {
        fill: var(--color-crimson);
    }
`

const SVG = styled.svg.attrs({
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    x: '0px',
    y: '0px',
    width: `${ WIDTH }px`,
    height: `${ HEIGHT }px`,
    viewBox: `0 0 ${ WIDTH } ${ HEIGHT }`,
})`
    ${ EdgeLinks } {
        transition: opacity 250ms;
        opacity: 0.5;
    }
    &:hover ${ EdgeLinks } {
        opacity: 1.0;
    }
`

const EdgeLabel = styled.text`
    font-size: 8pt;
    font-style: italic;
    fill: var(--color-grey);
`

const NodeLabel = styled.text`
    font-size: 10pt;
`

export const KnowledgeGraph = ({ graph }) => {
    const [r, setR] = useState(5)
    const { nodes, edges } = graph
    const grow = event => setR(7)
    const shrink = event => setR(5)
    
    const sortedEdges = edges.sort((e, f) => e.source_id === f.target_id)
    const sortedNodes = [sortedEdges[0].source_id, ...sortedEdges.map(edge => edge.target_id)].map(id => nodes.find(node => node.id === id))
    const nodeSpacing = WIDTH / Math.max(nodes.length, edges.length + 1)

    return nodes.length === edges.length + 1 && sortedNodes && sortedEdges && (
        <ScrollableWrapper onMouseOver={ grow } onMouseOut={ shrink }>
            <SVG>
                {
                    sortedEdges.map((edge, i) => (
                        <Fragment key={ i }>
                            <line strokeWidth="0.5" stroke="var(--color-eggplant)"
                                x1={ nodeSpacing / 2 + i * nodeSpacing } y1={ HEIGHT / 2 }
                                x2={  3 * nodeSpacing / 2 + i * nodeSpacing  } y2={ HEIGHT / 2 }
                            />
                            <EdgeLabel x={ (i + 1) * nodeSpacing } y={ 2 * HEIGHT / 5} textAnchor="middle">
                                { edge.relation_label[0] }
                            </EdgeLabel>
                            {
                                edge.publications.length &&
                                    <EdgeLinks x={ (i + 1) * nodeSpacing } y={ 4 * HEIGHT / 5} textAnchor="middle">
                                        PMIDs: {
                                            edge.publications.map((id, i) => (
                                                <Fragment key={ id }>
                                                    <EdgeLink href={ `https://pubmed.ncbi.nlm.nih.gov/${ id.replace(/^PMID:/, '') }` }>{ id.replace(/^PMID:/, '') }</EdgeLink>
                                                    { i < edge.publications.length - 1 && ', ' }
                                                </Fragment>
                                            ))
                                        }
                                    </EdgeLinks>
                            }
                        </Fragment>
                    ))
                }
                {
                    sortedNodes.map((node, i) => (
                        <Fragment key={ i }>
                            <circle cx={ nodeSpacing / 2 + i * nodeSpacing} cy={ HEIGHT / 2 } r={ r } fill="var(--color-crimson)" style={{ transition: 'r 500ms' }} />
                            <NodeLabel x={ nodeSpacing / 2 + i * nodeSpacing } y={ HEIGHT - 5 }>{ node.name }</NodeLabel>
                        </Fragment>
                    ))
                }
            </SVG>
        </ScrollableWrapper>
    )
}
