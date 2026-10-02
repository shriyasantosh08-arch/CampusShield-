import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIncidents } from '../../context/IncidentContext';
import { Incident, EvidenceItem } from '../../types/incident';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { StatusTimeline } from '../../components/tracking/StatusTimeline';
import { Modal } from '../../components/common/Modal';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Check,
  AlertCircle,
  Video,
  ExternalLink,
  PhoneCall,
} from 'lucide-react';

export const IncidentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIncidentById } = useIncidents();
  const navigate = useNavigate();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<EvidenceItem | null>(null);

  useEffect(() => {
    async function loadIncident() {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const found = await getIncidentById(id);
        if (!found) {
          setError('Incident report not found or access unauthorized.');
        } else {
          setIncident(found);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to retrieve incident details.');
      } finally {
        setIsLoading(false);
      }
    }
    loadIncident();
  }, [id, getIncidentById]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '-';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Loading incident data & dispatch log...</p>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Incident Report Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'This incident may not belong to your account.'}</p>
        <Link
          to="/incidents"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Incidents</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Share Nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/incidents')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reports</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share Reference</span>
            </>
          )}
        </button>
      </div>

      {/* Incident Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-sm font-extrabold text-rose-400 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
              {incident.id}
            </span>
            <span className="text-xs font-bold text-slate-300">{incident.category}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <PriorityBadge priority={incident.priority} size="md" />
            <StatusBadge status={incident.status} size="md" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {incident.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Reported: {formatDate(incident.createdAt)}</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Last Updated: {formatDate(incident.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left (Details & Evidence), Right (Status Tracking Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Description */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
              Incident Narrative
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {incident.description}
            </p>
          </div>

          {/* Location Information */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
              Location Coordinates & Landmark
            </h2>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <p className="text-base font-bold text-white">
                  {incident.location.buildingOrArea}
                </p>
                {incident.location.landmarkDetails && (
                  <p className="text-slate-300">{incident.location.landmarkDetails}</p>
                )}
                {incident.location.latitude && incident.location.longitude && (
                  <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-emerald-400">
                    <span>
                      LAT: {incident.location.latitude.toFixed(6)}° N
                    </span>
                    <span>
                      LNG: {incident.location.longitude.toFixed(6)}° W
                    </span>
                    {incident.location.accuracy && (
                      <span className="text-slate-400">
                        (±{incident.location.accuracy}m GPS accuracy)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Evidence Media Gallery */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                Evidence Files ({incident.evidence.length})
              </h2>
            </div>

            {incident.evidence.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No media attachments were attached.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {incident.evidence.map((item) => {
                  const isVideo = item.type.startsWith('video');

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMedia(item)}
                      className="group relative h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-rose-500 transition-all text-left focus:outline-none"
                    >
                      {isVideo ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <Video className="w-8 h-8 text-rose-400 mb-1" />
                          <span className="text-[10px] font-mono">Watch Video</span>
                        </div>
                      ) : (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-80" />
                      <div className="absolute bottom-2 left-2 right-2 text-[10px] text-slate-200 font-mono truncate">
                        {item.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Status Tracking Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <StatusTimeline incident={incident} />

          {/* Emergency Assistance card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Need Direct First Responder Update?</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              If the situation escalates or immediate assistance is required, call Campus Police Dispatch directly.
            </p>
            <a
              href="tel:911"
              className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold font-mono transition-colors"
            >
              Emergency Dispatch (Ext 911)
            </a>
          </div>
        </div>
      </div>

      {/* Media Fullscreen Preview Modal */}
      <Modal
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
        title={selectedMedia?.name || 'Evidence Preview'}
        maxWidth="lg"
      >
        {selectedMedia && (
          <div className="space-y-3">
            <div className="max-h-[70vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {selectedMedia.type.startsWith('video') ? (
                <video controls src={selectedMedia.previewUrl} className="w-full max-h-[65vh]" />
              ) : (
                <img
                  src={selectedMedia.previewUrl}
                  alt={selectedMedia.name}
                  className="w-full max-h-[65vh] object-contain"
                />
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>File: {selectedMedia.name}</span>
              <a
                href={selectedMedia.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>Open full original</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
