export interface JobCategory {
  id: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
}

export const jobCategories: JobCategory[] = [
  {
    id: 'computer-operator',
    name: { bn: 'কম্পিউটার অপারেটর', en: 'Computer Operator' },
    description: {
      bn: 'কম্পিউটারের মৌলিক বিষয়, MS Office, শর্টকাট ও টাইপিং — সরকারি নিয়োগের সিলেবাস অনুযায়ী।',
      en: 'Computer basics, MS Office, shortcuts and typing — aligned with govt recruitment syllabus.',
    },
  },
  {
    id: 'office-assistant',
    name: { bn: 'অফিস সহকারি ও কম্পিউটার টাইপিস্ট', en: 'Office Assistant & Computer Typist' },
    description: {
      bn: 'বাংলা-ইংরেজি ব্যাকরণ, চিঠিপত্র লেখা ও দপ্তর ব্যবস্থাপনার প্রশ্ন।',
      en: 'Bangla-English grammar, official letter writing and office management questions.',
    },
  },
  {
    id: 'data-entry',
    name: { bn: 'ডেটা এন্ট্রি অপারেটর', en: 'Data Entry Operator' },
    description: {
      bn: 'টাইপিং গতি, নির্ভুলতা, স্প্রেডশিট ও ইন্টারনেট ব্যবহারের প্রশ্ন।',
      en: 'Typing speed, accuracy, spreadsheets and internet usage questions.',
    },
  },
  {
    id: 'general-govt',
    name: { bn: 'সরকারি চাকরি (সাধারণ)', en: 'Government Jobs (General)' },
    description: {
      bn: 'বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি, বাংলা, ইংরেজি ও গণিত — প্রিলির মূল কাঠামো।',
      en: 'Bangladesh and international affairs, Bangla, English and math — the core prelim structure.',
    },
  },
];

export interface Question {
  q: { bn: string; en: string };
  options: { bn: string; en: string }[];
  answer: number;
  explain: { bn: string; en: string };
}

