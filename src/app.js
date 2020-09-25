import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Main } from './components/main'
import { Title, Heading, Paragraph } from './components/typography'
import {
    PaginationTray, Result, SearchForm, ResultsCount,
    ResultsCard, ResultsCardHeader, ResultsCardBody, ResultsCardFooter, ResultsCardTitle
} from './components/search'
import { LoadingDots } from './components/loading-dots'
import { Alert } from './components/alert'
import { useLocalStorage, useSearch } from './hooks'
import { IconButton } from './components/buttons'
import { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon } from './components/icons'
import { useTray, Tray } from './components/tray'
import { List } from './components/list'
import asciiLogo from './logo'

const HISTORY_LENGTH = 10

const App = () => {
    const [query, setQuery] = useState('')
    const [resultIndex, setResultIndex] = useState(0)
    const [searchedQuery, setSearchedQuery] = useState('')
    const [searchHistory, setSearchHistory] = useLocalStorage('dug-search-history', [])
    const { isLoadingResults, error, results, totalItems, fetchResults } = useSearch()
    const [firstRender, setFirstRender] = useState(true)
    const { closeTray, toggleTray } = useTray()

    useEffect(() => console.log(asciiLogo), [])

    useEffect(() => setFirstRender(false), [])

    useEffect(() => {
        // do not pull query off history for first render
        // so that form starts blank and results are empty
        if (!firstRender) {
            // use first item in history array for search query
            fetchResults(searchHistory[0])
            setQuery(searchHistory[0])
            setSearchedQuery(searchHistory[0])
            closeTray()
            setResultIndex(0)
        }
    }, [searchHistory])

    const doSearch = q => {
        // we trigger a new search by adding query to the front of the history array
        if (q) {
            setSearchHistory(searchHistory => [q, ...searchHistory].slice(0, HISTORY_LENGTH))
        }
    }

    const doSearchFromHistory = q => {
        closeTray()
        doSearch(q)
    }

    const handleChangeQuery = event => setQuery(event.target.value)
    const handleSubmit = event => doSearch(query)
    const handleKeyDown = event => { if (event.keyCode === 13) doSearch(query) }

    const goToResult = newIndex => () => setResultIndex(newIndex)
    const goToFirstResult = event => { setResultIndex(0) }
    const goToPreviousResult = event => { setResultIndex(resultIndex => resultIndex - 1) }
    const goToNextResult = event => { setResultIndex(resultIndex => resultIndex + 1) }
    const goToLastResult = event => { setResultIndex(totalItems - 1) }

    return (
        <Main>
            <Title center>Search</Title>

            <br/><br/>
 
            <section>
                <SearchForm
                    value={ query }
                    placeholder="Enter query"
                    changeHandler={ handleChangeQuery }
                    submitHandler={ handleSubmit }
                    keyDownHandler={ handleKeyDown }
                />
                
                <br/><br/>

                {
                    searchedQuery && (
                        <Fragment>
                            { totalItems > 1 && <Heading center>{ totalItems } Harmonized Variables found for "{ searchedQuery }"</Heading> }
                            <ResultsCard>
                                <ResultsCardHeader>
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === 0 } onClick={ goToFirstResult }><FirstPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === 0 } onClick={ goToPreviousResult }><ChevronLeftIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 1 && <ResultsCardTitle>Result { resultIndex + 1 } of { totalItems }</ResultsCardTitle> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === totalItems - 1} onClick={ goToNextResult }><ChevronRightIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === totalItems - 1 } onClick={ goToLastResult }><LastPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                </ResultsCardHeader>
                                <Fragment>
                                    { error && <Alert type="error" message={ error } /> }
                                    { !error && isLoadingResults && <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="top" /> }
                                    { !error && !isLoadingResults && results.length > 0 && <Result key={ resultIndex } query={ query } result={ results[resultIndex] } /> }
                                    { !error && !isLoadingResults && results.length === 0 && <ResultsCardBody><Paragraph center>No results to display</Paragraph></ResultsCardBody> }
                                </Fragment>
                                <ResultsCardFooter>
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === 0 } onClick={ goToFirstResult }><FirstPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === 0 } onClick={ goToPreviousResult }><ChevronLeftIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 0 && <ResultsCount>Result { resultIndex + 1 } of { totalItems }</ResultsCount> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === totalItems - 1} onClick={ goToNextResult }><ChevronRightIcon fill="#fff" size={ 24 } /></IconButton> }
                                    { totalItems > 1 && <IconButton disabled={ resultIndex === totalItems - 1 } onClick={ goToLastResult }><LastPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                </ResultsCardFooter>
                            </ResultsCard>
                        </Fragment>
                    )
                }

                {
                    totalItems > 1 && (
                        <PaginationTray
                            links={ [...Array(totalItems).keys()].map(i => goToResult(i)) }
                            currentPage={ resultIndex }
                            prevPageHandler={ resultIndex === 0 ? null : goToPreviousResult }
                            nextPageHandler={ resultIndex < totalItems - 1 ? goToNextResult : null }
                            firstPageHandler={ resultIndex === 0 ? null : goToFirstResult }
                            lastPageHandler={ resultIndex < totalItems - 1 ? goToLastResult : null }
                        />
                    )
                }

                {
                    searchHistory.length > 0 && (
                        <Tray title="Search History">
                            <List items={
                                searchHistory.map(item => (
                                    <Fragment>
                                        <a href="#" onClick={ () => doSearchFromHistory(item) }>{ item }</a>
                                    </Fragment>
                                ))
                            } />
                        </Tray>
                    )
                }

            </section>
        </Main>
    )
}

export default App