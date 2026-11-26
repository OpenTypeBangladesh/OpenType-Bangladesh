export interface EducationLesson {
  id: string;
  subject: { bn: string; en: string };
  title: { bn: string; en: string };
  minutes: number;
  summary: { bn: string; en: string };
  points: { bn: string; en: string }[];
}

export const educationLessons: EducationLesson[] = [
  {
    id: 'bangla-grammar',
    subject: { bn: 'বাংলা', en: 'Bangla' },
    title: { bn: 'বাংলা ব্যাকরণ: সন্ধি, সমাস ও কারক', en: 'Bangla Grammar: Sandhi, Samas and Karak' },
    minutes: 15,
    summary: {
      bn: 'চাকরির পরীক্ষা ও স্কুল-কলেজের জন্য সবচেয়ে দরকারি বাংলা ব্যাকরণের মূল বিষয়গুলো।',
      en: 'The essential Bangla grammar topics most needed for school exams and job tests.',
    },
    points: [
      {
        bn: 'সন্ধি মানে দুই ধ্বনির মিলন — যেমন "হিম + আলয় = হিমালয়"; মিলনের সময় ধ্বনি বদলে যেতে পারে।',
        en: 'Sandhi means joining two sounds, e.g. "hima + alaya = Himalaya"; sounds may change during the join.',
      },
      {
        bn: 'সমাস মানে একাধিক শব্দের সংক্ষিপ্ত রূপ — "দশ + আনন = দশানন"; সমাসের মূল প্রকার ৬টি।',
        en: 'Samas condenses multiple words into one, e.g. "dasha + anana = Dashanana"; there are six main types.',
      },
      {
        bn: 'কারক বাক্যে নামপদের কাজ বোঝায় — কে করল (কর্তৃ), কী পেল (কর্ম), কাকে দিল (সম্প্রদান) ইত্যাদি।',
        en: 'Karak shows the role of a noun in a sentence — doer, object, recipient and so on.',
      },
      {
        bn: 'প্রত্যয় যোগে শব্দ নতুন অর্থ পায় — "পড় + অন = পড়ান", "শিক্ষা + থী = শিক্ষাথী"।',
        en: 'Suffixes give new meanings — reading becomes teaching, education becomes student.',
      },
    ],
  },
  {
    id: 'english-grammar',
    subject: { bn: 'ইংরেজি', en: 'English' },
    title: { bn: 'English Grammar: Tense, Preposition and Voice', en: 'English Grammar: Tense, Preposition and Voice' },
    minutes: 18,
    summary: {
      bn: 'IELTS, বিশ্ববিদ্যালয় ভর্তি ও চাকরির পরীক্ষায় বারবার আসা ইংরেজি ব্যাকরণের মূল কাঠামো।',
      en: 'Core English grammar that repeats across IELTS, university admission and job exams.',
    },
    points: [
      {
        bn: 'ইংরেজিতে ১২টি কাল (Tense) — মূল ৩টি: Present, Past, Future; প্রতিটির ৪টি রূপ (Simple, Continuous, Perfect, Perfect Continuous)।',
        en: 'English has 12 tenses — three basics (Present, Past, Future), each in four forms (Simple, Continuous, Perfect, Perfect Continuous).',
      },
      {
        bn: 'সময় বোঝাতে "since" (শুরুর বিন্দু) আর "for" (সময়ের ব্যাপ্তি) — "since 2020", "for five years"।',
        en: 'Use "since" for a starting point and "for" for a duration — "since 2020", "for five years".',
      },
      {
        bn: 'Active voice-এ কর্তা কাজ করে ("He wrote a letter"); Passive-এ কাজ গুরুত্ব পায় ("A letter was written by him")।',
        en: 'In active voice the subject acts ("He wrote a letter"); in passive the action matters ("A letter was written by him").',
      },
      {
        bn: 'শব্দভাণ্ডার বাড়াতে প্রতিদিন ৫টি নতুন শব্দ + বাগধারা (idiom) মুখস্থ করুন — IELTS-এ সবচেয়ে কাজে দেয়।',
        en: 'Learn 5 new words plus an idiom daily — the most effective habit for IELTS vocabulary.',
      },
    ],
  },
  {
    id: 'math',
    subject: { bn: 'গণিত', en: 'Mathematics' },
    title: { bn: 'গণিত: শতকরা, অনুপাত ও সরল সমীকরণ', en: 'Math: Percentage, Ratio and Simple Equations' },
    minutes: 20,
    summary: {
      bn: 'বিসিএস প্রিলি থেকে ব্যাংক নিয়োগ — সব পরীক্ষায় সবচেয়ে বেশি নম্বর যেখানে আসে।',
      en: 'From BCS prelims to bank recruitment — where most marks come from.',
    },
    points: [
      {
        bn: 'শতকরার মূল সূত্র: x-এর p% = x × p/100; ২৫০-এর ২০% = ২৫০ × ২০/১০০ = ৫০।',
        en: 'Percentage formula: p% of x = x × p/100; 20% of 250 = 250 × 20/100 = 50.',
      },
      {
        bn: 'অনুপাতে মোট ভাগ বর্তমান — a:b = 2:3 হলে মোট ৫ ভাগ; ৫০০ টাকায় ২০০ ও ৩০০।',
        en: 'In a ratio a:b = 2:3 the total is 5 parts; out of 500 taka that splits into 200 and 300.',
      },
      {
        bn: 'সরল সমীকরণে দুই পাশ সমান রেখে চলকের মান বের করা হয় — 3x + 5 = 20 ⇒ x = 5।',
        en: 'Simple equations keep both sides equal to find the unknown — 3x + 5 = 20 ⇒ x = 5.',
      },
      {
        bn: 'লাভ-ক্ষতি: লাভ = বিক্রয়মূল্য − ক্রয়মূল্য; লাভের হার = (লাভ ÷ ক্রয়মূল্য) × ১০০%।',
        en: 'Profit-loss: profit = selling price − cost price; profit rate = (profit ÷ cost price) × 100%.',
      },
    ],
  },
  {
    id: 'science',
    subject: { bn: 'বিজ্ঞান', en: 'Science' },
    title: { bn: 'সাধারণ বিজ্ঞান: পদার্থ, শক্তি ও জীবন', en: 'General Science: Matter, Energy and Life' },
    minutes: 14,
    summary: {
      bn: 'স্কুল-কলেজ পরীক্ষা ও সাধারণ জ্ঞানের জন্য পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞানের মূল ধারণা।',
      en: 'Core physics, chemistry and biology ideas for school exams and general knowledge.',
    },
    points: [
      {
        bn: 'পদার্থ তিন অবস্থায় থাকে — কঠিন, তরল, গ্যাস; তাপ দিলে কঠিন → তরল → গ্যাসে রূপ বদলায়।',
        en: 'Matter exists in three states — solid, liquid, gas; heat turns solid → liquid → gas.',
      },
      {
        bn: 'শক্তি কখনো নষ্ট হয় না, শুধু রূপ বদলায় — বিদ্যুৎ আলো, চলতে ও তাপে বদলে যায়।',
        en: 'Energy is never destroyed, only transformed — electricity becomes light, motion and heat.',
      },
      {
        bn: 'মানবদেহে প্রাণধারী বায়ু (O₂) ফুসফুসে গিয়ে রক্তে মেশে; কোষে পৌঁছায়।',
        en: 'Oxygen breathed in reaches the lungs, mixes into the blood and powers every cell.',
      },
      {
        bn: 'উদ্ভিদ সূর্যালোকে পানি ও কার্বন ডাই-অক্সাইড থেকে খাদ্য তৈরি করে — এটাই সালোকসংশ্লেষ।',
        en: 'Plants make food from water and carbon dioxide in sunlight — photosynthesis.',
      },
    ],
  },
  {
    id: 'gk-bd',
    subject: { bn: 'সাধারণ জ্ঞান', en: 'General Knowledge' },
    title: { bn: 'বাংলাদেশ বিষয়াবলি: মুক্তিযুদ্ধ ও সংবিধান', en: 'Bangladesh Affairs: Liberation War and Constitution' },
    minutes: 16,
    summary: {
      bn: 'প্রতিটি সরকারি পরীক্ষায় আসা বাংলাদেশের ইতিহাস, মুক্তিযুদ্ধ ও সংবিধানের মূল তথ্য।',
      en: 'Key facts on Bangladesh history, the Liberation War and the Constitution asked in every govt exam.',
    },
    points: [
      {
        bn: '১৯৭১ সালের ২৬ মার্চ বাংলাদেশ স্বাধীনতা ঘোষণা করে; ১৬ ডিসেম্বর বিজয় দিবস।',
        en: 'Bangladesh declared independence on 26 March 1971; Victory Day is 16 December.',
      },
      {
        bn: 'মুক্তিযুদ্ধ ১১ মাস চলে; সেক্টর ছিল ১১টি, প্রতিটির নেতৃত্বে ছিলেন একজন সেক্টর কমান্ডার।',
        en: 'The Liberation War lasted 11 months across 11 sectors, each led by a sector commander.',
      },
      {
        bn: 'সংবিধান কার্যকর ১৬ ডিসেম্বর ১৯৭২; মূল সংবিধানে ৯৮টি অনুচ্ছেদ ছিল।',
        en: 'The Constitution came into force on 16 December 1972 with 98 original articles.',
      },
      {
        bn: 'জাতীয় পতাকার অনুপাত ১০:৬; বোতল সবুজ পটভূমির মাঝে লাল বৃত্ত।',
        en: 'The national flag uses a 10:6 ratio with a red circle on bottle-green.',
      },
    ],
  },
  {
    id: 'gk-intl',
    subject: { bn: 'সাধারণ জ্ঞান', en: 'General Knowledge' },
    title: { bn: 'আন্তর্জাতিক বিষয়াবলি: জাতিসংঘ ও বিশ্ব', en: 'International Affairs: UN and the World' },
    minutes: 12,
    summary: {
      bn: 'জাতিসংঘ, বিশ্ব সংগঠন ও আন্তর্জাতিক বিষয়ের মৌলিক তথ্য — চাকরি ও ভর্তি পরীক্ষার জন্য।',
      en: 'Basics of the United Nations, world bodies and international affairs for exams.',
    },
    points: [
      {
        bn: 'জাতিসংঘ প্রতিষ্ঠিত ২৪ অক্টোবর ১৯৪৫; বাংলাদেশ সদস্যপদ পায় ১৭ সেপ্টেম্বর ১৯৭৪।',
        en: 'The UN was founded on 24 October 1945; Bangladesh joined on 17 September 1974.',
      },
      {
        bn: 'জাতিসংঘের ৬টি প্রধান অঙ্গসংগঠন — সাধারণ পরিষদ, নিরাপত্তা পরিষদ, সচিবালয় ইত্যাদি।',
        en: 'The UN has six main organs — General Assembly, Security Council, Secretariat and more.',
      },
      {
        bn: 'সার্ক প্রতিষ্ঠিত ১৯৮৫; সদর দপ্তর কাঠমান্ডু, বাংলাদেশ সদস্য।',
        en: 'SAARC was founded in 1985 with its headquarters in Kathmandu; Bangladesh is a member.',
      },
      {
        bn: 'পৃথিবীর সবচেয়ে বড় মহাসাগর প্রশান্ত; সবচেয়ে উঁচু পর্বত এভারেস্ট (৮,৮৪৯ মিটার)।',
        en: 'The Pacific is the largest ocean; Mount Everest (8,849 m) is the tallest peak.',
      },
    ],
  },
];
