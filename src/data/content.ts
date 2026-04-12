// src/data/content.ts

import { HeroData, Chapter1Data, Chapter2Data, Chapter4Data, Chapter5Data, Chapter6Data, Chapter7Data } from '../types';

export const heroData: HeroData = {
  tagline: "AI 产品经理面试作品",
  title: "从辅助到替代，我都做了什么",
  subtitle: "过去一年，我把企业 Agent 从'能聊天'变成了'能干活'",
  description: "不是接个 API，而是把企业改造成 AI 能稳定做事的环境",
  metrics: [
    {
      id: "accuracy",
      label: "核心场景 AI 准确率",
      value: "40% → 90%+",
      description: "AI 产出与专家判断一致的比例",
      trend: "positive"
    },
    {
      id: "automation",
      label: "管理决策 AI 自动处理率",
      value: "0% → 60%+",
      description: "管理决策节点已由 AI 稳定自动处理",
      trend: "positive"
    },
    {
      id: "efficiency",
      label: "项目产出周期压缩",
      value: "20 人日 → 3 人日",
      description: "AI 承接项目管理关键工作，产出周期由 20 人日压缩至 3 人日",
      trend: "positive"
    }
  ]
};

export const chapter1Data: Chapter1Data = {
  chapterNumber: "01",
  title: "为什么 Coding Agent 已经爆发了，企业 Agent 却还没有？",
  comparison: {
    left: {
      title: "代码仓库",
      icon: "Code2",
      items: [
        "文件有层级结构",
        "函数有调用关系",
        "运行有报错信息",
        "测试有对错反馈"
      ],
      conclusion: "结构化的上下文",
      subConclusion: "AI 能快速上手"
    },
    right: {
      title: "企业环境",
      icon: "Building2",
      items: [
        "会议纪要",
        "邮件往来",
        "聊天记录",
        "审批流程",
        "业务系统",
        "老员工经验"
      ],
      conclusion: "散乱的上下文",
      subConclusion: "AI 拿不全信息"
    }
  },
  insight: {
    highlight: "这不是模型不够强的问题，而是'上下文'的问题",
    explanation: `Coding Agent 跑得快，是因为代码仓库本身就是"整理好的上下文"；企业 Agent 跑不动，是因为企业的工作环境还没有被整理成 AI 能稳定消费的形态。`
  },
  transition: {
    text: "这就是我在过去一年多里一直在做的事——把企业的工作场景，改造成 AI 能持续、稳定做事的环境。",
    cta: "继续了解四个真问题"
  }
};

export const chapter2Data: Chapter2Data = {
  chapterNumber: "02",
  title: "四个真问题",
  introduction: "企业落地 AI，不是'接个 API'那么简单。我遇到过四个真问题，每一个都足以让项目停摆。",
  problems: [
    {
      id: "context",
      title: "上下文拿不全",
      icon: "FileSearch",
      description: "AI 要做事，先得知道'前因后果'。但企业的信息太散了。",
      symptom: "做个决策，AI 要翻 8 个系统：会议纪要在飞书、审批在 OA、数据在 SAP、进度在 Excel……",
      rootCause: "信息孤岛",
      color: "blue"
    },
    {
      id: "decision",
      title: "决策链太长",
      icon: "GitMerge",
      description: "企业里一件事要做成，得经过一串审批。AI 不是卡在流程里，就是被人工打断。",
      symptom: "一个需求从提出到执行，平均要过 5 层审批，AI 等了 3 天还没轮到它。",
      rootCause: "流程未适配 AI",
      color: "amber"
    },
    {
      id: "feedback",
      title: "反馈收不回来",
      icon: "MessageCircle",
      description: "AI 做完事，得知道'做得怎么样'。但企业的反馈太慢了。",
      symptom: "AI 生成的方案，业务方一周后才给反馈，AI 根本学不到什么。",
      rootCause: "反馈链路断裂",
      color: "emerald"
    },
    {
      id: "trust",
      title: "信任建立不起来",
      icon: "ShieldAlert",
      description: "AI 要替代人做事，得先让人放心。但黑盒决策没人敢用。",
      symptom: "业务方说：'AI 做的决策，我怎么知道对不对？出了事谁负责？'",
      rootCause: "可解释性不足",
      color: "purple"
    }
  ],
  insight: {
    highlight: "这不是'AI 不够强'，而是'企业还没准备好'",
    explanation: `这四个问题，每一个都是'企业级'的——不是换个模型就能解决，而是要把企业的工作方式，改造成 AI 能稳定参与的环境。`
  },
  transition: {
    text: "接下来，我会逐一拆解这四个问题，并分享我的实战解法。",
    cta: "查看实战解法"
  }
};

