import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { artifactSets } from '../data/artifacts';

export default function ArtifactsPage() {
  const { themeColor } = useTheme();
  const [filter, setFilter] = useState<'all' | 2 | 4>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return artifactSets;
    return artifactSets.filter(s => s.pieces === filter);
  }, [filter]);

  return (
    <div className="pt-24 pb-16">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            圣遗物
          </h1>
          <p className="mb-8" style={{ color: 'var(--theme-text-secondary)' }}>
            套装效果 · 词条推荐 · 刷取指南 · 共{artifactSets.length}套
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
          {[{ id: 'all' as const, label: '💎 全部' }, { id: 2 as const, label: '2件套' }, { id: 4 as const, label: '4件套' }].map(f => (
            <button key={String(f.id)} onClick={() => setFilter(f.id)}
              className="px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all"
              style={{
                background: filter === f.id ? `${themeColor}20` : 'rgba(255,255,255,0.05)',
                color: filter === f.id ? themeColor : 'var(--theme-text-secondary)',
                border: `1px solid ${filter === f.id ? themeColor : 'transparent'}`,
              }}
            >{f.label}</button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((set, i) => (
            <motion.div key={set.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]" style={{ borderColor: `${set.color}20` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg overflow-hidden shrink-0" style={{ background: `${set.color}15` }}>
                  <img
                    src={`/images/artifacts/${encodeURIComponent(set.name)}.png`}
                    alt={set.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{set.name}</h3>
                  <span className="text-xs" style={{ color: set.color }}>{set.pieces}件套</span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="font-medium" style={{ color: set.color }}>2件：</span>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>{set.bonus2}</span>
                </div>
                {set.pieces >= 4 && (
                  <div className="text-xs rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="font-medium" style={{ color: set.color }}>4件：</span>
                    <span style={{ color: 'var(--theme-text-secondary)' }}>{set.bonus4}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>适配：</span>
                {set.chars.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded text-[10px]" style={{ background: `${themeColor}12`, color: themeColor }}>{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
