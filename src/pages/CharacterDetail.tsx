import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCharacterById, characters, elementIcons, elementColors } from '../data/characters';
import CharacterAvatar from '../components/CharacterAvatar';
import { useTheme } from '../context/ThemeContext';

type TabId = 'talents' | 'constellations' | 'materials' | 'teams' | 'story';

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const char = getCharacterById(id || '');
  const { setThemeColor, setThemeGradient } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('talents');
  const [activeTalent, setActiveTalent] = useState(0);
  const [simpleMode, setSimpleMode] = useState(true);
  const [checkedMaterials, setCheckedMaterials] = useState<string[]>([]);

  useEffect(() => {
    if (char) {
      setThemeColor(char.themeColor);
      setThemeGradient(char.themeGradient);
    }
    window.scrollTo(0, 0);
  }, [char, setThemeColor, setThemeGradient]);

  if (!char) {
    return (
      <div className="pt-24 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">未找到该角色</h2>
        <Link to="/characters" className="text-sm font-medium" style={{ color: 'var(--theme-primary)' }}>
          ← 返回角色图鉴
        </Link>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'talents', label: '天赋技能', icon: '⚔️' },
    { id: 'constellations', label: '命之座', icon: '⭐' },
    { id: 'materials', label: '养成材料', icon: '📦' },
    { id: 'teams', label: '推荐配队', icon: '👥' },
    { id: 'story', label: '角色故事', icon: '📖' },
  ];

  const toggleMaterial = (name: string) => {
    setCheckedMaterials(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const totalMaterials = char.materials.length;
  const collectedCount = checkedMaterials.length;
  const progress = totalMaterials > 0 ? (collectedCount / totalMaterials) * 100 : 0;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, ${char.themeColor}25 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, ${char.themeColor}10 0%, transparent 50%),
            var(--theme-bg)
          `,
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: char.themeColor,
                opacity: 0.2 + Math.random() * 0.3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 40, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 drop-shadow-xl" style={{ filter: `drop-shadow(0 0 30px ${char.themeColor}50)` }}>
              <CharacterAvatar charId={char.id} color={char.themeColor} size="xl" animated={false} />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className="px-3 py-0.5 rounded-full text-xs font-medium"
                style={{ background: `${elementColors[char.element]}20`, color: elementColors[char.element] }}
              >
                {char.element}
              </span>
              <span
                className="px-3 py-0.5 rounded-full text-xs font-medium"
                style={{ background: `${char.rarity === 5 ? '#D4A843' : '#A078C0'}20`, color: char.rarity === 5 ? '#D4A843' : '#A078C0' }}
              >
                {'★'.repeat(char.rarity)}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--theme-text-secondary)' }}>
                {char.weaponType}
              </span>
            </div>
            <p className="text-sm mb-1" style={{ color: 'var(--theme-text-secondary)' }}>
              {char.region} · {char.voiceActor}
            </p>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {char.name}
            </h1>
            <p
              className="text-lg sm:text-xl mb-4"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              {char.title}
            </p>
            <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {char.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Quick Panel */}
      <div
        className="sticky top-16 z-40 glass border-b"
        style={{ borderColor: `${char.themeColor}15` }}
      >
        <div className="page-container">
          <div className="flex items-center gap-2 sm:gap-6 h-14 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-lg">{elementIcons[char.element]}</span>
              <span className="font-semibold text-sm whitespace-nowrap">{char.name}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs ml-2" style={{ color: 'var(--theme-text-secondary)' }}>
              {char.stats.slice(0, 3).map(s => (
                <div key={s.label} className="flex items-center gap-1 shrink-0">
                  <span>{s.label}</span>
                  <div className="w-12 lg:w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${s.value}%`, background: char.themeColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-1 sm:gap-2 ml-auto shrink-0">
              {char.role.map(r => (
                <span
                  key={r}
                  className="px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap"
                  style={{ background: `${char.themeColor}15`, color: char.themeColor }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - horizontal scroll on mobile */}
      <div className="page-container -mt-px">
        <div
          className="flex gap-1 border-b overflow-x-auto scrollbar-none pb-0"
          style={{ borderColor: `${char.themeColor}10` }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative shrink-0 px-3 sm:px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: activeTab === tab.id ? char.themeColor : 'var(--theme-text-secondary)',
              }}
            >
              <span className="mr-1 sm:mr-1.5">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: char.themeColor }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="page-container py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Talents Tab */}
            {activeTab === 'talents' && (
              <div>
                <div className="flex items-start sm:items-center justify-between mb-6 gap-3">
                  <h2 className="text-xl font-bold shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
                    天赋技能
                  </h2>
                  <button
                    onClick={() => setSimpleMode(!simpleMode)}
                    className="shrink-0 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap"
                    style={{
                      background: simpleMode ? `${char.themeColor}20` : 'rgba(255,255,255,0.05)',
                      color: simpleMode ? char.themeColor : 'var(--theme-text-secondary)',
                      border: `1px solid ${simpleMode ? char.themeColor : 'transparent'}`,
                    }}
                  >
                    {simpleMode ? '📖 简单模式' : '📊 进阶数据'}
                  </button>
                </div>

                {/* Talent Navigation - scrollable on mobile */}
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-1">
                  {char.talents.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTalent(i)}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-300 shrink-0 whitespace-nowrap"
                      style={{
                        background: activeTalent === i ? `${char.themeColor}20` : 'rgba(255,255,255,0.03)',
                        color: activeTalent === i ? char.themeColor : 'var(--theme-text-secondary)',
                        border: `1px solid ${activeTalent === i ? char.themeColor : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <img
                        src={`/images/talents/${encodeURIComponent(char.id)}_${t.type}.png`}
                        alt={t.name}
                        className="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active Talent Detail */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTalent}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass rounded-xl p-6"
                    style={{ borderColor: `${char.themeColor}15` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={`/images/talents/${encodeURIComponent(char.id)}_${char.talents[activeTalent].type}.png`}
                        alt={char.talents[activeTalent].name}
                        className="w-12 h-12 rounded-xl object-cover"
                        style={{ background: `${char.themeColor}20` }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div>
                        <h3 className="font-bold text-lg">{char.talents[activeTalent].name}</h3>
                        {simpleMode ? (
                          <p className="text-sm mt-1" style={{ color: char.themeColor }}>
                            {char.talents[activeTalent].simpleDescription}
                          </p>
                        ) : (
                          <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                            {char.talents[activeTalent].detail}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Element-themed skill visualization */}
                    <div
                      className="rounded-xl h-24 flex items-center justify-center mb-4 overflow-hidden relative"
                      style={{
                        background: `radial-gradient(ellipse at 50% 50%, ${char.themeColor}12, transparent 70%)`,
                        border: `1px solid ${char.themeColor}08`,
                      }}
                    >
                      <div className="absolute inset-0 opacity-[0.07]">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                          <circle cx="100" cy="50" r="40" fill="none" stroke={char.themeColor} strokeWidth="0.5">
                            <animate attributeName="r" values="35;45;35" dur="4s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="100" cy="50" r="25" fill="none" stroke={char.themeColor} strokeWidth="0.3">
                            <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite"/>
                          </circle>
                          <line x1="60" y1="50" x2="140" y2="50" stroke={char.themeColor} strokeWidth="0.3">
                            <animate attributeName="x1" values="55;65;55" dur="3s" repeatCount="indefinite"/>
                            <animate attributeName="x2" values="145;135;145" dur="3s" repeatCount="indefinite"/>
                          </line>
                          <line x1="100" y1="10" x2="100" y2="90" stroke={char.themeColor} strokeWidth="0.3">
                            <animate attributeName="y1" values="5;15;5" dur="3s" repeatCount="indefinite"/>
                            <animate attributeName="y2" values="95;85;95" dur="3s" repeatCount="indefinite"/>
                          </line>
                        </svg>
                      </div>
                      <motion.img
                        src={`/images/talents/${encodeURIComponent(char.id)}_${char.talents[activeTalent].type}.png`}
                        alt={char.talents[activeTalent].name}
                        className="w-12 h-12 relative"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute bottom-2 right-3 text-[10px] font-medium opacity-40" style={{ color: char.themeColor }}>
                        {char.element} · 元素能量
                      </div>
                    </div>

                    {/* Skill Values */}
                    {!simpleMode && char.talents[activeTalent].values.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-3">技能数值</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {char.talents[activeTalent].values.map(v => (
                            <div
                              key={v.level}
                              className="rounded-lg px-4 py-2 text-sm"
                              style={{ background: 'rgba(255,255,255,0.03)' }}
                            >
                              <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                                Lv.{v.level}
                              </span>
                              <span className="ml-2" style={{ color: char.themeColor }}>{v.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Constellations Tab */}
            {activeTab === 'constellations' && (
              <div>
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  命之座
                </h2>
                <div className="relative">
                  {/* Constellation Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ opacity: 0.15 }}
                  >
                    {char.constellations.slice(0, -1).map((_, i) => (
                      <line
                        key={i}
                        x1={`${((i % 3) + 1) * 25}%`}
                        y1={`${Math.floor(i / 3) * 120 + 80}px`}
                        x2={`${(((i + 1) % 3) + 1) * 25}%`}
                        y2={`${Math.floor((i + 1) / 3) * 120 + 80}px`}
                        stroke={char.themeColor}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))}
                  </svg>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                    {char.constellations.map((con, i) => (
                      <motion.div
                        key={con.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          borderColor: `${char.themeColor}20`,
                          background: `linear-gradient(135deg, ${char.themeColor}08, transparent)`,
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                            style={{
                              background: `radial-gradient(circle, ${char.themeColor}30, transparent)`,
                              border: `1px solid ${char.themeColor}30`,
                            }}
                          >
                            {con.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                style={{ background: `${char.themeColor}20`, color: char.themeColor }}
                              >
                                第{con.id}层
                              </span>
                            </div>
                            <h3 className="font-semibold text-sm mt-0.5">{con.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                          {simpleMode ? con.simpleEffect : con.effect}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <div className="flex items-start sm:items-center justify-between mb-6 gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                      养成计算器
                    </h2>
                    <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
                      从1级到90级，全天赋满级所需材料 · 点击标记已拥有
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold" style={{ color: char.themeColor }}>
                      {collectedCount}/{totalMaterials}
                    </div>
                    <div className="w-20 sm:w-24 h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: char.themeColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {char.materials.map((mat, i) => {
                    const collected = checkedMaterials.includes(mat.name);
                    return (
                      <motion.div
                        key={mat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => toggleMaterial(mat.name)}
                        className={`glass rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                          collected ? 'opacity-50' : 'hover:scale-[1.02]'
                        }`}
                        style={{
                          borderColor: collected ? `${char.themeColor}10` : `${char.themeColor}20`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                          style={{ background: `${char.themeColor}15` }}
                        >
                          {mat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate">{mat.name}</span>
                            <span className="text-xs font-bold" style={{ color: char.themeColor }}>
                              ×{mat.amount >= 1000 ? mat.amount.toLocaleString() : mat.amount}
                            </span>
                          </div>
                          <span className="text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>
                            {mat.category === 'boss' && '首领掉落'}
                            {mat.category === 'local_specialty' && '地区特产'}
                            {mat.category === 'enemy_drop' && '怪物掉落'}
                            {mat.category === 'talent_book' && '天赋书'}
                            {mat.category === 'weekly_boss' && '周常BOSS'}
                            {mat.category === 'mora' && '摩拉'}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center text-[10px] shrink-0 transition-all ${
                            collected ? 'border-transparent' : ''
                          }`}
                          style={{
                            borderColor: collected ? char.themeColor : `${char.themeColor}40`,
                            background: collected ? char.themeColor : 'transparent',
                            color: collected ? 'white' : 'transparent',
                          }}
                        >
                          {collected && '✓'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Teams Tab */}
            {activeTab === 'teams' && (
              <div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  推荐配队
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
                  为{char.name}量身打造的阵容推荐，点击角色头像跳转详情
                </p>

                <div className="space-y-6">
                  {char.teams.map((team, i) => (
                    <motion.div
                      key={team.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-6"
                      style={{ borderColor: `${char.themeColor}15` }}
                    >
                      <h3 className="font-bold text-lg mb-4" style={{ color: char.themeColor }}>
                        {team.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                        {team.characters.map((charName) => {
                          const member = characters.find(c => c.name === charName);
                          return (
                            <Link
                              key={charName}
                              to={member ? `/character/${member.id}` : '#'}
                              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap"
                              style={{
                                background: member ? `${member.themeColor}15` : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${member ? `${member.themeColor}30` : 'transparent'}`,
                              }}
                            >
                              <span>{member ? elementIcons[member.element] : '❓'}</span>
                              <span className="font-medium">{charName}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <p className="text-sm mb-3" style={{ color: 'var(--theme-text-secondary)' }}>
                        {team.description}
                      </p>

                      <div
                        className="rounded-lg px-4 py-3 text-sm"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <span className="text-xs font-semibold" style={{ color: char.themeColor }}>
                          输出手法：
                        </span>
                        <span style={{ color: 'var(--theme-text-secondary)' }}>{team.rotation}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Story Tab */}
            {activeTab === 'story' && (
              <div>
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  角色故事
                </h2>
                <div className="glass rounded-xl p-6 sm:p-8" style={{ borderColor: `${char.themeColor}15` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: `radial-gradient(circle, ${char.themeColor}30, transparent)` }}
                    >
                      {elementIcons[char.element]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{char.name}</h3>
                      <p className="text-sm" style={{ color: char.themeColor }}>{char.title}</p>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                      {char.story}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div
                      className="rounded-lg px-4 py-3 text-sm"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>声优</span>
                      <p className="font-medium mt-0.5">{char.voiceActor}</p>
                    </div>
                    <div
                      className="rounded-lg px-4 py-3 text-sm"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>生日</span>
                      <p className="font-medium mt-0.5">{char.birthDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