export const chapter4Data: Chapter4Data = {
  chapterNumber: "04",
  title: "最终结果",
  timeline: "从 2025 年 3 月启动，6 月跑通首个完整 MVP，此后持续迭代。",
  accuracyCurve: {
    label: "核心场景 AI 准确率提升",
    unit: "%",
    dataPoints: [
      { date: "2025.3", value: 40 },
      { date: "2025.4", value: 42 },
      { date: "2025.5", value: 44 },
      { date: "2025.6", value: 45 },
      { date: "2025.7", value: 48 },
      { date: "2025.8", value: 52 },
      { date: "2025.9", value: 55 },
      { date: "2025.10", value: 58 },
      { date: "2025.11", value: 60 },
      { date: "2025.12", value: 70 },
      { date: "2026.1", value: 80 },
      { date: "2026.2", value: 92 }
    ],
    milestones: [
      { date: "2025.3", label: "项目启动" },
      { date: "2025.6", label: "首个 MVP" },
      { date: "2025.11", label: "数据飞轮启动" },
      { date: "2026.2", label: "准确率 90%+" }
    ]
  },
  metrics: [
    {
      id: "accuracy",
      label: "核心场景 AI 准确率",
      before: { value: 40, suffix: "%" },
      after: { value: 90, suffix: "%+" },
      improvement: { value: 50, suffix: "pp", type: "absolute" },
      description: "AI 产出与专家判断一致的比例"
    },
    {
      id: "automation",
      label: "管理决策 AI 自动处理率",
      before: { value: 0, suffix: "%" },
      after: { value: 60, suffix: "%+" },
      improvement: { value: 60, suffix: "pp", type: "absolute" },
      description: "管理决策节点已由 AI 稳定自动处理"
    },
    {
      id: "efficiency",
      label: "项目产出周期压缩",
      before: { value: 20, suffix: "人日" },
      after: { value: 3, suffix: "人日" },
      improvement: { value: 567, suffix: "% 提升", type: "percentage" },
      description: "AI 承接项目管理关键工作，产出周期由 20 人日压缩至 3 人日"
    },
    {
      id: "capacity",
      label: "单人管理项目数",
      before: { value: 2, suffix: "个" },
      after: { value: 6, suffix: "个" },
      improvement: { value: 300, suffix: "% 提升", type: "percentage" },
      description: "项目负责人同时管理的项目数量"
    }
  ],
  summary: "这套方法被复用到公司其他 AI 化项目中，并被多个团队借鉴。"
};

export const chapter5Data: Chapter5Data = {
  chapterNumber: "05",
  title: "一年实战，我沉淀的 5 条认知",
  introduction: "这些认知不是从文章里看来的，而是从一线实战中一点一滴摸索出来的。",
  insights: [
    {
      id: 1,
      number: "01",
      title: "企业 Agent 的核心战场不是模型，是数据底座",
      content: "企业要做 Agent 自动化，第一步不是选模型、不是搭系统，而是把自己的数据和知识整理成 AI 能稳定消费的形态。这是绕不过去的基础设施建设。",
      tags: ["数据底座", "基础设施", "AI 落地"]
    },
    {
      id: 2,
      number: "02",
      title: "给 AI 定的规则，要分清哪些是业务本质，哪些只是当前模型的补丁",
      content: "有些规则是因为业务本身就需要这么判断（比如立项必须评估战略契合度），这些是长期不变的；有些规则是因为当前模型做不好某个事情才加的约束，随着模型升级这些规则应该被拆掉。如果分不清这两类，规则会越堆越重，系统越来越脆弱。",
      tags: ["规则设计", "业务本质", "技术债务"]
    },
    {
      id: 3,
      number: "03",
      title: "没有反馈闭环，就没有数据飞轮",
      content: "准确率提升不是调一次 Prompt 就能搞定的事，它依赖的是'AI 做事→收集反馈→优化规则→AI 做得更好'这个循环能持续转起来。反馈体系搭不好，飞轮就转不动。",
      tags: ["反馈闭环", "数据飞轮", "持续优化"]
    },
    {
      id: 4,
      number: "04",
      title: "AI 的权限逻辑不应该照搬人的权限逻辑",
      content: "人的权限设计里有很多是基于'不该看到'的信息隔离逻辑，但 AI 要把一件事做好，往往需要比单个人更宽的信息视野。企业需要重新评估信息透明度——对于 AI 工作场景中可以公开的信息，应该给到 AI 最大的调取权限。限制 AI 的信息范围，就是限制它的工作质量。",
      tags: ["权限设计", "信息透明度", "AI 效率"]
    },
    {
      id: 5,
      number: "05",
      title: "在不确定中找确定性，保持松耦合，大胆往前走",
      content: "技术路线一直在变，等到'最优方案'确定再动手就永远来不及。我的做法是：AI 系统和业务系统保持松耦合（AI 层可以快速替换，业务流程不受影响），然后在这个前提下大胆落地，在过程中快速调整。与其等最好的技术，不如先用当前最好的方案把价值跑出来。",
      tags: ["技术选型", "松耦合", "快速迭代"]
    }
  ]
};

