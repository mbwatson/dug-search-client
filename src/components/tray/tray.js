import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChevronDownIcon } from '../icons'

export const TrayContext = React.createContext({})

export const useTray = () => useContext(TrayContext)

export const TrayProvider = ({ children }) => {
  const [active, setActive] = useState(false)
  
  const closeTray = () => setActive(false)
  const toggleTray = () => setActive(!active)

  return (
    <TrayContext.Provider value={{ active, closeTray, toggleTray }}>
      { children }
    </TrayContext.Provider>
  )
}

const Wrapper = styled.div`
  background-color: #334;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  filter: drop-shadow(0 -0.25rem 0.25rem rgba(0, 0, 0, 0.2));
`

const Header = styled.div`
  font-weight: bold;
  cursor: pointer;
  color: #eef;
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
        transition: filter 250ms, transform 500ms;
        transform: rotate(${ active ? '0' : '180deg' });
    }
`)

const Content = styled.div(({ height }) => `
  background-color: #111;
  transition: max-height 250ms;
  max-height: ${ height }px;
  overflow: hidden;
  padding: 0 1rem;
  & a {
    color: #eee;
    text-decoration: underline;
    &:hover {
      color: var(--color-lightgrey);
    }
  }
`)

export const Tray = ({ title, children }) => {
  const { active, toggleTray } = useContext(TrayContext)

  return (
    <Wrapper>
      <Header onClick={ toggleTray }>
        <div className="title">{ title }</div>
        <OpenIndicator active={ active }>
            <ChevronDownIcon size={ 24 } fill="#eef" active={ active } />
        </OpenIndicator>
      </Header>
      <Content height={ active ? '300' : '0' }>
        { children }
      </Content>
    </Wrapper>
  )
}


Tray.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}