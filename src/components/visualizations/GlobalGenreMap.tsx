import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Music, TrendingUp, Activity } from "lucide-react";
import { getRegionData } from "@/utils/mockData";

type MapMode = "genre" | "popularity" | "energy" | "danceability";

export const GlobalGenreMap = () => {
  const [mapMode, setMapMode] = useState<MapMode>("genre");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regionData = getRegionData();

  const getColorForMode = (region: any, mode: MapMode) => {
    switch (mode) {
      case "genre":
        const genreColors: Record<string, string> = {
          Pop: "bg-chart-cyan",
          Rock: "bg-chart-magenta",
          "Hip-Hop": "bg-chart-lime",
          Electronic: "bg-chart-orange",
          Jazz: "bg-chart-pink",
          Classical: "bg-primary",
          "R&B": "bg-secondary",
        };
        return genreColors[region.dominantGenre] || "bg-muted";
      case "popularity":
        return region.popularity > 70 ? "bg-chart-lime" : region.popularity > 40 ? "bg-chart-cyan" : "bg-muted";
      case "energy":
        return region.avgEnergy > 0.7 ? "bg-chart-orange" : region.avgEnergy > 0.5 ? "bg-chart-magenta" : "bg-muted";
      case "danceability":
        return region.avgDanceability > 0.7 ? "bg-chart-lime" : region.avgDanceability > 0.5 ? "bg-primary" : "bg-muted";
    }
  };

  const continents = {
    "North America": ["USA", "Canada", "Mexico"],
    "South America": ["Brazil", "Argentina", "Colombia"],
    "Europe": ["UK", "Germany", "France", "Spain", "Italy", "Sweden"],
    "Asia": ["Japan", "South Korea", "India", "China"],
    "Africa": ["South Africa", "Nigeria", "Egypt"],
    "Oceania": ["Australia", "New Zealand"],
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Global Genre Map</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Explore musical trends across regions worldwide
          </p>
        </div>
        
        <div className="w-48">
          <Select value={mapMode} onValueChange={(value: MapMode) => setMapMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genre">Genre Dominance</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="energy">Energy Level</SelectItem>
              <SelectItem value="danceability">Danceability</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Grid */}
      <div className="space-y-6 mb-6">
        {Object.entries(continents).map(([continent, countries]) => (
          <div key={continent} className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {continent}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {countries.map((country) => {
                const region = regionData.find((r) => r.country === country);
                if (!region) return null;

                const colorClass = getColorForMode(region, mapMode);
                const isSelected = selectedRegion === country;

                return (
                  <button
                    key={country}
                    onClick={() => setSelectedRegion(selectedRegion === country ? null : country)}
                    className={`
                      relative p-4 rounded-lg border-2 transition-all hover:scale-105
                      ${isSelected ? "border-primary shadow-glow" : "border-border hover:border-primary/50"}
                      ${colorClass} bg-opacity-20 backdrop-blur-sm
                    `}
                  >
                    <div className="space-y-1">
                      <div className={`w-full h-2 rounded-full ${colorClass}`} />
                      <p className="text-xs font-semibold text-foreground">{country}</p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {mapMode === "genre" && region.dominantGenre}
                        {mapMode === "popularity" && `Pop: ${region.popularity}`}
                        {mapMode === "energy" && `Energy: ${(region.avgEnergy * 100).toFixed(0)}%`}
                        {mapMode === "danceability" && `Dance: ${(region.avgDanceability * 100).toFixed(0)}%`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Region Detail Panel */}
      {selectedRegion && (
        <div className="p-4 rounded-lg bg-muted/50 border border-primary/50 animate-in fade-in slide-in-from-bottom-2">
          {(() => {
            const region = regionData.find((r) => r.country === selectedRegion);
            if (!region) return null;

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{region.country}</h3>
                  <Badge variant="outline" className="bg-gradient-primary text-primary-foreground border-0">
                    {region.dominantGenre}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Music className="w-3 h-3" />
                      <span>Popularity</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">{region.popularity}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>Energy</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">
                      {(region.avgEnergy * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Activity className="w-3 h-3" />
                      <span>Danceability</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">
                      {(region.avgDanceability * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Music className="w-3 h-3" />
                      <span>Total Streams</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">
                      {(region.totalStreams / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Top Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {region.topGenres.map((genre, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Legend</p>
        <div className="flex flex-wrap gap-3">
          {mapMode === "genre" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-cyan" />
                <span className="text-xs text-muted-foreground">Pop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-magenta" />
                <span className="text-xs text-muted-foreground">Rock</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-lime" />
                <span className="text-xs text-muted-foreground">Hip-Hop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-orange" />
                <span className="text-xs text-muted-foreground">Electronic</span>
              </div>
            </>
          )}
          {mapMode !== "genre" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-lime" />
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-chart-cyan" />
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted" />
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
