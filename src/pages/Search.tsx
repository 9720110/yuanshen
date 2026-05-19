import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { characters, elementIcons, elementColors } from '../data/characters';
import { weapons } from '../data/weapons';
import { artifactSets } from '../data/artifacts';

type SearchResult = { type: '角色'; data: typeof characters[0] } | { type: '武器'; data: typeof weapons[0] } | { type: '圣遗物'; data: typeof artifactSets[0] };

export default function Search() {
  const { themeColor } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { chars: characters.slice(0, 6), weapons: weapons.slice(0, 4), artifacts: artifactSets.slice(0, 4), searching: false };
    const q = query.toLowerCase();
    return {
      chars: characters.filter(c => c.name.includes(q) || c.title.includes(q) || c.element.toLowerCase().includes(q) || c.region.includes(q)).slice(0, 8),
      weapons: weapons.filter(w => w.name.includes(q) || w.type.includes(q) || w.chars.some(c => c.includes(q))).slice(0, 6),
      artifacts: artifactSets.filter(a => a.name.includes(q) || a.chars.some(c => c.includes(q))).slice(0, 6),
      searching: true,
    };
  }, [query]);

  const hasAny = results.chars.length > 0 || results.weapons.length > 0 || results.artifacts.length > 0;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="page-container max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            🔍 全局搜索
          </h1>
          <p className="text-sm text-center" style={{ color: 'var(--theme-text-secondary)' }}>
            搜索角色、武器、圣遗物 · 按 Ctrl+K 快速唤出
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="glass rounded-2xl p-1" style={{ borderColor: `${themeColor}30` }}>
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
              placeholder="输入角色名、武器名、圣遗物名..."
              className="w-full px-6 py-4 text-base sm:text-lg bg-transparent outline-none rounded-xl"
              style={{ color: 'var(--theme-text)' }}
            />
          </div>
        </motion.div>

        {!query.trim() ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
              试试搜索「胡桃」、「雾切」、「绝缘」...
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['胡桃', '雷电将军', '纳西妲', '雾切', '绝缘'].map(s => (
                <button key={s} onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
                  style={{ background: `${themeColor}12`, color: themeColor, border: `1px solid ${themeColor}25` }}>
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : !hasAny ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-5xl mb-4">😕</div>
            <p className="font-semibold mb-1">未找到相关结果</p>
            <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>试试换个关键词搜索</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {results.chars.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>👥</span> 角色 <span className="text-xs font-normal" style={{ color: 'var(--theme-text-secondary)' }}>({results.chars.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.chars.map(c => (
                    <Link key={c.id} to={`/character/${c.id}`}
                      className="glass rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                      style={{ borderColor: `${c.themeColor}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${c.themeColor}15` }}>
                        {elementIcons[c.element]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{c.name}</span>
                          <span className="text-[10px]" style={{ color: c.rarity === 5 ? '#D4A843' : '#A078C0' }}>{'★'.repeat(c.rarity)}</span>
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--theme-text-secondary)' }}>{c.title} · {c.region}</p>
                      </div>
                      <span className="text-sm" style={{ color: elementColors[c.element] }}>{c.element}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.weapons.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>⚔️</span> 武器 <span className="text-xs font-normal" style={{ color: 'var(--theme-text-secondary)' }}>({results.weapons.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.weapons.map(w => (
                    <div key={w.name} className="glass rounded-xl p-4 flex items-center gap-3" style={{ borderColor: `${w.color}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${w.color}15` }}>
                        {w.type === '单手剑' ? '🗡️' : w.type === '双手剑' ? '⚔️' : w.type === '长柄武器' ? '🔱' : w.type === '法器' ? '📕' : '🏹'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{w.name}</span>
                          <span className="text-[10px]" style={{ color: w.color }}>{'★'.repeat(w.rarity)}</span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>{w.type} · {w.atk}攻击 · {w.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {results.artifacts.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>💎</span> 圣遗物 <span className="text-xs font-normal" style={{ color: 'var(--theme-text-secondary)' }}>({results.artifacts.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.artifacts.map(a => (
                    <div key={a.name} className="glass rounded-xl p-4 flex items-center gap-3" style={{ borderColor: `${a.color}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: `${a.color}15` }}>💎</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{a.name}</span>
                          <span className="text-[10px]" style={{ color: a.color }}>{a.pieces}件套</span>
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--theme-text-secondary)' }}>{a.bonus2}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
