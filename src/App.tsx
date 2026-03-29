/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  ExternalLink, 
  GraduationCap, 
  Ear, 
  Activity, 
  Cigarette, 
  Weight, 
  Frown, 
  Dumbbell, 
  Droplet, 
  Users, 
  Beer, 
  Stethoscope, 
  Wind, 
  Heart, 
  Moon,
  Info,
  AlertTriangle,
  FileText,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, QUESTIONS, LEARN_CONTENT } from './constants';
import { Language, Question, Option } from './types';

// Helper to get icon component
const getIcon = (iconName: string, size = 24) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap size={size} />;
    case 'Ear': return <Ear size={size} />;
    case 'Activity': return <Activity size={size} />;
    case 'Smoking': return <Cigarette size={size} />;
    case 'Weight': return <Weight size={size} />;
    case 'Frown': return <Frown size={size} />;
    case 'Dumbbell': return <Dumbbell size={size} />;
    case 'Droplet': return <Droplet size={size} />;
    case 'Users': return <Users size={size} />;
    case 'Beer': return <Beer size={size} />;
    case 'Stethoscope': return <Stethoscope size={size} />;
    case 'Wind': return <Wind size={size} />;
    case 'Heart': return <Heart size={size} />;
    case 'Moon': return <Moon size={size} />;
    default: return <Info size={size} />;
  }
};

