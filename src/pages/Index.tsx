import { useState } from "react";
import { Header } from "@/components/Header";
import { FilterPanel } from "@/components/FilterPanel";
import { EmotionScatter } from "@/components/visualizations/EmotionScatter";
import { GenreTrends } from "@/components/visualizations/GenreTrends";
import { DecadePanel } from "@/components/visualizations/DecadePanel";
import { KPIMetrics } from "@/components/visualizations/KPIMetrics";

export interface FilterState {
  decade: number;
  genre: string;
  artistQuery: string;
  popMin: number;
  colorMode: "danceability" | "energy" | "acousticness" | "genre" | "year";
}

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    decade: 2020,
    genre: "All",
    artistQuery: "",
    popMin: 0,
    colorMode: "danceability",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            A Century of Sound
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore 100 years of musical emotion through interactive data visualization
          </p>
        </div>

        <KPIMetrics filters={filters} />

        <FilterPanel filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <EmotionScatter filters={filters} />
          </div>
          <div>
            <DecadePanel decade={filters.decade} />
          </div>
        </div>

        <GenreTrends filters={filters} />
      </main>
    </div>
  );
};

export default Index;
