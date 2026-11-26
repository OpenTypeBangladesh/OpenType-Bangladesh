export interface TypingLesson {
  id: string;
  title: string;
  level: 'সহজ' | 'মাধ্যম' | 'কঠিন';
  language: 'bangla' | 'english';
  description: string;
  keys: string;
  practice: string[];
}

export const typingLessons: TypingLesson[] = [
  {
    id: 'bn-home-row',
    title: 'বাংলা হোম রো (মিঃ ধীর গতি)',
    level: 'সহজ',
    language: 'bangla',
    description: 'মূল সারির অক্ষর: আ, স, দ, ফ, গ, হ, জ, ক, ল — হাত স্থির রেখে আঙুলের অবস্থান শিখুন।',
    keys: 'আ স দ ফ গ হ জ ক ল',
    practice: [
      'আসদ ফগহ জকল আসদ ফগহ জকল',
      'লকজ হগফ দসআ লকজ হগফ দসআ',
      'আল সক দজ ফহ গদ আল সক দজ',
      'আমার দেশ বাংলা আমার দেশ বাংলা',
    ],
  },
  {
    id: 'bn-top-row',
    title: 'বাংলা উপরের সারি',
    level: 'সহজ',
    language: 'bangla',
    description: 'উপরের সারির স্বরবর্ণ ও ব্যঞ্জনবর্ণ অভ্যাস করুন।',
    keys: 'অ ঈ এ উ ই প ও য চ ট',
    practice: [
      'অপৌ এইচ উচয টইপ অপৌ এইচ',
      'অপর একত উপয চাল টোল অপর',
      'উট চড় পোকা ঈগল ওপজা উট',
      'অতি ছোট হলৌ পথে যায় বট',
    ],
  },
  {
    id: 'bn-bottom-row',
    title: 'বাংলা নিচের সারি ও যুক্তবর্ণ',
    level: 'মাধ্যম',
    language: 'bangla',
    description: 'নিচের সারির বর্ণ এবং প্রচলিত যুক্তবর্ণের অনুশীলন।',
    keys: 'ব ন ম ঠ ঢ ভ শ ষ র ণ',
    practice: [
      'বনম ঠঢভ শষর ণমব বনম',
      'বৃক্ষ স্কুল স্টেশন নিচে মঠ ভবন',
      'ভাষা শুক্তো রুচি নিখিল মুষ্টি ধন',
      'নমস্কার বন্ধু মন্দির শুভক্ষণ স্বপ্ন',
    ],
  },
  {
    id: 'bn-sentences',
    title: 'বাংলা বাক্য অনুশীলন',
    level: 'মাধ্যম',
    language: 'bangla',
    description: 'সম্পূর্ণ বাক্য টাইপ করে গতি ও নির্ভুলতা বাড়ান।',
    keys: 'সব বর্ণ',
    practice: [
      'বাংলাদেশ একটি সুন্দর দেশ।',
      'শিক্ষা আমাদের সবচেয়ে বড় শক্তি।',
      'প্রযুক্তি শিখলে জীবন সহজ হয়।',
      'পরিশ্রম করলে সাফল্য আসবেই।',
    ],
  },
  {
    id: 'en-home-row',
    title: 'English Home Row',
    level: 'সহজ',
    language: 'english',
    description: 'Master the home row keys a s d f g h j k l with proper finger placement.',
    keys: 'a s d f g h j k l',
    practice: [
      'asdf jkl; asdf jkl; fjdk slal',
      'dad sad lad fall glass salad',
      'ask all gas flag half flash',
      'jakl alsd klad fags hall asdf',
    ],
  },
  {
    id: 'en-top-row',
    title: 'English Top Row',
    level: 'সহজ',
    language: 'english',
    description: 'Practice the top row keys q w e r t y u i o p.',
    keys: 'q w e r t y u i o p',
    practice: [
      'qwerty uiop qwerty uiop qtip',
      'quiet write type route power',
      'toe tip top quit wire quote',
      'paper tower pretty proper tripod',
    ],
  },
  {
    id: 'en-bottom-row',
    title: 'English Bottom Row',
    level: 'মাধ্যম',
    language: 'english',
    description: 'Practice the bottom row keys z x c v b n m with shift symbols.',
    keys: 'z x c v b n m',
    practice: [
      'zxcv bnm zxcv bnm znvc mbxz',
      'zebra cabin number mixed zone',
      'candy banana velvet bronze maze',
      'combine amazing boxes vacuum vacuum',
    ],
  },
  {
    id: 'en-sentences',
    title: 'English Sentences',
    level: 'কঠিন',
    language: 'english',
    description: 'Type complete English sentences to build real-world speed.',
    keys: 'All keys',
    practice: [
      'Practice makes a person perfect in typing.',
      'Technology changes the way we learn every day.',
      'The quick brown fox jumps over the lazy dog.',
      'Computer literacy opens doors to better jobs.',
    ],
  },
];
