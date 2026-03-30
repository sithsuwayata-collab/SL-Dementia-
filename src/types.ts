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
    messageMe: string;
  };
  game: {
    title: string;
    intro: string;
    start: string;
    step1Title: string;
    step1Desc: string;
    ready: string;
    next: string;
    step2Title: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    resultTitle: string;
    score: string;
    feedbackGood: string;
    feedbackMod: string;
    playAgain: string;
    hardMode: string;
    correct: string;
    wrong: string;
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
