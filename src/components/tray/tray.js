import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChevronDownIcon } from '../icons'
import { useWindowWidth } from '../../hooks'

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

const Wrapper = styled.div(({ width }) => `
  position: fixed;
  bottom: 0;
  min-width: ${ width };
  left: 50%;
  transform: translateX(-50%);
  transition: min-width 250ms, transform 250ms;
  filter: drop-shadow(0 -0.25rem 0.25rem rgba(0, 0, 0, 0.2));
  z-index: 2;
  border-top-left-radius: ${ width === '100%' ? '0' : '4px' };
  border-top-right-radius: ${ width === '100%' ? '0' : '4px' };
`)

const Header = styled.div(({ color }) => `
  background-color: ${ color };
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
  transition: background-color 250ms;
`)

const OpenIndicator = styled.div(({ active }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        transition: filter 250ms, transform 500ms;
        transform: rotate(${ active ? '0' : '180deg' });
    }
`)

const Content = styled.div(({ active }) => `
  background-color: #111;
  color: #ddd;
  transition: ${ active ? 'max-height 250ms, filter 250ms 50ms' : 'max-height 250ms 50ms, filter 250ms'};
  max-height: ${ active ? '600px' : '0' };
  overflow: hidden;
  filter: brightness(${ active ? 1 : 0 });
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
  const { isCompact } = useWindowWidth()

  return (
    <Wrapper width={ isCompact ? '100%' : '600px' }>
      <Header onClick={ toggleTray } color={ active ? 'var(--color-crimson-dark)' : '#334' }>
        <div className="title">{ title }</div>
        <OpenIndicator active={ active }>
            <ChevronDownIcon size={ 24 } fill="#eef" active={ active } />
        </OpenIndicator>
      </Header>
      <Content active={ active }>
        { children }
      </Content>
    </Wrapper>
  )
}


Tray.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}