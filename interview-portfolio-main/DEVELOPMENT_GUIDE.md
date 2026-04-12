# 开发指南 - AI 产品经理面试作品网页

> **本文档用途**: 指导开发者如何结合产品文档 (docs/) 和高保真原型 (prototypes/) 完成网站的实际开发工作
> **目标读者**: 前端开发工程师
> **技术栈**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

---

## 一、开发前准备

### 1.1 文件结构说明

```
interview-portfolio/
├── docs/                           # 产品需求文档（9 份）
│   ├── 00-PRD-Overview.md          # 总览文档
│   ├── 01-Hero-Section.md
│   ├── 02-Chapter1-Problem-Insight.md
│   ├── 03-Chapter2-Four-Problems.md
│   ├── 04-Chapter3-Solution.md
│   ├── 05-Chapter4-Results.md
│   ├── 06-Chapter5-Insights.md
│   ├── 07-Chapter6-Capability-Mapping.md
│   └── 08-Chapter7-Migration-Footer.md
│
├── prototypes/                     # 高保真 HTML 原型（8 个）
│   ├── 01-hero-section.html
│   ├── 02-chapter1-problem-insight.html
│   ├── 03-chapter2-four-problems.html
│   ├── 04-chapter3-solution.html
│   ├── 05-chapter4-results.html
│   ├── 06-chapter5-insights.html
│   ├── 07-chapter6-capability-mapping.html
│   └── 08-chapter7-migration-footer.html
│
├── src/                            # 实际开发代码（你需要创建的）
│   ├── components/
│   │   ├── common/                 # 公共组件
│   │   ├── Hero/
│   │   ├── Chapter1/
│   │   ├── Chapter2/
│   │   ├── Chapter3/
│   │   ├── Chapter4/
│   │   ├── Chapter5/
│   │   ├── Chapter6/
│   │   └── Chapter7/
│   ├── data/
│   │   └── content.ts              # 内容数据
│   ├── lib/
│   │   ├── animations.ts           # 动画工具
│   │   └── utils.ts                # 通用工具
│   ├── App.tsx
│   └── main.tsx
│
├── public/
│   ├── resume.pdf                  # 简历 PDF
│   └── full-document.pdf           # 完整文档
│
└── package.json
```

### 1.2 如何使用原型

1. **在浏览器中打开原型文件**
   ```bash
   # 例如使用 VSCode 的 Live Server 插件
   # 或直接双击 HTML 文件
   ```

2. **对照原型和产品文档**
   - 原型 = 视觉参考（长什么样）
   - 产品文档 = 功能说明（做什么）

3. **检查元素样式**
   - 打开浏览器开发者工具
   - 查看 Tailwind CSS 类名
   - 直接复制到你 React 组件中

### 1.3 如何阅读产品文档

每个模块文档包含：
- **功能列表**: 必须实现的功能点
- **界面布局**: 线框图参考
- **交互逻辑**: 动画和行为说明
- **数据结构**: TypeScript 接口定义
- **视觉要求**: 配色、字体、间距规范

---

## 二、开发流程

### 2.1 项目初始化

```bash
# 1. 创建 Vite + React + TypeScript 项目
npm create vite@latest . -- --template react-ts

# 2. 安装依赖
npm install

# 3. 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. 安装其他依赖
npm install framer-motion lucide-react recharts
npm install react-router-dom  # 如需页面路由
```

### 2.2 配置 Tailwind

```js
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 根据 PRD 配色方案配置
        slate: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b',
          600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
        },
        // ... 其他颜色
      }
    }
  },
  plugins: [],
}
```

### 2.3 开发顺序

**按模块顺序开发（推荐）**:

| 阶段 | 模块 | 对应原型 | 预计工时 |
|------|------|----------|----------|
| Phase 1 | 项目 scaffold、配置、基础组件 | - | 4h |
| Phase 2 | Hero Section | `01-hero-section.html` | 4h |
| Phase 3 | Chapter 1-2 | `02-*.html`, `03-*.html` | 6h |
| Phase 4 | Chapter 3（核心） | `04-chapter3-solution.html` | 8h |
| Phase 5 | Chapter 4 | `05-chapter4-results.html` | 6h |
| Phase 6 | Chapter 5-6 | `06-*.html`, `07-*.html` | 6h |
| Phase 7 | Chapter 7 + Footer | `08-*.html` | 4h |
| Phase 8 | 联调、优化、部署 | - | 6h |

---

## 三、模块开发详解

### 3.1 Hero Section（01）

