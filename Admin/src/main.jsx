import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <App />
</BrowserRouter>
// after wrapping the app component within BrowserRouter we have the support of react-router-dom in our project
 
)
