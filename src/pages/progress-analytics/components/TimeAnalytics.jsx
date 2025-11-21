import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeAnalytics = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const dailyData = [
    { time: '6 AM', hours: 0.5, optimal: true },
    { time: '7 AM', hours: 1.2, optimal: true },
    { time: '8 AM', hours: 2.1, optimal: true },
    { time: '9 AM', hours: 1.8, optimal: true },
    { time: '10 AM', hours: 1.5, optimal: false },
    { time: '11 AM', hours: 0.8, optimal: false },
    { time: '12 PM', hours: 0.3, optimal: false },
    { time: '1 PM', hours: 0.2, optimal: false },
    { time: '2 PM', hours: 0.6, optimal: false },
    { time: '3 PM', hours: 1.1, optimal: false },
    { time: '4 PM', hours: 1.4, optimal: false },
    { time: '5 PM', hours: 1.7, optimal: false },
    { time: '6 PM', hours: 2.3, optimal: true },
    { time: '7 PM', hours: 2.8, optimal: true },
    { time: '8 PM', hours: 2.1, optimal: true },
    { time: '9 PM', hours: 1.6, optimal: true },
    { time: '10 PM', hours: 0.9, optimal: false },
    { time: '11 PM', hours: 0.4, optimal: false }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 8.2, modules: 4 },
    { day: 'Tue', hours: 6.8, modules: 3 },
    { day: 'Wed', hours: 9.1, modules: 5 },
    { day: 'Thu', hours: 7.4, modules: 3 },
    { day: 'Fri', hours: 5.6, modules: 2 },
    { day: 'Sat', hours: 12.3, modules: 6 },
    { day: 'Sun', hours: 10.7, modules: 5 }
  ];

  const monthlyData = [
    { month: 'Jun', hours: 45.2, modules: 18 },
    { month: 'Jul', hours: 52.8, modules: 22 },
    { month: 'Aug', hours: 48.6, modules: 20 },
    { month: 'Sep', hours: 61.3, modules: 26 },
    { month: 'Oct', hours: 38.7, modules: 16 }
  ];

  const recommendations = [
    {
      id: 1,
      type: 'peak',
      title: "Peak Performance Hours",
      description: "You learn best between 6-9 AM and 6-9 PM",
      icon: "TrendingUp",
      action: "Schedule complex topics during these hours"
    },
    {
      id: 2,
      type: 'consistency',
      title: "Consistency Boost",
      description: "Try to maintain 2+ hours daily for better retention",
      icon: "Target",
      action: "Set daily learning reminders"
    },
    {
      id: 3,
      type: 'weekend',
      title: "Weekend Advantage",
      description: "You\'re 40% more productive on weekends",
      icon: "Calendar",
      action: "Plan intensive sessions for Saturdays"
    }
  ];

  const getTabData = () => {
    switch (activeTab) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getDataKey = () => {
    return 'hours';
  };

  const getXAxisKey = () => {
    switch (activeTab) {
      case 'daily':
        return 'time';
      case 'weekly':
        return 'day';
      case 'monthly':
        return 'month';
      default:
        return 'time';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <p className="text-sm text-primary">
            Hours: <span className="font-medium">{payload?.[0]?.value}</span>
          </p>
          {data?.modules && (
            <p className="text-sm text-secondary">
              Modules: <span className="font-medium">{data?.modules}</span>
            </p>
          )}
          {data?.optimal !== undefined && (
            <p className={`text-xs mt-1 ${data?.optimal ? 'text-success' : 'text-muted-foreground'}`}>
              {data?.optimal ? 'Optimal time' : 'Low productivity'}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Time-based Analytics Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Learning Patterns</h3>
            <p className="text-sm text-muted-foreground">Activity distribution across time periods</p>
          </div>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {['daily', 'weekly', 'monthly']?.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getTabData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={getXAxisKey()}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={getDataKey()} 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Learning Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Optimization Recommendations</h3>
            <p className="text-sm text-muted-foreground">AI-powered insights to improve your learning efficiency</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Customize
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations?.map((rec) => (
            <div key={rec?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={rec?.icon} size={18} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1">{rec?.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{rec?.description}</p>
                  <p className="text-xs text-primary font-medium">{rec?.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Comparison */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Peer Comparison</h3>
            <p className="text-sm text-muted-foreground">Anonymous benchmarking with similar learners</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>Privacy protected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">Top 25%</div>
            <div className="text-sm text-muted-foreground mb-2">Learning Hours</div>
            <div className="text-xs text-muted-foreground">You're ahead of 75% of peers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">Top 40%</div>
            <div className="text-sm text-muted-foreground mb-2">Module Completion</div>
            <div className="text-xs text-muted-foreground">Above average progress rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">Top 15%</div>
            <div className="text-sm text-muted-foreground mb-2">Streak Consistency</div>
            <div className="text-xs text-muted-foreground">Exceptional dedication</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAnalytics;