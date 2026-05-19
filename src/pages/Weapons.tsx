import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { weapons } from '../data/weapons';

const weaponTypes = ['全部', '单手剑', '双手剑', '长柄武器', '法器', '弓'];

export default function WeaponsPage() {
  const { themeColor } = useTheme();
  const [activeType, setActiveType] = useState('全部');

  const filtered = useMemo(() => {
    if (activeType === '全部') return weapons;
    return weapons.filter(w => w.type === activeType);
  }, [activeType]);

  return (
    <div className="pt-24 pb-16">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            武器集录
          </h1>
          <p className="mb-8" style={{ color: 'var(--theme-text-secondary)' }}>
            全武器数据 · 适配角色推荐 · 共{weapons.length}把
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
          {weaponTypes.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className="px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: activeType === t ? `${themeColor}20` : 'rgba(255,255,255,0.05)',
                color: activeType === t ? themeColor : 'var(--theme-text-secondary)',
                border: `1px solid ${activeType === t ? themeColor : 'transparent'}`,
              }}
            >
              {t === '全部' ? '⚔️ 全部' : t}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w, i) => (
            <motion.div key={w.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]" style={{ borderColor: `${w.color}20` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg overflow-hidden shrink-0" style={{ background: `${w.color}15` }}>
                  <img
                    src={`/images/weapons/${encodeURIComponent(w.name)}.png`}
                    alt={w.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{w.name}</h3>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                    <span>{w.type}</span>
                    <span style={{ color: w.color }}>{'★'.repeat(w.rarity)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-2 text-xs">
                <span className="px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>攻击 {w.atk}</span>
                <span className="px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>{w.sub}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--theme-text-secondary)' }}>{w.desc}</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>适配：</span>
                {w.chars.map(c => (
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
