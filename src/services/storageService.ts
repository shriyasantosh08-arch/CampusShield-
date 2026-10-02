import { EvidenceItem } from '../types/incident';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export interface UploadProgressCallback {
  (progress: number): void;
}

export const storageService = {
  validateFile(file: File): { valid: boolean; error?: string } {
    const isAllowed = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES].includes(file.type);
    if (!isAllowed) {
      return {
        valid: false,
        error: `Invalid file type "${file.type || file.name}". Only images (JPG, PNG, WebP) and short videos (MP4, WebM) are permitted.`,
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const mbSize = (file.size / (1024 * 1024)).toFixed(1);
      return {
        valid: false,
        error: `File "${file.name}" is ${mbSize}MB, which exceeds the 25MB limit.`,
      };
    }

    return { valid: true };
  },

  async uploadEvidence(
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<EvidenceItem> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Simulate progress increments for UI responsiveness
    if (onProgress) {
      for (let p = 15; p <= 90; p += 25) {
        onProgress(p);
        await new Promise((r) => setTimeout(r, 60));
      }
    }

    // Create object URL for client preview & demonstration
    const previewUrl = URL.createObjectURL(file);

    if (onProgress) {
      onProgress(100);
    }

    return {
      id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl,
      uploadedAt: new Date().toISOString(),
    };
  },

  deleteEvidence(_evidenceId: string): void {
    // In production, deletes from Firebase Storage or S3
    // For local object URL cleanup if needed
  },
};
