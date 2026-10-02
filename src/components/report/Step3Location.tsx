import React, { useState } from 'react';
import { LocationData } from '../../types/incident';
import { locationService, CAMPUS_BUILDINGS, GeolocationErrorResult } from '../../services/locationService';
import {
  MapPin,
  Crosshair,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from 'lucide-react';

interface Step3LocationProps {
  location: LocationData;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Location: React.FC<Step3LocationProps> = ({
  location,
  setLocation,
  onNext,
  onBack,
}) => {
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [detectError, setDetectError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(
    Boolean(location.buildingOrArea || location.latitude)
  );

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    setDetectError(null);
    try {
      const res = await locationService.detectLocation();
      setLocation((prev) => ({
        ...prev,
        latitude: res.latitude,
        longitude: res.longitude,
        accuracy: res.accuracy,
        isAutoDetected: true,
        detectedAt: res.detectedAt,
      }));
      setConfirmed(true);
    } catch (err: any) {
      const geoErr = err as GeolocationErrorResult;
      setDetectError(
        geoErr.message ||
          'Failed to detect location. Please select your campus building manually.'
      );
    } finally {
      setIsDetecting(false);
    }
  };

  const isLocationProvided = Boolean(
    location.buildingOrArea.trim() || (location.latitude && location.longitude)
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Specify Location
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Campus security needs exact coordinates or building details to arrive without delay.
        </p>
      </div>

      {/* Geolocation Detection Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Crosshair className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Browser GPS Geolocation</h3>
              <p className="text-xs text-slate-400">
                Detect your live device coordinates via HTML5 Geolocation API
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 disabled:opacity-50 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0"
          >
            {isDetecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Acquiring Satellites...</span>
              </>
            ) : (
              <>
                <Crosshair className="w-4 h-4" />
                <span>DETECT MY LOCATION</span>
              </>
            )}
          </button>
        </div>

        {/* Detection Error State */}
        {detectError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Location Detection Notice</p>
              <p className="mt-0.5 text-rose-300/90">{detectError}</p>
            </div>
          </div>
        )}

        {/* GPS Coordinates Detected State */}
        {location.latitude && location.longitude && (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Coordinates Locked
                </span>
              </div>
              {typeof location.accuracy === 'number' && (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Accuracy: ±{location.accuracy}m
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">LATITUDE</span>
                <span className="text-white font-semibold text-sm">
                  {location.latitude.toFixed(6)}° N
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">LONGITUDE</span>
                <span className="text-white font-semibold text-sm">
                  {location.longitude.toFixed(6)}° W
                </span>
              </div>
            </div>

            {/* Mini Visual Radar Map Simulation */}
            <div className="relative h-24 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-70" />
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 animate-ping absolute -inset-0" />
                  <div className="w-8 h-8 rounded-full bg-rose-500/40 flex items-center justify-center text-white relative">
                    <MapPin className="w-4 h-4 text-rose-400 fill-rose-500" />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-300 mt-1">
                  Target Incident Marker Placed
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Campus Building & Specific Details */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-rose-400" />
          <h3 className="font-bold text-sm text-white">Campus Building or Facility Zone</h3>
        </div>

        <div className="space-y-2">
          <label htmlFor="campus-building-select" className="text-xs font-semibold text-slate-300">
            Select Recognized Campus Location <span className="text-rose-400">*</span>
          </label>
          <select
            id="campus-building-select"
            value={location.buildingOrArea}
            onChange={(e) => {
              setLocation((prev) => ({ ...prev, buildingOrArea: e.target.value }));
              setConfirmed(true);
            }}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-white text-sm outline-none"
          >
            <option value="">-- Choose Building / Quad / Zone --</option>
            {CAMPUS_BUILDINGS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="landmark-details" className="text-xs font-semibold text-slate-300">
            Specific Landmark / Floor / Room Number (Recommended)
          </label>
          <input
            id="landmark-details"
            type="text"
            value={location.landmarkDetails || ''}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, landmarkDetails: e.target.value }))
            }
            placeholder="e.g., 3rd Floor East Wing, Room 304, near the emergency exit stairs"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-rose-500 text-white placeholder-slate-500 text-sm outline-none"
          />
        </div>

        {/* Location Confirmation Toggle */}
        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-700 bg-slate-900"
          />
          <div className="text-xs text-slate-300">
            <span className="font-semibold text-white block">
              I confirm this location is accurate to the best of my knowledge
            </span>
            <span>Helps security reach the exact site rapidly.</span>
          </div>
        </label>
      </div>

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
          disabled={!isLocationProvided || !confirmed}
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
        >
          <span>Continue to Evidence</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
