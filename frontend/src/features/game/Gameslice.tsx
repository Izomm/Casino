// src/features/games/gameSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ============================================
// TYPES
// ============================================

export interface Game {
  id: string;
  name: string;
  image: string;
  category: "slots" | "table" | "card" | "live" | "jackpot";
  minBet: number;
  maxBet: number;
  rtp?: number;
  popularity: number;
  isPopular: boolean;
  isNew: boolean;
  jackpot?: number;
  description?: string;
  rules?: string[];
}

export interface GameSession {
  gameId: string;
  gameName: string;
  betAmount: number;
  result: "win" | "lose" | "draw";
  payout: number;
  timestamp: string;
}

export interface GameState {
  games: Game[];
  filteredGames: Game[];
  currentGame: Game | null;
  selectedCategory: string | null;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  history: GameSession[];
  recentGames: GameSession[];
  totalWins: number;
  totalLosses: number;
  totalGamesPlayed: number;
}

// ============================================
// SAMPLE DATA
// ============================================

const sampleGames: Game[] = [
  {
    id: "1",
    name: "Mega Jackpot Slots",
    image: "/assets/images/games/mega-jackpot.jpg",
    category: "slots",
    minBet: 1,
    maxBet: 100,
    rtp: 96.5,
    popularity: 95,
    isPopular: true,
    isNew: false,
    jackpot: 1500000,
    description: "Win the ultimate jackpot with this exciting slot game!",
  },
  {
    id: "2",
    name: "Blackjack Pro",
    image: "/assets/images/games/blackjack.jpg",
    category: "card",
    minBet: 5,
    maxBet: 500,
    rtp: 99.5,
    popularity: 90,
    isPopular: true,
    isNew: false,
    description: "Classic blackjack with professional rules",
  },
  {
    id: "3",
    name: "Roulette Royale",
    image: "/assets/images/games/roulette.jpg",
    category: "table",
    minBet: 1,
    maxBet: 1000,
    rtp: 97.3,
    popularity: 85,
    isPopular: false,
    isNew: true,
    description: "European roulette with exclusive VIP bets",
  },
  {
    id: "4",
    name: "Poker Stars",
    image: "/assets/images/games/poker.jpg",
    category: "card",
    minBet: 10,
    maxBet: 1000,
    rtp: 97.8,
    popularity: 88,
    isPopular: true,
    isNew: false,
    description: "Texas Hold'em with competitive tournaments",
  },
  {
    id: "5",
    name: "Dragon Treasure",
    image: "/assets/images/games/dragon.jpg",
    category: "slots",
    minBet: 1,
    maxBet: 50,
    rtp: 94.2,
    popularity: 78,
    isPopular: false,
    isNew: true,
    jackpot: 500000,
    description: "Uncover the dragon's treasure in this mystical slot",
  },
  {
    id: "6",
    name: "Live Baccarat",
    image: "/assets/images/games/baccarat.jpg",
    category: "live",
    minBet: 25,
    maxBet: 10000,
    rtp: 98.9,
    popularity: 92,
    isPopular: true,
    isNew: false,
    description: "Live dealer baccarat with real-time streaming",
  },
  {
    id: "7",
    name: "Fruit Frenzy",
    image: "/assets/images/games/fruit.jpg",
    category: "slots",
    minBet: 0.5,
    maxBet: 25,
    rtp: 95.7,
    popularity: 70,
    isPopular: false,
    isNew: false,
    description: "Classic fruit machine with a modern twist",
  },
  {
    id: "8",
    name: "VIP Craps",
    image: "/assets/images/games/craps.jpg",
    category: "table",
    minBet: 50,
    maxBet: 5000,
    rtp: 98.6,
    popularity: 75,
    isPopular: false,
    isNew: true,
    description: "High-stakes craps for VIP players",
  },
];

// ============================================
// INITIAL STATE
// ============================================

const initialState: GameState = {
  games: [],
  filteredGames: [],
  currentGame: null,
  selectedCategory: null,
  searchTerm: "",
  isLoading: false,
  error: null,
  history: [],
  recentGames: [],
  totalWins: 0,
  totalLosses: 0,
  totalGamesPlayed: 0,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function filterGames(
  games: Game[],
  category: string | null,
  searchTerm: string
): Game[] {
  let filtered = games;

  if (category) {
    filtered = filtered.filter((g) => g.category === category);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (g) =>
        g.name.toLowerCase().includes(term) ||
        g.category.toLowerCase().includes(term) ||
        g.description?.toLowerCase().includes(term)
    );
  }

  return filtered;
}

// ============================================
// SLICE
// ============================================

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    // -------- LOAD GAMES --------
    loadGamesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadGamesSuccess: (state) => {
      state.games = sampleGames;
      state.filteredGames = sampleGames;
      state.isLoading = false;
      state.error = null;
    },
    loadGamesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // -------- FILTERING --------
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.filteredGames = filterGames(
        state.games,
        action.payload,
        state.searchTerm
      );
    },
    searchGames: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredGames = filterGames(
        state.games,
        state.selectedCategory,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchTerm = "";
      state.filteredGames = state.games;
    },

    // -------- CURRENT GAME --------
    selectGame: (state, action: PayloadAction<string>) => {
      state.currentGame =
        state.games.find((g) => g.id === action.payload) || null;
    },
    clearSelectedGame: (state) => {
      state.currentGame = null;
    },

    // -------- GAME PLAY --------
    playGame: (
      state,
      action: PayloadAction<{ gameId: string; betAmount: number }>
    ) => {
      const { gameId, betAmount } = action.payload;
      const game = state.games.find((g) => g.id === gameId);

      if (!game) return;

      // Simulate game result (50/50 chance for demo)
      const isWin = Math.random() > 0.5;
      const multiplier = Math.random() * 2 + 0.5; // 0.5x to 2.5x
      const payout = isWin ? Math.round(betAmount * multiplier) : 0;

      const session: GameSession = {
        gameId,
        gameName: game.name,
        betAmount,
        result: isWin ? "win" : "lose",
        payout,
        timestamp: new Date().toISOString(),
      };

      // Add to history
      state.history.push(session);
      state.recentGames = [session, ...state.recentGames].slice(0, 10);

      // Update totals
      state.totalGamesPlayed += 1;
      if (isWin) {
        state.totalWins += payout;
      } else {
        state.totalLosses += betAmount;
      }
    },

    // -------- HISTORY --------
    clearHistory: (state) => {
      state.history = [];
      state.recentGames = [];
      state.totalWins = 0;
      state.totalLosses = 0;
      state.totalGamesPlayed = 0;
    },
    removeGameFromHistory: (state, action: PayloadAction<string>) => {
      const index = state.history.findIndex(
        (h) => h.timestamp === action.payload
      );
      if (index !== -1) {
        const removed = state.history[index];
        state.history.splice(index, 1);
        state.recentGames = state.history.slice(0, 10);

        // Adjust totals
        if (removed.result === "win") {
          state.totalWins -= removed.payout;
        } else {
          state.totalLosses -= removed.betAmount;
        }
        state.totalGamesPlayed -= 1;
      }
    },

    // -------- RESET --------
    resetGameState: (state) => {
      state.currentGame = null;
      state.isLoading = false;
      state.error = null;
      state.selectedCategory = null;
      state.searchTerm = "";
      state.filteredGames = state.games;
    },
  },
});

// ============================================
// EXPORT
// ============================================

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
