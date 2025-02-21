import { Outlet } from '@tanstack/react-router'
import NavBar from './components/common/NavBar'

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Renders the matched route */}
    </>
  )
}

export default App
