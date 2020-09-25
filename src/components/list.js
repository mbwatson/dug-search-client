import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.ul(({ bullets }) => `
  list-style-type: ${ bullets };
  padding: ${ bullets === 'none' ? '0' : '1rem' };
  margin: 0;
`)

const ListItem = styled.li``

export const List = ({ items, bullets = 'none', blocks = false }) => {
  return (
    <Wrapper bullets={ bullets } style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      { items.map(item => <ListItem style={{ flex: 1 }}>{ item }</ListItem>) }
    </Wrapper>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  bullet: PropTypes.string,
}