export const jobQuestionBank: Record<string, Question[]> = {
  'computer-operator': [
    {
      q: { bn: 'কোনটি কম্পিউটারের স্থায়ী মেমোরি?', en: 'Which one is permanent memory of a computer?' },
      options: [
        { bn: 'RAM', en: 'RAM' },
        { bn: 'ROM', en: 'ROM' },
        { bn: 'ক্যাশ', en: 'Cache' },
        { bn: 'রেজিস্টার', en: 'Register' },
      ],
      answer: 1,
      explain: {
        bn: 'ROM (Read Only Memory) স্থায়ী — বিদ্যুৎ গেলেও তথ্য থাকে; RAM অস্থায়ী।',
        en: 'ROM (Read Only Memory) is permanent — data survives power loss; RAM is temporary.',
      },
    },
    {
      q: { bn: 'MS Word-এ ডকুমেন্ট সেভ করার শর্টকাট কোনটি?', en: 'Which shortcut saves a document in MS Word?' },
      options: [
        { bn: 'Ctrl + S', en: 'Ctrl + S' },
        { bn: 'Ctrl + V', en: 'Ctrl + V' },
        { bn: 'Ctrl + P', en: 'Ctrl + P' },
        { bn: 'Ctrl + X', en: 'Ctrl + X' },
      ],
      answer: 0,
      explain: { bn: 'Ctrl+S দিয়ে সেভ, Ctrl+P দিয়ে প্রিন্ট, Ctrl+V দিয়ে পেস্ট হয়।', en: 'Ctrl+S saves, Ctrl+P prints, Ctrl+V pastes.' },
    },
    {
      q: { bn: 'Excel-এ কোন সেল রেফারেন্স স্থির থাকে?', en: 'Which cell reference stays fixed in Excel?' },
      options: [
        { bn: 'সাপেক্ষ (A1)', en: 'Relative (A1)' },
        { bn: 'পরম ($A$1)', en: 'Absolute ($A$1)' },
        { bn: 'মিশ্র (A$1)', en: 'Mixed (A$1)' },
        { bn: 'কোনোটিই নয়', en: 'None' },
      ],
      answer: 1,
      explain: { bn: 'পরম রেফারেন্স ($A$1) কপি করলেও অপরিবর্তিত থাকে।', en: 'An absolute reference ($A$1) stays unchanged when copied.' },
    },
    {
      q: { bn: 'বিট ও বাইটের সম্পর্ক কী?', en: 'What is the relation between bit and byte?' },
      options: [
        { bn: '১ বাইট = ৮ বিট', en: '1 byte = 8 bits' },
        { bn: '১ বাইট = ৪ বিট', en: '1 byte = 4 bits' },
        { bn: '১ বিট = ৮ বাইট', en: '1 bit = 8 bytes' },
        { bn: 'সম্পর্ক নেই', en: 'No relation' },
      ],
      answer: 0,
      explain: { bn: '৮টি বিট মিলে ১ বাইট হয় — এটাই ডিজিটাল তথ্যের মূল একক।', en: '8 bits make 1 byte — the base unit of digital information.' },
    },
    {
      q: { bn: 'কোনটি ইনপুট ডিভাইস?', en: 'Which one is an input device?' },
      options: [
        { bn: 'মনিটর', en: 'Monitor' },
        { bn: 'প্রিন্টার', en: 'Printer' },
        { bn: 'ওসিআর', en: 'OCR' },
        { bn: 'স্পিকার', en: 'Speaker' },
      ],
      answer: 2,
      explain: { bn: 'OCR (Optical Character Reader) ছবি থেকে লেখা পড়ে কম্পিউটারে দেয় — ইনপুট ডিভাইস।', en: 'OCR reads text from images into the computer — an input device.' },
    },
    {
      q: { bn: 'PowerPoint-এ স্লাইড শো শুরুর কী (প্রথম থেকে)?', en: 'Which key starts a slide show from the beginning?' },
      options: [
        { bn: 'F2', en: 'F2' },
        { bn: 'F5', en: 'F5' },
        { bn: 'F7', en: 'F7' },
        { bn: 'F9', en: 'F9' },
      ],
      answer: 1,
      explain: { bn: 'F5 প্রথম স্লাইড থেকে; Shift+F5 চালু স্লাইড থেকে শো শুরু করে।', en: 'F5 starts from the first slide; Shift+F5 from the current one.' },
    },
  ],
  'office-assistant': [
    {
      q: { bn: '"দূর্গ" শব্দের সঠিক বানান কোনটি?', en: 'Which is the correct Bangla spelling of "durga" (fort)?' },
      options: [
        { bn: 'দূর্গ', en: 'দূর্গ' },
        { bn: 'দুর্গ', en: 'দুর্গ' },
        { bn: 'দুর্গ্গ', en: 'দুর্গ্গ' },
        { bn: 'দ্বুর্গ', en: 'দ্বুর্গ' },
      ],
      answer: 1,
      explain: { bn: 'সঠিক বানান "দুর্গ" — দুর + গ; সন্ধির পর ঋ-কার যুক্ত হয় না।', en: 'The correct spelling is "দুর্গ" — dur + ga joined.' },
    },
    {
      q: { bn: 'অফিস চিঠিতে "বিষয়:" লাইনটি কী কাজ করে?', en: 'What does the "Subject:" line do in an official letter?' },
      options: [
        { bn: 'প্রাপকের নাম বোঝায়', en: 'Names the recipient' },
        { bn: 'চিঠির মূল প্রসঙ্গ এক লাইনে বোঝায়', en: 'States the core topic in one line' },
        { bn: 'তারিখ বোঝায়', en: 'Shows the date' },
        { bn: 'সংযুক্ত কাগজ গোনে', en: 'Counts attachments' },
      ],
      answer: 1,
      explain: { bn: 'বিষয় লাইন দিয়ে পড়ার আগেই চিঠির উদ্দেশ্য বোঝা যায় — দপ্তর ব্যবস্থাপনায় আবশ্যক।', en: 'The subject line tells the purpose before reading — essential in office practice.' },
    },
    {
      q: { bn: '"He _____ to office every day." — সঠিক কোনটি?', en: 'Which is correct: "He _____ to office every day."?' },
      options: [
        { bn: 'go', en: 'go' },
        { bn: 'goes', en: 'goes' },
        { bn: 'going', en: 'going' },
        { bn: 'gone', en: 'gone' },
      ],
      answer: 1,
      explain: { bn: 'তৃতীয় পুরুষ একবচনে simple present-এ ক্রিয়ায় "es" যোগ হয় — goes।', en: 'Third-person singular takes "goes" in simple present.' },
    },
    {
      q: { bn: 'সরকারি দপ্তরে ফাইলের নোটশিট কোনটি?', en: 'What is a notingsheet in a govt file?' },
      options: [
        { bn: 'চিঠির প্রথম পাতা', en: 'First page of a letter' },
        { bn: 'কর্মকর্তার সিদ্ধান্ত ও মন্তব্য লেখার পাতা', en: 'Sheet for officers\u2019 decisions and remarks' },
        { bn: 'বাজেটের হিসাব', en: 'Budget sheet' },
        { bn: 'ছুটির আবেদন ফরম', en: 'Leave form' },
      ],
      answer: 1,
      explain: { bn: 'নোটশিটে কর্মকর্তারা ফাইলের ওপর মন্তব্য ও সিদ্ধান্ত লেখেন।', en: 'Officers record remarks and decisions on the notingsheet of a file.' },
    },
    {
      q: { bn: 'অফিস আদেশে সাধারণত কোন ধরনের ভাষা ব্যবহৃত হয়?', en: 'What kind of language is used in an office order?' },
      options: [
        { bn: 'আবেগপূর্ণ', en: 'Emotional' },
        { bn: 'সংক্ষিপ্ত ও নির্দেশমূলক', en: 'Concise and directive' },
        { bn: 'কাব্যিক', en: 'Poetic' },
        { bn: 'দ্ব্যর্থক', en: 'Ambiguous' },
      ],
      answer: 1,
      explain: { bn: 'সরকারি আদেশ সংক্ষিপ্ত, স্পষ্ট ও নির্দেশমূলক হয় — দ্ব্যর্থতা থাকা যায় না।', en: 'Official orders must be concise, clear and directive — no ambiguity.' },
    },
  ],
  'data-entry': [
    {
      q: { bn: 'ডেটা এন্ট্রিতে "নির্ভুলতা" মানে কী?', en: 'What does "accuracy" mean in data entry?' },
      options: [
        { bn: 'দ্রুত টাইপ করা', en: 'Typing fast' },
        { bn: 'ভুল ছাড়া সঠিক তথ্য প্রবেশ করা', en: 'Entering correct data without mistakes' },
        { bn: 'সবচেয়ে বেশি কাজ করা', en: 'Doing the most work' },
        { bn: 'শেষ সময়ে জমা দেওয়া', en: 'Submitting at the last moment' },
      ],
      answer: 1,
      explain: { bn: 'নির্ভুলতা = মোট অক্ষরের মধ্যে সঠিক অক্ষরের হার; ডেটা এন্ট্রিতে গতির চেয়ে নির্ভুলতা আগে।', en: 'Accuracy = share of correct characters; it matters more than raw speed.' },
    },
    {
      q: { bn: 'Excel-এ একটি কলামের যোগফলের ফর্মুলা?', en: 'Formula to sum a column in Excel?' },
      options: [
        { bn: '=ADD(A1:A10)', en: '=ADD(A1:A10)' },
        { bn: '=SUM(A1:A10)', en: '=SUM(A1:A10)' },
        { bn: '=TOTAL(A1:A10)', en: '=TOTAL(A1:A10)' },
        { bn: '=SUMX(A1:A10)', en: '=SUMX(A1:A10)' },
      ],
      answer: 1,
      explain: { bn: '=SUM(range) রেঞ্জের সব সংখ্যার যোগফল দেয়।', en: '=SUM(range) adds every number in the range.' },
    },
    {
      q: { bn: 'Tab কী Excel-এ কী করে?', en: 'What does the Tab key do in Excel?' },
      options: [
        { bn: 'নিচের সেলে যায়', en: 'Moves to the cell below' },
        { bn: 'ডান দিকের সেলে যায়', en: 'Moves to the cell on the right' },
        { bn: 'সেভ করে', en: 'Saves' },
        { bn: 'ফাইল বন্ধ করে', en: 'Closes the file' },
      ],
      answer: 1,
      explain: { bn: 'Tab ডানে, Enter নিচের সেলে যায় — দ্রুত ডেটা প্রবেশের মূল কী।', en: 'Tab moves right, Enter moves down — the core keys of fast data entry.' },
    },
    {
      q: { bn: 'কোনটি সঠিক টাইপিং ভঙ্গি?', en: 'Which is correct typing posture?' },
      options: [
        { bn: 'কব্জি টেবিলে ভর দিয়ে ভাঁজ করা', en: 'Bent wrists resting on the desk' },
        { bn: 'কবজি সোজা, হাত ভাসমান', en: 'Straight wrists, hands floating' },
        { bn: 'এক হাতে টাইপ', en: 'One-handed typing' },
        { bn: 'মনিটরের দিকে পিঠ করে', en: 'Back to the monitor' },
      ],
      answer: 1,
      explain: { bn: 'কবজি সোজা রাখলে দীর্ঘ সময় কাজ করাও আঘাত (RSI) হয় না।', en: 'Keeping wrists straight prevents RSI during long sessions.' },
    },
    {
      q: { bn: 'ভুল টাইপ ফেরত নেওয়ার সবচেয়ে দ্রুত উপায়?', en: 'Fastest way to undo a typing mistake?' },
      options: [
        { bn: 'Ctrl + Z', en: 'Ctrl + Z' },
        { bn: 'Ctrl + Y', en: 'Ctrl + Y' },
        { bn: 'Ctrl + A', en: 'Ctrl + A' },
        { bn: 'Ctrl + F', en: 'Ctrl + F' },
      ],
      answer: 0,
      explain: { bn: 'Ctrl+Z আন্ডু (পূর্বাবস্থা), Ctrl+Y রিডু।', en: 'Ctrl+Z undoes; Ctrl+Y redoes.' },
    },
  ],
  'general-govt': [
    {
      q: { bn: 'বাংলাদেশের সংবিধান কত সালে কার্যকর হয়?', en: 'When did the Bangladesh Constitution come into force?' },
      options: [
        { bn: '১৯৭১', en: '1971' },
        { bn: '১৯৭২', en: '1972' },
        { bn: '১৯৭৩', en: '1973' },
        { bn: '১৯৭৫', en: '1975' },
      ],
      answer: 1,
      explain: { bn: 'সংবিধান ৪ নভেম্বর ১৯৭২ গৃহীত, ১৬ ডিসেম্বর ১৯৭২ কার্যকর হয়।', en: 'Adopted 4 November 1972; came into force 16 December 1972.' },
    },
    {
      q: { bn: '"অগ্নিবীণা" কাব্যগ্রন্থের রচয়িতা কে?', en: 'Who wrote the poetry book "Agnibina"?' },
      options: [
        { bn: 'কাজী নজরুল ইসলাম', en: 'Kazi Nazrul Islam' },
        { bn: 'রবীন্দ্রনাথ ঠাকুর', en: 'Rabindranath Tagore' },
        { bn: 'জীবনানন্দ দাশ', en: 'Jibanananda Das' },
        { bn: 'সুকান্ত ভট্টাচার্য', en: 'Sukanta Bhattacharya' },
      ],
      answer: 0,
      explain: { bn: 'বিদ্রোহী কবি কাজী নজরুল ইসলামের প্রথম কাব্যগ্রন্থ (১৯২২)।', en: 'The first poetry book (1922) of rebel poet Kazi Nazrul Islam.' },
    },
    {
      q: { bn: 'জাতিসংঘের সদর দপ্তর কোথায়?', en: 'Where is the UN headquarters?' },
      options: [
        { bn: 'জেনেভা', en: 'Geneva' },
        { bn: 'প্যারিস', en: 'Paris' },
        { bn: 'নিউ ইয়র্ক', en: 'New York' },
        { bn: 'লন্ডন', en: 'London' },
      ],
      answer: 2,
      explain: { bn: 'জাতিসংঘের মূল সদর দপ্তর নিউ ইয়র্কে।', en: 'The main UN headquarters is in New York.' },
    },
    {
      q: { bn: 'একটি দ্রব্য ৫০০ টাকায় কিনে ৬০০ টাকায় বিক্রি করলে লাভের হার?', en: 'Bought at 500, sold at 600 — what is the profit rate?' },
      options: [
        { bn: '১০%', en: '10%' },
        { bn: '১৫%', en: '15%' },
        { bn: '২০%', en: '20%' },
        { bn: '২৫%', en: '25%' },
      ],
      answer: 2,
      explain: { bn: 'লাভ ১০০ টাকা; হার = (১০০ ÷ ৫০০) × ১০০ = ২০%।', en: 'Profit 100; rate = (100 ÷ 500) × 100 = 20%.' },
    },
    {
      q: { bn: 'বাংলাদেশ জাতিসংঘের সদস্যপদ কত সালে পায়?', en: 'When did Bangladesh join the United Nations?' },
      options: [
        { bn: '১৯৭২', en: '1972' },
        { bn: '১৯৭৩', en: '1973' },
        { bn: '১৯৭৪', en: '1974' },
        { bn: '১৯৭৫', en: '1975' },
      ],
      answer: 2,
      explain: { bn: '১৭ সেপ্টেম্বর ১৯৭৪-এ বাংলাদেশ জাতিসংঘের সদস্য হয়।', en: 'Bangladesh joined the UN on 17 September 1974.' },
    },
    {
      q: { bn: 'Choose the correct sentence.', en: 'Choose the correct sentence.' },
      options: [
        { bn: 'He has been living here since five years.', en: 'He has been living here since five years.' },
        { bn: 'He has been living here for five years.', en: 'He has been living here for five years.' },
        { bn: 'He is living here since five years.', en: 'He is living here since five years.' },
        { bn: 'He lives here since five years.', en: 'He lives here since five years.' },
      ],
      answer: 1,
      explain: { bn: 'সময়ের ব্যাপ্তি বোঝাতে "for", শুরুর বিন্দুতে "since" বসে।', en: '"For" takes a duration; "since" takes a starting point.' },
    },
  ],
};
