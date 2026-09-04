import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2, X, Link as LinkIcon } from 'lucide-react';
import { uploadImageToFirebase } from '../../services/firebaseDb';

interface ImageUploaderProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  folder?: string;
  placeholder?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value = '',
  onChange,
  label = 'Upload / Change Image',
  folder = 'images',
  placeholder = 'https://example.com/image.jpg',
  className = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const [storageType, setStorageType] = useState<'cloud' | 'compressed' | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image size exceeds 10MB limit.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const res = await uploadImageToFirebase(file, folder);
      onChange(res.url);
      setStorageType(res.storageType);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please drop a valid image file.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const res = await uploadImageToFirebase(file, folder);
      onChange(res.url);
      setStorageType(res.storageType);
    } catch (err: any) {
      setError('Failed to upload dropped image.');
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
          <span>{label}</span>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-brand-600 hover:underline flex items-center gap-1 font-normal"
          >
            <LinkIcon className="w-3 h-3" />
            {showUrlInput ? 'Use File Upload' : 'Paste Direct URL'}
          </button>
        </div>
      )}

      {/* Image Preview & Dropzone */}
      {!showUrlInput ? (
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-4 transition-all text-center ${
            value ? 'border-brand-300 bg-brand-50/20' : 'border-gray-300 hover:border-brand-400 bg-gray-50'
          }`}
        >
          {value ? (
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-white flex-shrink-0 shadow-sm">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition"
                  title="Remove Image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1 text-left space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold flex-wrap">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Image Uploaded Successfully</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] rounded-full font-bold">⚡ WebP Storage Optimized</span>
                  {storageType === 'cloud' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full font-bold">☁️ Firebase Storage</span>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 truncate max-w-xs">{value}</p>
                
                <label className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 font-bold rounded-lg text-[11px] text-gray-700 hover:bg-gray-100 cursor-pointer shadow-sm">
                  {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <UploadCloud className="w-3 h-3 text-brand-500" />}
                  <span>Change File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2 py-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
              </div>
              <div className="text-xs">
                <label className="font-bold text-brand-600 hover:underline cursor-pointer">
                  Click to select file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500"> or drag and drop image here</span>
              </div>
              <p className="text-[10px] text-gray-400">PNG, JPG, GIF, WebP (Max 10MB)</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {value && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-red-600 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