**原型文件**: `prototypes/01-hero-section.html`
**产品文档**: `docs/01-Hero-Section.md`

**核心功能**:
- 定位标签 + 主标题 + 副标题
- 3 个核心数据卡片
- 滚动引导动画
- 导航栏滚动显示

**开发要点**:
```tsx
// src/components/Hero/Hero.tsx 结构示例
export const Hero = () => {
  return (
    <section className="min-h-screen hero-background">
      {/* 定位标签 */}
      <Tagline />

      {/* 主标题 */}
      <Title />

      {/* 副标题 */}
      <Subtitle />

      {/* 数据卡片 */}
      <MetricGrid />

      {/* 滚动引导 */}
      <ScrollIndicator />
    </section>
  );
};
```

**动画实现**:
```tsx
// 使用 Framer Motion
import { motion } from 'framer-motion';

<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  从辅助到替代，我都做了什么
</motion.h1>
```

---

### 3.2 Chapter 1: 问题洞察（02）

**原型文件**: `prototypes/02-chapter1-problem-insight.html`
**产品文档**: `docs/02-Chapter1-Problem-Insight.md`

**核心功能**:
- 左右对比卡片（代码仓库 vs 企业环境）
- 核心洞察高亮
- 过渡引子

**开发要点**:
- 使用 Intersection Observer 实现滚动触发动画
- 对比卡片 hover 效果
- 响应式布局（桌面左右并排，移动上下堆叠）

---

### 3.3 Chapter 2: 四个真问题（03）

**原型文件**: `prototypes/03-chapter2-four-problems.html`
**产品文档**: `docs/03-Chapter2-Four-Problems.md`

**核心功能**:
- 4 个可展开卡片
- 手风琴效果（展开一个时其他自动收起）
- 问题图标和颜色区分

**开发要点**:
```tsx
// 手风琴效果状态管理
const [expandedId, setExpandedId] = useState<number | null>(null);

const toggleCard = (id: number) => {
  setExpandedId(expandedId === id ? null : id);
};
```

---

### 3.4 Chapter 3: 实战解法（04）⭐ 核心章节

**原型文件**: `prototypes/04-chapter3-solution.html`
**产品文档**: `docs/04-Chapter3-Solution.md`

**核心功能**:
- 三步解法流程图
- Step 1: 决策链路地图（Before/After 对比）
- Step 2: 三层挖掘法
- Step 3: 双飞轮机制（**核心动画**）

**开发要点**:
- 飞轮动画使用 CSS `@keyframes` 实现持续旋转
- 数据流使用 SVG 路径动画
- 指标卡片网格布局

```css
/* 飞轮旋转动画 */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.flywheel {
  animation: rotate 10s linear infinite;
}
```

---

### 3.5 Chapter 4: 结果数据（05）

**原型文件**: `prototypes/05-chapter4-results.html`
**产品文档**: `docs/05-Chapter4-Results.md`

**核心功能**:
- 准确率提升曲线图（Chart.js / Recharts）
- 6 个核心指标 Before/After 对比卡片
- 数字滚动动画

**开发要点**:
```tsx
// 使用 Recharts 绘制曲线图
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={dataPoints}>
    <XAxis dataKey="date" />
    <YAxis domain={[0, 100]} />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#22c55e"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
```

---

### 3.6 Chapter 5: 认知沉淀（06）

**原型文件**: `prototypes/06-chapter5-insights.html`
**产品文档**: `docs/06-Chapter5-Insights.md`

**核心功能**:
- 5 个可展开认知卡片
- 编号视觉设计
- Tag 标签

**开发要点**:
- 卡片展开高度动画（`max-height` transition）
- 箭头旋转动画

---

### 3.7 Chapter 6: 能力映射（07）

**原型文件**: `prototypes/07-chapter6-capability-mapping.html`
**产品文档**: `docs/07-Chapter6-Capability-Mapping.md`

**核心功能**:
- 6 维能力雷达图
- 能力卡片（6 个）
- 星级评分
- 案例链接跳转

**开发要点**:
```tsx
// 使用 Recharts 绘制雷达图
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <Radar
    name="能力评分"
    dataKey="score"
    stroke="#2563eb"
    fill="#3b82f6"
    fillOpacity={0.3}
  />
</RadarChart>
```

---

### 3.8 Chapter 7: 可迁移性 & Footer（08）

**原型文件**: `prototypes/08-chapter7-migration-footer.html`
**产品文档**: `docs/08-Chapter7-Migration-Footer.md`

