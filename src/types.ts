export type Language = 'en' | 'si';

export interface Translation {
  appName: string;
  welcome: {
    title: string;
    description: string;
    getStarted: string;
  };
  home: {
    tagline: string;
    checkRisk: string;
    learnMore: string;
    connect: string;
    disclaimer: string;
  };
  assessment: {
    title: string;
    introEn: string;
    introSi: string;
    takesTime: string;
    start: string;
    questionOf: string;
    next: string;
    back: string;
    restart: string;
  };
  results: {
    title: string;
    highRiskFactors: string;
    lowRiskTitle: string;
    lowRiskMsg: string;
    modRiskTitle: string;
    modRiskMsg: string;
    highRiskTitle: string;
    highRiskMsg: string;
    viewReport: string;
    viewWarnings: string;
    focusAreas: string;
  };
  learn: {
    title: string;
    whatIs: string;
    signs: string;
    prevention: string;
    support: string;
  };
  community: {
    title: string;
    message: string;
    joinGroup: string;
  };
  footer: {
    questions: string;
  };
}

export interface Option {
  id: string;
  text: { en: string; si: string };
  risk: 'low' | 'moderate' | 'high';
  tip: { en: string; si: string };
}

export interface Question {
  id: number;
  title: { en: string; si: string };
  icon: string;
  options: Option[];
}
