import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { TrayProvider } from './components/tray'

ReactDOM.render(
    <React.StrictMode>
        <TrayProvider>
            <App />
        </TrayProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
