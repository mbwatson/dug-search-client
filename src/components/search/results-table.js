import React from 'react'
import { Result } from './result'

export const ResultsTable = ({ results, getNextPage, getPreviousPage }) => {
    return results.map((result, i) => (
        <Result
            key={ i }
            study={ 'temp study' }
            studyId={ 'temp id' || 'N/A' }
            name={ 'temp name' || 'N/A' }
            variable={ 'temp var' || 'N/A' }
            description={ 'temp desc' || 'N/A' }
            instructions={ 'temp instructions' || 'N/A' }
            graph={ 'temp graph' }
        />
    ))
}
