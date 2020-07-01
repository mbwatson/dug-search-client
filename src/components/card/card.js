import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Card = styled.div`
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`

Card.propTypes = {
    children: PropTypes.node.isRequired,
    elevate: PropTypes.bool.isRequired,
}

Card.defaultProps = {
    elevate: true,
}