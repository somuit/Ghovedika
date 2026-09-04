export interface MedicalRecord {
  id: string;
  opCode: string;
  photoUrl?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Child';
  phone: string;
  address: string;
  city: string;
  pageNo?: string;
  doctorName?: string;
  complaints?: string;
  todayBp?: string;
  todayWt?: string;
  lastVisitDate: string;
  chronicConditions: {
    diabetes: { active: boolean; duration: string; onMedication: boolean };
    hypertension: { active: boolean; duration: string; onMedication: boolean };
    thyroid: { active: boolean; duration: string; onMedication: boolean };
  };
  familyHistory: {
    fatherDiabetes: boolean;
    fatherHypertension: boolean;
    motherDiabetes: boolean;
    motherHypertension: boolean;
  };
  constitution: 'LEAN' | 'MEDIUM' | 'FATTY';
  menstrualHistory?: {
    onTime: boolean;
    early: boolean;
    delayed: boolean;
    irregular: boolean;
    longLasting: boolean;
    pelvicPain: boolean;
    deliveryType?: 'NORMAL' | 'CESAREAN' | 'HYSTERECTOMY';
  };
  pastHistoryTags: string[];
  habitsTags: string[];
  pastConsultations: Array<{
    date: string;
    bp: string;
    weight: string;
    remedy: string;
    potency: string;
    doctorNotes: string;
  }>;
}

export interface QueueItem {
  tokenNo: string;
  patient: MedicalRecord;
  bp: string;
  weight: string;
  queuedAt: string;
  status: 'Waiting' | 'In Consultation' | 'Completed';
}

export const initialPatientsList: MedicalRecord[] = [
  {
    id: 'pat-1001',
    opCode: 'SRK-1001',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    name: 'Venkata Satyanarayana Murthy',
    age: 54,
    gender: 'Male',
    phone: '9848022334',
    address: 'Main Bazaar Road, Palakol',
    city: 'Palakol',
    pageNo: '142',
    doctorName: 'Dr. R. K. V. Sharma (M.D. Homeo)',
    complaints: 'Chronic osteoarthritis with morning stiffness and lumbar pain.',
    todayBp: '130/85',
    todayWt: '74',
    lastVisitDate: '2026-08-15',
    chronicConditions: {
      diabetes: { active: true, duration: '5 Years', onMedication: true },
      hypertension: { active: true, duration: '3 Years', onMedication: true },
      thyroid: { active: false, duration: '', onMedication: false },
    },
    familyHistory: {
      fatherDiabetes: true,
      fatherHypertension: true,
      motherDiabetes: false,
      motherHypertension: true,
    },
    constitution: 'FATTY',
    pastHistoryTags: ['TYPHOID', 'JAUNDICE'],
    habitsTags: ['TEA', 'SMOKING'],
    pastConsultations: [
      {
        date: '2026-08-15',
        bp: '135/88',
        weight: '75',
        remedy: 'Rhus Tox',
        potency: '200C',
        doctorNotes: 'Morning stiffness relieved after continued movement. Recommended 1 dose weekly.',
      },
      {
        date: '2026-06-10',
        bp: '140/90',
        weight: '76',
        remedy: 'Bryonia Alba',
        potency: '30C',
        doctorNotes: 'Joint pain aggravated by motion. Prescribed for 15 days.',
      },
    ],
  },
  {
    id: 'pat-1002',
    opCode: 'SRK-1002',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    name: 'Lakshmi Durga Devi',
    age: 42,
    gender: 'Female',
    phone: '9133699166',
    address: 'Kovvada Canal Road, Palakol',
    city: 'Palakol',
    pageNo: '88',
    doctorName: 'Dr. S. Parvathi (B.H.M.S)',
    complaints: 'Migraine headaches with nausea and allergic rhinitis.',
    todayBp: '120/80',
    todayWt: '62',
    lastVisitDate: '2026-08-28',
    chronicConditions: {
      diabetes: { active: false, duration: '', onMedication: false },
      hypertension: { active: false, duration: '', onMedication: false },
      thyroid: { active: true, duration: '2 Years', onMedication: true },
    },
    familyHistory: {
      fatherDiabetes: false,
      fatherHypertension: false,
      motherDiabetes: true,
      motherHypertension: false,
    },
    constitution: 'MEDIUM',
    menstrualHistory: {
      onTime: false,
      early: false,
      delayed: true,
      irregular: true,
      longLasting: false,
      pelvicPain: true,
      deliveryType: 'NORMAL',
    },
    pastHistoryTags: ['MEASLES', 'MALARIA'],
    habitsTags: ['TEA', 'COFFEE'],
    pastConsultations: [
      {
        date: '2026-08-28',
        bp: '122/80',
        weight: '62',
        remedy: 'Natrum Muriaticum',
        potency: '1M',
        doctorNotes: 'Periodic throbbing headache relieved by cold application and quiet darkness.',
      },
    ],
  },
  {
    id: 'pat-1003',
    opCode: 'SRK-1003',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    name: 'Master Vamsi Krishna',
    age: 9,
    gender: 'Child',
    phone: '9440192837',
    address: 'Near Ksheera Ramalingeswara Temple, Palakol',
    city: 'Palakol',
    pageNo: '19',
    doctorName: 'Dr. R. K. V. Sharma (M.D. Homeo)',
    complaints: 'Recurrent tonsillitis and nocturnal dry cough.',
    todayBp: '105/70',
    todayWt: '28',
    lastVisitDate: '2026-08-02',
    chronicConditions: {
      diabetes: { active: false, duration: '', onMedication: false },
      hypertension: { active: false, duration: '', onMedication: false },
      thyroid: { active: false, duration: '', onMedication: false },
    },
    familyHistory: {
      fatherDiabetes: false,
      fatherHypertension: false,
      motherDiabetes: false,
      motherHypertension: false,
    },
    constitution: 'LEAN',
    pastHistoryTags: ['TYPHOID'],
    habitsTags: ['TEA'],
    pastConsultations: [
      {
        date: '2026-08-02',
        bp: '105/70',
        weight: '28',
        remedy: 'Baryta Carbonica',
        potency: '30C',
        doctorNotes: 'Enlarged tonsils with throat sensitivity to cold air. Responding well.',
      },
    ],
  },
];
