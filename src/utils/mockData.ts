import { FilterState } from "@/pages/Index";

export interface TrackData {
  name: string;
  artist: string;
  energy: number;
  valence: number;
  danceability: number;
  acousticness: number;
  year: number;
  genre: string;
  popularity: number;
}

export interface GenreTrendData {
  genre: string;
  decade: number;
  avgValence: number;
  avgEnergy: number;
  avgDanceability: number;
}

export interface IconicSong {
  name: string;
  artist: string;
  energy: number;
  valence: number;
  danceability: number;
  insight?: string;
}

// Generate mock track data based on filters
export const generateMockTrackData = (filters: FilterState): TrackData[] => {
  const genres = filters.genre === "All" 
    ? ["Pop", "Rock", "Hip-Hop", "Jazz", "Electronic", "R&B"]
    : [filters.genre];
  
  const tracks: TrackData[] = [];
  const count = 200;

  for (let i = 0; i < count; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const year = filters.decade + Math.floor(Math.random() * 10);
    
    tracks.push({
      name: `Track ${i + 1}`,
      artist: `Artist ${Math.floor(Math.random() * 50) + 1}`,
      energy: Math.random(),
      valence: Math.random(),
      danceability: Math.random(),
      acousticness: Math.random(),
      year,
      genre,
      popularity: Math.floor(Math.random() * 100),
    });
  }

  return tracks;
};

// Generate genre trend data
export const generateGenreTrendData = (): GenreTrendData[] => {
  const genres = ["Pop", "Rock", "Hip-Hop", "Jazz", "Electronic"];
  const decades = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const data: GenreTrendData[] = [];

  genres.forEach(genre => {
    decades.forEach(decade => {
      // Create realistic trends based on genre and decade
      let baseValence = 0.5;
      let trend = 0;
      
      if (genre === "Pop") {
        baseValence = 0.65;
        trend = (decade - 1930) * 0.002;
      } else if (genre === "Rock") {
        baseValence = 0.55;
        trend = decade >= 1960 ? (decade - 1960) * 0.003 : 0;
      } else if (genre === "Hip-Hop") {
        baseValence = 0.6;
        trend = decade >= 1980 ? (decade - 1980) * 0.004 : 0;
      } else if (genre === "Jazz") {
        baseValence = 0.7;
        trend = -(decade - 1930) * 0.001;
      } else if (genre === "Electronic") {
        baseValence = 0.58;
        trend = decade >= 1980 ? (decade - 1980) * 0.005 : 0;
      }

      data.push({
        genre,
        decade,
        avgValence: Math.min(Math.max(baseValence + trend + (Math.random() - 0.5) * 0.1, 0.3), 0.9),
        avgEnergy: Math.random() * 0.4 + 0.5,
        avgDanceability: Math.random() * 0.4 + 0.4,
      });
    });
  });

  return data;
};

// Get iconic songs for a decade
export interface GenreDistributionData {
  genre: string;
  count: number;
}

export interface PopularityDistributionData {
  bin: string;
  count: number;
}

export interface RegionData {
  country: string;
  dominantGenre: string;
  popularity: number;
  avgEnergy: number;
  avgDanceability: number;
  totalStreams: number;
  topGenres: string[];
}

// Get genre distribution for filters
export const getGenreDistribution = (filters: FilterState): GenreDistributionData[] => {
  const genres = ["Pop", "Rock", "Hip-Hop", "Jazz", "Electronic", "R&B", "Classical", "Country"];
  
  return genres.map(genre => ({
    genre,
    count: Math.floor(Math.random() * 300) + 100,
  })).sort((a, b) => b.count - a.count);
};

// Get popularity distribution for filters
export const getPopularityDistribution = (filters: FilterState): PopularityDistributionData[] => {
  const bins = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"];
  
  return bins.map(bin => ({
    bin,
    count: Math.floor(Math.random() * 200) + 50,
  }));
};