**核心功能**:
- 适用场景卡片（绿色）
- 迁移条件卡片（蓝色）
- 不适用范围列表（红色）
- Footer（联系方式、下载按钮）
- 回到顶部按钮

**开发要点**:
- 回到顶部按钮滚动显示/隐藏
- 平滑滚动到顶部

```tsx
// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
```

---

## 四、数据结构设计

### 4.1 内容数据文件

创建 `src/data/content.ts`，将所有静态内容集中管理：

```typescript
// src/data/content.ts

export const heroData = {
  tagline: "AI 产品经理面试作品",
  title: "从辅助到替代，我都做了什么",
  subtitle: "过去一年，我把企业 Agent 从'能聊天'变成了'能干活'",
  metrics: [
    {
      label: "准确率提升",
      value: "40% → 90%+",
      description: "核心场景 AI 产出准确率"
    },
    // ...
  ]
};

export const chapter1Data = {
  chapterNumber: "01",
  title: "为什么 Coding Agent 已经爆发了，企业 Agent 却还没有？",
  // ...
};

// ... 其他章节数据
```

### 4.2 类型定义

```typescript
// src/types/index.ts

export interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface Chapter {
  chapterNumber: string;
  title: string;
  introduction?: string;
  // ...
}

// ... 其他类型
```

---

## 五、动画实现指南

### 5.1 入场动画（Framer Motion）

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
```

### 5.2 滚动触发（Intersection Observer）

```tsx
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
};
```

### 5.3 数字滚动动画

```tsx
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export const NumberCounter = ({ value, duration = 1500 }: { value: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <span ref={ref}>{Math.round(springValue.get())}</span>;
};
```

---

## 六、响应式设计

### 6.1 断点定义

```js
// tailwind.config.js
theme: {
  screens: {
    'sm': '640px',  // 小屏（移动）
    'md': '768px',  // 中屏（平板）
    'lg': '1024px', // 大屏（桌面）
    'xl': '1280px', // 超大屏
  }
}
```

### 6.2 布局调整原则

| 模块 | 桌面端（≥1024px） | 平板端（768-1023px） | 移动端（<768px） |
|------|------------------|---------------------|-----------------|
| Hero 数据卡片 | 3 列横向 | 2 列 | 单列垂直 |
| Chapter 2 问题卡片 | 4 列横向 | 2x2 网格 | 单列垂直 |
| Chapter 4 指标卡片 | 3x2 网格 | 2x3 网格 | 单列垂直 |
| Chapter 6 雷达图 | 左图右文 | 上图下文 | 单列垂直 |

---

## 七、验收标准

### 7.1 功能验收

- [ ] 所有模块内容完整显示
- [ ] 所有交互动画正常
- [ ] 所有链接可跳转
- [ ] 所有数据正确显示

### 7.2 视觉验收

- [ ] 与原型一致（配色、字体、间距）
- [ ] 字体层级清晰
- [ ] 卡片视觉平衡

### 7.3 响应式验收

- [ ] 桌面端（1920x1080）正常
- [ ] 平板端（1024x768）正常
- [ ] 移动端（375x667）正常
- [ ] 无内容溢出、无重叠

### 7.4 性能验收

- [ ] 首屏加载 < 3 秒
- [ ] 动画帧率 ≥ 60fps
- [ ] Lighthouse 性能 ≥ 90
- [ ] Lighthouse 无障碍 ≥ 90

---

## 八、部署上线

### 8.1 构建

```bash
npm run build
```

### 8.2 部署到 Vercel（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 8.3 部署到 Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod
```

---

## 九、常见问题

### Q1: 原型中的 Tailwind 类名如何用到 React 中？

**A**: 直接从原型 HTML 中复制 `class` 属性，粘贴到 React 组件的 `className` 中。

### Q2: 如何实现原型的动画效果？

**A**:
1. 查看产品文档中的"交互逻辑"章节
2. 使用 Framer Motion 实现入场动画
3. 使用 CSS `@keyframes` 实现持续动画（如飞轮旋转）

### Q3: 图表使用 Chart.js 还是 Recharts？

**A**: 推荐使用 Recharts，因为它与 React 集成更好，但原型中使用的是 Chart.js，两者都可以。

### Q4: 如何处理原型中的占位符数据（如 [X]）？

**A**: 与产品经理确认具体数值，或使用合理占位值。

---

## 十、联系方式

如有问题，请联系项目所有者。

---

**最后更新**: 2026-03-30
**文档版本**: v1.0
