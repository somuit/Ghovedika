import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, UserCheck, AlertCircle, Phone, Mail, ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const PrivacyPolicyPage: React.FC = () => {
  const { t, language } = useLanguage();
  const settings = dbService.getSettings();

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10">
            <ShieldCheck className="w-64 h-64 text-amber-400" />
          </div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>{t('DPDP చట్టం 2023 & నిబంధనలు 2025 విలీనం', 'DPDP Act 2023 & Rules 2025 Aligned')}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-telugu">
              {t('డేటా గోప్యతా మరియు రక్షణ విధానం', 'Data Privacy & Protection Policy')}
            </h1>
            
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {t(
                'గోవేదిక మీ వ్యక్తిగత సమాచార భద్రతకు మరియు పారదర్శకతకు అత్యున్నత ప్రాధాన్యతనిస్తుంది. ఈ విధానం డిజిటల్ పర్సనల్ డేటా ప్రొటెక్షన్ యాక్ట్, 2023 ప్రామాణికాలకు అనుగుణంగా రూపొందించబడింది.',
                'Ghovedika is committed to transparent, privacy-first processing of personal data aligned with the Digital Personal Data Protection Act, 2023 and DPDP Rules 2025.'
              )}
            </p>

            <div className="flex flex-wrap gap-3 pt-3 text-xs text-gray-300">
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                {t('విధానం వెర్షన్: ', 'Policy Version: ')} <strong className="text-amber-300 font-mono">{settings.privacyPolicyVersion || 'v1.0-2025'}</strong>
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                {t('అమలు తేదీ: ', 'Effective Date: ')} <strong className="text-white">13 Nov 2025</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Privacy Center Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-50 rounded-xl text-brand-500">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm font-telugu">
                {t('మీ డేటా హక్కులు & ప్రాధాన్యతలను నిర్వహించండి', 'Manage Your Privacy Rights & Consent')}
              </h4>
              <p className="text-xs text-gray-500">
                {t('డేటా ఉపసంహరణ, ఖాతా తొలగింపు మరియు అభ్యర్థనల కేంద్రం.', 'Access consent controls, request data export or erasure.')}
              </p>
            </div>
          </div>
          <Link
            to="/privacy-center"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            <span>{t('గోప్యతా కేంద్రం సందర్శించండి', 'Visit Privacy Center')}</span>
          </Link>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t('ముఖ్యమైన పారదర్శకత ప్రకటన (Compliance Notice)', 'Important Transparency & Compliance Disclaimer')}</span>
          </div>
          <p>
            {t(
              'గోవేదిక డిజిటల్ పర్సనల్ డేటా ప్రొటెక్షన్ యాక్ట్, 2023 మరియు DPDP నిబంధనలు 2025 సూత్రాల ఆధారంగా సాంకేతిక మరియు కార్యాచరణ నియంత్రణలను అమలు చేసింది. ప్రణాళికాబద్ధమైన నోటిఫికేషన్ గడువులకు కట్టుబడి ఈ వ్యవస్థ నిరంతరం సమీక్షించబడుతుంది.',
              'Ghovedika has implemented privacy and data-protection controls aligned with the Digital Personal Data Protection Act, 2023 and DPDP Rules 2025. This implementation is subject to ongoing compliance review and legal updates.'
            )}
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-8 text-gray-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">1</span>
              <span>{t('పరిచయం (Introduction)', '1. Introduction')}</span>
            </h2>
            <p>
              {t(
                'గోవేదిక (Ghovedika) లో, మీ వ్యక్తిగత సమాచారాన్ని సురక్షితంగా మరియు పారదర్శకంగా ఉంచడానికి మేము కట్టుబడి ఉన్నాము. మీరు మా వెబ్‌సైట్ ద్వారా కొనుగోళ్లు చేసినప్పుడు లేదా మమ్మల్ని సంప్రదించినప్పుడు మాత్రమే అవసరమైన సమాచారాన్ని సేకరిస్తాము.',
                'At Ghovedika, we strictly protect your personal data. We collect and process personal data solely for legitimate business purposes such as delivering your orders, providing customer support, and operating our e-commerce platform securely.'
              )}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">2</span>
              <span>{t('డేటా ఫిడుషియరీ వివరాలు (Data Fiduciary Identity)', '2. Who We Are (Data Fiduciary)')}</span>
            </h2>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <p><strong>{t('సంస్థ పేరు: ', 'Entity Name: ')}</strong> Ghovedika | గోవేదిక</p>
              <p><strong>{t('అధికారిక వెబ్‌సైట్: ', 'Website: ')}</strong> <a href="https://www.ghovedika.store/" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">www.ghovedika.store</a></p>
              <p><strong>{t('ఇమెయిల్: ', 'Email: ')}</strong> {settings.email || 'ghovedika@gmail.com'}</p>
              <p><strong>{t('ఫోన్ నంబర్లు: ', 'Phones: ')}</strong> {settings.primaryPhone} / {settings.secondaryPhone}</p>
              <p><strong>{t('చిరునామా: ', 'Premises: ')}</strong> {settings.premisesAddress}</p>
            </div>
          </section>

          {/* Section 3 & 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">3</span>
              <span>{t('సేకరించే డేటా & ఉపయోగించే లక్ష్యాలు (Data Collected & Purpose)', '3. Personal Data Collected & Purpose of Processing')}</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="font-bold text-brand-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand-500" />
                  <span>{t('ఖాతా & ఆర్డర్ సమాచారం', 'Account & Order Data')}</span>
                </h4>
                <p className="text-gray-600">
                  {t(
                    'పేరు, మొబైల్ నంబర్, ఇమెయిల్ మరియు డెలివరీ చిరునామా. ఆర్డర్‌లను డెలివరీ చేయడానికి మరియు స్టేటస్ అప్‌డేట్స్ పంపడానికి మాత్రమే ఉపయోగిస్తాము.',
                    'Name, Mobile Number, Email, and Delivery Address. Used exclusively to deliver products, process transactions, and send order updates.'
                  )}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="font-bold text-brand-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <span>{t('సురక్షిత చెల్లింపు వివరాలు', 'Payment Transaction References')}</span>
                </h4>
                <p className="text-gray-600">
                  {t(
                    'రేజర్‌పే (Razorpay) లేదా COD పద్ధతి. మేము మీ కార్డ్ నంబర్, సివివి లేదా యుపిఐ పిన్ ఎన్నడూ స్టోర్ చేయము.',
                    'Razorpay or COD status reference. We NEVER store card numbers, CVV, or UPI PINs in our databases.'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Minimization */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">4</span>
              <span>{t('డేటా తగ్గింపు సూత్రం (Data Minimization)', '4. Strict Data Minimization')}</span>
            </h2>
            <p>
              {t(
                'గోవేదిక అనవసరమైన సమాచారాన్ని సేకరించదు. ఆధార్ (Aadhaar), పాన్ (PAN), లేదా ప్రభుత్వ ఐడీ పత్రాలు ఏవీ మా సిస్టమ్ సేకరించదు.',
                'We strictly adhere to Data Minimization. We do NOT collect Aadhaar, PAN, precise GPS tracking, or government identification cards.'
              )}
            </p>
          </section>

          {/* Section 6: Data Processors */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">5</span>
              <span>{t('మూడవ పక్ష డేటా ప్రాసెసర్లు (Data Processors)', '5. Authorized Third-Party Data Processors')}</span>
            </h2>
            <p className="text-xs">
              {t(
                'మా సేవలు అందించడానికి అవసరమైన అధీకృత భాగస్వాములతో మాత్రమే డేటా షేర్ చేయబడుతుంది:',
                'Data is processed only through secure, verified third-party partners required to operate our service:'
              )}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
              <li><strong>Firebase / Google Cloud:</strong> {t('డేటాబేస్ & యూజర్ ల్యాండింగ్', 'Secure Firestore Database & Authentication')}</li>
              <li><strong>Razorpay:</strong> {t('ఆన్‌లైన్ చెల్లింపుల ధృవీకరణ', 'Online Payment Gateway Processing')}</li>
              <li><strong>Logistics Partners:</strong> {t('పోస్టల్ & కొరియర్ డెలివరీ', 'Postal & Courier Package Delivery Services')}</li>
            </ul>
          </section>

          {/* Section 7: Grievance Redressal */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-900 border-b border-gray-100 pb-2 font-telugu flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">6</span>
              <span>{t('గోప్యతా ఫిర్యాదుల పరిష్కారం (Grievance Redressal)', '6. Privacy Contact & Grievance Redressal')}</span>
            </h2>
            <p className="text-xs">
              {t(
                'మీకు ఏదైనా డేటా గోప్యతా సమస్య ఉంటే, మా గోప్యతా అధికారిని నేరుగా సంప్రదించవచ్చు. నిబంధనల ప్రకారం గరిష్టంగా 90 రోజులలోపు పరిష్కారం అందించబడుతుంది.',
                'If you have any questions or privacy complaints, contact our Data Privacy Desk. As per DPDP Rules 2025, grievance complaints are handled within the stipulated timeline (up to 90 days).'
              )}
            </p>
            
            <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100 text-xs space-y-2 text-brand-900">
              <p className="flex items-center gap-2 font-bold">
                <Mail className="w-4 h-4 text-brand-500" />
                <span>Email: {settings.privacyContactEmail || 'ghovedika@gmail.com'}</span>
              </p>
              <p className="flex items-center gap-2 font-bold">
                <Phone className="w-4 h-4 text-brand-500" />
                <span>Phone: {settings.privacyContactPhone || '8008588599'}</span>
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
