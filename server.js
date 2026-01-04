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
}

// Database connection interface (for Deno KV or similar)
export interface Database {
  players: Map<string, Player>;
  rooms: Map<string, Room>;
  payments: Map<string, Payment>;
}

// Connection manager interface
export interface ConnectionManager {
  clients: Map<string, WebSocketClient>;
  rooms: Map<string, Set<string>>; // roomId -> Set of playerIds
  admins: Set<string>;
}

// Game state interface
export interface GameState {
  calledNumbers: number[];
  winners: Winner[];
  isActive: boolean;
  lastCalled?: number;
}

// Broadcast message interface
export interface BroadcastMessage {
  type: string;
  roomId: string;
  data: any;
  timestamp: number;
}

// Error response interface
export interface ErrorResponse {
  type: 'error';
  message: string;
  code?: string;
  timestamp: number;
}

// Success response interface
export interface SuccessResponse {
  type: 'success';
  message: string;
  data?: any;
  timestamp: number;
}

// Join room request interface
export interface JoinRoomRequest {
  type: 'join';
  roomId: string;
  playerId: string;
  name: string;
  phone: string;
  stake: number;
}

// Mark number request interface
export interface MarkNumberRequest {
  type: 'mark';
  number: number;
  playerId: string;
  roomId: string;
}

// Call number request interface (admin only)
export interface CallNumberRequest {
  type: 'call';
  number: number;
  roomId: string;
  adminId: string;
}

// Create room request interface
export interface CreateRoomRequest {
  type: 'create';
  gameType: string;
  stake: number;
  adminId: string;
}

// Leave room request interface
export interface LeaveRoomRequest {
  type: 'leave';
  playerId: string;
  roomId: string;
}

// Ping/Pong interface for keep-alive
export interface HeartbeatMessage {
  type: 'ping' | 'pong';
  timestamp: number;
  playerId?: string;
}