type Screen = 'welcome' | 'home' | 'assessment' | 'results' | 'learn' | 'community';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [showFullReport, setShowFullReport] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  const t = TRANSLATIONS[lang];

  const highRiskCount = useMemo(() => {
    return (Object.values(answers) as Option[]).filter(a => a.risk === 'high').length;
  }, [answers]);

  const highRiskAnswers = useMemo(() => {
    return (Object.entries(answers) as [string, Option][])
      .filter(([_, option]) => option.risk === 'high')
      .map(([qId, option]) => ({
        question: QUESTIONS.find(q => q.id === parseInt(qId))!,
        option
      }));
  }, [answers]);

  const handleStart = () => setScreen('home');
  const handleCheckRisk = () => {
    setScreen('assessment');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };
  const handleLearnMore = () => setScreen('learn');
  const handleConnect = () => setScreen('community');

  const handleAnswerSelection = (option: Option) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen('results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setScreen('home');
    }
  };

  const handleRestart = () => {
    setScreen('assessment');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const getRiskLevel = () => {
    if (highRiskCount <= 2) return { title: t.results.lowRiskTitle, msg: t.results.lowRiskMsg, color: 'text-green-400' };
    if (highRiskCount <= 5) return { title: t.results.modRiskTitle, msg: t.results.modRiskMsg, color: 'text-yellow-400' };
    return { title: t.results.highRiskTitle, msg: t.results.highRiskMsg, color: 'text-red-400' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen bg-[#2d1b4d] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2d1b4d]/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen('home')}>
          <Brain className="text-purple-400" size={28} />
          <h1 className="text-xl font-bold tracking-tight">{t.appName}</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'en' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('si')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'si' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            සිං
          </button>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center py-12"
            >
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-8">
                <Brain size={64} className="text-purple-400 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-4">{t.welcome.title}</h2>
              <p className="text-lg text-white/80 mb-2 leading-relaxed">{t.welcome.description}</p>
              <p className="text-lg text-purple-300 mb-12 leading-relaxed font-medium">{t.welcome.descriptionSi}</p>
              <button 
                onClick={handleStart}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                {t.welcome.getStarted}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {screen === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-2">{t.home.tagline}</h2>
                <p className="text-white/60 text-sm italic">{t.home.disclaimer}</p>
              </div>

              <div className="grid gap-4">
                <button 
                  onClick={handleCheckRisk}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Activity className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{t.home.checkRisk}</h3>
                    <p className="text-white/60 text-sm">14 questions • 3 mins</p>
                  </div>
                  <ChevronRight className="text-white/20 group-hover:text-white/60 transition-colors" />
                </button>

                <button 
                  onClick={handleLearnMore}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Info className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{t.home.learnMore}</h3>
                    <p className="text-white/60 text-sm">Signs, prevention & support</p>
                  </div>
                  <ChevronRight className="text-white/20 group-hover:text-white/60 transition-colors" />
                </button>

                <button 
                  onClick={handleConnect}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    <Users className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{t.home.connect}</h3>
                    <p className="text-white/60 text-sm">Join our community</p>
                  </div>
                  <ChevronRight className="text-white/20 group-hover:text-white/60 transition-colors" />
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'assessment' && (
            <motion.div 
              key="assessment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {currentQuestionIndex === 0 && !answers[QUESTIONS[0].id] && (
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                  <h2 className="text-2xl font-bold">{t.assessment.title}</h2>
                  <p className="text-white/80 leading-relaxed">{t.assessment.introEn}</p>
                  <p className="text-purple-300 leading-relaxed font-medium">{t.assessment.introSi}</p>
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Activity size={16} />
                    <span>{t.assessment.takesTime}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-purple-400 font-bold text-sm uppercase tracking-wider">{t.assessment.questionOf} {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                    <h3 className="text-2xl font-bold mt-1">{QUESTIONS[currentQuestionIndex].title[lang]}</h3>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    {getIcon(QUESTIONS[currentQuestionIndex].icon, 32)}
                  </div>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-purple-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="grid gap-3">
                  {QUESTIONS[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelection(option)}
                      className={`p-5 rounded-2xl text-left border-2 transition-all flex items-center gap-4 ${
                        answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-white/20'
                      }`}>
                        {answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium">{option.text[lang]}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    {t.assessment.back}
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!answers[QUESTIONS[currentQuestionIndex].id]}
                    className={`flex-[2] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                      answers[QUESTIONS[currentQuestionIndex].id]
                        ? 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                    }`}
                  >
                    {t.assessment.next}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 text-center"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-3xl mb-2">
                  <FileText size={40} className="text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold">{t.results.title}</h2>
                
                <div className="space-y-2">
                  <p className="text-white/60 uppercase tracking-widest text-xs font-bold">{t.results.highRiskFactors}</p>
                  <div className="text-6xl font-black text-purple-400">{highRiskCount}</div>
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className={`text-2xl font-bold ${riskLevel.color}`}>{riskLevel.title}</h3>
                  <p className="text-white/80 leading-relaxed">{riskLevel.msg}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <button 
                  onClick={() => setShowFullReport(true)}
                  className="w-full bg-white/10 hover:bg-white/20 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 border border-white/10 transition-all"
                >
                  <FileText size={20} className="text-blue-400" />
                  {t.results.viewReport}
                </button>
                <button 
                  onClick={() => setShowWarnings(true)}
                  className="w-full bg-white/10 hover:bg-white/20 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 border border-white/10 transition-all"
                >
                  <AlertTriangle size={20} className="text-yellow-400" />
                  {t.results.viewWarnings}
                </button>
                <button 
                  onClick={handleRestart}
                  className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 border border-purple-500/30 transition-all"
                >
                  <RotateCcw size={20} />
                  {t.assessment.restart}
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setScreen('home')} className="p-2 bg-white/10 rounded-xl hover:bg-white/20">
                  <ChevronLeft />
                </button>
                <h2 className="text-2xl font-bold">{t.learn.title}</h2>
              </div>

              <div className="space-y-6">
                {LEARN_CONTENT[lang].map((section, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
                    <h3 className="text-xl font-bold text-purple-400">{section.title}</h3>
                    <p className="text-white/80 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Users size={64} className="text-green-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{t.community.title}</h2>
                <p className="text-xl text-white/80 max-w-md mx-auto leading-relaxed">{t.community.message}</p>
              </div>
              <a 
                href="https://www.facebook.com/groups/sldementia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-5 px-10 rounded-3xl shadow-xl transition-all"
              >
                <ExternalLink size={24} />
                {t.community.joinGroup}
              </a>
              <button 
                onClick={() => setScreen('home')}
                className="block mx-auto text-white/40 hover:text-white/60 font-medium transition-colors"
              >
                {t.assessment.back}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/5 py-12 px-4 text-center space-y-6">
        <div className="space-y-2">
          <p className="text-white/40 text-sm font-medium">{t.footer.project}</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.facebook.com/groups/sldementia" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
              <Users size={20} />
            </a>
            <a href="https://www.facebook.com/maheshmnishantha" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <a 
          href="https://www.facebook.com/maheshmnishantha" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          {t.footer.questions}: @maheshmnishantha
        </a>
      </footer>

      {/* Full Report Modal */}
      <AnimatePresence>
        {showFullReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#2d1b4d] border border-white/10 w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold">{t.results.viewReport}</h3>
                <button onClick={() => setShowFullReport(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                      <th className="pb-3 font-bold">Risk Factor</th>
                      <th className="pb-3 font-bold text-right">Your Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {QUESTIONS.map((q) => {
                      const answer = answers[q.id];
                      return (
                        <tr key={q.id} className="group">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="text-purple-400/60 group-hover:text-purple-400 transition-colors">
                                {getIcon(q.icon, 18)}
                              </div>
                              <span className="text-sm font-medium">{q.title[lang]}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                              answer?.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                              answer?.risk === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {answer?.text[lang]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-white/5 border-t border-white/10">
                <button 
                  onClick={() => setShowFullReport(false)}
                  className="w-full bg-purple-500 py-4 rounded-2xl font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warnings & Suggestions Modal */}
      <AnimatePresence>
        {showWarnings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#2d1b4d] border border-white/10 w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold">{t.results.viewWarnings}</h3>
                <button onClick={() => setShowWarnings(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                {highRiskAnswers.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-yellow-400 font-bold flex items-center gap-2">
                      <AlertTriangle size={20} />
                      {t.results.focusAreas}
                    </p>
                    <div className="grid gap-4">
                      {highRiskAnswers.map(({ question, option }, idx) => (
                        <div key={idx} className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="text-red-400">{getIcon(question.icon, 20)}</div>
                            <h4 className="font-bold text-white">{question.title[lang]}</h4>
                          </div>
                          <p className="text-red-200/80 text-sm leading-relaxed italic">"{option.text[lang]}"</p>
                          <div className="pt-2">
                            <p className="text-white/90 text-sm font-medium bg-white/5 p-3 rounded-xl border border-white/5">
                              💡 {option.tip[lang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="text-green-400" />
                    </div>
                    <p className="text-white/60">No high risk factors identified. Keep up your healthy lifestyle!</p>
                  </div>
                )}
              </div>
              <div className="p-6 bg-white/5 border-t border-white/10">
                <button 
                  onClick={() => setShowWarnings(false)}
                  className="w-full bg-purple-500 py-4 rounded-2xl font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
