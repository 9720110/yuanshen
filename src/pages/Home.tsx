import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { characters, elementIcons } from '../data/characters';
import CharacterAvatar from '../components/CharacterAvatar';
import { regions } from '../data/regions';

const features = [
  { icon: '👥', title: '角色图鉴', desc: '全角色立绘·天赋·命座·养成', path: '/characters', color: '#FF4B4B', badge: '热门' },
  { icon: '🗺️', title: '提瓦特地刊', desc: '互动地图·神瞳·宝箱·材料', path: '/map', color: '#7BE0C0', badge: '探秘' },
  { icon: '⚔️', title: '武器集录', desc: '全武器数据·适配角色推荐', path: '/weapons', color: '#D4A843', badge: '装备' },
  { icon: '💎', title: '圣遗物', desc: '套装效果·词条推荐·刷取指南', path: '/artifacts', color: '#C07BFF', badge: '配装' },
  { icon: '🌀', title: '元素反应', desc: '反应机制·伤害计算·配队原理', path: '/reactions', color: '#7BE0FF', badge: '进阶' },
  { icon: '🏆', title: '深境螺旋', desc: '当期阵容·怪物分析·通关技巧', path: '/abyss', color: '#FF6B35', badge: '挑战' },
];

const announcements = [
  { title: '5.7版本更新', tag: 'NEW', tagColor: '#FF4B4B', desc: '新角色「艾梅莉埃」登场，全新区域开启', path: '/characters' },
  { title: '角色攻略征集', tag: '活动', tagColor: '#7BE0C0', desc: '分享你的配队心得，赢取创世结晶', path: '/abyss' },
  { title: '纳塔探索指南', tag: '热门', tagColor: '#FF6B35', desc: '全新地区探索攻略汇总，快速上手', path: '/map' },
];

