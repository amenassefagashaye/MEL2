// WebSocket client interface for Deno
export interface WebSocketClient {
  socket: WebSocket;
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

// Database connection interface for Deno KV
export interface Database {
  players: Map<string, Player>;
  rooms: Map<string, Room>;
  payments: Map<string, Payment>;
  kv?: Deno.Kv; // Optional Deno KV instance
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

// WebSocket message handler type for Deno
export type WebSocketMessageHandler = (
  ws: WebSocket,
  data: string | Uint8Array,
  client: WebSocketClient
) => Promise<void> | void;

// WebSocket event handlers for Deno
export interface WebSocketHandlers {
  onOpen?: (ws: WebSocket, client: WebSocketClient) => void;
  onMessage?: WebSocketMessageHandler;
  onClose?: (ws: WebSocket, client: WebSocketClient) => void;
  onError?: (ws: WebSocket, error: Error, client: WebSocketClient) => void;
}

// Server configuration for Deno
export interface ServerConfig {
  port: number;
  hostname?: string;
  certFile?: string;
  keyFile?: string;
  maxConnections?: number;
  pingInterval?: number;
  timeout?: number;
}

// Authentication token interface
export interface AuthToken {
  playerId: string;
  name: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

// Room creation options
export interface RoomOptions {
  gameType: string;
  stake: number;
  maxPlayers?: number;
  password?: string;
  isPrivate?: boolean;
}

// Player statistics
export interface PlayerStats {
  totalGames: number;
  gamesWon: number;
  totalWon: number;
  totalPaid: number;
  winRate: number;
  favoriteGame: string;
}

// Game pattern interface
export interface GamePattern {
  name: string;
  description: string;
  positions: number[][]; // Coordinates or positions on the ticket
}

// Ticket interface for Housie/Tambola
export interface Ticket {
  id: string;
  playerId: string;
  roomId: string;
  numbers: number[][]; // 3x9 grid with numbers
  marked: boolean[][]; // 3x9 grid for marked numbers
  createdAt: Date;
}
