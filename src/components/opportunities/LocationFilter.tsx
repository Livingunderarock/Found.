'use client';

import React, { useState } from 'react';
import { INDIAN_STATES, CITIES_DATA } from '@/data/locations';
import { LocationCoordinates } from '@/types';
import { MapPin, Navigation } from 'lucide-react';

interface LocationFilterProps {
  currentScope: string;
  onScopeChange: (scope: any) => void;
  currentRadius: number;
  onRadiusChange: (radius: number) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedLocality: string;
  onLocalityChange: (locality: string, coords?: LocationCoordinates) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
}

export function LocationFilter({
  currentScope,
  onScopeChange,
  currentRadius,
  onRadiusChange,
  selectedCity,
  onCityChange,
  selectedLocality,
  onLocalityChange,
  selectedState,
  onStateChange
}: LocationFilterProps) {
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  const cityData = CITIES_DATA[selectedCity];

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsMessage('Geolocation is not supported by your browser.');
      return;
    }
    setIsGpsLoading(true);
    setGpsMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        const { latitude, longitude } = pos.coords;
        setGpsMessage(`Location detected (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°).`);
        onLocalityChange('Current Location', { lat: latitude, lng: longitude });
      },
      () => {
        setIsGpsLoading(false);
        setGpsMessage('Location permission declined. Using manual selection.');
      },
      { timeout: 8000 }
    );
  };

  const scopes = [
    { id: 'all', label: 'All Locations' },
    { id: 'local_area', label: 'Near My Area' },
    { id: 'city', label: 'My City' },
    { id: 'state', label: 'My State' },
    { id: 'national', label: 'National' },
    { id: 'online', label: 'Online' },
  ];

  const radii = [5, 10, 25, 50, 100];

  return (
    <div className="theme-card rounded-lg p-4 space-y-4">
      {/* Scope Buttons */}
      <div>
        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold block mb-2">
          Location Scope
        </label>
        <div className="flex flex-wrap gap-1.5">
          {scopes.map(s => (
            <button
              key={s.id}
              onClick={() => onScopeChange(s.id)}
              className={`px-3 py-1 text-xs rounded transition-all font-medium border ${
                currentScope === s.id
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-sm font-semibold'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hierarchical Location Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-3">
        {/* State */}
        <div>
          <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
            State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              const newState = e.target.value;
              onStateChange(newState);
              const stateObj = INDIAN_STATES.find(s => s.name === newState);
              if (stateObj && stateObj.primaryCities.length > 0) {
                onCityChange(stateObj.primaryCities[0]);
              }
            }}
            className="w-full text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none"
          >
            {INDIAN_STATES.map(s => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
            City / Town:
          </label>
          <select
            value={selectedCity}
            onChange={(e) => {
              const newCity = e.target.value;
              onCityChange(newCity);
              const cData = CITIES_DATA[newCity];
              if (cData && cData.localities.length > 0) {
                onLocalityChange(cData.localities[0].name, cData.localities[0].coordinates);
              }
            }}
            className="w-full text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none"
          >
            {Object.keys(CITIES_DATA).map(cityName => (
              <option key={cityName} value={cityName}>{cityName}</option>
            ))}
          </select>
        </div>

        {/* Locality */}
        <div>
          <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
            Locality / Area:
          </label>
          <select
            value={selectedLocality}
            onChange={(e) => {
              const locName = e.target.value;
              const foundLoc = cityData?.localities.find(l => l.name === locName);
              onLocalityChange(locName, foundLoc?.coordinates);
            }}
            className="w-full text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none"
          >
            {cityData?.localities.map(l => (
              <option key={l.name} value={l.name}>{l.name}</option>
            )) || <option value="">Select city first</option>}
          </select>
        </div>
      </div>

      {/* Proximity Radius Slider & GPS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 font-mono text-[11px]">Radius:</span>
          <div className="flex items-center gap-1">
            {radii.map(r => (
              <button
                key={r}
                onClick={() => onRadiusChange(r)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                  currentRadius === r
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 font-bold'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {r}km
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDetectGps}
          disabled={isGpsLoading}
          className="px-2.5 py-1 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded border border-zinc-200 dark:border-zinc-700 flex items-center gap-1 transition-colors"
        >
          <Navigation className="w-3 h-3 text-accent-500" />
          <span>{isGpsLoading ? 'Detecting...' : 'Detect Near Me (GPS)'}</span>
        </button>
      </div>

      {gpsMessage && (
        <p className="text-[11px] text-zinc-500 italic font-mono pt-1">
          {gpsMessage}
        </p>
      )}
    </div>
  );
}
