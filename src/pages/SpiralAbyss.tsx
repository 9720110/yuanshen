import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const abyssTeams = [
  { name: '雷神国家队', chars: ['雷电将军', '行秋', '香菱', '班尼特'], desc: '造价亲民、循环流畅，雷神前台充能，四星战神后台输出，深渊常青树。', tips: '优先保证班尼特和香菱的充能，雷神开大后A到Q结束再切人循环。' },
  { name: '胡行钟夜', chars: ['胡桃', '行秋', '钟离', '夜兰'], desc: '双水共鸣加生命，胡桃顶级蒸发队，对单爆发极高，深渊BOSS层的首选。', tips: '钟离长E护盾，夜兰EQ接行秋EQ，最后胡桃E输出。注意胡桃E时间只有9秒。' },
  { name: '神鹤万心', chars: ['神里绫华', '申鹤', '枫原万叶', '珊瑚宫心海'], desc: '永冻队完全体，神里大招核爆，心海长时间挂水，面对可冻结敌人无敌。', tips: '心海E→万叶EQ→申鹤EQ→神里E闪Q。申鹤提供冰伤加成，神里大招全中伤害爆炸。' },
  { name: '妮露绽放队', chars: ['妮露', '纳西妲', '行秋', '珊瑚宫心海'], desc: '妮露天赋强化丰穰之核，群伤极高，对群环境统治级表现。', tips: '全队堆生命和精通，妮露EEE接纳西妲EQ，水草角色持续触发绽放。' },
  { name: '万达国际', chars: ['枫原万叶', '达达利亚', '香菱', '班尼特'], desc: '双扩散双增伤，公子近战蒸发，对群对单都有不错的表现。', tips: '班尼特Q→万叶EQ→香菱EQ→公子EQ。需要练好双扩散手法，充能要有保障。' },
  { name: '提八纳钟', chars: ['提纳里', '八重神子', '纳西妲', '钟离'], desc: '提纳里速切蔓激化，八重后台雷，纳西妲精通拐，全自动索敌。', tips: '纳西妲EQ→钟离E→八重EEE→提纳里EQ。提纳里重击速射打完就切人。' },
  { name: '一斗岩队', chars: ['荒泷一斗', '钟离', '五郎', '阿贝多'], desc: '纯岩队，无视元素盾，一斗防御转攻击，开大后重击循环简单粗暴。', tips: '五郎EQ→钟离E→阿贝多E→一斗EQ。优先保证一斗的充能，五郎最好满命。' },
  { name: '那芙万钟', chars: ['那维莱特', '芙宁娜', '枫原万叶', '钟离'], desc: '那维莱特重击生命倍率，芙宁娜全队增伤，当前版本顶级强队。', tips: '钟离E→芙宁娜EQ→万叶EQ→那维莱特EQ长按重击。注意那维莱特闪避会中断重击。' },
];

const floors = [
  { floor: '9-10层', icon: '🌙', color: '#7BE0C0', desc: '难度较低，怪物等级约85-90级。主要考验基础练度和元素克制。', recommend: '任意成型队伍均可轻松通过，注意每层BUFF选择。', elements: ['Pyro', 'Hydro', 'Cryo'] },
  { floor: '11层', icon: '🌓', color: '#D4A843', desc: '难度中等，怪物等级约92-95级。开始需要针对性配队和处理机制。', recommend: '注意每间的怪物分布，上半群怪多/下半BOSS多的情况合理分配队伍。', elements: ['Electro', 'Pyro', 'Anemo'] },
  { floor: '12层', icon: '🌑', color: '#FF4B4B', desc: '最高难度，怪物等级100+级。需要成熟的配队和优秀的操作。', recommend: '关注当期深渊的怪物配置和渊月祝福。12-1上半多群怪，下半多为BOSS或精英怪。', elements: ['Dendro', 'Hydro', 'Cryo'] },
];

export default function SpiralAbyss() {
  const { themeColor } = useTheme();

  return (
    <div className="pt-24 pb-16">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-block text-6xl mb-4">🏆</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>深境螺旋</h1>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--theme-text-secondary)' }}>
            每月刷新 · 挑战最强 · 满星通关指南
          </p>
        </motion.div>

        {/* 楼层说明 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {floors.map((f, i) => (
            <motion.div key={f.floor} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5" style={{ borderColor: `${f.color}20` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{f.icon}</span>
                <h3 className="font-bold" style={{ color: f.color }}>{f.floor}</h3>
              </div>
              <p className="text-xs mb-2 leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{f.desc}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--theme-text-secondary)' }}>{f.recommend}</p>
              <div className="flex gap-1">
                {f.elements.map(el => (
                  <span key={el} className="px-2 py-0.5 rounded text-[10px]" style={{ background: `${themeColor}12`, color: themeColor }}>{el}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 渊月祝福 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-xl p-6 mb-10 text-center" style={{ borderColor: `${themeColor}15` }}>
          <h2 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>🌙 当期渊月祝福</h2>
          <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
            角色触发绽放、超绽放、烈绽放后，全队角色造成的伤害提升20%，持续10秒。该效果每1秒至多触发一次。
          </p>
        </motion.div>

        {/* 当期Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-xl p-6 mb-10" style={{ borderColor: `${themeColor}15` }}>
          <h2 className="font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-display)' }}>🎯 本期深渊Tips</h2>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
            <li className="flex items-start gap-2"><span style={{ color: themeColor }}>•</span> 12-1上半推荐群伤队伍（如妮露绽放、雷神国家队），下半推荐单体爆发（如胡行钟夜）</li>
            <li className="flex items-start gap-2"><span style={{ color: themeColor }}>•</span> 12-2上半有雷音权现，推荐带强力火C或冰C；下半有恒常机关阵列，需要高爆发</li>
            <li className="flex items-start gap-2"><span style={{ color: themeColor }}>•</span> 12-3上半推荐永冻队，下半草系队伍表现优秀</li>
            <li className="flex items-start gap-2"><span style={{ color: themeColor }}>•</span> 建议上半带聚怪角色（温迪/万叶/砂糖），可以大幅降低难度</li>
          </ul>
        </motion.div>

        {/* 推荐配队 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>👥 热门配队推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {abyssTeams.map((team, i) => (
              <motion.div key={team.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5" style={{ borderColor: `${themeColor}15` }}>
                <h3 className="font-bold mb-2" style={{ color: themeColor }}>{team.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {team.chars.map(c => (
                    <Link key={c} to={`/character/${encodeURIComponent(c)}`}
                      className="px-2 py-0.5 rounded text-[11px] font-medium transition-colors hover:bg-white/10"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--theme-text)' }}>
                      {c}
                    </Link>
                  ))}
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--theme-text-secondary)' }}>{team.desc}</p>
                <div className="rounded-lg px-3 py-2 text-[10px]" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--theme-text-secondary)' }}>
                  <span className="font-medium" style={{ color: themeColor }}>操作要点：</span>{team.tips}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
