import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { mapPins, regions } from '../data/regions';

const pinTypes = [
  { id: 'all', label: '全部', icon: '🗺️' },
  { id: 'oculus', label: '神瞳', icon: '💠' },
  { id: 'chest', label: '宝箱', icon: '📦' },
  { id: 'boss', label: 'BOSS', icon: '🐉' },
  { id: 'material', label: '材料', icon: '🌿' },
  { id: 'domain', label: '秘境', icon: '🏛️' },
  { id: 'waypoint', label: '传送点', icon: '🗿' },
  { id: 'puzzle', label: '解谜', icon: '🧩' },
];

const regionFilters = ['全部', ...regions.map(r => r.name)];

const regionMapPositions: Record<string, { x: number; y: number; rx: number; ry: number }> = {
  '蒙德': { x: 22, y: 28, rx: 14, ry: 12 },
  '璃月': { x: 30, y: 68, rx: 14, ry: 12 },
  '稻妻': { x: 52, y: 20, rx: 12, ry: 10 },
  '须弥': { x: 42, y: 55, rx: 16, ry: 14 },
  '枫丹': { x: 62, y: 38, rx: 10, ry: 10 },
  '纳塔': { x: 70, y: 58, rx: 12, ry: 10 },
};

export default function MapPage() {
  const { themeColor } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRegion, setActiveRegion] = useState('全部');
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [collected, setCollected] = useState<string[]>([]);

  const filteredPins = useMemo(() => {
    return mapPins.filter(pin => {
      if (activeFilter !== 'all' && pin.type !== activeFilter) return false;
      if (activeRegion !== '全部' && pin.region !== activeRegion) return false;
      return true;
    });
  }, [activeFilter, activeRegion]);

  const toggleCollected = (id: string) => {
    setCollected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalOculus = mapPins.filter(p => p.type === 'oculus').length;
  const collectedOculus = mapPins.filter(p => p.type === 'oculus' && collected.includes(p.id)).length;

  return (
    <div className="pt-16">
      {/* Map Container */}
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        {/* Map Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, ${themeColor}10 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, #7BE0C010 0%, transparent 50%),
              linear-gradient(180deg, #0F0D1A 0%, #1A1728 50%, #0F0D1A 100%)
            `,
          }}
        >
          {/* Grid lines for map feel */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Map content area */}
        <div className="relative h-full overflow-auto">
          <div className="relative w-full max-w-[1000px] aspect-[5/4] mx-auto mt-4 sm:mt-8 rounded-xl sm:rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${themeColor}20`,
              background: `radial-gradient(ellipse at center, ${themeColor}08, transparent)`,
            }}
          >
            {/* Region area overlays */}
            {regions.map(region => {
              const pos = regionMapPositions[region.name];
              if (!pos) return null;
              return (
                <div
                  key={region.name}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: `${pos.x - pos.rx}%`,
                    top: `${pos.y - pos.ry}%`,
                    width: `${pos.rx * 2}%`,
                    height: `${pos.ry * 2}%`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `radial-gradient(ellipse, ${region.themeColor}12, transparent 70%)`,
                      border: `1px solid ${region.themeColor}12`,
                    }}
                  />
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold tracking-widest"
                    style={{ color: `${region.themeColor}25`, fontSize: 'clamp(10px, 1.2vw, 16px)' }}
                  >
                    {region.name}
                  </span>
                </div>
              );
            })}

            {/* Terrain illustration */}
            <div className="absolute inset-0 opacity-[0.08]">
              <svg viewBox="0 0 1000 800" className="w-full h-full">
                {/* 大陆板块 */}
                <path d="M50 400 Q150 200 300 150 Q450 100 600 150 Q750 200 850 350 Q950 500 900 650 Q850 750 700 700 Q500 650 350 700 Q200 750 100 650 Q50 550 50 400Z" fill={themeColor} opacity="0.2"/>
                <path d="M100 350 Q200 220 350 180 Q500 140 650 200 Q750 250 800 400 Q850 550 800 650 Q700 680 500 650 Q300 620 150 600 Q80 550 100 350Z" fill={themeColor} opacity="0.08"/>

                {/* 山脉 */}
                <path d="M200 250 L220 200 L240 230 L260 180 L280 220 L300 190 L320 240" stroke={themeColor} fill="none" strokeWidth="1.5" opacity="0.3"/>
                <path d="M500 350 L520 300 L540 330 L560 280 L580 320 L600 290 L620 340" stroke={themeColor} fill="none" strokeWidth="1.5" opacity="0.3"/>
                <path d="M300 500 L320 460 L340 490 L360 450 L380 480" stroke={themeColor} fill="none" strokeWidth="1" opacity="0.2"/>

                {/* 河流 */}
                <path d="M350 180 Q380 300 420 350 Q460 400 400 500 Q380 550 450 650 Q480 700 500 750" stroke={themeColor} fill="none" strokeWidth="1" opacity="0.15" strokeDasharray="4 6"/>
                <path d="M600 200 Q580 300 550 380 Q520 420 560 500 Q580 550 550 650" stroke={themeColor} fill="none" strokeWidth="0.8" opacity="0.12" strokeDasharray="3 5"/>

                {/* 地形等高线 */}
                <ellipse cx="200" cy="300" rx="100" ry="60" stroke={themeColor} fill="none" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3"/>
                <ellipse cx="500" cy="250" rx="80" ry="50" stroke={themeColor} fill="none" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3"/>
                <ellipse cx="350" cy="600" rx="120" ry="70" stroke={themeColor} fill="none" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3"/>
                <ellipse cx="650" cy="450" rx="90" ry="60" stroke={themeColor} fill="none" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3"/>

                {/* 罗盘 */}
                <g transform="translate(880,80)" opacity="0.3">
                  <circle cx="0" cy="0" r="28" fill="none" stroke={themeColor} strokeWidth="0.8"/>
                  <polygon points="0,-24 5,-8 0,-12 -5,-8" fill={themeColor}/>
                  <polygon points="0,24 5,8 0,12 -5,8" fill={themeColor} opacity="0.4"/>
                  <text x="0" y="-32" textAnchor="middle" fill={themeColor} fontSize="10" fontWeight="bold">N</text>
                  <line x1="-18" y1="0" x2="18" y2="0" stroke={themeColor} strokeWidth="0.4"/>
                  <line x1="0" y1="-18" x2="0" y2="18" stroke={themeColor} strokeWidth="0.4"/>
                </g>
              </svg>
            </div>

            {/* Map Pins */}
            {filteredPins.map(pin => {
              const isCollected = collected.includes(pin.id);
              const isSelected = selectedPin === pin.id;
              return (
                <div
                  key={pin.id}
                  className="absolute cursor-pointer transition-all duration-300 group"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isCollected ? 0.4 : 1,
                    filter: isCollected ? 'grayscale(1)' : 'none',
                  }}
                  onClick={() => setSelectedPin(isSelected ? null : pin.id)}
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`text-xl sm:text-2xl ${isCollected ? '' : 'drop-shadow-lg'}`}
                    style={{
                      filter: isCollected ? 'none' : `drop-shadow(0 0 8px ${themeColor}60)`,
                    }}
                  >
                    {pin.icon}
                  </motion.div>
                  <span
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: themeColor }}
                  >
                    {pin.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pin Detail Popup */}
        <AnimatePresence>
          {selectedPin && (() => {
            const pin = mapPins.find(p => p.id === selectedPin);
            if (!pin) return null;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-2xl p-5 shadow-2xl w-[90vw] max-w-sm z-10"
                style={{ border: `1px solid ${themeColor}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{pin.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm">{pin.name}</h3>
                    <span className="text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>
                      {pin.type === 'oculus' && '神瞳'}
                      {pin.type === 'chest' && '宝箱'}
                      {pin.type === 'boss' && 'BOSS'}
                      {pin.type === 'material' && '采集材料'}
                      {pin.type === 'domain' && '秘境'}
                      {pin.type === 'waypoint' && '传送点'}
                      {pin.type === 'puzzle' && '解谜'}
                    </span>
                  </div>
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--theme-text-secondary)' }}>
                  {pin.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleCollected(pin.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: collected.includes(pin.id)
                        ? 'rgba(255,255,255,0.05)'
                        : `${themeColor}20`,
                      color: collected.includes(pin.id)
                        ? 'var(--theme-text-secondary)'
                        : themeColor,
                      border: `1px solid ${collected.includes(pin.id) ? 'transparent' : themeColor}`,
                    }}
                  >
                    {collected.includes(pin.id) ? '✓ 已收集' : '标记为已收集'}
                  </button>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="px-4 py-2 rounded-lg text-xs"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--theme-text-secondary)' }}
                  >
                    关闭
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Overlay Controls */}
        <div className="absolute top-20 left-2 sm:top-24 sm:left-4 md:left-8 space-y-2 max-w-[160px] sm:max-w-[180px] z-10">
          <div className="glass rounded-xl p-2 sm:p-3" style={{ borderColor: `${themeColor}15` }}>
            <p className="text-[10px] font-semibold mb-1.5 sm:mb-2" style={{ color: themeColor }}>图层筛选</p>
            <div className="flex flex-wrap gap-1">
              {pinTypes.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => setActiveFilter(pt.id)}
                  className="px-1.5 sm:px-2 py-1 rounded-lg text-[9px] sm:text-[10px] transition-all leading-tight"
                  style={{
                    background: activeFilter === pt.id ? `${themeColor}20` : 'rgba(255,255,255,0.05)',
                    color: activeFilter === pt.id ? themeColor : 'var(--theme-text-secondary)',
                  }}
                >
                  {pt.icon} {pt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-2 sm:p-3" style={{ borderColor: `${themeColor}15` }}>
            <p className="text-[10px] font-semibold mb-1.5 sm:mb-2" style={{ color: themeColor }}>地区</p>
            <div className="flex gap-1">
              {regionFilters.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className="px-2 py-1 rounded-lg text-[9px] sm:text-[10px] transition-all flex-1"
                  style={{
                    background: activeRegion === r ? `${themeColor}20` : 'rgba(255,255,255,0.05)',
                    color: activeRegion === r ? themeColor : 'var(--theme-text-secondary)',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute top-20 right-2 sm:top-24 sm:right-4 md:right-8 glass rounded-xl p-2 sm:p-3 z-10"
          style={{ borderColor: `${themeColor}15` }}
        >
          <p className="text-[9px] sm:text-[10px] font-semibold mb-0.5 sm:mb-1" style={{ color: themeColor }}>探索进度</p>
          <p className="text-base sm:text-lg font-bold">{collectedOculus}/{totalOculus}</p>
          <p className="text-[9px] sm:text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>风神瞳</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 z-10"
          style={{ borderColor: `${themeColor}10` }}
        >
          <p className="text-[9px]" style={{ color: 'var(--theme-text-secondary)' }}>
            💠 神瞳 | 📦 宝箱 | 🐉 BOSS | 🌿 材料 | 🗿 传送
          </p>
        </div>
      </div>
    </div>
  );
}
