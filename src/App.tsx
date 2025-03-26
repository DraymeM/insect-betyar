import { Outlet } from '@tanstack/react-router'
import NavBar from './components/common/NavBar'

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet /> 
    </>
  )
}

export default App;
