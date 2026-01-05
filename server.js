// WebSocket client interface for Deno
export interface WebSocketClient {
  id: string;
  socket: WebSocket;
  playerId?: string;
  isAdmin?: boolean;
  deviceInfo?: Record<string, unknown>;
  lastPing?: number;
  lastPong?: number;
  roomId?: string;
  isAlive: boolean;
}

// Player interface (serializable for Deno KV)
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
  joinedAt: string; // ISO string for serialization
  roomId: string | null;
  markedNumbers: number[]; // Array instead of Set for serialization
  lastActive?: string; // ISO string for serialization
  isConnected: boolean;
  tickets?: Ticket[];
  connectionId?: string;
}

// Room interface (serializable for Deno KV)
export interface Room {
  id: string;
  gameType: string;
  stake: number;
  players: string[]; // Array of player IDs instead of Set
  admin: string | null; // Admin player ID
  active: boolean;
  calledNumbers: number[];
  winners: Winner[];
  createdAt: string; // ISO string for serialization
  startedAt?: string; // ISO string for serialization
  endedAt?: string; // ISO string for serialization
  maxPlayers: number;
  currentNumber?: number;
  isPublic: boolean;
  password?: string;
}

// Winner interface (serializable for Deno KV)
export interface Winner {
  playerId: string;
  name: string;
  pattern: string;
  amount: number;
  timestamp: string; // ISO string for serialization
  winningNumbers?: number[];
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
  maxPlayersPerRoom: number;
  ticketPriceMultiplier: number;
  minStake: number;
  maxStake: number;
}

// Message interface for WebSocket communication
export interface WebSocketMessage {
  type: string;
  data?: unknown;
  timestamp: number;
  requestId?: string;
}

// Admin command interface
export interface AdminCommand {
  command: string;
  data?: unknown;
  timestamp: string; // ISO string for serialization
  adminId: string;
  roomId?: string;
}

// Payment interface (serializable for Deno KV)
export interface Payment {
  id: string;
  playerId: string;
  amount: number;
  method: 'upi' | 'card' | 'wallet' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  timestamp: string; // ISO string for serialization
  referenceId?: string;
}

// Deno KV storage structure
export interface KVStorage {
  players: Deno.KvKey;
  rooms: Deno.KvKey;
  payments: Deno.KvKey;
  connections: Deno.KvKey;
  gameState: Deno.KvKey;
}

// Server configuration for Deno deployment
export interface ServerConfig {
  port: number;
  hostname: string;
  certFile?: string;
  keyFile?: string;
  maxConnections: number;
  pingInterval: number;
  connectionTimeout: number;
  allowOrigins: string[];
  enableCORS: boolean;
  kvPath?: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// Connection manager for real-time WebSocket handling
export interface ConnectionManager {
  clients: Map<string, WebSocketClient>;
  playerConnections: Map<string, string>; // playerId -> connectionId
  roomConnections: Map<string, Set<string>>; // roomId -> Set of connectionIds
}

// Ticket interface for Housie game
export interface Ticket {
  id: string;
  playerId: string;
  roomId: string;
  numbers: number[][]; // 3x9 grid
  marked: boolean[][]; // 3x9 grid
  layout: number[][]; // positions of numbers
  createdAt: string; // ISO string for serialization
  isClaimed: boolean;
}

// Game patterns with serializable structure
export interface GamePattern {
  name: string;
  description: string;
  positions: number[][];
  winMultiplier: number;
  minNumbers: number;
}

// Room status for broadcasting
export interface RoomStatus {
  roomId: string;
  gameType: string;
  stake: number;
  activePlayers: number;
  totalPlayers: number;
  calledNumbers: number[];
  currentNumber?: number;
  gameStarted: boolean;
  gameEnded: boolean;
  winners: Winner[];
  adminOnline: boolean;
  maxPlayers: number;
  remainingNumbers: number[];
}

// Player statistics
export interface PlayerStats {
  playerId: string;
  name: string;
  totalGames: number;
  gamesWon: number;
  totalWon: number;
  totalPaid: number;
  winRate: number;
  favoriteGame: string;
  lastPlayed: string; // ISO string
  currentBalance: number;
}

// WebSocket message types for type safety
export type WebSocketMessageType = 
  | 'JOIN_ROOM'
  | 'LEAVE_ROOM'
  | 'MARK_NUMBER'
  | 'CALL_NUMBER'
  | 'CREATE_ROOM'
  | 'START_GAME'
  | 'END_GAME'
  | 'PING'
  | 'PONG'
  | 'ERROR'
  | 'SUCCESS'
  | 'ROOM_UPDATE'
  | 'PLAYER_UPDATE'
  | 'NUMBER_CALLED'
  | 'WINNER_DECLARED'
  | 'ADMIN_COMMAND'
  | 'PAYMENT_REQUEST'
  | 'PAYMENT_CONFIRM'
  | 'BALANCE_UPDATE'
  | 'TICKET_GENERATED'
  | 'GAME_STATE_UPDATE';

// Authentication payload
export interface AuthPayload {
  playerId: string;
  name: string;
  phone: string;
  isAdmin: boolean;
  token?: string;
  expiresIn: number;
}

// Join room request
export interface JoinRoomRequest {
  type: 'JOIN_ROOM';
  roomId: string;
  playerId: string;
  name: string;
  phone: string;
  stake: number;
  paymentMethod: string;
  authToken?: string;
}

// Create room request
export interface CreateRoomRequest {
  type: 'CREATE_ROOM';
  gameType: string;
  stake: number;
  adminId: string;
  maxPlayers?: number;
  roomName?: string;
  isPublic?: boolean;
  password?: string;
}

// Game state for persistence
export interface GameState {
  roomId: string;
  calledNumbers: number[];
  winners: Winner[];
  isActive: boolean;
  currentNumber?: number;
  startedAt?: string; // ISO string
  endedAt?: string; // ISO string
  remainingNumbers: number[];
  nextNumberTime?: string; // ISO string
}

// Deno KV utility functions
export interface KVUtils {
  savePlayer: (player: Player) => Promise<void>;
  getPlayer: (playerId: string) => Promise<Player | null>;
  saveRoom: (room: Room) => Promise<void>;
  getRoom: (roomId: string) => Promise<Room | null>;
  savePayment: (payment: Payment) => Promise<void>;
  getPlayerPayments: (playerId: string) => Promise<Payment[]>;
}

// CORS configuration
export interface CORSConfig {
  origin: string[];
  methods: string[];
  allowedHeaders: string[];
  credentials: boolean;
}

// HTTP response format
export interface HTTPResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// WebSocket error response
export interface WebSocketError {
  type: 'ERROR';
  code: string;
  message: string;
  timestamp: number;
  requestId?: string;
}

// WebSocket success response
export interface WebSocketSuccess<T = unknown> {
  type: 'SUCCESS';
  message: string;
  data?: T;
  timestamp: number;
  requestId?: string;
}

// Heartbeat check
export interface HeartbeatCheck {
  lastPing: number;
  lastPong: number;
  timeout: number;
  isAlive: boolean;
}

// Rate limiting
export interface RateLimit {
  playerId: string;
  requests: number;
  windowStart: number;
  windowSize: number;
}
