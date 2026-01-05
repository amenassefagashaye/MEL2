// WebSocket client interface
export interface WebSocketClient extends WebSocket {
  playerId?: string;
  isAdmin?: boolean;
  deviceInfo?: any;
  lastPing?: number;
  lastPong?: number;
}

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
  [key: string]: any;
}

// Admin command interface
export interface AdminCommand {
  command: string;
  data?: any;
  timestamp: Date;
}

// Payment interface
export interface Payment {
  playerId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;