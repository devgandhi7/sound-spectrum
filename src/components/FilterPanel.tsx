import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Sliders } from "lucide-react";
import { FilterState } from "@/pages/Index";

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterPanel = ({ filters, setFilters }: FilterPanelProps) => {
  const decades = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const genres = ["All", "Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Electronic", "R&B"];
  const colorModes = [
    { value: "danceability", label: "Danceability" },
    { value: "energy", label: "Energy" },
    { value: "acousticness", label: "Acousticness" },
    { value: "genre", label: "Genre" },
    { value: "year", label: "Year" },
  ];

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Filters & Controls</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Decade Slider */}
        <div className="space-y-3">
          <Label>Decade: {filters.decade}s</Label>
          <Slider
            value={[decades.indexOf(filters.decade)]}
            onValueChange={(value) =>
              setFilters({ ...filters, decade: decades[value[0]] })
            }
            max={decades.length - 1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1930s</span>
            <span>2020s</span>
          </div>
        </div>

        {/* Genre Select */}
        <div className="space-y-3">
          <Label>Genre</Label>
          <Select
            value={filters.genre}
            onValueChange={(value) => setFilters({ ...filters, genre: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Mode Select */}
        <div className="space-y-3">
          <Label>Color By</Label>
          <Select
            value={filters.colorMode}
            onValueChange={(value: any) =>
              setFilters({ ...filters, colorMode: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Artist Search */}
        <div className="space-y-3">
          <Label>Search Artist</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search artists..."
              value={filters.artistQuery}
              onChange={(e) =>
                setFilters({ ...filters, artistQuery: e.target.value })
              }
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
