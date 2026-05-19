export interface Weapon {
  name: string;
  type: '单手剑' | '双手剑' | '长柄武器' | '法器' | '弓';
  rarity: 4 | 5;
  color: string;
  atk: number;
  sub: string;
  desc: string;
  chars: string[];
}

export const weapons: Weapon[] = [
  { name: '雾切之回光', type: '单手剑', rarity: 5, color: '#D4A843', atk: 674, sub: '爆伤44.1%', desc: '获得12%元素伤害加成，叠加3层提升至28%。', chars: ['神里绫华', '刻晴'] },
  { name: '薙草之稻光', type: '长柄武器', rarity: 5, color: '#D4A843', atk: 608, sub: '充能55.1%', desc: '充能效率超过100%的部分转化为攻击力，开大后充能提升30%。', chars: ['雷电将军', '香菱'] },
  { name: '和璞鸢', type: '长柄武器', rarity: 5, color: '#D4A843', atk: 674, sub: '暴击22.1%', desc: '命中敌人时攻击力提升，最多7层，满层额外伤害。', chars: ['魈', '赛诺'] },
  { name: '天空之翼', type: '弓', rarity: 5, color: '#D4A843', atk: 674, sub: '暴击22.1%', desc: '暴击伤害提高20%，有概率造成额外物理伤害。', chars: ['甘雨', '达达利亚'] },
  { name: '四风原典', type: '法器', rarity: 5, color: '#D4A843', atk: 608, sub: '暴击33.1%', desc: '移动速度提升10%，站场获得元素伤害加成。', chars: ['可莉', '流浪者'] },
  { name: '松籁响起之时', type: '双手剑', rarity: 5, color: '#D4A843', atk: 741, sub: '物伤20.7%', desc: '攻击力提升20%，触发效果后全队攻速提升。', chars: ['优菈', '迪卢克'] },
  { name: '若水', type: '弓', rarity: 5, color: '#D4A843', atk: 542, sub: '爆伤88.2%', desc: '生命值提升16%，周围存在敌人时伤害提升20%。', chars: ['夜兰', '达达利亚'] },
  { name: '神乐之真意', type: '法器', rarity: 5, color: '#D4A843', atk: 608, sub: '爆伤66.2%', desc: '施放E技能获得神乐舞效果，元素伤害提升12%，持续16秒。', chars: ['八重神子', '纳西妲'] },
  { name: '裁叶萃光', type: '单手剑', rarity: 5, color: '#D4A843', atk: 542, sub: '爆伤88.2%', desc: '暴击率提升4%，普攻造成元素伤害时基于精通提升伤害。', chars: ['艾尔海森', '刻晴'] },
  { name: '静涌涌泉', type: '单手剑', rarity: 5, color: '#D4A843', atk: 542, sub: '暴击44.1%', desc: '生命值提升20%，E技能命中后基于生命提升普攻伤害。', chars: ['芙宁娜'] },
  { name: '万世流涌大典', type: '法器', rarity: 5, color: '#D4A843', atk: 542, sub: '爆伤88.2%', desc: '生命值提升16%，生命值变动时重击伤害提升14%。', chars: ['那维莱特'] },
  { name: '原木刀', type: '单手剑', rarity: 4, color: '#A078C0', atk: 565, sub: '充能30.6%', desc: '触发草元素反应后获得种叶，拾取后提升元素精通。', chars: ['班尼特', '枫原万叶'] },
  { name: '祭礼剑', type: '单手剑', rarity: 4, color: '#A078C0', atk: 454, sub: '充能61.3%', desc: 'E技能造成伤害后有概率重置冷却。', chars: ['行秋', '枫原万叶'] },
  { name: '西风剑', type: '单手剑', rarity: 4, color: '#A078C0', atk: 454, sub: '充能61.3%', desc: '暴击时产生元素微粒，恢复能量。', chars: ['班尼特', '琴'] },
  { name: '西风长枪', type: '长柄武器', rarity: 4, color: '#A078C0', atk: 565, sub: '充能30.6%', desc: '暴击时产生元素微粒。', chars: ['雷电将军', '香菱', '钟离'] },
  { name: '匣里灭辰', type: '长柄武器', rarity: 4, color: '#A078C0', atk: 454, sub: '精通221', desc: '处于水或火元素影响下的敌人，造成的伤害提升20%。', chars: ['胡桃', '香菱'] },
  { name: '祭礼弓', type: '弓', rarity: 4, color: '#A078C0', atk: 565, sub: '充能30.6%', desc: 'E技能造成伤害后有概率重置冷却。', chars: ['迪奥娜', '九条裟罗'] },
  { name: '绝弦', type: '弓', rarity: 4, color: '#A078C0', atk: 510, sub: '精通165', desc: 'E技能和Q技能伤害提升24%。', chars: ['枫原万叶', '温迪', '夜兰'] },
  { name: '流浪乐章', type: '法器', rarity: 4, color: '#A078C0', atk: 510, sub: '爆伤55.1%', desc: '登场时随机获得攻击力/元素伤害/元素精通大幅提升。', chars: ['可莉', '纳西妲', '那维莱特'] },
  { name: '祭礼大剑', type: '双手剑', rarity: 4, color: '#A078C0', atk: 565, sub: '充能30.6%', desc: 'E技能造成伤害后有概率重置冷却。', chars: ['重云', '北斗'] },
  { name: '西风大剑', type: '双手剑', rarity: 4, color: '#A078C0', atk: 565, sub: '充能30.6%', desc: '暴击时产生元素微粒。', chars: ['诺艾尔', '北斗'] },
  { name: '笛剑', type: '单手剑', rarity: 4, color: '#A078C0', atk: 510, sub: '攻击41.3%', desc: '普攻命中积攒和声，满5次造成范围伤害。', chars: ['琴', '旅行者'] },
];

export function getWeaponByName(name: string): Weapon | undefined {
  return weapons.find(w => w.name === name);
}
