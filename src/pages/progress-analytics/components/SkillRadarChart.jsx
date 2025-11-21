import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const SkillsRadarChart = () => {
  const skillsData = [
    { skill: 'Python', current: 85, target: 90 },
    { skill: 'JavaScript', current: 78, target: 85 },
    { skill: 'Web Security', current: 72, target: 80 },
    { skill: 'Cryptography', current: 65, target: 75 },
    { skill: 'Network Security', current: 58, target: 70 },
    { skill: 'Penetration Testing', current: 45, target: 60 },
    { skill: 'Secure Coding', current: 82, target: 90 },
    { skill: 'Vulnerability Assessment', current: 68, target: 75 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skills Proficiency</h3>
          <p className="text-sm text-muted-foreground">Current vs target skill levels across domains</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary/60 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Target"
              dataKey="target"
              stroke="var(--color-secondary)"
              fill="var(--color-secondary)"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillsData?.slice(0, 4)?.map((skill, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-foreground">{skill?.skill}</div>
            <div className="text-xs text-muted-foreground">
              {skill?.current}% / {skill?.target}%
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${skill?.current}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadarChart;