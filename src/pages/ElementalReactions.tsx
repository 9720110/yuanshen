import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { elementColors, elementIcons } from '../data/characters';

const reactions = [
  { name: '蒸发', type: '增幅', elements: ['Pyro', 'Hydro'] as const, icon: '💨', color: '#FF8844',
    desc: '火遇水或水遇火，造成额外倍率伤害。火打水1.5x，水打火2.0x。',
    formula: '伤害 × 反应倍率(1.5或2.0) × (1+精通加成+圣遗物加成)', chars: '胡桃、夜兰、行秋、香菱、达达利亚' },
  { name: '融化', type: '增幅', elements: ['Cryo', 'Pyro'] as const, icon: '❄️🔥', color: '#FF6644',
    desc: '冰遇火或火遇冰，造成额外倍率伤害。冰打火1.5x，火打冰2.0x。',
    formula: '伤害 × 反应倍率(1.5或2.0) × (1+精通加成+圣遗物加成)', chars: '甘雨、香菱、班尼特、神里绫华' },
  { name: '超载', type: '剧变', elements: ['Pyro', 'Electro'] as const, icon: '💥', color: '#FF8833',
    desc: '火遇雷引发爆炸，造成火元素范围伤害，击飞敌人。',
    formula: '反应基础伤害 × 精通加成 × 等级系数', chars: '可莉、雷电将军、香菱' },
  { name: '感电', type: '剧变', elements: ['Electro', 'Hydro'] as const, icon: '⚡💧', color: '#9966FF',
    desc: '雷遇水引发持续雷伤，每1秒对附着水元素的敌人造成雷伤，可同时波及周围水附着敌人。',
    formula: '反应基础伤害 × 精通加成 × 等级系数（每秒触发）', chars: '夜兰、雷电将军、行秋' },
  { name: '超导', type: '剧变', elements: ['Cryo', 'Electro'] as const, icon: '❄️⚡', color: '#88BBFF',
    desc: '冰遇雷引发冰元素范围伤害，并使敌人物理抗性降低40%，持续8秒。',
    formula: '反应基础伤害 × 精通加成，减物抗为固定效果', chars: '优菈、雷泽、神里绫华' },
  { name: '扩散', type: '剧变', elements: ['Anemo', 'any'] as const, icon: '🍃', color: '#55CC88',
    desc: '风遇其他元素，造成对应元素伤害并扩散附着到周围敌人，同时附带额外的元素附着。',
    formula: '反应基础伤害 × 精通加成，同时扩散元素附着', chars: '枫原万叶、砂糖、温迪' },
  { name: '结晶', type: '其他', elements: ['Geo', 'any'] as const, icon: '💎', color: '#D4A843',
    desc: '岩遇水火冰雷，生成对应元素的结晶盾。结晶盾对所有伤害有吸收效果。',
    formula: '护盾量基于等级和精通，对不同元素有250%吸收效果', chars: '钟离、阿贝多、诺艾尔' },
  { name: '燃烧', type: '剧变', elements: ['Dendro', 'Pyro'] as const, icon: '🔥🌿', color: '#FF6622',
    desc: '草遇火引发持续燃烧，每0.25秒造成火元素伤害，持续直到草元素附着消失。',
    formula: '反应基础伤害 × 精通加成 × 等级系数（每0.25秒）', chars: '纳西妲、香菱、班尼特' },
  { name: '绽放', type: '剧变', elements: ['Dendro', 'Hydro'] as const, icon: '🌱💧', color: '#66DD44',
    desc: '草遇水生成草原核。草原核最多同时存在5个，超过上限或6秒后爆炸造成草元素伤害。',
    formula: '反应基础伤害 × 精通加成 × 等级系数', chars: '纳西妲、妮露、行秋' },
  { name: '超绽放', type: '剧变', elements: ['Dendro', 'Hydro', 'Electro'] as const, icon: '⚡🌱', color: '#AA66FF',
    desc: '草原核遇雷转化为超绽放，射出追踪弹攻击最近的敌人，造成草元素伤害。',
    formula: '反应基础伤害 × 精通加成 × 等级系数（追踪弹）', chars: '纳西妲、久岐忍、雷电将军' },
  { name: '烈绽放', type: '剧变', elements: ['Dendro', 'Hydro', 'Pyro'] as const, icon: '🔥🌱', color: '#FF6644',
    desc: '草原核遇火转化为烈绽放，立即爆炸造成大范围草元素伤害。',
    formula: '反应基础伤害 × 精通加成 × 等级系数（范围更大）', chars: '纳西妲、可莉、香菱' },
  { name: '激化', type: '增幅', elements: ['Dendro', 'Electro'] as const, icon: '⚡🌿', color: '#77FF77',
    desc: '草遇雷进入激化状态，使后续的草/雷攻击获得伤害加成（蔓激化/超激化）。',
    formula: '激化状态本身无伤害，但触发蔓激化/超激化', chars: '纳西妲、八重神子、赛诺' },
  { name: '蔓激化', type: '增幅', elements: ['Dendro', 'Electro'] as const, icon: '🌿✨', color: '#44DD44',
    desc: '在激化状态下对敌人造成草元素伤害时，获得基于精通和等级的额外伤害加成。',
    formula: '基础伤害 + 精通加成×等级系数（草伤额外提升）', chars: '提纳里、纳西妲、艾尔海森' },
  { name: '超激化', type: '增幅', elements: ['Dendro', 'Electro'] as const, icon: '⚡✨', color: '#BB77FF',
    desc: '在激化状态下对敌人造成雷元素伤害时，获得基于精通和等级的额外伤害加成。',
    formula: '基础伤害 + 精通加成×等级系数（雷伤额外提升）', chars: '八重神子、赛诺、刻晴' },
];

