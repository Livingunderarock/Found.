'use client';

import React from 'react';
import { TalentScoreBreakdown } from '@/types';
import { useApp } from '@/context/AppContext';

interface TalentRadarProps {
  scores: TalentScoreBreakdown;
  size?: number;
  interactive?: boolean;
}

export function TalentRadar({ scores, size = 320 }: TalentRadarProps) {
  const { theme, language } = useApp();
  const isDark = theme === 'dark';

  const categories = [
    { label: language === 'kn' ? 'ಶೈಕ್ಷಣಿಕ' : 'Academics', key: 'academics', value: scores.academics },
    { label: language === 'kn' ? 'ತಂತ್ರಜ್ಞಾನ' : 'STEM & Tech', key: 'stem', value: scores.stem },
    { label: language === 'kn' ? 'ಪ್ರಾಯೋಗಿಕ' : 'Practical Dev', key: 'practicalInnovation', value: scores.practicalInnovation },
    { label: language === 'kn' ? 'ನಾಯಕತ್ವ' : 'Leadership', key: 'leadership', value: scores.leadership },
    { label: language === 'kn' ? 'ಸಂವಹನ' : 'Communication', key: 'communication', value: scores.communication },
    { label: language === 'kn' ? 'ಕಲೆ' : 'Arts & Creative', key: 'arts', value: scores.arts },
    { label: language === 'kn' ? 'ಕ್ರೀಡೆ' : 'Sports & Agility', key: 'sports', value: scores.sports },
  ];

  const totalAxes = categories.length;
  const center = size / 2;
  const radius = (size / 2) - 45;

  const points = categories.map((cat, i) => {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const r = (cat.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label: cat.label, value: cat.value, angle };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');
  const gridLevels = [0.25, 0.5, 0.75, 1];

  const strokeGridColor = isDark ? '#27272A' : '#E4E4E7';
  const labelTextColor = isDark ? '#E4E4E7' : '#09090B';
  const polygonFill = isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)';
  const polygonStroke = isDark ? '#818CF8' : '#4F46E5';

  return (
    <div className="flex flex-col items-center">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Concentric Polygons */}
        {gridLevels.map((level, idx) => {
          const gridPoints = categories.map((_, i) => {
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const r = level * radius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ');

          return (
            <g key={idx}>
              <polygon
                points={gridPoints}
                fill="none"
                stroke={strokeGridColor}
                strokeWidth={idx === 3 ? 1.5 : 1}
                strokeDasharray={idx === 3 ? 'none' : '3 3'}
              />
              <text
                x={center + 4}
                y={center - (level * radius) + 12}
                fill={isDark ? '#71717A' : '#A1A1AA'}
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axes Lines */}
        {categories.map((_, i) => {
          const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke={strokeGridColor}
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Student Radar Shape */}
        <polygon
          points={polygonPath}
          fill={polygonFill}
          stroke={polygonStroke}
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Vertex Dots */}
        {points.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="4.5"
            fill={isDark ? '#FFFFFF' : '#09090B'}
            stroke={polygonStroke}
            strokeWidth="2"
          />
        ))}

        {/* Axis Labels */}
        {points.map((pt, i) => {
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(pt.angle);
          const ly = center + labelDist * Math.sin(pt.angle) + 4;
          const textAnchor = Math.abs(pt.angle + Math.PI / 2) < 0.1 || Math.abs(pt.angle - Math.PI / 2) < 0.1 
            ? 'middle' 
            : Math.cos(pt.angle) > 0 ? 'start' : 'end';

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor={textAnchor}
              fill={labelTextColor}
              fontSize="10"
              fontWeight="600"
            >
              {pt.label}
              <tspan fill="#6366F1" dx="3" fontWeight="bold">
                {pt.value}%
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
