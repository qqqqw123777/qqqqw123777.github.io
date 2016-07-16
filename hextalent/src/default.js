//Custom closure
(function ($, ko, data) {

    //On page load
    $(function () {

        //Create and bind the viewmodel
        var vm = new hex.talents.Calculator(data);
        ko.applyBindings(vm);

        //Allow a split second for binding before turning on animated transitions for the UI
        setTimeout(function () {
            //  $('.page').addClass('animated');
        }, 50);
    });

})(window.jQuery, window.ko, {
    learnTemplate: '学习 {n} 来解锁.',
    races: ["狼人", "精灵", "人类", "兽人", "矮人", "返世者", "辛海尔人", "血裔"],
    classes: ["牧师", "法师", "战士"],
    talents: {
        //positioning: traits and combos are row 0
        //starting from left columns start from 1 to 7
        //charge power is always position: 14
        '牧师': {
            defaultStats: {
                '起始生命': 22,
                '起始手牌': 7
            },
            skills: [
                {
                    "id": 1,
                    title: "祈祷",
                    description: "[BASIC] [2] -> 创造两个 <b>祝福<\/b> 放入你的牌库中，如果起始牌库超过100张，则再额外放2张 <b>祝福<\/b> 到你的牌库中.",
                    default: true,
                    links: [
                        {
                            label: '祝福'
                            , url: 'http://hex.tcgbrowser.com/card/Blessing'
                        }
                    ],
                    icon: "Pray",

                    position: "14"
                },
                {
                    "id": 2,
                    title: "祝福增强: 生命净化",
                    description: "祝福额外增加2点生命.",
                    cost: 1,
                    links: [
                        {
                            label: '祝福'
                            , url: 'http://hex.tcgbrowser.com/card/Blessing'
                        }
                    ],
                    position: "11",
                    icon: "EnhanceBlessingLifeEssence"
                },
                {
                    "id": 3,
                    title: "祝福增强: 赋权",
                    description: "你的 <b>祝福<\/b> 获得, \"一个你控制的费用最高的随机部队获得 +1 [ATK]/+1 [DEF].\"",
                    cost: 2,
                    dependsOn: [2],
                    links: [
                        {
                            label: '祝福'
                            , url: 'http://hex.tcgbrowser.com/card/Blessing'
                        }
                    ],
                    position: "21",
                    icon: "EnhanceBlessingEmpowerment"
                },
                {
                    "id": 4,
                    title: "不朽祝福",
                    description: "当一个 <b>祝福<\/b> 被创建时, 它有10%几率转变为 <b>不朽祝福<\/b>.",
                    cost: 2,
                    links: [
                        {
                            label: '不朽祝福'
                            , url: 'http://hex.tcgbrowser.com/card/Blessing of the Immortals'
                        }
                    ],
                    position: "12",
                    icon: "BlessingoftheImmortals"
                },
                {
                    "id": 5,
                    title: "光耀形态: 善有善报",
                    description: "你的 <b>康复光环<\/b> 获得, \"在你的回合开始时, 移动每个 <b>祝福<\/b> 向牌库顶方向移动一张.\"",
                    cost: 1,
                    dependsOn: [7],
                    links: [
                        {
                            label: '康复光环'
                            , url: 'http://hex.tcgbrowser.com/card/Healing Aura'
                        },
                        {
                            label: '祝福'
                            , url: 'http://hex.tcgbrowser.com/card/Blessing'
                        }
                    ],
                    position: "22",
                    icon: "AuraAspectGoodKarma"
                },
                {
                    "id": 6,
                    title: "强壮",
                    description: "你获得 +3 生命.",
                    cost: 1,

                    position: "13",
                    icon: "Hale",
                    modifier: {
                        '起始生命': +3
                    }
                },
                {
                    "id": 7,
                    title: "康复光环",
                    description: "你在开局是拥有一个 <b>康复光环<\/b> 在场内.",
                    cost: 2,
                    icon: "HealingAura",
                    dependsOn: [6],

                    position: "23",
                    links: [
                        {
                            label: '康复光环'
                            , url: 'http://hex.tcgbrowser.com/card/Healing Aura'
                        }
                    ]
                },
                {
                    "id": 8,
                    title: "光耀形态: 生机",
                    description: "你的 <b>康复光环<\/b> 获得, [1SHOT] [3] -> 创造一个 <b>灵魂容器</b> 并将其放进场.\"",
                    cost: 2,
                    dependsOn: [7],
                    links: [
                        {
                            label: '康复光环'
                            , url: 'http://hex.tcgbrowser.com/card/Healing Aura'
                        },
                        {
                            label: '灵魂容器'
                            , url: 'http://hex.tcgbrowser.com/card/Soul Vessel'
                        }
                    ],
                    position: "24",
                    icon: "AuraAspectAnimation"
                },
                {
                    "id": 9,
                    title: "热忱",
                    description: "你获得 +3 生命.",
                    cost: 1,

                    position: "15",
                    icon: "Hearty",
                    modifier: {
                        '起始生命': +3
                    }
                },
                {
                    "id": 10,
                    title: "坚韧",
                    description: "+1 地牢 生命.<p><p>+2 起始生命.",
                    cost: 1,
                    dependsOn: [9, 12],
                    //noLine : [8],
                    position: "25",
                    icon: "Fortitude",
                    modifier: {
                        '起始生命': +2
                    }
                },
                {
                    "id": 11,
                    title: "亲和: 牧师",
                    description: "开始游戏时，你牌库中的牧师生物获得 <b>系命<\/b>.  ",
                    cost: 1,
                    links: [
                        {
                            label: '可用的牧师卡列表'
                            , url: 'http://hex.tcgbrowser.com/#!/cards/class=Cleric'
                        }
                    ],
                    position: "16",
                    icon: "AffinityCleric"
                },
                {
                    "id": 12,
                    title: "解锁: 神圣祭坛",
                    description: "开始游戏时拥有一个 <b>神圣祭坛</b> 在你的牌库中 或者 两个 <b>神圣祭坛</b> 如果你起始牌库为100张时.",
                    cost: 1,
                    dependsOn: [10, 11, 14],
                    position: "26",
                    links: [
                        {
                            label: '神圣祭坛'
                            , url: 'http://hex.tcgbrowser.com/card/Divine Altar'
                        }
                    ],
                    icon: "UnlockDivineAltar"
                },
                {
                    "id": 13,
                    title: "公正之路",
                    description: "开始游戏时拥有一个 <b>信仰纪念碑<\/b> 在场上.",
                    cost: 2,
                    icon: "TheRighteousPath",

                    position: "17",
                    links: [
                        {
                            label: '信仰纪念碑'
                            , url: 'http://hex.tcgbrowser.com/card/Monument of Faith'
                        }
                    ]
                },
                {
                    "id": 14,
                    title: "忠于信仰",
                    description: "你的 <b>信仰纪念碑<\/b> 获得, \"当你拥有25点生命时: 若你抓到一张部队, 这个部队获得 +1 [DEF].\"",
                    cost: 2,
                    icon: "FaithinourLeader",
                    dependsOn: [12, 13],
                    position: "27",
                    links: [
                        {
                            label: '信仰纪念碑'
                            , url: 'http://hex.tcgbrowser.com/card/Monument of Faith'
                        }
                    ]
                }
            ]
        },
        '法师': {
            defaultStats: {
                '起始生命': 14,
                '起始手牌': 7
            },
            skills: [
                {
                    "id": 1,
                    title: "法术力充能",
                    description: "[BASIC] [3] -> 随机获得3到5点 [SP] .(SP为法师专用的一种资源)",
                    default: true,
                    icon: "SpellPower",
                    position: "14"
                },
                {
                    "id": 2,
                    title: "学习咒语 : 占卜",
                    description: "4 [SP] -> 抓一张牌, 然后选择弃一张牌. ",
                    default: true,
                    position: "13",
                    icon: "Soothsaying"
                },
                {
                    "id": 4,
                    title: "亲和: 元素",
                    description: "元素在你的卡组中获得 “当此牌在你手中时, [0]:  转变其为一张随机的相同魔能颜色的战术.”",
                    cost: 1,
                    links: [
                        {
                            label: '可用的元素卡列表'
                            , url: 'http://hex.tcgbrowser.com/#!/cards/race=Elemental'
                        }
                    ],
                    position: "11",
                    icon: "AffinityElementals"
                },
                {
                    "id": 3,
                    title: "解锁 : 魔力精灵",
                    description: "解锁 2张 魔力精灵, 或者 4张 在你的起始卡组为100张以上时.",
                    cost: 1,
                    position: "12",
                    icon: "SpellSprites",
                    links: [
                        {
                            label: '魔力精灵'
                            , url: 'http://hex.tcgbrowser.com/card/Spell Sprite'
                        }
                    ]
                },
                {
                    "id": 5,
                    title: "心里优势",
                    description: "增加1点使用法术力充能时所能获得的SP最小值.",
                    cost: 1,
                    position: "15",
                    icon: "MentalSuperiority"
                },
                {
                    "id": 6,
                    title: "敏捷",
                    description: "+2 生命, +1 SP",
                    cost: 1,
                    position: "16",
                    icon: "Spry",
                    modifier: {
                        '起始生命': +2
                    }
                },
                {
                    "id": 7,
                    title: "亲和: 法师",
                    description: "法师在你的卡组获得 “当此牌进场，获得 1 SP.”",
                    cost: 1,
                    links: [
                        {
                            label: '可用的法师卡列表'
                            , url: 'http://hex.tcgbrowser.com/#!/cards/class=Mage'
                        }
                    ],
                    icon: "AffinityMages",
                    position: "17"

                },
                {
                    "id": 8,
                    title: "学习咒语: 心灵感应",
                    description: "6 [SP] ->  将目标卡放回到拥有者的手中.",
                    cost: 1,
                    position: "21",
                    icon: "Telekinesis",
                    dependsOn: [9]
                },
                {
                    "id": 9,
                    title: "学识",
                    description: "开始游戏时随机获得 0 到 X 点 SP, X 为已经学习的咒语数量.",
                    cost: 1,
                    position: "22",
                    dependsOn: [3, 10],
                    icon: "Learning"
                },
                {
                    "id": 10,
                    title: "明悟",
                    description: "每局游戏第一次使用咒语时, 获得 2 SP.",
                    cost: 2,
                    dependsOn: [2],
                    position: "23",
                    icon: "OpenMind"
                },
                {
                    "id": 11,
                    title: "解锁: 知识就是力量",
                    description: "解锁 1张 知识就是力量, 如果你起始牌库为100张时 解锁 2 张.",
                    cost: 2,
                    dependsOn: [10, 12],
                    position: "24",
                    icon: "KnowledgeisPower",
                    links: [
                        {
                            label: '知识就是力量'
                            , url: 'http://hex.tcgbrowser.com/card/Knowledge is Power'
                        }
                    ]
                },
                {
                    "id": 12,
                    title: "世俗知识",
                    description: "在你的回合开始时, 如果你坟场中有大于等于4张战术时, 放逐你坟场中所有战术并获得 2 SP.",
                    cost: 1,
                    dependsOn: [5, 11, 13],
                    position: "25",
                    icon: "WorldlyKnowledge"
                },
                {
                    "id": 13,
                    title: "隐秘知识",
                    description: "在游戏开始时, 牌库顶前五张中的随机一张牌获得费用 -2.",
                    cost: 2,
                    icon: "SecretKnowledge",
                    dependsOn: [6, 12],
                    position: "26"
                },
                {
                    "id": 14,
                    title: "纯净只是",
                    description: "+1 起始 与 最大 手牌",
                    cost: 2,
                    icon: "SelfKnowledge",
                    dependsOn: [13],
                    position: "27",
                    modifier: {
                        '起始手牌': +1
                    }
                }
            ]
        },
        '战士': {
            defaultStats: {
                '起始生命': 25,
                '起始手牌': 6
            },
            skills: [
                {
                    id: 1,
                    title: "战斗",
                    description: "[BASIC] [5] -> 造成两点伤害对目标英雄或部队. 部队将造成等同于其 [ATK] 的伤害给你.",
                    default: true,
                    icon: "Battle",
                    position: "14"
                },
                {
                    id: 2,
                    title: "愤怒",
                    description: "你在开始游戏时获得两点充能.<p><span style='color: red'>-7 起始生命</span>",
                    modifier: {
                        "起始生命": -7
                    },
                    cost: 0,
                    icon: "Fury",
                    position: "11"
                },
                {
                    id: 3,
                    title: "亲和: 战士",
                    description: "当你打出一个战士时, 得到一点充能.",
                    cost: 1,
                    links: [
                        {
                            label: '可用的战士卡列表'
                            , url: 'http://hex.tcgbrowser.com/#!/cards/class=Warrior'
                        }
                    ],
                    position: "12",
                    icon: "AffinityWarriors"
                },
                {
                    id: 4,
                    title: "军阀: 机敏",
                    description: "战斗 花费 减少 [1] .",
                    cost: 1,
                    icon: "WarlordAgility",
                    position: "13"
                },
                {
                    id: 5,
                    title: "军阀: 力量",
                    description: "战斗造成伤害 +1.",
                    cost: 2,
                    icon: "WarlordStrength",
                    position: "15"
                },
                {
                    id: 6,
                    title: "训练: 搏斗",
                    description: "在开始游戏时, 如果你有超过10个部队在牌库以及手牌, 每个部队有25%几率获得 <b>受训</b>.<p><p>你的 <b>受训</b> 部队获得 +1 [ATK]/+1 [DEF].",
                    cost: 1,
                    icon: "TrainingCombat",
                    position: "16"
                },
                {
                    id: 7,
                    title: "强壮",
                    description: "+5 起始生命.<p><span style='color: red'>你不能选择先手.</span>",
                    cost: 0,
                    modifier: {
                        "起始生命": +5
                    },
                    icon: "Weight",
                    position: "17"

                },
                {
                    id: 8,
                    title: "狂暴",
                    description: "所有对英雄的战斗伤害增加 1.",
                    cost: 2,
                    icon: "Berserking",
                    position: "21",
                    dependsOn: [2, 9]
                },
                {
                    id: 9,
                    title: "肾上腺素",
                    description: "当你遭受伤害时, 有25%几率获得1点充能.",
                    cost: 2,
                    icon: "Adrenaline",
                    position: "22",
                    dependsOn: [3, 8, 10]
                },
                {
                    id: 10,
                    title: "军阀: 格挡",
                    description: "你对于部队的战斗不会受到反击.",
                    cost: 1,
                    icon: "WarlordParrying",
                    position: "23",
                    dependsOn: [4, 9, 11]
                },
                {
                    id: 11,
                    title: "解锁: 军阀战争机器",
                    description: "开局时将一个 <b>战争机器</b> 放入卡组 或者 起始卡组为100+时 放入两个 <b>战争机器</b> .",
                    cost: 1,
                    icon: "UnlockWarlordWarMachine",
                    position: "24",
                    links: [
                        {
                            label: '战争机器'
                            , url: 'http://hex.tcgbrowser.com/card/War Machine'
                        }
                    ],
                    dependsOn: [10, 12]

                },
                {
                    id: 12,
                    title: "军阀: 震荡打击",
                    description: "如果你对一个英雄使用战斗， 目标英雄将随机丢弃一张手牌.",
                    cost: 1,
                    icon: "WarlordConcussiveStrikes",
                    position: "25",
                    dependsOn: [11, 5]

                },
                {
                    id: 13,
                    title: "增援",
                    description: "你获得 \"[1SHOT] [2] -> 将一个随机 <b>受训</b> 部队从牌库置于手中.\"",
                    cost: 2,
                    icon: "Reinforcements",
                    position: "26",
                    dependsOn: [6]
                },
                {
                    id: 14,
                    title: "训练: 部署",
                    description: "你的 <b>受训</b> 部队 获得 <b>速攻</b>.",
                    cost: 1,
                    icon: "TrainingDeployment",
                    position: "27",
                    dependsOn: [13]
                }
            ]

        }
    },
    racial: {
        '狼人': {
            traits: [
                {
                    id: 15,
                    title: "星空之子",
                    description: "开局时获得一个 <b>星空祝福</b> 到你的牌库中 或者 2张 如果你起始牌库为100张时.<p>你的牧师天赋对 <b>祝福</b> 的影响也会影响 <b>星空祝福</b> .</p><p>这张卡随星座变化.</p>",
                    default: true,
                    position: "01",
                    links: [
                       {
                           label: '星空祝福列表'
                           , url: 'http://hex.tcgbrowser.com/#!/cards/search=zodiac&set=talents'
                       }
                    ],
                    icon: "ChildrenoftheZodiac"
                },
                {
                    id: 16,
                    title: "智慧",
                    description: "+1 天赋点.",
                    default: true,
                    position: "02",
                    icon: "Wisdom",
                    modifier: {
                        "Talent points" : +1
                    }
                },
                {
                    id: 17,
                    title: "宇宙之力",
                    description: "你开始游戏时获得 +5 生命 以及 2点充能, 如果你的起始牌库为100+ .",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon"
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 17,
                        title: "太阳祝福",
                        description: "你的星空之子特性给予双倍的星空祝福.",
                        default: true,
                        position: "06",
                        icon: "BlessedbytheSun"
                    },
                    {
                        id: 16,
                        title: "医生",
                        description: "当你使用一个消耗品时, 获得3点生命并且抓一张牌.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '法师': [
                    {
                        id: 16,
                        title: "学习咒语: 龙卷风",
                        description: "7 [SP] -> 造成 0 到 3 点伤害对每个非狼人以及非元素部队 .",
                        default: true,
                        position: "06",
                        icon: "LearnSpellTornado"
                    },
                    {
                        id: 17,
                        title: "和谐之智",
                        description: "你的平衡系天赋减少2点天赋点来解锁",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 16,
                        title: "战争之路",
                        description: "地牢: +1 起始生命 在你已经击败过的地牢中.",
                        default: true,
                        position: "06",
                        icon: "WarPath"
                    },
                    {
                        id: 17,
                        title: "族群领袖",
                        description: "战争之路也影响雇佣兵.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ]

            }
        },
        '矮人': {
            traits: [
                {
                    id: 15,
                    title: "石头皮肤",
                    description: "你拥有 <b>装甲 1</b>.",
                    default: true,
                    position: "01",
                    icon: "StoneBody"
                },
                {
                    id: 16,
                    title: "机械朋友",
                    description: "如果你的起始卡组为150+ 开局时获得两点充能.",
                    default: true,
                    position: "02",
                    icon: "FriendofJankBot"
                },
                {
                    id: 17,
                    title: "大师工匠",
                    description: "在开始游戏时, 创造一个随机造物并放入手中.<p><p>你的最大手牌数增加 1.",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon"
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "祝福之杖",
                        description: "开始游戏时拥有 <b>祝福杖<\/b> 在场.",
                        default: true,
                        position: "06",
                        icon: "BlessingRod",
                        links: [
                            {
                                label: '祝福杖'
                                , url: 'http://hex.tcgbrowser.com/card/Blessing Rod'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "协会成员堡垒",
                        description: "在每个地牢BOSS战时， 创造一个炮塔城墙入场.",
                        icon: "LockedIcon",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        links: [
                            {
                                label: '炮塔城墙'
                                , url: 'http://hex.tcgbrowser.com/card/Turreted Wall'
                            }
                        ]
                    }
                ],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 技术转变",
                        description: "5 [SP] -> 转化目标部队为随机造物.",
                        default: true,
                        position: "06",
						icon:"LearnSpellTechnomorph"
                    },
                    {
                        id: 19,
                        title: "共享研究",
                        description: "你的雇佣兵拥有 +x 起始生命 x为你 <b>知识就是力量</b> 天赋的数量 .",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "电击武器",
                        description: "如果你对一个英雄使用战斗，目标英雄不会恢复法术力直到下个回合.",
                        default: true,
                        position: "06",
                        icon: "ElectroStunWeaponry"
                    },
                    {
                        id: 19,
                        title: "腰带",
                        description: "你获得 +1 消耗品槽位.",
                        icon: "LockedIcon",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07"
                    }
                ]

            }
        },
        '精灵': {
            traits: [
                {
                    id: 15,
                    title: "艺术",
                    description: "地牢: 当你通过一个地牢时, 有25%几率获得一个随机星辰.",
                    default: true,
                    position: "01",
                    icon: "Artistic"
                },
                {
                    id: 16,
                    title: "长寿",
                    description: "+6 起始生命",
                    default: true,
                    position: "02",
                    icon: "LongLife",
                    modifier: {
                        '起始生命': 6
                    }
                },
                {
                    id: 17,
                    title: "好品味",
                    description: "如果你的起始卡组中有超过30张 史诗， 传说， 异画以及大画卡， 你获得2点充能.",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon"
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "起源 祝福",
                        description: "你的 <b>祝福</b> 获得创造一个 <b>起源之叶</b> 进场\".",
                        default: true,
                        position: "06",
                        icon: "GenesisBlessing",
                        links: [
                            {
                                label: '祝福'
                                , url: 'http://hex.tcgbrowser.com/card/Blessing'
                            },
                            {
                                label: '起源之叶'
                                , url: 'http://hex.tcgbrowser.com/card/Genesis Leaf'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "生于狂野",
                        description: "你获得, \"[1SHOT] [0]: 你每有一点 [WILD] 就获得2点生命.\"",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 巨大化",
                        description: "7 [SP] -> 目标部队获得 +3[ATK]/+3[DEF].",
                        default: true,
                        position: "06",
                        icon: "LearnSpellEmbiggen"
                    },
                    {
                        id: 19,
                        title: "生命魔法领悟",
                        description: "你的生命魔法天赋花费减少一点并且效果翻倍.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "战舞",
                        description: "如果你对一个英雄使用战斗，, 获得 [2/0]",
                        default: true,
                        position: "06",
                        icon: "WarDancer"
                    },
                    {
                        id: 19,
                        title: "训练: 蛮力",
                        description: "你的 <b>受训</b> 部队 在所有区域 如果费用为 [5] 或者更多， 其获得 +1 [ATK]/+1 [DEF].",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ]

            }
        },
        '人类': {
            traits: [
                {
                    id: 16,
                    title: "英雄主义",
                    description: "地牢: +1 起始手牌与最大手牌数 在与BOSS战斗时",
                    default: true,
                    position: "01",
                    icon: "Heroism"
                },
                {
                    id: 15,
                    title: "追求知识",
                    description: "你额外获得5%的经验.<p>每个等级使你额外获得3%的金币.",
                    default: true,
                    position: "02",
                    icon: "IntellectualPursuits"
                },
                {
                    id: 17,
                    title: "领导",
                    description: "你额外获得一个雇佣兵槽位.",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon"
                }
            ],

            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "祝福增强: 神圣之力",
                        description: '你的 <b>祝福</b> 获得 "一个随机不死生物获得 -1 [ATK]/-1 [DEF]."',
                        default: true,
                        position: "06",
                        icon: "EnhanceBlessingHolyPowers",
                        links: [
                            {
                                label: '祝福'
                                , url: 'http://hex.tcgbrowser.com/card/Blessing'
                            }
                        ]

                    },
                    {
                        id: 19,
                        title: "艾尔温忠诚",
                        description: "地牢: 如果这是你最后一条地牢生命, 你开始游戏时获得 <b>艾尔温</b> 入场.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon",
                        links: [
                            {
                                label: '艾尔温'
                                , url: 'http://hex.tcgbrowser.com/card/Alwyn'

                            }
                        ]
                    }
                ],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 变兽术",
                        description: "7 [SP] ->  还原并转化目标部队为一个随机2费野兽.",
                        default: true,
                        position: "06",
                        icon: "PolymorphBeast",
                        links: [
                            {
                                label: '可用的2费野兽卡列表'
                                , url: 'http://hex.tcgbrowser.com/#!/cards/cost=2&race=Beast'
                            }
                        ]

                    },
                    {
                        id: 19,
                        title: "蓝色奖学金",
                        description: "每点一点知识就是力量就获得1点生命",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "鼓舞打击",
                        description: "如果你对一个英雄使用战斗，, 你控制的部队获得 +1 [ATK]/+1 [DEF] 直到回合结束.",
                        default: true,
                        position: "06",
                        icon: "InspiringStrike"
                    },
                    {
                        id: 19,
                        title: "围攻",
                        description: "地牢: 地牢中的连续战斗，对方的起始生命会 -3.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ]

            }
        },
        '返世者': {
            traits: [
                {
                    id: 15,
                    title: "高效",
                    description: "你额外获得10%的经验.<p>每个等级使你额外获得2%的金币.",
                    default: true,
                    position: "01",
                    icon: "Efficient"
                },
                {
                    id: 16,
                    title: "魔能和谐",
                    description: "开始游戏时，你每有一种超过8张的魔能，就获得1点生命.",
                    default: true,
                    position: "02",
                    icon: "ShardAttuned"
                },
                {
                    id: 17,
                    title: "更大的议程",
                    description: "你获得 +2 天赋点.",
                    default: true,
                    position: "03",
                    extraDescription: '解锁于等级 15.',
                    icon: "LockedIcon"
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "防御光环",
                        description: "你获得 <b>装甲 1.</b>",
                        default: true,
                        position: "06",
                        icon: "DefensiveAura"
                    },
                    {
                        id: 19,
                        title: "复活",
                        description: "地牢: 当你的雇佣兵被击败时，如果这是你这次地牢的第一次雇佣兵失败，则复活他.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 心灵催眠",
                        description: "6 [SP] -> 将每个对方英雄的牌库顶牌，置于你的手中.",
                        default: true,
                        position: "06",
                        icon: "LearnSpellMindBreak"
                    },
                    {
                        id: 19,
                        title: "萃取精华",
                        description: "当一个对方部队死亡时, 获得 1 [SP].",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "黑暗之刃",
                        description: "如果你对一个英雄使用战斗，, 得到等同于造成伤害的生命.",
                        default: true,
                        position: "06",
                        icon: "BladeofDarkness"
                    },
                    {
                        id: 19,
                        title: "黑骑士",
                        description: "<span style='color: red'>你的雇佣兵 -5生命.</span><p>如果你对一个英雄使用战斗，有50%几率使此英雄添加一个脆弱指示物.<p>当你三连胜以上时，对手因畏惧不会选择先手.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }]
            }
        },
        '兽人': {
            traits: [
                {
                    id: 15,
                    title: "无畏",
                    description: "地牢: 当你在地牢中最后一条命时: 你总是先手. 你的起始与最大手牌数 +1.",
                    default: true,
                    position: "01",
                    icon: "Fearless"
                },
                {
                    id: 16,
                    title: "暴力",
                    description: "你起始手牌中的一个随机部队获得 <b>狂怒 1</b>.",
                    default: true,
                    position: "02",
                    icon: "Violent"
                },
                {
                    id: 17,
                    title: "为了山神",
                    description: "在游戏开始时, 你起始手牌中的一个随机部队获得 <b>速攻</b>",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon"
                }],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "科格塔佩托的祝福",
                        description: "你的祝福只能获得一半生命.但获得 一个你控制的随即部队获得 <b>狂怒1</b>",
                        default: true,
                        position: "06",
                        icon: "KogTepetlsBlessing",
                        links: [
                            {
                                label: '祝福'
                                , url: 'http://hex.tcgbrowser.com/card/Blessing'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "残酷磨练",
                        description: "当你击败1000次遭遇战时，得到2点天赋点.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 疯狂",
                        description: "6 [SP] -> 目标部队获得 <b>狂怒 2</b> 和 \"它不能阻挡.\"",
                        default: true,
                        position: "06",
                        icon: "LearnSpellFrenzy"
                    },
                    {
                        id: 19,
                        title: "毁灭魔法专精",
                        description: "你的毁灭天赋减少2点天赋点要求.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "重磅打击",
                        description: "你的战斗 +1 伤害.",
                        default: true,
                        position: "06",
                        icon: "HeavyHitters"
                    },
                    {
                        id: 19,
                        title: "训练: 无情",
                        description: "你的 <b>受训</b> 部队在所有区域获得 <b>狂怒 1</b>.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ]
            }
        },
        "辛海尔人": {
            traits: [
                {
                    id: 18,
                    title: "可消耗生命",
                    description: "地牢: +2 地牢生命",
                    default: true,
                    position: "01",
                    icon: "ExpendableLives"
                },
                {
                    id: 19,
                    title: "可爱与绒毛",
                    description: "+3 起始生命",
                    default: true,
                    position: "02",
                    icon: "CuteandFuzzy",
                    modifier: {
                        "起始生命": 3
                    }
                },
                {
                    id: 19,
                    title: "淹没",
                    description: "你的最后一条地牢生命时，你在开局是创造一个随机 [1] 费辛海尔人入场.",
                    default: true,
                    extraDescription: '解锁于等级 15.',
                    position: "03",
                    icon: "LockedIcon",
                    links: [
                        {
                            label: '可用的1费辛海尔人卡列表'
                            , url: 'http://hex.tcgbrowser.com/#!/cards/cost=1&race=Shin\'hare'
                        }
                    ]
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "丰饶魔力",
                        description: "让你打出一张辛海尔人时, 你有25%几率创造一个 <b>持棍士兵</b> 并放入场内.",
                        default: true,
                        position: "06",
                        icon: "FertilityMagic",
                        links: [
                            {
                                label: '持棍士兵'
                                , url: 'http://hex.tcgbrowser.com/card/Battle Hopper'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "受伤的花瓣",
                        description: "通过丰饶魔力创造的<b>持棍士兵</b>有20%几率改为创造一个随机辛海尔人牧师 .",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon",
                        links: [
                            {
                                label: '持棍士兵'
                                , url: 'http://hex.tcgbrowser.com/card/Battle Hopper'
                            }
                        ]
                    }],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语 : 嬗变",
                        description: "6 [SP] -> 摧毁目标部队. 其操控者抓一张牌.",
                        default: true,
                        position: "06",
                        icon: "LearnSpellTransmutation"
                    },
                    {
                        id: 19,
                        title: "快速收获",
                        description: "当你控制的部队死亡时, 你有25%几率获得 1 [SP].",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "灵活",
                        description: "你的战斗花费减少 [1].",
                        default: true,
                        position: "06",
                        icon: "Nimble"
                    },
                    {
                        id: 19,
                        title: "补充新兵",
                        description: "开始游戏时，拥有一个 <b>绵尾征兵官</b> 并入场.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon",
                        links: [
                            {
                                label: '绵尾征兵官'
                                , url: 'http://hex.tcgbrowser.com/card/Cottontail Recruiter'
                            }
                        ]
                    }
                ]
            }
        },
        '血裔': {
            traits: [
                {
                    id: 18,
                    title: "献身",
                    description: "你起始手牌中的一个随机战术获得 -1 费用.",
                    default: true,
                    position: "01",
                    icon: "Devoted"
                },
                {
                    id: 19,
                    title: "残酷高效",
                    description: "地牢: 如果你没有花费任何地牢生命，你在开局时获得2点充能.",
                    default: true,
                    position: "02",
                    icon: "RuthlesslyEfficient"
                },
                {
                    id: 18,
                    title: "神职募捐",
                    description: "你额外获得5%的金币.",
                    default: true,
                    position: "03",
                    extraDescription: '解锁于等级 15.',
                    icon: "LockedIcon"
                }
            ],
            combo: {
                '牧师': [
                    {
                        id: 18,
                        title: "森妥丝祝福",
                        description: "你的 <b>祝福</b> 获得, \"创造两个 <b>蜘蛛卵</b> 到每个敌方英雄的牌库中.\"",
                        default: true,
                        position: "06",
                        icon: "BlessingofXentoth",
                        links: [
                            {
                                label: '祝福'
                                , url: 'http://hex.tcgbrowser.com/card/Blessing'
                            },
                            {
                                label: '蜘蛛卵'
                                , url: 'http://hex.tcgbrowser.com/card/Spiderling Egg'
                            },
                            {
                                label: '蜘蛛'
                                , url: 'http://hex.tcgbrowser.com/card/Spiderling'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "巢父",
                        description: "当一个蜘蛛在你的控制下入场时, 得到 1 生命.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }],
                '法师': [
                    {
                        id: 18,
                        title: "学习咒语: 弱点",
                        description: "2 [SP] -> 目标部队获得 -1 [ATK].",
                        default: true,
                        position: "06",
                        icon: "LearnSpellWeakness"
                    },
                    {
                        id: 19,
                        title: "咒语蜘蛛",
                        description: "当一个蜘蛛在你的控制下入场时，你有25%几率获得 1 [SP].",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ],
                '游侠': [],
                '盗贼': [],
                '术士': [],
                '战士': [
                    {
                        id: 18,
                        title: "育雏守卫之刃",
                        description: "如果你对一个英雄使用战斗，创造两个 <b>蜘蛛卵</b> 到每个敌方英雄的牌库中.",
                        default: true,
                        position: "06",
                        icon: "BladeoftheBroodguard",
                        links: [
                            {
                                label: '蜘蛛卵'
                                , url: 'http://hex.tcgbrowser.com/card/Spiderling Egg'
                            },
                            {
                                label: '蜘蛛'
                                , url: 'http://hex.tcgbrowser.com/card/Spiderling'
                            }
                        ]
                    },
                    {
                        id: 19,
                        title: "邪恶",
                        description: "在游戏开始时，每个敌方英雄减少3点生命.",
                        default: true,
                        extraDescription: '解锁于等级 30.',
                        position: "07",
                        icon: "LockedIcon"
                    }
                ]

            }
        }
    }
});