// Get region data for map
export const getRegionData = (): RegionData[] => {
  const countries = [
    "USA", "Canada", "Mexico", "Brazil", "Argentina", "Colombia",
    "UK", "Germany", "France", "Spain", "Italy", "Sweden",
    "Japan", "South Korea", "India", "China",
    "South Africa", "Nigeria", "Egypt",
    "Australia", "New Zealand"
  ];
  
  const genres = ["Pop", "Rock", "Hip-Hop", "Jazz", "Electronic", "R&B", "Classical"];
  
  return countries.map(country => {
    const dominantGenre = genres[Math.floor(Math.random() * genres.length)];
    const topGenres = [
      dominantGenre,
      genres[Math.floor(Math.random() * genres.length)],
      genres[Math.floor(Math.random() * genres.length)]
    ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    
    return {
      country,
      dominantGenre,
      popularity: Math.floor(Math.random() * 40) + 60,
      avgEnergy: Math.random() * 0.3 + 0.5,
      avgDanceability: Math.random() * 0.3 + 0.5,
      totalStreams: Math.floor(Math.random() * 500000000) + 100000000,
      topGenres,
    };
  });
};

export const getIconicSongsForDecade = (decade: number): IconicSong[] => {
  const songsByDecade: Record<number, IconicSong[]> = {
    1930: [
      { name: "Summertime", artist: "George Gershwin", energy: 0.3, valence: 0.7, danceability: 0.5, insight: "A jazz standard that defined the era" },
      { name: "Over the Rainbow", artist: "Judy Garland", energy: 0.4, valence: 0.8, danceability: 0.4, insight: "Hopeful anthem of the Great Depression" },
      { name: "Sing, Sing, Sing", artist: "Benny Goodman", energy: 0.8, valence: 0.7, danceability: 0.9, insight: "The swing era's most energetic hit" },
    ],
    1940: [
      { name: "In the Mood", artist: "Glenn Miller", energy: 0.8, valence: 0.8, danceability: 0.9, insight: "WWII morale booster" },
      { name: "White Christmas", artist: "Bing Crosby", energy: 0.3, valence: 0.9, danceability: 0.3, insight: "Best-selling single of all time" },
      { name: "Boogie Woogie Bugle Boy", artist: "Andrews Sisters", energy: 0.9, valence: 0.8, danceability: 0.9, insight: "High-energy wartime classic" },
    ],
    1950: [
      { name: "Rock Around the Clock", artist: "Bill Haley", energy: 0.9, valence: 0.8, danceability: 0.9, insight: "Birth of rock and roll" },
      { name: "Hound Dog", artist: "Elvis Presley", energy: 0.9, valence: 0.7, danceability: 0.8, insight: "Defined the rock revolution" },
      { name: "Johnny B. Goode", artist: "Chuck Berry", energy: 0.95, valence: 0.8, danceability: 0.85, insight: "Blueprint for rock guitar" },
    ],
    1960: [
      { name: "I Want to Hold Your Hand", artist: "The Beatles", energy: 0.8, valence: 0.9, danceability: 0.8, insight: "Sparked Beatlemania" },
      { name: "Respect", artist: "Aretha Franklin", energy: 0.8, valence: 0.7, danceability: 0.75, insight: "Anthem of empowerment" },
      { name: "Good Vibrations", artist: "The Beach Boys", energy: 0.7, valence: 0.9, danceability: 0.7, insight: "Studio innovation peak" },
    ],
    1970: [
      { name: "Bohemian Rhapsody", artist: "Queen", energy: 0.8, valence: 0.6, danceability: 0.5, insight: "Rock opera masterpiece" },
      { name: "Stayin' Alive", artist: "Bee Gees", energy: 0.9, valence: 0.7, danceability: 0.95, insight: "Disco at its peak" },
      { name: "Superstition", artist: "Stevie Wonder", energy: 0.85, valence: 0.8, danceability: 0.9, insight: "Funk perfection" },
    ],
    1980: [
      { name: "Billie Jean", artist: "Michael Jackson", energy: 0.8, valence: 0.6, danceability: 0.95, insight: "Pop innovation peak" },
      { name: "Sweet Child O' Mine", artist: "Guns N' Roses", energy: 0.95, valence: 0.7, danceability: 0.6, insight: "Hard rock anthem" },
      { name: "Like a Prayer", artist: "Madonna", energy: 0.85, valence: 0.8, danceability: 0.9, insight: "Pop meets gospel" },
    ],
    1990: [
      { name: "Smells Like Teen Spirit", artist: "Nirvana", energy: 0.95, valence: 0.4, danceability: 0.6, insight: "Grunge revolution" },
      { name: "Wonderwall", artist: "Oasis", energy: 0.6, valence: 0.7, danceability: 0.5, insight: "Britpop anthem" },
      { name: "Vogue", artist: "Madonna", energy: 0.85, valence: 0.8, danceability: 0.95, insight: "House music mainstream" },
    ],
    2000: [
      { name: "Crazy in Love", artist: "Beyoncé", energy: 0.9, valence: 0.85, danceability: 0.9, insight: "R&B reinvented" },
      { name: "Hey Ya!", artist: "OutKast", energy: 0.95, valence: 0.9, danceability: 0.95, insight: "Genre-defying hit" },
      { name: "Seven Nation Army", artist: "The White Stripes", energy: 0.9, valence: 0.6, danceability: 0.7, insight: "Rock minimalism" },
    ],
    2010: [
      { name: "Rolling in the Deep", artist: "Adele", energy: 0.75, valence: 0.4, danceability: 0.7, insight: "Soul revival" },
      { name: "Get Lucky", artist: "Daft Punk", energy: 0.8, valence: 0.9, danceability: 0.95, insight: "Disco resurgence" },
      { name: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", energy: 0.95, valence: 0.9, danceability: 0.98, insight: "Neo-funk explosion" },
    ],
    2020: [
      { name: "Blinding Lights", artist: "The Weeknd", energy: 0.8, valence: 0.7, danceability: 0.85, insight: "Synthwave revival" },
      { name: "Levitating", artist: "Dua Lipa", energy: 0.85, valence: 0.9, danceability: 0.95, insight: "Modern disco-pop" },
      { name: "As It Was", artist: "Harry Styles", energy: 0.7, valence: 0.6, danceability: 0.75, insight: "Introspective pop" },
    ],
  };

  return songsByDecade[decade] || songsByDecade[2020];
};
