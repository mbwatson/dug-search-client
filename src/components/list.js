import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.ul(({ bullets }) => `
  list-style-type: ${ bullets };
  padding: ${ bullets === 'none' ? '0' : '1rem' };
`)

const ListItem = styled.li`
  padding: 0.25rem 0;
`

export const List = ({ items, bullets = 'none' }) => {
  return (
    <Wrapper bullets={ bullets }>
      { items.map(item => <ListItem>{ item }</ListItem>) }
    </Wrapper>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  bullet: PropTypes.string,
}
