import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const CMSPage: React.FC<{ slugOverride?: string }> = ({ slugOverride }) => {
  const { slug: paramsSlug } = useParams<{ slug: string }>();
  const { t, getText } = useLanguage();

  const slug = slugOverride || paramsSlug || 'privacy-policy';
  const page = dbService.getPageBySlug(slug);

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Page not found</h2>
        <Link to="/" className="text-brand-500 hover:underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  const title = getText(page, 'title');
  const content = getText(page, 'content');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-100 shadow-card space-y-6">
        <h1 className="text-3xl font-extrabold font-telugu text-brand-900 border-b border-gray-100 pb-4">
          {title}
        </h1>
        
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line font-telugu space-y-4">
          {content}
        </div>

        <div className="pt-6 border-t border-gray-100 text-xs text-gray-400">
          Last Updated: {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