export const chapter6Data: Chapter6Data = {
  chapterNumber: "06",
  title: "能力映射：我能为你的 AI 产品带来什么",
  introduction: "基于上述实战经验，我沉淀了以下 AI 产品经理的核心能力：",
  radarData: {
    labels: ["需求洞察", "产品设计", "技术理解", "数据驱动", "跨团队推动", "方法论沉淀"],
    scores: [95, 90, 85, 95, 85, 90],
    fullMark: 100
  },
  capabilities: [
    {
      id: "insight",
      name: "需求洞察",
      rating: 5,
      description: "识别企业 Agent 自动化的真问题",
      case: "「四个真问题」框架",
      caseDetail: "通过一线实战，识别出阻碍企业 Agent 自动化的四个系统性问题：上下文拼不齐、多系统不通、权限编排复杂、技术路线变化快。",
      linkTo: "chapter2"
    },
    {
      id: "design",
      name: "产品设计",
      rating: 5,
      description: "从 0 到 1 设计 Agent 系统架构",
      case: "决策框架、飞轮机制、权限编排",
      caseDetail: "设计了三步解法：找切入点→挖规则→建飞轮，以及任务级权限编排模型。",
      linkTo: "chapter3"
    },
    {
      id: "tech",
      name: "技术理解",
      rating: 4,
      description: "理解 RAG、工作流、多 Agent、MCP 等技术路线的适用场景",
      case: "技术选型决策、松耦合架构",
      caseDetail: "在技术路线快速变化的环境下，做出 AI 系统与业务系统松耦合的架构决策。",
      linkTo: "chapter2-problem4"
    },
    {
      id: "data",
      name: "数据驱动",
      rating: 5,
      description: "设计反馈体系，驱动准确率持续提升",
      case: "40%→90% 准确率提升",
      caseDetail: "建立双飞轮机制（规则自进化 + 项目经验池），通过反馈闭环驱动准确率从 40% 提升到 90%+。",
      linkTo: "chapter4"
    },
    {
      id: "collaboration",
      name: "跨团队推动",
      rating: 4,
      description: "协调多系统、多角色，推动落地",
      case: "跨系统整合、权限方案设计",
      caseDetail: "协调战略、财务、人力、业务等多个团队，梳理 [X] 个系统的数据接口，推动权限编排方案落地。",
      linkTo: "chapter3-permission"
    },
    {
      id: "methodology",
      name: "方法论沉淀",
      rating: 5,
      description: "可复用的框架和认知",
      case: "5 条认知、三层挖掘法",
      caseDetail: "从实战中提炼出 5 条认知，形成可复用的三层挖掘法、决策链路地图等方法论。",
      linkTo: "chapter5"
    }
  ]
};

export const chapter7Data: Chapter7Data = {
  chapterNumber: "07",
  title: "可迁移性说明",
  introduction: "这套方法不是为某家公司量身定制的，而是在一定条件下可以复用的通用框架。",
  applicableScenarios: [
    {
      title: "高频、多角色参与的决策链路",
      icon: "Users",
      description: "需要多个部门/角色共同参与决策的业务场景"
    },
    {
      title: "有历史数据可分析的业务场景",
      icon: "Database",
      description: "有足够的历史数据供 AI 学习和提炼规律"
    },
    {
      title: "有领域专家可访谈的知识密集型场景",
      icon: "UserCheck",
      description: "有经验丰富的专家可以挖掘隐性规则"
    }
  ],
  migrationConditions: [
    {
      title: "企业有基本的数字化基础",
      icon: "Server",
      description: "有系统、有数据，不是完全的手工操作"
    },
    {
      title: "管理层支持 AI 替代人工的变革",
      icon: "TrendingUp",
      description: "有高层支持，不是阻力重重的环境"
    },
    {
      title: "有愿意配合的领域专家和业务团队",
      icon: "Users",
      description: "业务团队愿意参与，不是被动接受"
    }
  ],
  notApplicable: [
    "低频、偶发的决策场景（数据积累太慢）",
    "高度依赖创意/直觉的场景（规则难以显性化）",
    "数据极度敏感、无法开放的场景（AI 无法获取上下文）"
  ],
  summary: "这套方法已被复用到公司其他 AI 化项目中，并被多个团队借鉴。",
  footer: {
    greeting: "感谢观看",
    message: "如果您对这个作品有任何疑问，或想进一步交流，欢迎通过以下方式联系我：",
    contact: {
      email: "h190900910@163.com",
      linkedin: "/in/yourprofile",
      wechat: "18272551294"
    },
    downloads: [
      { label: "下载简历 PDF", url: "/resume.pdf" }
    ],
    copyright: "© 2026 黄贺涛。Built with ❤️ for AI PM 角色。"
  }
};
