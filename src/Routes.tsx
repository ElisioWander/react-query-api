import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Repo } from './Pages/Repo'
import { Repos } from './Pages/repos'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Repos />} />
        <Route path='/repo/*' element={<Repo />} />
      </Routes>
    </BrowserRouter>
  )
}