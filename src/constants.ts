import { Translation, Question } from './types';

export const TRANSLATIONS: Record<'en' | 'si', Translation> = {
  en: {
    appName: "SL Dementia",
    welcome: {
      title: "Welcome to SL Dementia",
      description: "Small changes today can protect your memory tomorrow. This app helps you understand dementia and assess your personal risk factors.",
      getStarted: "Get Started"
    },
    home: {
      tagline: "Support starts with awareness.",
      checkRisk: "Assess",
      learnMore: "Learn",
      connect: "Community",
      disclaimer: "This app does not provide a medical diagnosis. It is designed to promote awareness, connection, and support."
    },
    assessment: {
      title: "Dementia Risk Self-Assessment",
      introEn: "Answer 14 simple questions about your lifestyle and health.",
      introSi: "තෝරා ගත් modifiable risk factors 14ක් මේ තක්සේරු කිරීමට යොදා ගන්නවා...",
      takesTime: "Takes 2–3 minutes",
      start: "Start Assessment",
      questionOf: "Question",
      next: "Next",
      back: "Back",
      restart: "Restart Assessment"
    },
    results: {
      title: "Assessment Results",
      highRiskFactors: "High Risk Factors (💜)",
      lowRiskTitle: "Low Risk",
      lowRiskMsg: "Maintain your healthy lifestyle and reassess in one year.",
      modRiskTitle: "Moderate Risk",
      modRiskMsg: "Reduce at least 2–3 risk factors within 3 months.",
      highRiskTitle: "High Risk",
      highRiskMsg: "Start making changes and consult a doctor.",
      viewReport: "View Full Report",
      viewWarnings: "View Warnings & Suggestions",
      focusAreas: "Your Focus Areas"
    },
    learn: {
      title: "Learn About Dementia",
      whatIs: "What is Dementia?",
      signs: "Early Signs",
      prevention: "Prevention Tips",
      support: "Family Support"
    },
    community: {
      title: "Community",
      message: "You are not alone. Join our community for support and shared experiences.",
      joinGroup: "Join Facebook Group"
    },
    footer: {
      questions: "App questions? Message me: @maheshmnishantha"
    }
  },
  si: {
    appName: "SL Dementia",
    welcome: {
      title: "SL Dementia වෙත සාදරයෙන් පිළිගනිමු",
      description: "අද ඔබ තෝරා ගන්නා සෞඛ්‍යානුකූල වෙනස්වීමක්, ඔබේ හෙට දවස රැක දෙනු ඇත. මෙම ඇප් එක මගින් ඩිමෙන්ෂියාව පිළිබඳ දැනුමක් ලබා ගැනිම, අවදානම් හදුනාගැනීම මෙන්ම උපකාරයන් ලබා ගැනීමට එක්වීමටද පහසුකම් ලබා දේ",
      getStarted: "ආරම්භ කරන්න"
    },
    home: {
      tagline: "සහයෝගය ආරම්භ වන්නේ දැනුවත්භාවයෙනි.",
      checkRisk: "තක්සේරු",
      learnMore: "ඉගෙනුම",
      connect: "ප්‍රජාව",
      disclaimer: "මෙම යෙදුම වෛද්‍ය රෝග විනිශ්චයක් ලබා නොදේ. එය දැනුවත් කිරීම, සම්බන්ධතාවය සහ සහයෝගය ප්‍රවර්ධනය කිරීම සඳහා නිර්මාණය කර ඇත."
    },
    assessment: {
      title: "ඩිමෙන්ශියා අවදානම් ස්වයං තක්සේරුව",
      introEn: "ඔබේ ජීවන රටාව සහ සෞඛ්‍යය පිළිබඳ සරල ප්‍රශ්න 14 කට පිළිතුරු දෙන්න.",
      introSi: "තෝරා ගත් modifiable risk factors 14ක් මේ තක්සේරු කිරීමට යොදා ගන්නවා...",
      takesTime: "විනාඩි 2-3 ක් ගතවේ",
      start: "තක්සේරුව ආරම්භ කරන්න",
      questionOf: "ප්‍රශ්නය",
      next: "මීළඟ",
      back: "ආපසු",
      restart: "නැවත ආරම්භ කරන්න"
    },
    results: {
      title: "තක්සේරු ප්‍රතිඵල",
      highRiskFactors: "ඉහළ අවදානම් සාධක (💜)",
      lowRiskTitle: "අඩු අවදානම",
      lowRiskMsg: "ඔබේ සෞඛ්‍ය සම්පන්න ජීවන රටාව පවත්වා ගෙන ගොස් වසරකින් නැවත තක්සේරු කරන්න.",
      modRiskTitle: "මධ්‍යස්ථ අවදානම",
      modRiskMsg: "මාස 3ක් ඇතුළත අවම වශයෙන් අවදානම් සාධක 2-3ක් අඩු කරන්න.",
      highRiskTitle: "ඉහළ අවදානම",
      highRiskMsg: "වෙනස්කම් කිරීම ආරම්භ කර වෛද්‍යවරයෙකුගෙන් උපදෙස් ලබා ගන්න.",
      viewReport: "සම්පූර්ණ වාර්තාව බලන්න",
      viewWarnings: "අනතුරු ඇඟවීම් සහ යෝජනා බලන්න",
      focusAreas: "ඔබ අවධානය යොමු කළ යුතු කරුණු"
    },
    learn: {
      title: "ඩිමෙන්ශියාව ගැන ඉගෙන ගන්න",
      whatIs: "ඩිමෙන්ශියාව යනු කුමක්ද?",
      signs: "මුල් ලක්ෂණ",
      prevention: "වැළැක්වීමේ උපදෙස්",
      support: "පවුලේ සහාය"
    },
    community: {
      title: "ප්‍රජාව",
      message: "ඔබ තනි වී නැත. සහයෝගය සහ අත්දැකීම් බෙදා ගැනීමට අපගේ ප්‍රජාවට එක්වන්න.",
      joinGroup: "ෆේස්බුක් සමූහයට එක්වන්න"
    },
    footer: {
      questions: "යෙදුම පිළිබඳ ප්‍රශ්න? මට පණිවිඩයක් එවන්න: @maheshmnishantha"
    }
  }
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: { en: "Education Level", si: "අධ්‍යාපන මට්ටම" },
    icon: "GraduationCap",
    options: [
      { id: "1a", text: { en: "Completed A/L or higher education", si: "උසස් පෙළ හෝ ඊට වැඩි අධ්‍යාපනයක් ලබා ඇත" }, risk: "low", tip: { en: "Keep learning new things to stimulate your brain.", si: "ඔබේ මොළය උත්තේජනය කිරීමට අලුත් දේවල් ඉගෙන ගන්න." } },
      { id: "1b", text: { en: "Some schooling but did not complete A/L", si: "පාසල් අධ්‍යාපනය ලැබූ නමුත් උසස් පෙළ සම්පූර්ණ කර නැත" }, risk: "moderate", tip: { en: "Engage in puzzles, reading, or learning new skills.", si: "ප්‍රහේලිකා, කියවීම හෝ නව කුසලතා ඉගෙන ගැනීමට යොමු වන්න." } },
      { id: "1c", text: { en: "Very little formal schooling", si: "ඉතා අඩු විධිමත් අධ්‍යාපනයක්" }, risk: "high", tip: { en: "Lifelong learning is key. Try to learn a new language or hobby.", si: "ජීවිත කාලය පුරාම ඉගෙනීම වැදගත් වේ. නව භාෂාවක් හෝ විනෝදාංශයක් ඉගෙන ගැනීමට උත්සාහ කරන්න." } }
    ]
  },
  {
    id: 2,
    title: { en: "Hearing", si: "ශ්‍රවණය" },
    icon: "Ear",
    options: [
      { id: "2a", text: { en: "Normal hearing", si: "සාමාන්‍ය ශ්‍රවණය" }, risk: "low", tip: { en: "Protect your ears from loud noises.", si: "අධික ශබ්දවලින් ඔබේ කන් ආරක්ෂා කරගන්න." } },
      { id: "2b", text: { en: "Some difficulty, uses hearing aids", si: "යම් අපහසුවක් ඇත, ශ්‍රවණාධාරක භාවිතා කරයි" }, risk: "moderate", tip: { en: "Ensure your hearing aids are properly adjusted.", si: "ඔබේ ශ්‍රවණාධාරක නිසි ලෙස සකසා ඇති බවට වග බලා ගන්න." } },
      { id: "2c", text: { en: "Poor hearing, no treatment", si: "දුර්වල ශ්‍රවණය, ප්‍රතිකාර ලබා නොගනී" }, risk: "high", tip: { en: "Untreated hearing loss increases dementia risk. Consult an ENT specialist.", si: "ප්‍රතිකාර නොකළ ශ්‍රවණාබාධ ඩිමෙන්ශියා අවදානම වැඩි කරයි. උගුර කන නාසය පිළිබඳ විශේෂඥ වෛද්‍යවරයකු හමුවන්න." } }
    ]
  },
  {
    id: 3,
    title: { en: "High Blood Pressure", si: "අධික රුධිර පීඩනය" },
    icon: "Activity",
    options: [
      { id: "3a", text: { en: "Normal", si: "සාමාන්‍ය" }, risk: "low", tip: { en: "Maintain a low-salt diet.", si: "අඩු ලුණු සහිත ආහාර වේලක් පවත්වා ගන්න." } },
      { id: "3b", text: { en: "Elevated but treated", si: "වැඩි නමුත් ප්‍රතිකාර ලබයි" }, risk: "moderate", tip: { en: "Take your medications regularly as prescribed.", si: "නියමිත පරිදි ඔබේ ඖෂධ නිතිපතා ලබා ගන්න." } },
      { id: "3c", text: { en: "High and uncontrolled (≥140/90)", si: "වැඩි සහ පාලනය කර නැත (≥140/90)" }, risk: "high", tip: { en: "Uncontrolled BP damages brain vessels. See a doctor immediately.", si: "පාලනය නොකළ රුධිර පීඩනය මොළයේ නාල වලට හානි කරයි. වහාම වෛද්‍යවරයකු හමුවන්න." } }
    ]
  },
  {
    id: 4,
    title: { en: "Smoking", si: "දුම්පානය" },
    icon: "Smoking",
    options: [
      { id: "4a", text: { en: "Never or quit >10 years", si: "කිසිදා කර නැත හෝ වසර 10කට පෙර නතර කර ඇත" }, risk: "low", tip: { en: "Stay away from second-hand smoke.", si: "අක්‍රීය දුම්පානයෙන් වැළකී සිටින්න." } },
      { id: "4b", text: { en: "Occasional or quit <10 years", si: "ඉඳහිට හෝ වසර 10කට අඩු කාලයකට පෙර නතර කර ඇත" }, risk: "moderate", tip: { en: "Quitting completely at any age helps.", si: "ඕනෑම වයසකදී සම්පූර්ණයෙන්ම නතර කිරීම උපකාරී වේ." } },
      { id: "4c", text: { en: "Regular heavy smoker", si: "නිතිපතා අධික ලෙස දුම් පානය කරන්නෙකු" }, risk: "high", tip: { en: "Smoking significantly increases risk. Seek help to quit today.", si: "දුම්පානය අවදානම සැලකිය යුතු ලෙස වැඩි කරයි. අදම එය නතර කිරීමට උදව් ලබා ගන්න." } }
    ]
  },
  {
    id: 5,
    title: { en: "Obesity", si: "ස්ථුලතාවය" },
    icon: "Weight",
    options: [
      { id: "5a", text: { en: "BMI <25", si: "BMI <25" }, risk: "low", tip: { en: "Maintain your healthy weight.", si: "ඔබේ සෞඛ්‍ය සම්පන්න බර පවත්වා ගන්න." } },
      { id: "5b", text: { en: "BMI 25–30", si: "BMI 25–30" }, risk: "moderate", tip: { en: "Try to lose a few kilos through diet and exercise.", si: "ආහාර පාලනය සහ ව්‍යායාම මගින් කිලෝ කිහිපයක් අඩු කර ගැනීමට උත්සාහ කරන්න." } },
      { id: "5c", text: { en: "BMI >30", si: "BMI >30" }, risk: "high", tip: { en: "Obesity in mid-life is a major risk. Consult a nutritionist.", si: "මැදිවියේ ස්ථුලතාවය ප්‍රධාන අවදානමකි. පෝෂණවේදියෙකු හමුවන්න." } }
    ]
  },
  {
    id: 6,
    title: { en: "Depression", si: "විසදය (Depression)" },
    icon: "Frown",
    options: [
      { id: "6a", text: { en: "None or well managed", si: "නැත හෝ හොඳින් පාලනය කර ඇත" }, risk: "low", tip: { en: "Stay socially active and positive.", si: "සමාජීය වශයෙන් ක්‍රියාශීලීව සහ ධනාත්මකව සිටින්න." } },
      { id: "6b", text: { en: "Occasional, treated", si: "ඉඳහිට, ප්‍රතිකාර ලබයි" }, risk: "moderate", tip: { en: "Continue your therapy or support groups.", si: "ඔබේ ප්‍රතිකාර හෝ සහායක කණ්ඩායම් දිගටම කරගෙන යන්න." } },
      { id: "6c", text: { en: "Persistent untreated", si: "දිගින් දිගටම පවතින, ප්‍රතිකාර නොගන්නා" }, risk: "high", tip: { en: "Depression is linked to dementia. Please talk to a counselor.", si: "විසදය ඩිමෙන්ශියාව සමඟ සම්බන්ධ වේ. කරුණාකර උපදේශකයෙකු සමඟ කතා කරන්න." } }
    ]
  },
  {
    id: 7,
    title: { en: "Physical Activity", si: "ශාරීරික ක්‍රියාකාරකම්" },
    icon: "Dumbbell",
    options: [
      { id: "7a", text: { en: "150 min/week", si: "සතියකට විනාඩි 150ක්" }, risk: "low", tip: { en: "Keep up the great work!", si: "ඔබේ හොඳ වැඩ දිගටම කරගෙන යන්න!" } },
      { id: "7b", text: { en: "Some activity", si: "යම් ක්‍රියාකාරකමක්" }, risk: "moderate", tip: { en: "Try to walk at least 30 minutes a day.", si: "දිනකට අවම වශයෙන් විනාඩි 30ක්වත් ඇවිදීමට උත්සාහ කරන්න." } },
      { id: "7c", text: { en: "Sedentary", si: "අක්‍රිය" }, risk: "high", tip: { en: "Lack of exercise is a key risk. Start with short daily walks.", si: "ව්‍යායාම නොමැතිකම ප්‍රධාන අවදානමකි. දිනපතා කෙටි ඇවිදීමකින් ආරම්භ කරන්න." } }
    ]
  },
  {
    id: 8,
    title: { en: "Diabetes", si: "දියවැඩියාව" },
    icon: "Droplet",
    options: [
      { id: "8a", text: { en: "None", si: "නැත" }, risk: "low", tip: { en: "Limit sugary foods and drinks.", si: "සීනි සහිත ආහාර සහ බීම සීමා කරන්න." } },
      { id: "8b", text: { en: "Controlled", si: "පාලනය කර ඇත" }, risk: "moderate", tip: { en: "Monitor your blood sugar levels closely.", si: "ඔබේ රුධිරයේ සීනි මට්ටම සමීපව නිරීක්ෂණය කරන්න." } },
      { id: "8c", text: { en: "Uncontrolled", si: "පාලනය කර නැත" }, risk: "high", tip: { en: "High blood sugar affects brain health. See your doctor.", si: "අධික රුධිර සීනි මොළයේ සෞඛ්‍යයට බලපායි. ඔබේ වෛද්‍යවරයා හමුවන්න." } }
    ]
  },
  {
    id: 9,
    title: { en: "Social Connections", si: "සමාජ සම්බන්ධතා" },
    icon: "Users",
    options: [
      { id: "9a", text: { en: "Active", si: "ක්‍රියාශීලී" }, risk: "low", tip: { en: "Keep meeting friends and family.", si: "මිතුරන් සහ පවුලේ අය සමඟ දිගටම හමුවන්න." } },
      { id: "9b", text: { en: "Some contact", si: "යම් සම්බන්ධතාවක්" }, risk: "moderate", tip: { en: "Try to join a local club or volunteer.", si: "ප්‍රාදේශීය සමිතියකට හෝ ස්වේච්ඡා සේවයට එක්වීමට උත්සාහ කරන්න." } },
      { id: "9c", text: { en: "Isolated", si: "හුදකලා" }, risk: "high", tip: { en: "Social isolation is a risk factor. Reach out to someone today.", si: "සමාජ හුදකලාව අවදානම් සාධකයකි. අදම කවුරුන් හෝ සමඟ සම්බන්ධ වන්න." } }
    ]
  },
  {
    id: 10,
    title: { en: "Alcohol Use", si: "මත්පැන් භාවිතය" },
    icon: "Beer",
    options: [
      { id: "10a", text: { en: "None/rare", si: "නැත/ඉතා කලාතුරකින්" }, risk: "low", tip: { en: "Staying alcohol-free is best for the brain.", si: "මත්පැන් වලින් තොරව සිටීම මොළයට වඩාත් සුදුසුය." } },
      { id: "10b", text: { en: "Moderate", si: "මධ්‍යස්ථ" }, risk: "moderate", tip: { en: "Try to reduce your intake further.", si: "ඔබේ භාවිතය තවදුරටත් අඩු කිරීමට උත්සාහ කරන්න." } },
      { id: "10c", text: { en: "Excessive", si: "අධික" }, risk: "high", tip: { en: "Heavy drinking damages brain cells. Seek professional help.", si: "අධික ලෙස මත්පැන් පානය කිරීම මොළයේ සෛල වලට හානි කරයි. වෘත්තීය සහාය ලබා ගන්න." } }
    ]
  },
  {
    id: 11,
    title: { en: "Head Injury", si: "හිසට සිදු වූ තුවාල" },
    icon: "Stethoscope",
    options: [
      { id: "11a", text: { en: "None/minor", si: "නැත/සුළු" }, risk: "low", tip: { en: "Always wear a helmet when riding.", si: "වාහන පදවන විට සැමවිටම හෙල්මට් එකක් පළඳින්න." } },
      { id: "11b", text: { en: "Moderate", si: "මධ්‍යස්ථ" }, risk: "moderate", tip: { en: "Be careful to avoid falls.", si: "වැටීම් වළක්වා ගැනීමට ප්‍රවේශම් වන්න." } },
      { id: "11c", text: { en: "Severe/multiple", si: "දරුණු/කිහිප වතාවක්" }, risk: "high", tip: { en: "Past head injuries increase risk. Protect your head from further injury.", si: "අතීතයේ සිදු වූ හිස තුවාල අවදානම වැඩි කරයි. තවදුරටත් තුවාල වීමෙන් ඔබේ හිස ආරක්ෂා කරගන්න." } }
    ]
  },
  {
    id: 12,
    title: { en: "Air Pollution", si: "වායු දූෂණය" },
    icon: "Wind",
    options: [
      { id: "12a", text: { en: "Low exposure", si: "අඩු නිරාවරණය" }, risk: "low", tip: { en: "Spend time in green spaces.", si: "හරිත අවකාශයන්හි කාලය ගත කරන්න." } },
      { id: "12b", text: { en: "Moderate exposure", si: "මධ්‍යස්ථ නිරාවරණය" }, risk: "moderate", tip: { en: "Avoid busy roads during peak traffic.", si: "අධික තදබදය පවතින වේලාවන්හි කාර්යබහුල මාර්ග මගහරින්න." } },
      { id: "12c", text: { en: "High exposure", si: "අධික නිරාවරණය" }, risk: "high", tip: { en: "Long-term pollution exposure is a risk. Use an air purifier if possible.", si: "දිගුකාලීන දූෂණයට නිරාවරණය වීම අවදානමකි. හැකි නම් වායු පිරිපහදුවක් භාවිතා කරන්න." } }
    ]
  },
  {
    id: 13,
    title: { en: "Cholesterol (LDL)", si: "කොලෙස්ටරෝල් (LDL)" },
    icon: "Heart",
    options: [
      { id: "13a", text: { en: "<100", si: "<100" }, risk: "low", tip: { en: "Maintain a heart-healthy diet.", si: "හදවතට හිතකර ආහාර වේලක් පවත්වා ගන්න." } },
      { id: "13b", text: { en: "130–159 controlled", si: "130–159 පාලනය කර ඇත" }, risk: "moderate", tip: { en: "Reduce saturated fats in your diet.", si: "ඔබේ ආහාර වේලෙහි සංතෘප්ත මේදය අඩු කරන්න." } },
      { id: "13c", text: { en: "≥160 uncontrolled", si: "≥160 පාලනය කර නැත" }, risk: "high", tip: { en: "High LDL is linked to dementia. Consult your doctor for management.", si: "අධික LDL ඩිමෙන්ශියාව සමඟ සම්බන්ධ වේ. පාලනය සඳහා ඔබේ වෛද්‍යවරයා හමුවන්න." } }
    ]
  },
  {
    id: 14,
    title: { en: "Sleep", si: "නින්ද" },
    icon: "Moon",
    options: [
      { id: "14a", text: { en: "7–9 hours", si: "පැය 7-9" }, risk: "low", tip: { en: "Maintain a regular sleep schedule.", si: "නිතිපතා නින්දේ කාලසටහනක් පවත්වා ගන්න." } },
      { id: "14b", text: { en: "6–7 hours", si: "පැය 6-7" }, risk: "moderate", tip: { en: "Try to get at least 7 hours of sleep.", si: "අවම වශයෙන් පැය 7ක නින්දක් ලබා ගැනීමට උත්සාහ කරන්න." } },
      { id: "14c", text: { en: " <6 hours", si: "පැය 6කට අඩු" }, risk: "high", tip: { en: "Poor sleep affects brain clearance. Improve your sleep hygiene.", si: "දුර්වල නින්ද මොළයේ ක්‍රියාකාරිත්වයට බලපායි. ඔබේ නින්දේ පුරුදු වැඩි දියුණු කරගන්න." } }
    ]
  }
];

