import { Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CharacterList from './pages/CharacterList'
import CharacterDetail from './pages/CharacterDetail'
import MapPage from './pages/MapPage'
import Weapons from './pages/Weapons'
import Artifacts from './pages/Artifacts'
import ElementalReactions from './pages/ElementalReactions'
import SpiralAbyss from './pages/SpiralAbyss'
import Search from './pages/Search'

function App() {
  const { themeColor } = useTheme()

  return (
    <div className="min-h-screen" style={{
      background: `
        radial-gradient(ellipse at 20% 50%, ${themeColor}08 0%, transparent 50%),
        radial-gradient(ellipse at 80% 0%, #7BE0C008 0%, transparent 50%),
        radial-gradient(ellipse at 50% 100%, #D4A84305 0%, transparent 50%),
        var(--theme-bg)
      `,
    }}>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/artifacts" element={<Artifacts />} />
          <Route path="/reactions" element={<ElementalReactions />} />
          <Route path="/abyss" element={<SpiralAbyss />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
