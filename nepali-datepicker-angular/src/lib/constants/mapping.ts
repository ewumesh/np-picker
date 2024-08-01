import {
  DaysMapping,
  MonthMapping,
  WordsMapping,
} from '../interface/interface';

export const numberMapping: string[] = [
  '०',
  '१',
  '२',
  '३',
  '४',
  '५',
  '६',
  '७',
  '८',
  '९',
];

export const wordsMapping: WordsMapping = {
  year: 'साल',
  month: 'महिना',
};

export const daysMapping: DaysMapping = {
  en: {
    default: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  },
  ne: {
    default: ['आइत', 'सोम', 'मंगल्', 'बुध', 'बिही', 'शुक्र', 'शनि'],
    short: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श'],
  },
};

export const monthsMapping: MonthMapping = {
  en: {
    default: [
      'Baishakh',
      'Jestha',
      'Asar',
      'Shrawan',
      'Bhadau',
      'Aswin',
      'Kartik',
      'Mansir',
      'Poush',
      'Magh',
      'Falgun',
      'Chaitra',
    ],
    short: [
      'Bai',
      'Jes',
      'Asa',
      'Shr',
      'Bha',
      'Ash',
      'Kar',
      'Man',
      'Pou',
      'Mag',
      'Fal',
      'Cha',
    ],
  },
  ne: {
    default: [
      'बैशाख',
      'जेठ',
      'असार',
      'श्रावण',
      'भदौ',
      'आश्विन',
      'कार्तिक',
      'मंसिर',
      'पुष',
      'माघ',
      'फाल्गुन',
      'चैत्र',
    ],
    short: [
      'बै',
      'जे',
      'अ',
      'श्रा',
      'भा',
      'आ',
      'का',
      'मं',
      'पौ',
      'मा',
      'फा',
      'चै',
    ],
  },
};

export const englishMonthMapping: MonthMapping = {
  en: {
    default: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    short: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  ne: {
    default: [
      'जनवरी',
      'फेब्रुअरी',
      'मार्च',
      'अप्रिल',
      'मे',
      'जुन',
      'जुलाई',
      'अगस्ट',
      'सेप्टेम्बर',
      'अक्टोबर',
      'नोभेम्बर',
      'डिसेम्बर',
    ],
    short: [
      'जनवरी',
      'फेब्रुअरी',
      'मार्च',
      'अप्रिल',
      'मे',
      'जुन',
      'जुलाई',
      'अगस्ट',
      'सेप्टेम्बर',
      'अक्टोबर',
      'नोभेम्बर',
      'डिसेम्बर',
    ],
  },
};

export const CalendarFormat = {
  ne: [
    {
      label: 'बि.सं.',
      value: 'BS',
    },
    {
      label: 'इ.सं.',
      value: 'AD',
    },
  ],
  en: [
    {
      label: 'BS',
      value: 'BS',
    },
    {
      label: 'AD',
      value: 'AD',
    },
  ],
};
