export interface ArtifactSet {
  name: string;
  pieces: number;
  bonus2: string;
  bonus4: string;
  color: string;
  chars: string[];
}

export const artifactSets: ArtifactSet[] = [
  { name: '绝缘之旗印', pieces: 4, bonus2: '元素充能效率提高20%', bonus4: '基于元素充能效率提高大招伤害，每25%充能提升10%伤害，最多75%', color: '#C07BFF', chars: ['雷电将军', '香菱', '夜兰', '行秋'] },
  { name: '魔女四件套', pieces: 4, bonus2: '火元素伤害加成提高15%', bonus4: '超载燃烧伤害提高40%，蒸发融化加成提高15%，E后2件套效果提升50%', color: '#FF4B4B', chars: ['可莉', '胡桃', '迪卢克'] },
  { name: '冰封迷途的勇士', pieces: 4, bonus2: '冰元素伤害加成提高15%', bonus4: '攻击冰元素影响下的敌人暴击率提高20%，冻结额外提高20%', color: '#7BE0FF', chars: ['甘雨', '神里绫华'] },
  { name: '千岩牢固', pieces: 4, bonus2: '生命值上限提高20%', bonus4: 'E技能命中后全队攻击力提升20%，护盾强效提升30%', color: '#D4A843', chars: ['钟离', '珊瑚宫心海'] },
  { name: '翠绿之影', pieces: 4, bonus2: '风元素伤害加成提高15%', bonus4: '扩散反应伤害提高60%，降低敌人对应元素抗性40%', color: '#7BE0C0', chars: ['枫原万叶', '砂糖', '温迪'] },
  { name: '深林的记忆', pieces: 4, bonus2: '草元素伤害加成提高15%', bonus4: 'E或Q命中后降低敌人30%草抗', color: '#7BFF7B', chars: ['纳西妲', '提纳里'] },
  { name: '悠古的磐岩', pieces: 4, bonus2: '岩元素伤害加成提高15%', bonus4: '获得结晶晶片后全队获得对应元素伤害加成35%', color: '#D4A843', chars: ['钟离', '阿贝多'] },
  { name: '沉沦之心', pieces: 4, bonus2: '水元素伤害加成提高15%', bonus4: '使用E技能后普攻重击伤害提升30%', color: '#4B9EFF', chars: ['达达利亚', '神里绫人'] },
  { name: '苍白之火', pieces: 4, bonus2: '物理伤害提高25%', bonus4: 'E命中2次后攻击力提升18%，物理伤害额外提升25%', color: '#AA8866', chars: ['优菈', '雷泽'] },
  { name: '追忆之注连', pieces: 4, bonus2: '攻击力提高18%', bonus4: '释放E时能量≥15点则消耗15点能量使普攻重击下落攻击伤害提升50%', color: '#CC6644', chars: ['胡桃', '宵宫'] },
  { name: '辰砂往生录', pieces: 4, bonus2: '攻击力提高18%', bonus4: '开大后攻击力提升8%，损失生命时额外提升10%，最多4层', color: '#CC4444', chars: ['魈'] },
  { name: '来歆余响', pieces: 4, bonus2: '攻击力提高18%', bonus4: '普攻命中后36%概率触发伤害提升，为攻击力的70%', color: '#88AACC', chars: ['神里绫人', '宵宫'] },
  { name: '黄金剧团', pieces: 4, bonus2: 'E技能伤害提高20%', bonus4: 'E技能伤害提升25%，处于后台时额外提升25%', color: '#DDAA44', chars: ['芙宁娜', '八重神子', '菲谢尔'] },
  { name: '逐影猎人', pieces: 4, bonus2: '普攻重击伤害提高15%', bonus4: '生命值变动时暴击率提升12%，持续5秒，最多3层', color: '#3366BB', chars: ['那维莱特', '达达利亚'] },
  { name: '花海甘露之光', pieces: 4, bonus2: '生命值提高20%', bonus4: 'E或Q伤害提升10%，受到伤害后上述效果提升80%', color: '#44AACC', chars: ['芙宁娜', '那维莱特'] },
];
