import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, TrendingUp, Sparkles } from "lucide-react";
import { getIconicSongsForDecade } from "@/utils/mockData";

interface DecadePanelProps {
  decade: number;
}

export const DecadePanel = ({ decade }: DecadePanelProps) => {
  const songs = getIconicSongsForDecade(decade);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card h-full">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-semibold">
          Your Sound in the {decade}s
        </h2>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-gradient-primary text-primary-foreground">
                <Music className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {song.name}
                </h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Energy: {(song.energy * 100).toFixed(0)}%
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Valence: {(song.valence * 100).toFixed(0)}%
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Dance: {(song.danceability * 100).toFixed(0)}%
                  </Badge>
                </div>

                {song.insight && (
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    {song.insight && (
  <p className="mt-4 text-sm font-medium text-primary">
    “{song.insight}”
  </p>
)}

                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
