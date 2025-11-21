import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceKPIs = () => {
  const kpiData = [
    {
      id: 1,
      title: "Total Learning Hours",
      value: "127.5",
      unit: "hours",
      change: "+12.3%",
      changeType: "positive",
      icon: "Clock",
      description: "This month"
    },
    {
      id: 2,
      title: "Modules Completed",
      value: "24",
      unit: "modules",
      change: "+8",
      changeType: "positive",
      icon: "BookOpen",
      description: "Out of 32 total"
    },
    {
      id: 3,
      title: "Current Streak",
      value: "15",
      unit: "days",
      change: "Personal best",
      changeType: "neutral",
      icon: "Zap",
      description: "Keep it up!"
    },
    {
      id: 4,
      title: "Skill Progression",
      value: "78",
      unit: "%",
      change: "+5.2%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "Overall progress"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData?.map((kpi) => (
        <div key={kpi?.id} className="bg-card border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-primary/10`}>
              <Icon name={kpi?.icon} size={20} color="var(--color-primary)" />
            </div>
            <span className={`text-sm font-medium ${getChangeColor(kpi?.changeType)}`}>
              {kpi?.change}
            </span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi?.title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">{kpi?.value}</span>
              <span className="text-sm text-muted-foreground">{kpi?.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">{kpi?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceKPIs;