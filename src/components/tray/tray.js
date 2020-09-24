import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChevronDownIcon } from '../icons'

const Wrapper = styled.div`
  background-color: #dde;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Header = styled.div`
  font-weight: bold;
  cursor: pointer;
  color: #333;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  & .title {
    flex: 1;
  }
`

const OpenIndicator = styled.div(({ active }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        transition: fill 250ms, filter 250ms;
        fill: ${ active ? 'var(--color-crimson)' : '#333' };
    }
`)

const Content = styled.div(({ height }) => `
  background-color: #ccd;
  transition: max-height 250ms;
  max-height: ${ height }px;
  overflow: hidden;
  padding: 0 1rem;
`)

export const Tray = ({ title, children }) => {
  const [active, setActive] = useState(false)

  const handleToggle = event => setActive(!active)

  return (
    <Wrapper>
      <Header onClick={ handleToggle }>
        <div className="title">{ title }</div>
        <OpenIndicator active={ active }>
            <ChevronDownIcon size={ 24 } active={ active } />
        </OpenIndicator>
      </Header>
      <Content height={ active ? '200' : '0' }>
        { children }
      </Content>
    </Wrapper>
  )
}


Tray.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}