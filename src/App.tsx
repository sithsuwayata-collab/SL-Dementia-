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
  X,
  Gamepad2,
  Trophy,
  Eye,
  BookOpen,
  ListOrdered,
  HeartPulse,
  ClipboardCheck,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, QUESTIONS, LEARN_CONTENT, GAME_ITEMS, GAME_SYMBOLS, GAME_STORIES } from './constants';
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
    case 'HeartPulse': return <Heart size={size} />;
    case 'ClipboardCheck': return <ListOrdered size={size} />;
    case 'Lightbulb': return <BookOpen size={size} />;
    case 'Wind': return <Wind size={size} />;
    case 'MessageSquare': return <Info size={size} />;
    default: return <Info size={size} />;
  }
};

type Screen = 'welcome' | 'home' | 'assessment' | 'results' | 'learn' | 'community' | 'game' | 'support';

const BoxBreathing = () => {
  const [phase, setPhase] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  const colors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-yellow-400'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div
          animate={{
            scale: phase === 0 ? [1, 1.5] : phase === 1 ? 1.5 : phase === 2 ? [1.5, 1] : 1,
            rotate: phase * 90,
            borderRadius: phase % 2 === 0 ? "20%" : "50%"
          }}
          transition={{ duration: 4, ease: "linear" }}
          className="absolute inset-0 border-4 border-pink-500/30"
        />
        <motion.span
          key={phase}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl font-bold ${colors[phase]}`}
        >
          {phases[phase]}
        </motion.span>
      </div>
      <div className="flex gap-2">
        {phases.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === phase ? 'bg-pink-500' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [screen, setScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [showFullReport, setShowFullReport] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [checklistStatus, setChecklistStatus] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('checklistStatus');
    return saved ? JSON.parse(saved) : {};
  });

  // Game State
  const [gameStep, setGameStep] = useState<number>(0); // 0: Intro, 1: Memory, 2: Story, 3: Visual, 4: Recall, 5: Results
  const [gameScore, setGameScore] = useState<number>(0);
  const [hardMode, setHardMode] = useState<boolean>(false);
  const [dailyGameData, setDailyGameData] = useState<any>(null);
  const [userSelections, setUserSelections] = useState<any[]>([]);
  const [showMemoryItems, setShowMemoryItems] = useState<boolean>(false);
  const [gameFeedback, setGameFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('checklistStatus', JSON.stringify(checklistStatus));
  }, [checklistStatus]);

  const t = TRANSLATIONS[lang];

  // Game Generation Logic
  const generateGameData = (isHard: boolean) => {
    const itemCount = isHard ? 6 : 5;
    
    // Pick items randomly
    const shuffledItems = [...GAME_ITEMS].sort(() => Math.random() - 0.5);
    const selectedItems = shuffledItems.slice(0, itemCount);
    
    // Pick story randomly
    const storyIndex = Math.floor(Math.random() * GAME_STORIES.length);
    const selectedStory = GAME_STORIES[storyIndex];
    
    // Pick symbols randomly
    const shuffledSymbols = [...GAME_SYMBOLS].sort(() => Math.random() - 0.5);
    const selectedSymbols = shuffledSymbols.slice(0, 5);
    
    setDailyGameData({
      items: selectedItems,
      story: selectedStory,
      symbols: selectedSymbols,
      visualQuestion: Math.floor(Math.random() * 5) // Position to ask about
    });
  };

  useEffect(() => {
    if (screen === 'game' && gameStep === 0) {
      generateGameData(hardMode);
    }
  }, [screen, gameStep, hardMode]);

  const handleStartGame = () => {
    setGameStep(1);
    setShowMemoryItems(true);
    setGameScore(0);
    setUserSelections([]);
    
    // Hide memory items after 5 seconds
    setTimeout(() => {
      setShowMemoryItems(false);
    }, 5000);
  };

  const handleGameStepNext = (points: number = 0) => {
    setGameScore(prev => prev + points);
    setGameStep(prev => prev + 1);
    setGameFeedback('');
    setSelectedAnswer(null);
    setIsProcessing(false);
  };

  const handleAnswerWithFeedback = (isCorrect: boolean, index: number) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSelectedAnswer(index);
    setGameFeedback(isCorrect ? t.game.correct : t.game.wrong);
    
    setTimeout(() => {
      handleGameStepNext(isCorrect ? 1 : 0);
    }, 1500);
  };

  const resetGame = () => {
    setGameStep(0);
    setGameScore(0);
    setUserSelections([]);
    setGameFeedback('');
    setSelectedAnswer(null);
    setIsProcessing(false);
  };

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
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm px-4">
                <button 
                  onClick={handleCheckRisk}
                  className="col-span-2 h-32 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(147,51,234,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-12 h-12 bg-purple-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Activity className="text-purple-300" size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-wide">{t.home.checkRisk}</h3>
                </button>

                <button 
                  onClick={handleLearnMore}
                  className="aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-12 h-12 bg-blue-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Info className="text-blue-300" size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-wide">{t.home.learnMore}</h3>
                </button>

                <button 
                  onClick={() => {
                    setScreen('game');
                    resetGame();
                  }}
                  className="aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(249,115,22,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-12 h-12 bg-orange-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Gamepad2 className="text-orange-300" size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-wide">{lang === 'en' ? 'Game' : 'ක්‍රීඩාව'}</h3>
                </button>

                <button 
                  onClick={() => setScreen('support')}
                  className="aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-12 h-12 bg-pink-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Heart className="text-pink-300" size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-wide">{t.home.caregiver}</h3>
                </button>

                <button 
                  onClick={handleConnect}
                  className="aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all text-center group shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_25px_rgba(34,197,94,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner"
                >
                  <div className="w-12 h-12 bg-green-500/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="text-green-300" size={24} />
                  </div>
                  <h3 className="text-base font-bold tracking-wide">{t.home.connect}</h3>
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

          {screen === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              {gameStep === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center shadow-xl">
                    <Gamepad2 size={48} className="text-purple-400" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">{t.game.title}</h2>
                    <p className="text-white/60 text-sm max-w-xs mx-auto">{t.game.intro}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl w-full max-w-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{t.game.hardMode}</span>
                      <button 
                        onClick={() => setHardMode(!hardMode)}
                        className={`w-12 h-6 rounded-full transition-all relative ${hardMode ? 'bg-purple-500' : 'bg-white/20'}`}
                      >
                        <motion.div 
                          animate={{ x: hardMode ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                        />
                      </button>
                    </div>
                    <p className="text-[10px] text-white/40 leading-tight">
                      {hardMode ? "More items and complex questions." : "Standard cognitive exercise."}
                    </p>
                  </div>

                  <button 
                    onClick={handleStartGame}
                    className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    {t.game.start}
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {gameStep === 1 && (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{t.game.step1Title}</h3>
                    <div className="bg-purple-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-purple-400">1/4</div>
                  </div>
                  <p className="text-white/60 text-sm">{t.game.step1Desc}</p>
                  
                  <div className="flex-1 flex items-center justify-center">
                    {showMemoryItems ? (
                      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {dailyGameData?.items.map((item: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/10 border border-white/20 p-4 rounded-2xl flex flex-col items-center gap-2"
                          >
                            <span className="text-3xl">{item.icon}</span>
                            <span className="text-xs font-bold">{item.name[lang]}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-6"
                      >
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                          <Eye size={32} className="text-green-400" />
                        </div>
                        <p className="text-lg font-bold">{t.game.ready}</p>
                        <button 
                          onClick={() => handleGameStepNext(0)}
                          className="bg-purple-500 px-8 py-3 rounded-xl font-bold shadow-lg"
                        >
                          {t.game.next}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {gameStep === 2 && (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{t.game.step2Title}</h3>
                    <div className="bg-purple-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-purple-400">2/4</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex-1 overflow-y-auto">
                    <p className="text-lg leading-relaxed text-white/90 italic">
                      "{dailyGameData?.story.text[lang]}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-bold text-purple-400">{dailyGameData?.story.question[lang]}</p>
                    <div className="grid gap-2">
                      {dailyGameData?.story.options[lang].map((opt: string, idx: number) => {
                        const isCorrect = idx === dailyGameData.story.correctIndex;
                        const isSelected = selectedAnswer === idx;
                        
                        return (
                          <button 
                            key={idx}
                            disabled={isProcessing}
                            onClick={() => handleAnswerWithFeedback(isCorrect, idx)}
                            className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                              isSelected 
                                ? isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'
                                : 'bg-white/10 border-transparent hover:bg-white/20 hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>{opt}</span>
                              {isSelected && (
                                <span className="text-xs font-bold">
                                  {isCorrect ? t.game.correct : t.game.wrong}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {gameStep === 3 && (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{t.game.step3Title}</h3>
                    <div className="bg-purple-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-purple-400">3/4</div>
                  </div>
                  <p className="text-white/60 text-sm">{t.game.step3Desc}</p>
                  
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                    <div className="flex gap-4">
                      {dailyGameData?.symbols.map((symbol: string, idx: number) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                        >
                          {symbol}
                        </motion.div>
                      ))}
                    </div>

                    <div className="w-full max-w-xs space-y-4">
                      <p className="text-center font-bold text-purple-400">
                        {lang === 'en' 
                          ? `Which symbol was at position ${dailyGameData.visualQuestion + 1}?` 
                          : `ස්ථානය ${dailyGameData.visualQuestion + 1} හි තිබූ සංකේතය කුමක්ද?`}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {dailyGameData?.symbols.map((symbol: string, idx: number) => {
                          const isCorrect = idx === dailyGameData.visualQuestion;
                          const isSelected = selectedAnswer === idx;

                          return (
                            <button 
                              key={idx}
                              disabled={isProcessing}
                              onClick={() => handleAnswerWithFeedback(isCorrect, idx)}
                              className={`p-4 rounded-xl text-2xl transition-all border ${
                                isSelected 
                                  ? isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'
                                  : 'bg-white/10 border-transparent hover:bg-white/20 hover:border-white/20'
                              }`}
                            >
                              {symbol}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {gameStep === 4 && (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{t.game.step4Title}</h3>
                    <div className="bg-purple-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-purple-400">4/4</div>
                  </div>
                  <p className="text-white/60 text-sm">{t.game.step4Desc}</p>

                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-3">
                      {GAME_ITEMS.sort(() => 0.5 - Math.random()).slice(0, 12).map((item, idx) => {
                        const isSelected = userSelections.find(s => s.id === item.id);
                        const selectionIndex = userSelections.findIndex(s => s.id === item.id);
                        
                        return (
                          <button 
                            key={idx}
                            disabled={isSelected}
                            onClick={() => {
                              const newSelections = [...userSelections, item];
                              setUserSelections(newSelections);
                              if (newSelections.length === dailyGameData.items.length) {
                                // Calculate score
                                let correctCount = 0;
                                newSelections.forEach((sel, i) => {
                                  if (sel.id === dailyGameData.items[i].id) correctCount++;
                                });
                                handleGameStepNext(correctCount);
                              }
                            }}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative ${
                              isSelected ? 'bg-purple-500/40 border-purple-500' : 'bg-white/5 border-white/10 hover:bg-white/10'
                            } border`}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-[8px] font-bold uppercase opacity-60">{item.name[lang]}</span>
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                                {selectionIndex + 1}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 items-center justify-center py-2">
                    {dailyGameData?.items.map((_: any, i: number) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < userSelections.length ? 'bg-purple-400' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>
              )}

              {gameStep === 5 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center shadow-2xl relative"
                  >
                    <Trophy size={56} className="text-yellow-400" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-yellow-500/30 rounded-full"
                    />
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">{t.game.resultTitle}</h2>
                    <p className="text-white/60 text-sm">{t.game.score}: <span className="text-purple-400 font-bold text-xl">{gameScore}</span> / {hardMode ? 8 : 7}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl w-full max-w-xs">
                    <p className="text-lg font-medium leading-relaxed italic">
                      {gameScore >= (hardMode ? 6 : 5) ? t.game.feedbackGood : t.game.feedbackMod}
                    </p>
                  </div>

                  <div className="grid gap-3 w-full max-w-xs">
                    <button 
                      onClick={resetGame}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={20} />
                      {t.game.playAgain}
                    </button>
                    <button 
                      onClick={() => setScreen('home')}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all"
                    >
                      {t.assessment.back}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {screen === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col space-y-6"
            >
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Users size={32} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">{t.community.title}</h2>
                <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed">
                  {t.community.message}
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <a 
                  href="https://www.facebook.com/groups/sldementia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all"
                >
                  <Users size={20} />
                  {t.community.joinGroup}
                </a>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10 flex flex-col items-center">
                <a 
                  href="https://www.facebook.com/maheshmnishantha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-auto px-6 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-3 transition-all border border-white/10 text-xs"
                >
                  <ExternalLink size={16} />
                  {t.community.messageMe}
                </a>

                <p className="text-[10px] text-white/40 text-center leading-relaxed italic">
                  {t.home.disclaimer}
                </p>
              </div>
            </motion.div>
          )}

          {screen === 'support' && (
            <motion.div 
              key="support"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-2 py-4">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <HeartPulse size={32} className="text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold">{t.caregiverSupport.title}</h2>
                <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed">
                  {t.caregiverSupport.tagline}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pb-10">
                {/* Daily Checklist */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-green-400">
                    <ClipboardCheck size={20} />
                    <h3 className="font-bold">{t.caregiverSupport.checklist.title}</h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                    {t.caregiverSupport.checklist.items.map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setChecklistStatus(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className={`w-full p-4 flex items-center gap-4 border-b border-white/5 last:border-0 transition-colors ${checklistStatus[idx] ? 'bg-green-500/10' : 'hover:bg-white/5'}`}
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checklistStatus[idx] ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                          {checklistStatus[idx] && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <span className={`text-sm font-medium ${checklistStatus[idx] ? 'text-green-300 line-through' : 'text-white/90'}`}>
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                  {Object.values(checklistStatus).filter(Boolean).length === t.caregiverSupport.checklist.items.length && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-green-400 font-bold text-sm py-2"
                    >
                      ✨ {t.caregiverSupport.checklist.done}
                    </motion.p>
                  )}
                </section>

                {/* What to Do If Section */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <Lightbulb size={20} />
                    <h3 className="font-bold">{t.caregiverSupport.whatToDo.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.caregiverSupport.whatToDo.scenarios.map((scenario, idx) => (
                      <details key={idx} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all">
                        <summary className="p-4 flex items-center justify-between cursor-pointer list-none hover:bg-white/5">
                          <span className="text-sm font-bold text-white/90">{scenario.q}</span>
                          <ChevronDown size={18} className="text-white/40 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="p-4 pt-0 space-y-3">
                          {scenario.steps.map((step, sIdx) => (
                            <div key={sIdx} className="flex gap-3 text-xs text-white/70 leading-relaxed">
                              <span className="text-yellow-400 font-bold">{sIdx + 1}.</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

                {/* Behavior Tips */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-400">
                    <MessageSquare size={20} />
                    <h3 className="font-bold">{t.caregiverSupport.tips.title}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {t.caregiverSupport.tips.items.map((tip, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                        <h4 className="text-xs font-bold text-blue-300">{tip.title}</h4>
                        <p className="text-[10px] text-white/60 leading-tight">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Stress Support */}
                <section className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 p-6 rounded-3xl space-y-6">
                  <div className="flex items-center gap-3 text-pink-400">
                    <HeartPulse size={20} />
                    <h3 className="font-bold">{t.caregiverSupport.stress.title}</h3>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <h4 className="text-sm font-bold text-white">{t.caregiverSupport.stress.breath}</h4>
                    <p className="text-xs text-white/70 leading-relaxed italic">
                      {t.caregiverSupport.stress.breathDesc}
                    </p>
                  </div>

                  <BoxBreathing />

                  <div className="bg-white/10 p-4 rounded-2xl text-center">
                    <p className="text-sm font-medium text-pink-200">
                      "{t.caregiverSupport.stress.messages[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % t.caregiverSupport.stress.messages.length]}"
                    </p>
                  </div>
                </section>
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
          active={screen === 'game'} 
          onClick={() => {
            setScreen('game');
            resetGame();
          }} 
          icon={<Gamepad2 size={20} />} 
          label={lang === 'en' ? 'Game' : 'ක්‍රීඩාව'} 
        />
        <NavButton 
          active={screen === 'support'} 
          onClick={() => setScreen('support')} 
          icon={<Heart size={20} />} 
          label={lang === 'en' ? 'Support' : 'සහාය'} 
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
