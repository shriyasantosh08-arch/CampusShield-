export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  detectedAt: string;
}

export interface GeolocationErrorResult {
  code: 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'UNSUPPORTED' | 'UNKNOWN';
  message: string;
}

export const CAMPUS_BUILDINGS = [
  'Student Union & Dining Hall',
  'Main Academic Library (Floors 1-4)',
  'Science & Technology Complex - Block A',
  'Science & Technology Complex - Block B',
  'Engineering Quadrangle',
  'Cedar Residence Hall (North Dorms)',
  'Pine Residence Hall (South Dorms)',
  'Campus Health & Urgent Care Center',
  'Athletics Complex & Gymnasium',
  'Central Administration Building',
  'West Campus Parking Garage (Multi-level)',
  'East Campus Surface Parking',
  'Performing Arts Center & Auditorium',
  'Campus Perimeter & Outer Walkways',
];

export const locationService = {
  detectLocation(): Promise<GeolocationResult> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        const err: GeolocationErrorResult = {
          code: 'UNSUPPORTED',
          message: 'Geolocation is not supported by your browser or device.',
        };
        reject(err);
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 10000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: Math.round(position.coords.accuracy),
            detectedAt: new Date().toISOString(),
          });
        },
        (error) => {
          let code: GeolocationErrorResult['code'] = 'UNKNOWN';
          let message = 'Unable to detect your location.';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              code = 'PERMISSION_DENIED';
              message = 'Location permission was denied. Please allow location access in your browser settings or select your campus area manually.';
              break;
            case error.POSITION_UNAVAILABLE:
              code = 'POSITION_UNAVAILABLE';
              message = 'GPS location is currently unavailable. Please verify your connection or select your location manually.';
              break;
            case error.TIMEOUT:
              code = 'TIMEOUT';
              message = 'Location detection timed out. Please try again or select your building manually.';
              break;
            default:
              code = 'UNKNOWN';
              message = error.message || 'An unexpected error occurred while detecting location.';
          }

          const err: GeolocationErrorResult = { code, message };
          reject(err);
        },
        options
      );
    });
  },

  getCampusBuildings(): string[] {
    return CAMPUS_BUILDINGS;
  },
};