export const LEARN_CONTENT = {
  en: [
    {
      title: "What is Dementia?",
      content: "Dementia is not a single disease; it's an overall term , like heart disease; that covers a wide range of specific medical conditions, including Alzheimer's disease. Disorders grouped under the general term 'dementia' are caused by abnormal brain changes. These changes trigger a decline in thinking skills, also known as cognitive abilities, severe enough to impair daily life and independent function."
    },
    {
      title: "Early Signs",
      content: "1. Memory loss that disrupts daily life.\n2. Challenges in planning or solving problems.\n3. Difficulty completing familiar tasks.\n4. Confusion with time or place.\n5. Trouble understanding visual images and spatial relationships.\n6. New problems with words in speaking or writing.\n7. Misplacing things and losing the ability to retrace steps.\n8. Decreased or poor judgment.\n9. Withdrawal from work or social activities.\n10. Changes in mood and personality."
    },
    {
      title: "Prevention Tips",
      content: "While some risk factors like age and genetics cannot be changed, many lifestyle factors can be managed:\n- Keep your mind active.\n- Be physically and socially active.\n- Quit smoking.\n- Manage blood pressure and cholesterol.\n- Maintain a healthy weight.\n- Eat a balanced diet."
    },
    {
      title: "Family Support",
      content: "Caring for someone with dementia can be challenging. It's important to:\n- Educate yourself about the disease.\n- Seek support from community groups.\n- Practice patience and empathy.\n- Ensure a safe environment for your loved one.\n- Don't forget to take care of your own mental health."
    }
  ],
  si: [
    {
      title: "ඩිමෙන්ශියාව යනු කුමක්ද?",
      content: "ඩිමෙන්ශියාව යනු තනි රෝගයක් නොවේ;රෝග ලක්ෂණ ගණනාවක එකතුවත් වෙනුවෙන් යොදා ගන්නා නමකි. ඇල්සයිමර් රෝගය ඇතුළු විශේෂිත වෛද්‍ය තත්වයන් රාශියක් ආවරණය කරයි. 'ඩිමෙන්ශියාව' යන පොදු පදය යටතේ කාණ්ඩගත කර ඇති ආබාධ ඇතිවන්නේ අසාමාන්‍ය මොළයේ වෙනස්කම් නිසාය. මෙම වෙනස්කම් දෛනික ජීවිතයට සහ ස්වාධීන ක්‍රියාකාරිත්වයට බාධා පමුණුවන තරමට බරපතල වන චින්තන කුසලතා පිරිහීමට හේතු වේ."
    },
    {
      title: "මුල් ලක්ෂණ",
      content: "1. දෛනික ජීවිතයට බාධා කරන මතකය නැති වීම.\n2. සැලසුම් කිරීමේදී හෝ ගැටළු විසඳීමේදී ඇතිවන අභියෝග.\n3. හුරුපුරුදු කාර්යයන් සම්පූර්ණ කිරීමට ඇති අපහසුව.\n4. කාලය හෝ ස්ථානය පිළිබඳ ව්‍යාකූලත්වය.\n5. දෘශ්‍ය රූප සහ අවකාශීය සම්බන්ධතා තේරුම් ගැනීමේ අපහසුව.\n6. කතා කිරීමේදී හෝ ලිවීමේදී වචන සම්බන්ධයෙන් ඇතිවන නව ගැටළු.\n7. දේවල් වැරදි තැන්වල තැබීම සහ පියවර නැවත මතක් කර ගැනීමේ හැකියාව නැති වීම.\n8. තීරණ ගැනීමේ හැකියාව අඩුවීම.\n9. රැකියාවෙන් හෝ සමාජ ක්‍රියාකාරකම්වලින් ඉවත් වීම.\n10. මනෝභාවය සහ පෞරුෂයේ වෙනස්කම්."
    },
    {
      title: "වැළැක්වීමේ උපදෙස්",
      content: "වයස සහ ජාන විද්‍යාව වැනි සමහර අවදානම් සාධක වෙනස් කළ නොහැකි වුවද, බොහෝ ජීවන රටා සාධක පාලනය කළ හැකිය:\n- ඔබේ මනස ක්‍රියාශීලීව තබා ගන්න.\n- ශාරීරිකව සහ සමාජීය වශයෙන් ක්‍රියාශීලී වන්න.\n- දුම්පානය නතර කරන්න.\n- රුධිර පීඩනය සහ කොලෙස්ටරෝල් පාලනය කරන්න.\n- සෞඛ්‍ය සම්පන්න බරක් පවත්වා ගන්න.\n- සමබර ආහාර වේලක් අනුභව කරන්න."
    },
    {
      title: "පවුලේ සහාය",
      content: "ඩිමෙන්ශියාව ඇති අයෙකු රැකබලා ගැනීම අභියෝගාත්මක විය හැකිය. එය වැදගත් වේ:\n- රෝගය ගැන ඔබම දැනුවත් වන්න.\n- ප්‍රජා කණ්ඩායම්වලින් සහාය පතන්න.\n- ඉවසීම සහ සහකම්පනය පුරුදු කරන්න.\n- ඔබේ ආදරණීයයා සඳහා ආරක්ෂිත පරිසරයක් සහතික කරන්න.\n- ඔබේම මානසික සෞඛ්‍යය ගැන සැලකිලිමත් වීමට අමතක නොකරන්න."
    }
  ]
};
