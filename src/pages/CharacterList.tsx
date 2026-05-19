import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { characters, elementIcons, elementColors } from '../data/characters';
import CharacterAvatar from '../components/CharacterAvatar';
import { useTheme } from '../context/ThemeContext';

const elements = ['全部', 'Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const weapons = ['全部', '单手剑', '双手剑', '长柄武器', '法器', '弓'];

export default function CharacterList() {
  const { themeColor } = useTheme();
  const [activeElement, setActiveElement] = useState('全部');
  const [activeWeapon, setActiveWeapon] = useState('全部');

  const filtered = useMemo(() => {
    return characters.filter(c => {
      if (activeElement !== '全部' && c.element !== activeElement) return false;
      if (activeWeapon !== '全部' && c.weaponType !== activeWeapon) return false;
      return true;
    });
  }, [activeElement, activeWeapon]);

  return (
    <div className="pt-24 pb-16">
      <div className="page-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            角色图鉴
          </h1>
          <p style={{ color: 'var(--theme-text-secondary)' }}>
            认识每一位独特的伙伴，了解他们的故事与力量
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-3"
        >
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {elements.map(el => (
              <button
                key={el}
                onClick={() => setActiveElement(el)}
                className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-300 whitespace-nowrap"
                style={{
                  background: activeElement === el ? `${elementColors[el] || themeColor}20` : 'rgba(255,255,255,0.05)',
                  color: activeElement === el ? (elementColors[el] || themeColor) : 'var(--theme-text-secondary)',
                  border: `1px solid ${activeElement === el ? (elementColors[el] || themeColor) : 'transparent'}`,
                }}
              >
                {el !== '全部' ? `${elementIcons[el]} ${el}` : '✨ 全部'}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {weapons.map(w => (
              <button
                key={w}
                onClick={() => setActiveWeapon(w)}
                className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-300 whitespace-nowrap"
                style={{
                  background: activeWeapon === w ? `${themeColor}20` : 'rgba(255,255,255,0.05)',
                  color: activeWeapon === w ? themeColor : 'var(--theme-text-secondary)',
                  border: `1px solid ${activeWeapon === w ? themeColor : 'transparent'}`,
                }}
              >
                {w === '全部' ? '⚔️ 全部' : w}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Character Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              layout
            >
              <Link
                to={`/character/${char.id}`}
                className="glass rounded-xl overflow-hidden block group transition-all duration-300 hover:scale-[1.03]"
                style={{ borderColor: `${char.themeColor}20` }}
              >
                <div
                  className="h-32 sm:h-40 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at center, ${char.themeColor}30, transparent)`,
                  }}
                >
                  <CharacterAvatar charId={char.id} color={char.themeColor} size="xl" animated={false} />
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{ background: `${char.rarity === 5 ? '#D4A843' : '#A078C0'}30`, color: char.rarity === 5 ? '#D4A843' : '#A078C0' }}
                  >
                    {'★'.repeat(char.rarity)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{elementIcons[char.element]}</span>
                    <h3 className="font-semibold">{char.name}</h3>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--theme-text-secondary)' }}>
                    {char.title}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span
                      className="px-2 py-0.5 rounded text-[10px]"
                      style={{ background: `${char.themeColor}12`, color: char.themeColor }}
                    >
                      {char.weaponType}
                    </span>
                    {char.role.slice(0, 2).map(r => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded text-[10px]"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--theme-text-secondary)' }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
