// src/types/index.ts

/**
 * Hero Section 数据类型
 */
export interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  trend?: 'positive' | 'negative' | 'neutral';
}

export interface HeroData {
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: Metric[];
}

/**
 * Chapter 1 数据类型
 */
export interface ComparisonSide {
  title: string;
  icon: string;
  items: string[];
  conclusion: string;
  subConclusion: string;
}

export interface Chapter1Data {
  chapterNumber: string;
  title: string;
  comparison: {
    left: ComparisonSide;
    right: ComparisonSide;
  };
  insight: {
    highlight: string;
    explanation: string;
  };
  transition: {
    text: string;
    cta: string;
  };
}

/**
 * 通用章节类型
 */
export interface Chapter {
  chapterNumber: string;
  title: string;
  introduction?: string;
}

/**
 * Chapter 2 数据类型
 */
export interface ProblemCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  symptom: string;
  rootCause: string;
  color: 'blue' | 'amber' | 'emerald' | 'purple';
}

export interface Chapter2Data {
  chapterNumber: string;
  title: string;
  introduction: string;
  problems: ProblemCard[];
  insight: {
    highlight: string;
    explanation: string;
  };
  transition: {
    text: string;
    cta: string;
  };
}

/**
 * Chapter 4 数据类型
 */
export interface DataPoint {
  date: string;
  value: number;
}

export interface Milestone {
  date: string;
  label: string;
}

export interface MetricValue {
  value: number | string;
  suffix: string;
}

export interface Improvement {
  value: number | string;
  suffix: string;
  type: 'absolute' | 'percentage' | 'multiplier' | 'qualitative';
}

export interface MetricCard {
  id: string;
  label: string;
  before: MetricValue;
  after: MetricValue;
  improvement: Improvement;
  description: string;
}

export interface Chapter4Data {
  chapterNumber: string;
  title: string;
  timeline: string;
  accuracyCurve: {
    label: string;
    unit: string;
    dataPoints: DataPoint[];
    milestones: Milestone[];
  };
  metrics: MetricCard[];
  summary: string;
}

/**
 * Chapter 5 数据类型
 */
export interface Insight {
  id: number;
  number: string;
  title: string;
  content: string;
  tags: string[];
}

export interface Chapter5Data {
  chapterNumber: string;
  title: string;
  introduction: string;
  insights: Insight[];
}

/**
 * Chapter 6 数据类型
 */
export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Capability {
  id: string;
  name: string;
  rating: number;
  description: string;
  case: string;
  caseDetail: string;
  linkTo: string;
}

export interface Chapter6Data {
  chapterNumber: string;
  title: string;
  introduction: string;
  radarData: {
    labels: string[];
    scores: number[];
    fullMark: number;
  };
  capabilities: Capability[];
}

/**
 * Chapter 7 数据类型
 */
export interface ScenarioCard {
  title: string;
  icon: string;
  description: string;
}

export interface ConditionCard {
  title: string;
  icon: string;
  description: string;
}

export interface FooterData {
  greeting: string;
  message: string;
  contact: {
    email: string;
    linkedin: string;
    wechat: string;
  };
  downloads: Array<{ label: string; url: string }>;
  copyright: string;
}

export interface Chapter7Data {
  chapterNumber: string;
  title: string;
  introduction: string;
  applicableScenarios: ScenarioCard[];
  migrationConditions: ConditionCard[];
  notApplicable: string[];
  summary: string;
  footer: FooterData;
}
