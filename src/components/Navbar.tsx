import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { elementIcons, characters } from '../data/characters';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: '冒险家协会', icon: '🏠' },
  { path: '/characters', label: '角色图鉴', icon: '👥' },
  { path: '/map', label: '提瓦特地刊', icon: '🗺️' },
  { path: '/weapons', label: '武器集录', icon: '⚔️' },
  { path: '/artifacts', label: '圣遗物', icon: '💎' },
  { path: '/reactions', label: '元素反应', icon: '🌀' },
  { path: '/abyss', label: '深境螺旋', icon: '🏆' },
];

export default function Navbar() {
  const { themeColor } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [charSearch, setCharSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredChars = characters.filter(c =>
    c.name.includes(charSearch) || c.title.includes(charSearch)
  ).slice(0, 5);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderBottom: `1px solid ${themeColor}22` }}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl sm:text-2xl" style={{ color: themeColor }}>
              ✦
            </span>
            <span className="font-bold text-base sm:text-lg hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
              提瓦特旅行笔记
            </span>
            <span className="font-bold text-base sm:hidden" style={{ fontFamily: 'var(--font-display)' }}>
              旅行笔记
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-0.5 flex-1 mx-4">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-2.5 lg:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? themeColor : 'var(--theme-text-secondary)',
                    background: isActive ? `${themeColor}15` : 'transparent',
                  }}
                >
                  <span className="mr-1 lg:mr-1.5">{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: themeColor }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop inline search */}
            <div className="relative hidden sm:block">
              <input
                value={charSearch}
                onChange={e => setCharSearch(e.target.value)}
                placeholder="🔍 搜索角色..."
                className="w-36 lg:w-44 px-3 py-1.5 rounded-lg text-sm outline-none transition-all duration-300 focus:w-48 lg:focus:w-56"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--theme-text)',
                  border: `1px solid ${charSearch ? themeColor : 'rgba(255,255,255,0.1)'}`,
                }}
              />
              {charSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-10 w-72 glass rounded-xl p-3 shadow-2xl z-50"
                  style={{ border: `1px solid ${themeColor}22` }}
                >
                  {filteredChars.map(c => (
                    <Link
                      key={c.id}
                      to={`/character/${c.id}`}
                      onClick={() => setCharSearch('')}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                    >
                      <span>{elementIcons[c.element]}</span>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>{c.title}</span>
                    </Link>
                  ))}
                  {filteredChars.length === 0 && (
                    <p className="text-xs px-3 py-2" style={{ color: 'var(--theme-text-secondary)' }}>未找到相关角色</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Mobile search toggle */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg text-sm transition-colors"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                🔍
              </button>
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-10 w-72 glass rounded-xl p-3 shadow-2xl z-50"
                    style={{ border: `1px solid ${themeColor}22` }}
                  >
                    <input
                      autoFocus
                      value={charSearch}
                      onChange={e => setCharSearch(e.target.value)}
                      placeholder="搜索角色..."
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--theme-text)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    {charSearch && (
                      <div className="mt-2 space-y-1">
                        {filteredChars.map(c => (
                          <Link
                            key={c.id}
                            to={`/character/${c.id}`}
                            onClick={() => { setShowSearch(false); setCharSearch(''); }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                          >
                            <span>{elementIcons[c.element]}</span>
                            <span className="font-medium">{c.name}</span>
                            <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>{c.title}</span>
                          </Link>
                        ))}
                        {filteredChars.length === 0 && (
                          <p className="text-xs px-3 py-2" style={{ color: 'var(--theme-text-secondary)' }}>未找到相关角色</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              <div className="w-5 h-0.5 bg-current mb-1 rounded" />
              <div className="w-5 h-0.5 bg-current mb-1 rounded" />
              <div className="w-5 h-0.5 bg-current rounded" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: `${themeColor}15` }}
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color: isActive ? themeColor : 'var(--theme-text-secondary)',
                      background: isActive ? `${themeColor}15` : 'transparent',
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
