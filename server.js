// WebSocket client type (Deno-safe)
export type WebSocketClient = WebSocket & {
  playerId?: string;
  isAdmin?: boolean;
  deviceInfo?: unknown;
  lastPing?: number;
  lastPong?: number;
};

// Player interface
export interface Player {
  id: string;
  name: string;
  phone: string;
  stake: number;
  gameType: string;
  payment: number;
  wonAmount?: number;
  withdrawn?: number;
  balance?: number;
  joinedAt: Date;
  socket: WebSocketClient;
  roomId: string | null;
  markedNumbers: Set<number>;
  lastActive?: Date;
}

// Room interface
export interface Room {
  id: string;
  gameType: string;
  stake: number;
  players: Set<string>; // Player IDs
  admin: WebSocketClient | null;
  active: boolean;
  calledNumbers: number[];
  winners: Winner[];
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

// Winner interface
export interface Winner {
  playerId: string;
  name: string;
  pattern: string;
  amount: number;
  timestamp: Date;
}

// Game configuration interface
export interface GameConfig {
  gameTypes: string[];
  stakes: number[];
  patterns: {
    [gameType: string]: string[];
  };
  winMultipliers: {
    [gameType: string]: {
      [pattern: string]: number;
    };
  };
}

// Message interface
export interface Message {
  type: string;
  [key: string]: unknown;
}

// Admin command interface
export interface AdminCommand {
  command: string;
  data?: unknown;
  timestamp: Date;
}

// Payment interface
export interface Payment {
  playerId: string;
  amount: number;
  method: string;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
}
