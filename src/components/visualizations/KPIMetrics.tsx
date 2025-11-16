import { Card } from "@/components/ui/card";
import { TrendingUp, Music, Zap, Heart, Palette, Target, AlertCircle, Activity } from "lucide-react";
import { FilterState } from "@/pages/Index";

interface KPIMetricsProps {
  filters: FilterState;
}

export const KPIMetrics = ({ filters }: KPIMetricsProps) => {
  // Mock KPI data - in production, this would be calculated from actual data
  const kpis = [
    {
      label: "Avg Energy",
      value: "71%",
      change: "+5.2%",
      icon: Zap,
      color: "text-chart-cyan",
    },
    {
      label: "Avg Valence",
      value: "64%",
      change: "-2.1%",
      icon: Heart,
      color: "text-chart-magenta",
    },
    {
      label: "Danceability",
      value: "68%",
      change: "+3.8%",
      icon: Activity,
      color: "text-chart-lime",
    },
    {
      label: "Total Tracks",
      value: "2,847",
      change: "+12.4%",
      icon: Music,
      color: "text-chart-orange",
    },
    {
      label: "Genre Diversity",
      value: "8",
      change: "Active genres",
      icon: Palette,
      color: "text-chart-pink",
    },
    {
      label: "Correlation",
      value: "0.73",
      change: "Energy-Dance",
      icon: Target,
      color: "text-primary",
    },
    {
      label: "Avg Popularity",
      value: "62",
      change: "+8.4%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Outliers",
      value: "47",
      change: "Unique tracks",
      icon: AlertCircle,
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <Card
            key={index}
            className="p-6 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-glow transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-accent mt-2">{kpi.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-muted/50 ${kpi.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
