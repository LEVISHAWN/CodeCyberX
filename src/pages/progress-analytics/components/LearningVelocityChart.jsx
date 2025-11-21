import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LearningVelocityChart = () => {
  const velocityData = [
    { date: '2024-09-01', hours: 2.5, modules: 1 },
    { date: '2024-09-03', hours: 4.2, modules: 2 },
    { date: '2024-09-05', hours: 3.8, modules: 1 },
    { date: '2024-09-07', hours: 5.1, modules: 3 },
    { date: '2024-09-09', hours: 2.9, modules: 1 },
    { date: '2024-09-11', hours: 6.3, modules: 2 },
    { date: '2024-09-13', hours: 4.7, modules: 2 },
    { date: '2024-09-15', hours: 3.4, modules: 1 },
    { date: '2024-09-17', hours: 7.2, modules: 4 },
    { date: '2024-09-19', hours: 5.8, modules: 2 },
    { date: '2024-09-21', hours: 4.1, modules: 2 },
    { date: '2024-09-23', hours: 6.9, modules: 3 },
    { date: '2024-09-25', hours: 3.6, modules: 1 },
    { date: '2024-09-27', hours: 8.1, modules: 4 },
    { date: '2024-09-29', hours: 5.4, modules: 2 },
    { date: '2024-10-01', hours: 4.8, modules: 2 },
    { date: '2024-10-03', hours: 7.3, modules: 3 },
    { date: '2024-10-05', hours: 6.1, modules: 3 },
    { date: '2024-10-07', hours: 5.7, modules: 2 },
    { date: '2024-10-09', hours: 4.9, modules: 2 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">{formatDate(label)}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">
              Hours: <span className="font-medium">{payload?.[0]?.value}</span>
            </p>
            <p className="text-sm text-secondary">
              Modules: <span className="font-medium">{payload?.[1]?.value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Learning Velocity</h3>
          <p className="text-sm text-muted-foreground">Daily hours and modules completed over time</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Modules</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={velocityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="modules" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LearningVelocityChart;