import React, { useState } from 'react';
import { 
  ShieldCheck, UserCheck, Download, Trash2, HelpCircle, FileText, 
  CheckCircle2, AlertTriangle, RefreshCw, Mail, Phone, Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';
import { PrivacyRequestType, ConsentRecord } from '../types';

export const PrivacyCenterPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const settings = dbService.getSettings();

  const [activeTab, setActiveTab] = useState<'consent' | 'rights' | 'export' | 'grievance'>('consent');

  // Consent Management State
  const [marketingConsent, setMarketingConsent] = useState<boolean>(() => {
    if (user?.phone) {
      const consents = dbService.getConsentRecords().filter(c => c.phoneOrEmail === user.phone && c.purpose === 'marketing_opt_in');
      return consents.length > 0 ? consents[0].isConsented : false;
    }
    return false;
  });
  const [consentSavedMsg, setConsentSavedMsg] = useState(false);

  // Rights Form State
  const [requestType, setRequestType] = useState<PrivacyRequestType>('access');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [description, setDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'whatsapp'>('phone');
  const [requestSubmittedNum, setRequestSubmittedNum] = useState<string | null>(null);

  // Deletion Confirmation State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionResultMsg, setDeletionResultMsg] = useState<string | null>(null);

  const handleSaveConsent = (isOptedIn: boolean) => {
    setMarketingConsent(isOptedIn);
    const identifier = phone || email || user?.phone || 'guest-user';
    dbService.recordConsent(identifier, 'marketing_opt_in', isOptedIn, '/privacy-center/consent', language);
    setConsentSavedMsg(true);
    setTimeout(() => setConsentSavedMsg(false), 3000);
  };

  const handleRightsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;

    const newReq = dbService.createPrivacyRequest({
      requestType,
      customerName: name || 'Valued Customer',
      customerPhone: phone || '8008588599',
      customerEmail: email || 'customer@privacy.local',
      description: description || `Privacy request for ${requestType}`,
      preferredContact,
    });

    setRequestSubmittedNum(newReq.requestNumber);
    setDescription('');
  };

  const handleExportData = () => {
    const identifier = email || phone || user?.email || 'customer@privacy.local';
    const dataObj = dbService.exportCustomerData(identifier);
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ghovedika_MyPrivacyData_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConfirmAccountDeletion = () => {
    const identifier = email || phone || user?.email || 'customer@privacy.local';
    dbService.deleteCustomerData(identifier);
    setDeletionResultMsg('Your account data request has been processed successfully.');
    setShowDeleteModal(false);
  };

  const consentHistory = dbService.getConsentRecords();

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>{t('DPDP యాక్ట్ 2023 & నిబంధనలు 2025 కంట్రోల్స్', 'DPDP Act 2023 & Rules 2025 Controls')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-telugu">
              {t('గోవేదిక గోప్యతా నిర్వహణ కేంద్రం', 'Ghovedika Customer Privacy Center')}
            </h1>
            <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
              {t(
                'మీ వ్యక్తిగత డేటాపై పూర్తి నియంత్రణ పొందండి. మీ సమ్మతులను మార్చండి, డేటా కాపీని డౌన్‌లోడ్ చేసుకోండి లేదా డేటా అభ్యర్థనలను సమర్పించండి.',
                'Exercise full control over your personal data. Manage consent preferences, request data exports, submit privacy rights requests or log grievances.'
              )}
            </p>
          </div>

          <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100 text-xs shrink-0 text-brand-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-600" />
              <span>{t('ప్రస్తుత విధానం వెర్షన్:', 'Current Policy Version:')} <span className="font-mono text-amber-700">{settings.privacyPolicyVersion || 'v1.0-2025'}</span></span>
            </p>
            <p className="text-gray-600">
              {t('పరిష్కార సమయం (SLA): ', 'Grievance SLA: ')} <strong>{settings.privacyResponseSlaDays || 90} {t('రోజులు', 'Days')}</strong>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => setActiveTab('consent')}
            className={`px-5 py-3 font-bold text-xs rounded-t-2xl border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'consent'
                ? 'border-brand-500 bg-white text-brand-600 shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('సమ్మతి ప్రాధాన్యతలు (Consent)', 'Consent Preferences')}</span>
          </button>

          <button
            onClick={() => setActiveTab('rights')}
            className={`px-5 py-3 font-bold text-xs rounded-t-2xl border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'rights'
                ? 'border-brand-500 bg-white text-brand-600 shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t('డేటా హక్కుల అభ్యర్థన (Data Rights)', 'Data Rights Requests')}</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-5 py-3 font-bold text-xs rounded-t-2xl border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-brand-500 bg-white text-brand-600 shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t('డేటా ఎగుమతి & ఖాతా రద్దు', 'Data Export & Account Erasure')}</span>
          </button>

          <button
            onClick={() => setActiveTab('grievance')}
            className={`px-5 py-3 font-bold text-xs rounded-t-2xl border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'grievance'
                ? 'border-brand-500 bg-white text-brand-600 shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t('గోప్యతా ఫిర్యాదు (Grievance Desk)', 'Grievance Redressal')}</span>
          </button>
        </div>

        {/* Tab 1: Consent Preferences */}
        {activeTab === 'consent' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-telugu">
                {t('ఐచ్ఛిక మార్కెటింగ్ & సమాచార సమ్మతి', 'Optional Marketing & Promotional Consent')}
              </h3>
              <p className="text-xs text-gray-500">
                {t(
                  'గోవేదిక మీ ఆర్డర్ నెరవేర్పుకు అవసరమైన సమాచారాన్ని మాత్రమే సేకరిస్తుంది. ఐచ్ఛిక ప్రమోషనల్ అప్‌డేట్‌లను ఇక్కడ ఎప్పుడైనా ఎనేబుల్ లేదా డిసేబుల్ చేసుకోవచ్చు.',
                  'Ghovedika processes essential data solely to fulfill orders. You may freely toggle optional promotional communications below at any time.'
                )}
              </p>
            </div>

            {consentSavedMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t('మీ సమ్మతి ప్రాధాన్యతలు విజయవంతంగా నవీకరించబడ్డాయి!', 'Your consent preferences have been updated successfully!')}</span>
              </div>
            )}

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 font-telugu">
                    {t('గోవేదిక ప్రత్యేక ఆఫర్లు & కొత్త ఉత్పత్తుల సమాచారం (WhatsApp / SMS / Email)', 'Ghovedika Promotional Offers & Product Updates')}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">
                    {t(
                      'సేంద్రీయ జీవ ఎరువులు, గోమయ ధూప్ మరియు ఆఫర్ల వివరాలు పొందడానికి నన్ను సంప్రదించడానికి సమ్మతిస్తున్నాను.',
                      'I agree to receive promotional updates, bio-fertilizer guides, and discount coupons from Ghovedika.'
                    )}
                  </p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => handleSaveConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>

              <div className="text-[11px] text-gray-400 border-t border-gray-200 pt-3 flex justify-between">
                <span>{t('సమ్మతి స్వభావం: ఐచ్ఛికం (Optional Affirmative Consent)', 'Consent Nature: Optional Affirmative Action')}</span>
                <span>{t('వెర్షన్: ', 'Version: ')} {settings.privacyPolicyVersion || 'v1.0-2025'}</span>
              </div>
            </div>

            {/* Active Consent Records Table */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="font-bold text-xs uppercase text-gray-700 font-telugu">
                {t('సమ్మతి నమొదు చరిత్ర (Consent Logs Audit)', 'Recent Consent Audit History')}
              </h4>
              
              <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Policy Version</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {consentHistory.slice(0, 5).map((c) => (
                      <tr key={c.id}>
                        <td className="p-3 font-mono text-[10px]">{c.id}</td>
                        <td className="p-3 capitalize">{c.purpose.replace(/_/g, ' ')}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.isConsented ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {c.isConsented ? 'Granted' : 'Withdrawn'}
                          </span>
                        </td>
                        <td className="p-3 text-[11px]">{new Date(c.timestamp).toLocaleString()}</td>
                        <td className="p-3 font-mono text-[10px]">{c.policyVersion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Data Rights Request Form */}
        {activeTab === 'rights' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-telugu">
                {t('డేటా ప్రిన్సిపల్ హక్కుల అభ్యర్థన (Data Principal Rights Form)', 'Submit Data Principal Rights Request')}
              </h3>
              <p className="text-xs text-gray-500">
                {t(
                  'DPDP చట్టం 2023 ప్రకారం మీ వ్యక్తిగత డేటా యాక్సెస్, సవరణ, తొలగింపు లేదా ఉపసంహరణ అభ్యర్థనలను ఇక్కడ సమర్పించండి.',
                  'Submit requests for Data Access, Data Correction, Data Erasure, or Consent Withdrawal under the DPDP Act 2023.'
                )}
              </p>
            </div>

            {requestSubmittedNum ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>{t('మీ డేటా అభ్యర్థన సమర్పించబడింది!', 'Data Request Submitted Successfully!')}</span>
                </div>
                <p className="text-xs leading-relaxed">
                  {t(
                    'మీ అభ్యర్థన సంఖ్య: ',
                    'Your Tracking Request Number is: '
                  )}
                  <strong className="font-mono text-emerald-950 text-sm bg-emerald-100 px-2 py-0.5 rounded">{requestSubmittedNum}</strong>
                </p>
                <p className="text-xs text-emerald-700">
                  {t(
                    'మా గోప్యతా బృందం తక్షణమే మీ అభ్యర్థనను సమీక్షించి ధృవీకరించిన తర్వాత స్పందిస్తుంది.',
                    'Our Data Privacy Desk will review your request within the configured SLA timeframe.'
                  )}
                </p>
                <button
                  onClick={() => setRequestSubmittedNum(null)}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  {t('మరొక అభ్యర్థన సమర్పించండి', 'Submit Another Request')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRightsSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {t('అభ్యర్థన రకం (Select Request Type) *', 'Select Request Type *')}
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as PrivacyRequestType)}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white"
                  >
                    <option value="access">Access - Request summary of my personal data</option>
                    <option value="correction">Correction - Request update/fix of inaccurate data</option>
                    <option value="erasure">Erasure - Request deletion of profile & optional data</option>
                    <option value="consent_withdrawal">Consent Withdrawal - Withdraw optional marketing processing</option>
                    <option value="grievance">Grievance - Formal Privacy Complaint</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('మీ పేరు (Full Name)', 'Full Name')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Srinivas Rao"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{t('మొబైల్ నంబర్ (Mobile Number) *', 'Mobile Number *')}</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 8008588599"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">{t('ఇమెయిల్ చిరునామా (Email Address)', 'Email Address')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. customer@example.com"
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {t('అభ్యర్థన వివరాలు (Request Description) *', 'Description of Request *')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t(
                      'మీ అభ్యర్థన గురించిన స్పష్టమైన వివరాలు ఇక్కడ రాయండి...',
                      'Please provide details regarding your data request...'
                    )}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition"
                >
                  {t('అభ్యర్థన సమర్పించండి (Submit Request)', 'Submit Privacy Request')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Data Export & Account Erasure */}
        {activeTab === 'export' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 font-telugu">
                {t('డేటా పోర్టబిలిటీ & ఖాతా రద్దు (Data Export & Account Deletion)', 'Data Export & Account Deletion')}
              </h3>

              {/* Data Export Box */}
              <div className="p-6 bg-brand-50/60 border border-brand-100 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-500 text-white rounded-xl">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-900 font-telugu">
                      {t('మీ వ్యక్తిగత డేటా కాపీని డౌన్‌లోడ్ చేసుకోండి (JSON Format)', 'Download Personal Data Bundle (JSON Format)')}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t(
                        'మీ ప్రొఫైల్, సేవ్ చేసిన చిరునామాలు, ఆర్డర్ చరిత్ర మరియు సమ్మతి రికార్డులను ఎగుమతి చేస్తుంది. పాస్‌వర్డ్‌లు లేదా కార్డ్ వివరాలు ఇందులో ఉండవు.',
                        'Exports profile, addresses, order history, and consent logs in machine-readable JSON format. Excludes passwords & payment credentials.'
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleExportData}
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('డేటా ఎగుమతి చేయండి (Download JSON)', 'Download My Data')}</span>
                </button>
              </div>

              {/* Account Deletion Box */}
              <div className="p-6 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-600 text-white rounded-xl">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-rose-950 font-telugu">
                      {t('నా ఖాతా & డేటా తొలగించండి (Delete My Account)', 'Delete My Account & Personal Data')}
                    </h4>
                    <p className="text-xs text-rose-800">
                      {t(
                        'ఖాతా ప్రొఫైల్ మరియు మార్కెటింగ్ డేటా తొలగించబడుతుంది. చట్టబద్ధమైన పన్ను లెక్కింపుల కోసం ఆర్డర్ ఆర్థిక వివరాలు అనామకంగా భద్రపరచబడతాయి.',
                        'Deletes profile and marketing consent. Order financial transactions are retained in anonymized form as required by statutory accounting laws.'
                      )}
                    </p>
                  </div>
                </div>

                {deletionResultMsg ? (
                  <div className="p-4 bg-white border border-rose-300 text-rose-900 rounded-xl text-xs font-bold">
                    {deletionResultMsg}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t('ఖాతా తొలగింపును ప్రారంభించండి', 'Request Account Deletion')}</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Grievance Redressal Desk */}
        {activeTab === 'grievance' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-telugu">
                {t('గోప్యతా ఫిర్యాదుల కేంద్రం (Privacy Grievance Redressal Desk)', 'Privacy Grievance Redressal Desk')}
              </h3>
              <p className="text-xs text-gray-500">
                {t(
                  'డేటా ప్రాసెసింగ్ లేదా గోప్యతా నియమాల ఉల్లంఘనపై ఫిర్యాదులు ఉంటే నేరుగా మా అధికారులకు తెలియజేయవచ్చు.',
                  'As per DPDP Rules 2025, users may lodge privacy complaints directly with our designated Data Officer.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 space-y-2 text-xs text-brand-900">
                <h4 className="font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-600" />
                  <span>Data Privacy Officer Email</span>
                </h4>
                <p className="font-mono">{settings.privacyContactEmail || 'ghovedika@gmail.com'}</p>
              </div>

              <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100 space-y-2 text-xs text-brand-900">
                <h4 className="font-bold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Privacy Helpline Phone</span>
                </h4>
                <p className="font-mono">{settings.privacyContactPhone || '8008588599'}</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="font-bold text-base text-gray-900 font-telugu">
                {t('ఖాతా తొలగింపు ధృవీకరణ', 'Confirm Account Deletion')}
              </h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {t(
                'మీరు ఖచ్చితంగా మీ ఖాతా ప్రొఫైల్ మరియు సమ్మతులను తొలగించాలనుకుంటున్నారా? ఈ ప్రక్రియను తిరిగి మార్చలేము.',
                'Are you sure you want to request account profile deletion? This action anonymizes profile records and withdraws optional consents.'
              )}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
              >
                {t('రద్దు చేయండి', 'Cancel')}
              </button>
              <button
                onClick={handleConfirmAccountDeletion}
                className="px-5 py-2 bg-rose-600 text-white font-extrabold rounded-xl shadow"
              >
                {t('అవును, తొలగించండి', 'Yes, Confirm Deletion')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