const typeColors = { 增幅: '#FF6B35', 剧变: '#C07BFF', 其他: '#7BE0C0' };

export default function ElementalReactions() {
  const { themeColor } = useTheme();

  return (
    <div className="pt-24 pb-16">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-block text-6xl mb-4">🌀</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>元素反应</h1>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--theme-text-secondary)' }}>
            掌握元素反应的奥秘，是成为提瓦特顶尖旅行者的必经之路
          </p>
        </motion.div>

        {/* 元素轮 */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 mb-10 text-center" style={{ borderColor: `${themeColor}15` }}>
          <svg viewBox="0 0 240 240" className="w-48 h-48 mx-auto">
            {[['Pyro', '#FF4B4B', 120, 30], ['Hydro', '#4B9EFF', 180, 70], ['Electro', '#C07BFF', 190, 130], ['Cryo', '#7BE0FF', 140, 180], ['Dendro', '#7BFF7B', 60, 160], ['Anemo', '#7BE0C0', 20, 100], ['Geo', '#D4A843', 60, 40]].map(([el, color, cx, cy]) => (
              <g key={el as string}>
                <circle cx={cx as number} cy={cy as number} r="22" fill={`${color}35`} stroke={color} strokeWidth="2" />
                <image href={`/images/elements/${(el as string).toLowerCase()}.png`} x={(cx as number) - 14} y={(cy as number) - 14} width="28" height="28" />
              </g>
            ))}
            <text x="120" y="95" textAnchor="middle" fontSize="8" fill="var(--theme-text-secondary)">七元素</text>
            <text x="120" y="115" textAnchor="middle" fontSize="10" fill={themeColor} fontWeight="bold">反应循环</text>
            <circle cx="120" cy="100" r="45" fill="none" stroke={themeColor} strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
          </svg>
        </motion.div>

        {/* 反应卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reactions.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]" style={{ borderColor: `${r.color}30` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 gap-0.5" style={{ background: `${r.color}20` }}>
                  {r.elements.filter((_, idx) => idx < 3).map(el => (
                    <img
                      key={el}
                      src={`/images/elements/${el.toLowerCase()}.png`}
                      alt={el}
                      className={r.elements.length > 2 ? 'w-[18px] h-[18px]' : 'w-[22px] h-[22px]'}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{r.name}</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: `${typeColors[r.type]}20`, color: typeColors[r.type] }}>
                      {r.type}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    {r.elements.map(el => (
                      <span key={el} className="text-xs" style={{ color: elementColors[el] }}>{elementIcons[el]} {el}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs mb-2 leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{r.desc}</p>
              <div className="rounded-lg px-3 py-2 mb-2 text-[10px] font-mono" style={{ background: 'rgba(255,255,255,0.03)', color: themeColor }}>
                {r.formula}
              </div>
              <p className="text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>
                <span className="font-medium" style={{ color: themeColor }}>关键角色：</span>{r.chars}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 总结表 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>元素反应机制图解</h2>
          <div className="glass rounded-xl overflow-x-auto" style={{ borderColor: `${themeColor}15` }}>
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr style={{ background: `${themeColor}10` }}>
                  {['反应类型', '元素组合', '分类', '效果', '关键角色'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: themeColor }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reactions.map((r, i) => (
                  <tr key={r.name} className="border-t" style={{ borderColor: `${themeColor}10` }}>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3">{r.elements.map(e => elementIcons[e]).join(' + ')}</td>
                    <td className="px-4 py-3"><span style={{ color: typeColors[r.type] }}>{r.type}</span></td>
                    <td className="px-4 py-3" style={{ color: 'var(--theme-text-secondary)' }}>{r.desc.slice(0, 40)}...</td>
                    <td className="px-4 py-3 text-[10px]" style={{ color: 'var(--theme-text-secondary)' }}>{r.chars.slice(0, 20)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
