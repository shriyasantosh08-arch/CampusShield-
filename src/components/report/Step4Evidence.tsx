import React, { useState, useRef } from 'react';
import { EvidenceItem } from '../../types/incident';
import { storageService } from '../../services/storageService';
import {
  UploadCloud,
  Video,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface Step4EvidenceProps {
  evidenceList: EvidenceItem[];
  setEvidenceList: React.Dispatch<React.SetStateAction<EvidenceItem[]>>;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Evidence: React.FC<Step4EvidenceProps> = ({
  evidenceList,
  setEvidenceList,
  onNext,
  onBack,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    const fileListArray = Array.from(files);

    for (const file of fileListArray) {
      const validation = storageService.validateFile(file);
      if (!validation.valid) {
        setErrorMessage(validation.error || 'Invalid file.');
        continue;
      }

      try {
        setUploadingProgress(10);
        const item = await storageService.uploadEvidence(file, (progress) => {
          setUploadingProgress(progress);
        });
        setEvidenceList((prev) => [...prev, item]);
      } catch (err: any) {
        setErrorMessage(err.message || 'Error processing file.');
      } finally {
        setUploadingProgress(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleProcessFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    setEvidenceList((prev) => prev.filter((item) => item.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Attach Evidence (Optional)
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Upload photos or short video clips showing the hazard, damage, or incident context.
        </p>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-rose-500 bg-rose-950/20 scale-[1.01]'
            : 'border-slate-700 bg-slate-900/60 hover:border-slate-500 hover:bg-slate-900/90'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => handleProcessFiles(e.target.files)}
        />

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-white">
            Click to browse or drag and drop files here
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PNG, JPG, WebP, MP4 or WebM (Max 25MB per file)
          </p>
        </div>

        {uploadingProgress !== null && (
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Uploading & verifying media...</span>
              <span>{uploadingProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-rose-500 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${uploadingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Evidence Gallery */}
      {evidenceList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Attached Files ({evidenceList.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {evidenceList.map((item) => {
              const isVideo = item.type.startsWith('video');

              return (
                <div
                  key={item.id}
                  className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md p-2.5 flex flex-col justify-between"
                >
                  <div className="relative h-32 rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center mb-2">
                    {isVideo ? (
                      <div className="flex flex-col items-center text-slate-400">
                        <Video className="w-8 h-8 text-rose-400 mb-1" />
                        <span className="text-[10px] font-mono">Video Clip</span>
                      </div>
                    ) : (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-md"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-200 truncate">{item.name}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>{formatSize(item.size)}</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
        >
          <span>Continue to Review</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
