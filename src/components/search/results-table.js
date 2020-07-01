import React from 'react'
import { Result } from './result'

export const ResultsTable = ({ results, totalItems, currentPageNumber, perPage, getNextPage, getPreviousPage }) => {
    return results.map(({ _source }, i) => (
        <Result
            key={ `${ _source._id }-${ i }` }
            index={ perPage * currentPageNumber + i + 1 }
            study={ _source.study }
            studyId={ _source.id || 'N/A' }
            name={ _source.study_name || 'N/A' }
            variable={ _source.var || 'N/A' }
            description={ _source.description || 'N/A' }
            instructions={ _source.instructions || 'N/A' }
        />
    ))
}
