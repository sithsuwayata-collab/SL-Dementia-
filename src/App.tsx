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
    <div className="h-[100dvh] bg-[#2d1b4d] text-white font-sans selection:bg-purple-500/30 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-none bg-[#2d1b4d]/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen('home')}>
          <Brain className="text-purple-400" size={24} />
          <h1 className="text-lg font-bold tracking-tight">{t.appName}</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${lang === 'en' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('si')}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${lang === 'si' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            සිං
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 relative">
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center text-center py-4"
            >
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <Brain size={48} className="text-purple-400 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.welcome.title}</h2>
              <p className="text-base text-white/80 mb-8 leading-relaxed px-4">
                {t.welcome.description}
              </p>
              <button 
                onClick={handleStart}
                className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group"
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
              className="space-y-8 flex flex-col h-full items-center justify-center"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl font-bold mb-2 tracking-tight">{t.home.tagline}</h2>
              </div>

              <div className="grid gap-6 w-full max-w-xs">
                <button 
                  onClick={handleCheckRisk}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl flex items-center justify-center gap-4 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Activity className="text-purple-300" size={22} />
                  </div>
                  <h3 className="text-xl font-bold tracking-wide">{t.home.checkRisk}</h3>
                </button>

                <button 
                  onClick={handleLearnMore}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl flex items-center justify-center gap-4 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Info className="text-blue-300" size={22} />
                  </div>
                  <h3 className="text-xl font-bold tracking-wide">{t.home.learnMore}</h3>
                </button>

                <button 
                  onClick={handleConnect}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl flex items-center justify-center gap-4 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Users className="text-green-300" size={22} />
                  </div>
                  <h3 className="text-xl font-bold tracking-wide">{t.home.connect}</h3>
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
              className="h-full flex flex-col"
            >
              {currentQuestionIndex === 0 && !answers[QUESTIONS[0].id] && (
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl space-y-0.5 mb-1.5 flex-none">
                  <h2 className="text-base font-bold tracking-tight">{t.assessment.title}</h2>
                  <p className="text-white/80 text-[11px] leading-tight">
                    {lang === 'en' ? t.assessment.introEn : t.assessment.introSi}
                  </p>
                  <div className="flex items-center gap-1.5 text-white/40 text-[9px]">
                    <Activity size={10} />
                    <span>{t.assessment.takesTime}</span>
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-end mb-1.5 flex-none">
                  <div>
                    <span className="text-purple-400 font-bold text-[9px] uppercase tracking-wider">{t.assessment.questionOf} {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                    <h3 className="text-base font-bold mt-0.5 leading-tight">{QUESTIONS[currentQuestionIndex].title[lang]}</h3>
                  </div>
                  <div className="bg-white/10 p-1 rounded-xl flex-none">
                    {getIcon(QUESTIONS[currentQuestionIndex].icon, 18)}
                  </div>
                </div>

                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2 flex-none">
                  <motion.div 
                    className="bg-purple-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 pb-2">
                  {QUESTIONS[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelection(option)}
                      className={`w-full p-2.5 rounded-xl text-left border-2 transition-all flex items-center gap-3 ${
                        answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-white/20'
                      }`}>
                        {answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id && <div className="w-1 h-1 bg-white rounded-full" />}
                      </div>
                      <span className="text-sm font-medium leading-tight">{option.text[lang]}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 flex-none">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-white/10 hover:bg-white/20 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} />
                    {t.assessment.back}
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!answers[QUESTIONS[currentQuestionIndex].id]}
                    className={`flex-[2] py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      answers[QUESTIONS[currentQuestionIndex].id]
                        ? 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                    }`}
                  >
                    {t.assessment.next}
                    <ChevronRight size={18} />
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
              className="h-full flex flex-col space-y-6 text-center"
            >
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 flex-none">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500/20 rounded-2xl mb-1">
                  <FileText size={28} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">{t.results.title}</h2>
                
                <div className="space-y-1">
                  <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{t.results.highRiskFactors}</p>
                  <div className="text-5xl font-black text-purple-400">{highRiskCount}</div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className={`text-xl font-bold ${riskLevel.color}`}>{riskLevel.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{riskLevel.msg}</p>
                </div>
              </div>

              <div className="grid gap-3 flex-1 overflow-y-auto pb-4">
                <button 
                  onClick={() => setShowFullReport(true)}
                  className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border border-white/10 transition-all"
                >
                  <FileText size={18} className="text-blue-400" />
                  {t.results.viewReport}
                </button>
                <button 
                  onClick={() => setShowWarnings(true)}
                  className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border border-white/10 transition-all"
                >
                  <AlertTriangle size={18} className="text-yellow-400" />
                  {t.results.viewWarnings}
                </button>
                <button 
                  onClick={handleRestart}
                  className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border border-purple-500/30 transition-all"
                >
                  <RotateCcw size={18} />
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
              className="h-full flex flex-col"
            >
              <h2 className="text-xl font-bold mb-6 flex-none">{t.learn.title}</h2>

              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {LEARN_CONTENT[lang].map((section, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
                    <h3 className="text-lg font-bold text-purple-400">{section.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
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
              className="h-full flex flex-col items-center justify-center text-center py-6"
            >
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-green-400" />
              </div>
              <div className="space-y-3 mb-6">
                <h2 className="text-2xl font-bold">{t.community.title}</h2>
                <p className="text-base text-white/80 max-w-xs mx-auto leading-relaxed">{t.community.message}</p>
              </div>
              <a 
                href="https://www.facebook.com/groups/sldementia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full max-w-xs inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl transition-all mb-6"
              >
                <ExternalLink size={20} />
                {t.community.joinGroup}
              </a>

              <div className="mt-auto pt-4 border-t border-white/10 w-full space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/40 italic px-4 leading-tight">
                    {t.home.disclaimer}
                  </p>
                </div>
                <a 
                  href="https://www.facebook.com/maheshmnishantha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full max-w-xs inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 font-bold py-3 rounded-xl text-sm transition-all border border-white/10"
                >
                  App questions? Message me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="flex-none bg-[#2d1b4d] border-t border-white/10 px-2 py-2 flex justify-around items-center z-50">
        <NavButton 
          active={screen === 'home'} 
          onClick={() => setScreen('home')} 
          icon={<Brain size={20} />} 
          label={lang === 'en' ? 'Home' : 'මුල් පිටුව'} 
        />
        <NavButton 
          active={screen === 'assessment' || screen === 'results'} 
          onClick={handleCheckRisk} 
          icon={<Activity size={20} />} 
          label={lang === 'en' ? 'Risk' : 'අවදානම'} 
        />
        <NavButton 
          active={screen === 'learn'} 
          onClick={handleLearnMore} 
          icon={<Info size={20} />} 
          label={lang === 'en' ? 'Learn' : 'ඉගෙන ගන්න'} 
        />
        <NavButton 
          active={screen === 'community'} 
          onClick={handleConnect} 
          icon={<Users size={20} />} 
          label={lang === 'en' ? 'Community' : 'ප්‍රජාව'} 
        />
      </nav>

      {/* Modals */}
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
              className="bg-[#2d1b4d] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-lg font-bold">{t.results.viewReport}</h3>
                <button onClick={() => setShowFullReport(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-white/40 text-[10px] uppercase tracking-wider border-b border-white/10">
                      <th className="pb-2 font-bold">Risk Factor</th>
                      <th className="pb-2 font-bold text-right">Your Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {QUESTIONS.map((q) => {
                      const answer = answers[q.id];
                      return (
                        <tr key={q.id} className="group">
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-2">
                              <div className="text-purple-400/60 group-hover:text-purple-400 transition-colors">
                                {getIcon(q.icon, 14)}
                              </div>
                              <span className="text-xs font-medium">{q.title[lang]}</span>
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
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
              <div className="p-5 bg-white/5 border-t border-white/10">
                <button 
                  onClick={() => setShowFullReport(false)}
                  className="w-full bg-purple-500 py-3.5 rounded-xl font-bold text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-[#2d1b4d] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-lg font-bold">{t.results.viewWarnings}</h3>
                <button onClick={() => setShowWarnings(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 overflow-y-auto space-y-5">
                {highRiskAnswers.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-yellow-400 font-bold text-sm flex items-center gap-2">
                      <AlertTriangle size={18} />
                      {t.results.focusAreas}
                    </p>
                    <div className="grid gap-3">
                      {highRiskAnswers.map(({ question, option }, idx) => (
                        <div key={idx} className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="text-red-400">{getIcon(question.icon, 16)}</div>
                            <h4 className="font-bold text-white text-sm">{question.title[lang]}</h4>
                          </div>
                          <p className="text-red-200/80 text-xs italic">"{option.text[lang]}"</p>
                          <div className="pt-1">
                            <p className="text-white/90 text-xs font-medium bg-white/5 p-2.5 rounded-lg border border-white/5">
                              💡 {option.tip[lang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="text-green-400" size={24} />
                    </div>
                    <p className="text-white/60 text-sm">No high risk factors identified. Keep up your healthy lifestyle!</p>
                  </div>
                )}
              </div>
              <div className="p-5 bg-white/5 border-t border-white/10">
                <button 
                  onClick={() => setShowWarnings(false)}
                  className="w-full bg-purple-500 py-3.5 rounded-xl font-bold text-sm"
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

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
        active ? 'text-purple-400' : 'text-white/40 hover:text-white/60'
      }`}
    >
      <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
      {active && <motion.div layoutId="nav-indicator" className="w-1 h-1 bg-purple-400 rounded-full mt-0.5" />}
    </button>
  );
}
