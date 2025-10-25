import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import DocumentSearchPage from './pages/DocumentSearchPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocumentSearchPage/>
  </StrictMode>,
)
