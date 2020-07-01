import styled from 'styled-components'
import PropTypes from 'prop-types'

// 

export const Heading = styled.h2`
    color: ${ props => props.light ? '#dde' : 'var(--color-blueberry)' };
    text-align: center;
    @media screen and (min-width: 767px) {
        text-align: left;
        ${ props => props.center && 'text-align: center;' }
        ${ props => props.right && 'text-align: right;' }
    }
`

Heading.propTypes = {
    children: PropTypes.node.isRequired,
}
