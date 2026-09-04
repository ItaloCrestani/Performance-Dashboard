export type DecisionType = 'Manter' | 'Otimizar' | 'Reduzir' | 'Pausar' | 'Escalar';
export type CreativeDecisionType = 'Pausar' | 'Alterar' | 'Criar nova variação' | 'Continuar testando';

export interface ReportHeader {
  clientName: string;
  startDate: string;
  endDate: string;
  manager: string;
  analysisDate: string;
}

export interface PeriodContext {
  objective: string;
  activeCampaigns: string[];
  plannedBudget: number;
  periodNotes: string;
}

export interface MetricItem {
  id: string;
  name: string;
  current: number;
  previous: number;
  format: 'currency' | 'number' | 'percent';
  inverse?: boolean; // When true, a lower value is better (e.g. CPC, cost per result)
}

export interface ResultsData {
  metrics: MetricItem[];
  generalObservation: string;
}

export interface CampaignAnalysis {
  id: string;
  name: string;
  objective: string;
  investment: number;
  results: number;
  costPerResult: number;
  performance: string;
  whatWorked: string[];
  whatToImprove: string[];
  decision: DecisionType;
}

export interface CreativeHighlight {
  id: string;
  nameOrId: string;
  offer: string;
  angle: string;
  hook: string;
  format: string;
  result: string;
  whyStoodOut: string;
}

export interface LowCreative {
  id: string;
  nameOrId: string;
  identifiedProblem: string;
  decision: CreativeDecisionType;
}

export interface CreativeSection {
  highlights: CreativeHighlight[];
  lowPerformers: LowCreative[];
}

export interface TestItem {
  id: string;
  test: string;
  hypothesis: string;
  result: string;
  learning: string;
  nextAction: string;
}

export interface TestsSection {
  tests: TestItem[];
  mainLearnings: string[];
}

export interface CommercialSection {
  enabled: boolean;
  leads: number;
  qualifiedLeads: number;
  appointments: number;
  sales: number;
  revenue: number;
  costPerSale: number;
  roas: number;
  commercialAnalysis: string;
}

export interface DiagnosisSection {
  currentSituation: string;
  mainProblem: string;
  mainOpportunity: string;
  conclusion: string;
}

export interface DecisionsSection {
  keep: string[];
  optimize: string[];
  pause: string[];
  testNewCreatives: string[];
  testNewOffers: string[];
  testNewAngles: string[];
  testNewAudiences: string[];
  testOtherHypotheses: string[];
}

export interface SummarySection {
  resultSummary: string;
  mainLearning: string;
  mainDecision: string;
  nextFocus: string;
}

export interface ClientReport {
  id: string;
  title?: string;
  updatedAt: string;
  header: ReportHeader;
  context: PeriodContext;
  results: ResultsData;
  campaigns: CampaignAnalysis[];
  creatives: CreativeSection;
  tests: TestsSection;
  commercial: CommercialSection;
  diagnosis: DiagnosisSection;
  decisions: DecisionsSection;
  summary: SummarySection;
}