export default function Home() {
  const { themeColor } = useTheme();

  return (
    <div>
      {/* ===== 1. HERO SECTION - 增强视觉冲击力 ===== */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 动态星空粒子背景 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse at 20% 30%, ${themeColor}20 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, #7BE0C018 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, #D4A84310 0%, transparent 40%),
              radial-gradient(ellipse at 70% 20%, #C07BFF10 0%, transparent 40%),
              var(--theme-bg)
            `,
          }} />

          {/* 旋转的提瓦特轮廓 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] opacity-[0.04]">
            <svg viewBox="0 0 500 500" className="w-full h-full animate-rotate-glow">
              <circle cx="250" cy="250" r="200" fill="none" stroke={themeColor} strokeWidth="0.5" strokeDasharray="8 8" />
              <circle cx="250" cy="250" r="150" fill="none" stroke={themeColor} strokeWidth="0.3" strokeDasharray="4 12" />
              <circle cx="250" cy="250" r="100" fill="none" stroke={themeColor} strokeWidth="0.4" />
              <path d="M250 50 Q300 150 350 100 Q400 200 300 250 Q400 300 350 400 Q300 350 250 450 Q200 350 150 400 Q100 300 200 250 Q100 200 150 100 Q200 150 250 50" fill="none" stroke={themeColor} strokeWidth="0.5" />
            </svg>
          </div>

          {/* 流动的元素能量线 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-[20%] left-0 h-[1px] w-[200px] animate-flow-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                boxShadow: `0 0 8px ${themeColor}, 0 0 20px ${themeColor}60`,
              }}
            />
            <div
              className="absolute top-[45%] left-0 h-[1px] w-[150px] animate-flow-line-reverse"
              style={{
                background: `linear-gradient(90deg, transparent, #7BE0C0, transparent)`,
                boxShadow: '0 0 8px #7BE0C0, 0 0 20px #7BE0C060',
              }}
            />
            <div
              className="absolute top-[70%] left-0 h-[1px] w-[180px] animate-flow-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                boxShadow: `0 0 8px ${themeColor}, 0 0 20px ${themeColor}60`,
                animationDelay: '3s',
              }}
            />
            <div
              className="absolute top-[30%] right-0 h-[1px] w-[120px] animate-flow-line-reverse"
              style={{
                background: `linear-gradient(90deg, transparent, #D4A843, transparent)`,
                boxShadow: '0 0 8px #D4A843, 0 0 20px #D4A84360',
                animationDelay: '5s',
              }}
            />
          </div>

          {/* 闪烁星星 */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                background: '#fff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-medium mb-6 backdrop-blur-sm"
              style={{
                background: `${themeColor}15`,
                color: themeColor,
                border: `1px solid ${themeColor}30`,
                boxShadow: `0 0 20px ${themeColor}20`,
              }}
            >
              ✦ 欢迎旅行者 · 冒险等级同步中
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            你的
            <span
              className="mx-3 inline-block bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${themeColor}, #E6D3A7, ${themeColor})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              提瓦特
            </span>
            冒险手册
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            从蒙德的风到纳塔的焰，为每一位旅行者打造的纯净攻略世界。
            <br className="hidden sm:block" />
            角色养成、探索收集、配队指南，一册在手，提瓦特无忧。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/characters"
              className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
                boxShadow: `0 4px 25px ${themeColor}40`,
              }}
            >
              <span className="relative z-10">开始探索 →</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}dd, #E6D3A7)`,
                }}
              />
            </Link>
            <Link
              to="/map"
              className="relative px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${themeColor}dd, ${themeColor}88)`,
                boxShadow: `0 4px 25px ${themeColor}30`,
              }}
            >
              <span className="relative z-10">📍 查看地图</span>
            </Link>
          </motion.div>
        </div>

        {/* 向下滚动指示器 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: `${themeColor}40` }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: themeColor }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== 公告栏 ===== */}
      <section className="page-container mb-16 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements.map((item, i) => (
            <Link to={item.path} key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-5 hover-card"
                style={{ borderColor: `${item.tagColor}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{ background: `${item.tagColor}20`, color: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 2. 角色一览 - 大卡片展示 ===== */}
      <section className="page-container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              ⭐ 角色一览
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
              认识每一位独特的「旅行者」 · 点击查看详细攻略
            </p>
          </div>
          <Link
            to="/characters"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              color: themeColor,
              background: `${themeColor}10`,
              border: `1px solid ${themeColor}30`,
            }}
          >
            查看全部 →
          </Link>
        </motion.div>

        {/* 角色大卡片网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {characters.map((char, i) => {
            const is5Star = char.rarity === 5;
            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group perspective-[1000px]"
              >
                <Link
                  to={`/character/${char.id}`}
                  className="block relative rounded-2xl overflow-hidden hover-card"
                  style={{
                    background: `linear-gradient(180deg, ${char.themeColor}25 0%, ${char.themeColor}08 40%, rgba(26,23,40,0.9) 100%)`,
                    border: `2px solid ${is5Star ? 'rgba(212,168,67,0.3)' : 'rgba(160,120,192,0.2)'}`,
                    boxShadow: is5Star
                      ? `0 0 30px rgba(212,168,67,0.1), inset 0 0 60px rgba(212,168,67,0.03)`
                      : `0 0 20px rgba(160,120,192,0.08), inset 0 0 40px rgba(160,120,192,0.02)`,
                  }}
                >
                  {/* 稀有度光效 */}
                  {is5Star && (
                    <div className="absolute -inset-1 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 30%, #D4A843, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* 稀有度标签 */}
                  <div
                    className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
                    style={{
                      background: is5Star ? 'rgba(212,168,67,0.3)' : 'rgba(160,120,192,0.3)',
                      color: is5Star ? '#D4A843' : '#A078C0',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {'★'.repeat(char.rarity)}
                  </div>

                  {/* 元素标签 */}
                  <div
                    className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{
                      background: `${char.themeColor}25`,
                      border: `1px solid ${char.themeColor}40`,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {elementIcons[char.element]}
                  </div>

                  {/* 角色头像区域 - 大尺寸 */}
                  <div className="h-36 sm:h-44 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    >
                      <CharacterAvatar charId={char.id} color={char.themeColor} size="xl" />
                    </motion.div>

                    {/* 底部光晕 */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20"
                      style={{
                        background: `linear-gradient(transparent, ${char.themeColor}15)`,
                      }}
                    />
                  </div>

                  {/* 角色信息 */}
                  <div className="p-4 pt-2 relative z-10">
                    <h3 className="font-bold text-sm sm:text-base mb-0.5">{char.name}</h3>
                    <p className="text-[10px] sm:text-xs truncate mb-2" style={{ color: char.themeColor }}>
                      {char.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {char.role.slice(0, 2).map(r => (
                        <span
                          key={r}
                          className="px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-medium"
                          style={{ background: `${char.themeColor}12`, color: char.themeColor }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 悬停指示 */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 60%, ${char.themeColor}15 100%)`,
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== 3. 六大攻略模块 ===== */}
      <section className="page-container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            🛡️ 攻略世界
          </h2>
          <p style={{ color: 'var(--theme-text-secondary)' }}>
            六大模块，覆盖提瓦特大陆的每一个角落
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={f.path}
                className="group relative glass rounded-2xl p-5 sm:p-6 text-center block hover-card overflow-hidden"
                style={{ borderColor: `${f.color}20` }}
              >
                {/* 顶部光条 */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                    boxShadow: `0 0 10px ${f.color}`,
                  }}
                />

                {/* 图标区 - 带背景光圈 */}
                <div className="relative mb-3 sm:mb-4">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl sm:text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `radial-gradient(circle at center, ${f.color}20, transparent)`,
                    }}
                  >
                    {f.icon}
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base mb-1.5 transition-colors duration-300"
                  style={{ color: f.color }}
                >
                  {f.title}
                </h3>
                <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {f.desc}
                </p>

                {/* 底部tag */}
                <div
                  className="inline-block mt-3 px-2 py-0.5 rounded text-[8px] font-medium tracking-wider opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `${f.color}15`,
                    color: f.color,
                  }}
                >
                  {f.badge}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== 4. 探索各国 ===== */}
      <section className="page-container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            🌍 探索各国
          </h2>
          <p style={{ color: 'var(--theme-text-secondary)' }}>
            从自由的风到炽热的焰，踏遍七国
          </p>
        </motion.div>

        {/* 提瓦特地图示意 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden"
          style={{ borderColor: `${themeColor}15` }}
        >
          {/* 地图背景网格 */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* SVG 提瓦特大陆抽象地图 - 增强版 */}
          <div className="relative w-full max-w-3xl mx-auto">
            <svg viewBox="0 0 700 300" className="w-full h-auto">
              <defs>
                <radialGradient id="bgGlow-${themeColor.replace('#','')}" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={themeColor} stopOpacity="0.08"/>
                  <stop offset="100%" stopColor={themeColor} stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* 背景光晕 */}
              <rect x="0" y="0" width="700" height="300" fill={`url(#bgGlow-${themeColor.replace('#','')})`}/>

              {/* 网格背景 */}
              <g opacity="0.03">
                {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                  <line key={`h${i}`} x1="0" y1={i * 25} x2="700" y2={i * 25} stroke={themeColor} strokeWidth="0.5"/>
                ))}
                {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].map(i => (
                  <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="300" stroke={themeColor} strokeWidth="0.5"/>
                ))}
              </g>

              {/* 地形装饰元素 */}
              <g opacity="0.06">
                {/* 蒙德 - 风起地大树 */}
                <g transform="translate(130,140)">
                  <path d="M0 20 L0 -10 Q5 -15 10 -10 Q15 -15 20 -10 L20 20Z" fill={themeColor}/>
                  <circle cx="10" cy="-15" r="12" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                </g>
                {/* 璃月 - 层岩巨渊 */}
                <g transform="translate(240,170)">
                  <path d="M-15 10 L-10 -10 L0 -15 L10 -10 L15 10Z" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                  <path d="M-8 5 L-5 -5 L0 -8 L5 -5 L8 5Z" fill="none" stroke={themeColor} strokeWidth="0.3"/>
                </g>
                {/* 稻妻 - 雷樱 */}
                <g transform="translate(350,110)">
                  <line x1="0" y1="15" x2="0" y2="-5" stroke={themeColor} strokeWidth="1"/>
                  <path d="M0 -5 Q-8 -15 -12 -10" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                  <path d="M0 -5 Q8 -15 12 -10" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                </g>
                {/* 须弥 - 雨林 */}
                <g transform="translate(290,220)">
                  <circle cx="0" cy="0" r="15" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                  <path d="M-10 5 Q0 -5 10 5" fill="none" stroke={themeColor} strokeWidth="0.3"/>
                  <path d="M-5 10 Q0 2 5 10" fill="none" stroke={themeColor} strokeWidth="0.3"/>
                </g>
                {/* 枫丹 - 海平面 */}
                <g transform="translate(450,140)">
                  <path d="M-15 0 Q-8 -5 0 0 Q8 5 15 0" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                  <path d="M-12 5 Q-5 0 0 5 Q5 10 12 5" fill="none" stroke={themeColor} strokeWidth="0.3"/>
                </g>
                {/* 纳塔 - 火山 */}
                <g transform="translate(530,200)">
                  <path d="M-12 15 L0 -10 L12 15Z" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                  <path d="M-6 10 L0 -3 L6 10Z" fill="none" stroke={themeColor} strokeWidth="0.3"/>
                  <circle cx="0" cy="-2" r="2" fill={themeColor}/>
                </g>
              </g>

              {/* 大陆轮廓 */}
              <path
                d="M100 200 Q150 120 200 100 Q280 60 350 80 Q420 100 480 60 Q540 20 600 50 Q650 80 630 150 Q610 220 550 250 Q480 280 400 260 Q320 240 250 260 Q180 280 120 250 Q80 230 100 200Z"
                fill="none"
                stroke={themeColor}
                strokeWidth="0.5"
                opacity="0.3"
                strokeDasharray="4 4"
              >
                <animate attributeName="strokeDashoffset" values="0;8" dur="2s" repeatCount="indefinite"/>
              </path>

              {/* 内部虚线区域 */}
              <path
                d="M130 190 Q170 130 220 110 Q290 80 350 95 Q410 110 470 80 Q520 50 570 70 Q610 95 600 150 Q580 210 530 235 Q470 260 400 245 Q330 230 260 245 Q190 260 140 235 Q105 215 130 190Z"
                fill="none"
                stroke={themeColor}
                strokeWidth="0.2"
                opacity="0.15"
                strokeDasharray="2 6"
              />

              {/* 连接线 - 各国之间 */}
              <path d="M150 160 Q200 145 250 180" stroke={themeColor} fill="none" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4"/>
              <path d="M250 180 Q275 200 300 220" stroke={themeColor} fill="none" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4"/>
              <path d="M250 180 Q300 155 350 130" stroke={themeColor} fill="none" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4"/>
              <path d="M300 220 Q375 180 450 150" stroke={themeColor} fill="none" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4"/>
              <path d="M450 150 Q500 175 530 200" stroke={themeColor} fill="none" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4"/>

              {/* 罗盘 */}
              <g transform="translate(620,30)" opacity="0.3">
                <circle cx="0" cy="0" r="18" fill="none" stroke={themeColor} strokeWidth="0.5"/>
                <polygon points="0,-16 4,-6 0,-8 -4,-6" fill={themeColor}/>
                <polygon points="0,16 4,6 0,8 -4,6" fill={themeColor} opacity="0.5"/>
                <text x="0" y="-22" textAnchor="middle" fill={themeColor} fontSize="7" fontWeight="bold">N</text>
                <line x1="-12" y1="0" x2="12" y2="0" stroke={themeColor} strokeWidth="0.3"/>
                <line x1="0" y1="-12" x2="0" y2="12" stroke={themeColor} strokeWidth="0.3"/>
                <line x1="-8" y1="-8" x2="8" y2="8" stroke={themeColor} strokeWidth="0.2"/>
                <line x1="8" y1="-8" x2="-8" y2="8" stroke={themeColor} strokeWidth="0.2"/>
              </g>

              {/* 各国标记点 */}
              {regions.map((region, i) => {
                const positions = [
                  { x: 150, y: 160 }, // 蒙德
                  { x: 250, y: 180 }, // 璃月
                  { x: 350, y: 130 }, // 稻妻
                  { x: 300, y: 220 }, // 须弥
                  { x: 450, y: 150 }, // 枫丹
                  { x: 520, y: 200 }, // 纳塔
                ];
                const pos = positions[i];
                return (
                  <g key={region.id}>
                    <circle
                      cx={pos.x} cy={pos.y} r="12"
                      fill={`${region.themeColor}10`}
                      opacity="0.3"
                    >
                      <animate attributeName="r" values="10;14;10" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
                    </circle>
                    <circle
                      cx={pos.x} cy={pos.y} r="5"
                      fill={`${region.themeColor}40`}
                      stroke={region.themeColor}
                      strokeWidth="1.5"
                    >
                      <animate attributeName="r" values="4;6;4" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
                    </circle>
                    <text
                      x={pos.x} y={pos.y - 12}
                      textAnchor="middle"
                      fill={region.themeColor}
                      fontSize="8"
                      opacity="0.7"
                      fontWeight="bold"
                    >
                      {region.name}
                    </text>
                    <text
                      x={pos.x} y={pos.y + 20}
                      textAnchor="middle"
                      fill={region.themeColor}
                      fontSize="6"
                      opacity="0.4"
                    >
                      {region.id === '蒙德' && '风'}
                      {region.id === '璃月' && '岩'}
                      {region.id === '稻妻' && '雷'}
                      {region.id === '须弥' && '草'}
                      {region.id === '枫丹' && '水'}
                      {region.id === '纳塔' && '火'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* 各国卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {regions.map((region, i) => (
            <Link to="/map" key={region.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative glass rounded-xl text-center transition-all duration-400 overflow-hidden"
                style={{
                  borderColor: `${region.themeColor}20`,
                }}
              >
                {/* 悬停光效 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse at center, ${region.themeColor}15, transparent)`,
                  }}
                />

              {/* 国家预览图 */}
              <div
                className="h-20 sm:h-24 flex items-center justify-center relative overflow-hidden"
                style={{ background: `${region.themeColor}10` }}
              >
                {region.id === '蒙德' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <path d="M30 50 L30 20 L50 5 L70 20 L70 50Z" fill="none" stroke={region.themeColor} strokeWidth="1.5"/>
                    <path d="M35 50 L35 25 L50 12 L65 25 L65 50Z" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.5"/>
                    <rect x="10" y="35" width="8" height="15" rx="1" fill={region.themeColor} opacity="0.3"/>
                    <rect x="82" y="30" width="8" height="20" rx="1" fill={region.themeColor} opacity="0.3"/>
                    <circle cx="50" cy="10" r="3" fill={region.themeColor} opacity="0.5"/>
                    <path d="M20 55 Q35 45 50 50 Q65 45 80 55" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.4"/>
                    <line x1="15" y1="40" x2="15" y2="20" stroke={region.themeColor} strokeWidth="0.5" opacity="0.3"/>
                    <line x1="85" y1="35" x2="85" y2="15" stroke={region.themeColor} strokeWidth="0.5" opacity="0.3"/>
                  </svg>
                )}
                {region.id === '璃月' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <path d="M10 55 L30 10 L50 35 L70 5 L90 55Z" fill="none" stroke={region.themeColor} strokeWidth="1.5"/>
                    <path d="M20 55 L35 22 L50 40 L65 18 L80 55Z" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.4"/>
                    <circle cx="70" cy="8" r="4" fill={region.themeColor} opacity="0.4"/>
                    <path d="M5 55 Q30 40 50 50 Q70 40 95 55" fill="none" stroke={region.themeColor} strokeWidth="0.8"/>
                    <rect x="42" y="42" width="16" height="3" rx="1" fill={region.themeColor} opacity="0.3"/>
                    <line x1="30" y1="10" x2="28" y2="18" stroke={region.themeColor} strokeWidth="0.5" opacity="0.4"/>
                    <line x1="70" y1="5" x2="68" y2="13" stroke={region.themeColor} strokeWidth="0.5" opacity="0.4"/>
                  </svg>
                )}
                {region.id === '稻妻' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <path d="M50 5 L60 25 L85 25 L65 40 L72 60 L50 48 L28 60 L35 40 L15 25 L40 25Z" fill="none" stroke={region.themeColor} strokeWidth="1.2"/>
                    <line x1="40" y1="10" x2="55" y2="30" stroke={region.themeColor} strokeWidth="0.8" opacity="0.6"/>
                    <line x1="60" y1="10" x2="45" y2="30" stroke={region.themeColor} strokeWidth="0.8" opacity="0.6"/>
                    <line x1="50" y1="5" x2="50" y2="25" stroke={region.themeColor} strokeWidth="0.5" opacity="0.4"/>
                    <path d="M10 55 Q30 45 50 52 Q70 45 90 55" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.3"/>
                    <rect x="40" y="41" width="20" height="2" rx="1" fill={region.themeColor} opacity="0.3"/>
                  </svg>
                )}
                {region.id === '须弥' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <circle cx="50" cy="25" r="18" fill="none" stroke={region.themeColor} strokeWidth="1.2"/>
                    <path d="M35 35 L25 55" stroke={region.themeColor} strokeWidth="1" opacity="0.5"/>
                    <path d="M65 35 L75 55" stroke={region.themeColor} strokeWidth="1" opacity="0.5"/>
                    <path d="M50 43 L50 55" stroke={region.themeColor} strokeWidth="1" opacity="0.5"/>
                    <path d="M20 45 Q30 52 40 48" fill="none" stroke={region.themeColor} strokeWidth="0.6" opacity="0.4"/>
                    <path d="M80 45 Q70 52 60 48" fill="none" stroke={region.themeColor} strokeWidth="0.6" opacity="0.4"/>
                    <circle cx="50" cy="25" r="10" fill="none" stroke={region.themeColor} strokeWidth="0.5" opacity="0.3"/>
                    <path d="M15 55 Q35 48 50 52 Q65 48 85 55" fill="none" stroke={region.themeColor} strokeWidth="0.8"/>
                  </svg>
                )}
                {region.id === '枫丹' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <path d="M20 55 Q30 15 50 25 Q70 15 80 55" fill="none" stroke={region.themeColor} strokeWidth="1.5"/>
                    <path d="M30 55 Q40 30 50 35 Q60 30 70 55" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.5"/>
                    <line x1="15" y1="30" x2="85" y2="30" stroke={region.themeColor} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3"/>
                    <circle cx="50" cy="22" r="5" fill="none" stroke={region.themeColor} strokeWidth="0.6" opacity="0.4"/>
                    <path d="M5 55 Q25 42 50 48 Q75 42 95 55" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.3"/>
                    <line x1="35" y1="18" x2="42" y2="30" stroke={region.themeColor} strokeWidth="0.5" opacity="0.4"/>
                    <line x1="65" y1="18" x2="58" y2="30" stroke={region.themeColor} strokeWidth="0.5" opacity="0.4"/>
                  </svg>
                )}
                {region.id === '纳塔' && (
                  <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                    <path d="M50 5 L55 20 L75 25 L60 35 L65 55 L50 45 L35 55 L40 35 L25 25 L45 20Z" fill="none" stroke={region.themeColor} strokeWidth="1.2"/>
                    <path d="M50 10 L53 22 L68 26 L57 34 L61 50 L50 42 L39 50 L43 34 L32 26 L47 22Z" fill="none" stroke={region.themeColor} strokeWidth="0.6" opacity="0.4"/>
                    <circle cx="50" cy="38" r="4" fill={region.themeColor} opacity="0.3"/>
                    <path d="M10 55 Q30 46 50 50 Q70 46 90 55" fill="none" stroke={region.themeColor} strokeWidth="0.8" opacity="0.3"/>
                    <path d="M40 8 L45 15" stroke={region.themeColor} strokeWidth="0.5" opacity="0.5"/>
                    <path d="M60 8 L55 15" stroke={region.themeColor} strokeWidth="0.5" opacity="0.5"/>
                    <rect x="44" y="43" width="12" height="2" rx="1" fill={region.themeColor} opacity="0.3"/>
                  </svg>
                )}
              </div>

              {/* 国家信息 */}
              <div className="p-3 sm:p-4 relative z-10">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto -mt-8 sm:-mt-10 mb-2 flex items-center justify-center text-base sm:text-lg transition-all duration-500 group-hover:scale-110 border-2 relative z-10"
                  style={{
                    background: `var(--theme-bg)`,
                    borderColor: region.themeColor,
                    color: region.themeColor,
                  }}
                >
                  {region.id === '蒙德' && '🍃'}
                  {region.id === '璃月' && '🪨'}
                  {region.id === '稻妻' && '⚡'}
                  {region.id === '须弥' && '🌿'}
                  {region.id === '枫丹' && '💧'}
                  {region.id === '纳塔' && '🔥'}
                </div>

                <h3 className="font-bold text-sm sm:text-base mb-0.5 transition-colors duration-300"
                  style={{ color: region.themeColor }}
                >
                  {region.name}
                </h3>
                <p className="text-[10px] sm:text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                  {region.title}
                </p>

                {/* 悬停装饰线 */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 transition-all duration-300"
                  style={{ background: region.themeColor }}
                />
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        className="border-t py-12 px-4"
        style={{ borderColor: `${themeColor}10` }}
      >
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block text-lg mb-3 animate-float"
              style={{ color: themeColor }}
            >
              ✦
            </span>
            <p className="mt-2 text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              提瓦特旅行笔记
            </p>
            <p className="text-xs mt-3" style={{ color: 'var(--theme-text-secondary)' }}>
              本网站为玩家攻略站，所有素材版权归 © 米哈游所有
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
              仅用于学习交流，不涉及任何商业用途
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
