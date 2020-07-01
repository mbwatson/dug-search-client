import React from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'
import { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon, MoreHorizontalIcon } from '../icons'

const Wrapper = styled.nav`
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-bottom: 3rem;
    ${ Button } {
        margin: 0.5rem 0.25rem;
        padding: 0.5rem 0.75rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const Ellipsis = () => {
    return (
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 0.5rem' }}>
            <MoreHorizontalIcon fill="var(--color-crimson)" size={ 24 } />
        </span>
    )
}

const Spacer = styled.div`
    width: 2rem;
    height: 0;
`

export const PaginationTray = ({ currentPage, links, prevPageHandler, nextPageHandler, firstPageHandler, lastPageHandler }) => {
    return (
        <Wrapper role="navigation" aria-label="Pagination Navigation">
            <Button aria-label={ `Go to first page` } light disabled={ firstPageHandler === null } onClick={ firstPageHandler } style={{ padding: 0 }}>
                <FirstPageIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            <Button aria-label={ `Go to previous page` } light disabled={ prevPageHandler === null } onClick={ prevPageHandler } style={{ padding: 0 }}>
                <ChevronLeftIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            { currentPage >= 3 ? <Ellipsis /> : <Spacer /> }
            {
                links.map((link, i) => (
                    Math.abs(currentPage - i) < 3 && <Button
                        key={ `page-${ i }` }
                        aria-label={ i === currentPage ? `Page ${ i + 1 }, Current page` : `Go to page ${ i + 1 }` }
                        aria-current={ i === currentPage }
                        light={ i !== currentPage }
                        onClick={ link }
                    >
                        { i + 1 }
                    </Button>
                ))
            }
            { currentPage < links.length - 3 ? <Ellipsis /> : <Spacer /> }
            <Button aria-label={ `Go to next page` } light disabled={ nextPageHandler === null } onClick={ nextPageHandler } style={{ padding: 0 }}>
                <ChevronRightIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            <Button aria-label={ `Go to last page` } light disabled={ lastPageHandler === null } onClick={ lastPageHandler } style={{ padding: 0 }}>
                <LastPageIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
        </Wrapper>
    )
}
