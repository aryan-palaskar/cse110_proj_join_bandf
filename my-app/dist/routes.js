"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const router = express_1.default.Router();
router.get('/lobbies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.connectDB)();
        const lobbies = yield db.all('SELECT * FROM lobbies');
        res.json(lobbies);
    }
    catch (error) {
        console.error('Error retrieving lobbies:', error);
        res.status(500).json({ error: 'Failed to retrieve lobbies' });
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lobbyName, scavengerItems, userId, pin } = req.body;
    try {
        const db = yield (0, db_1.connectDB)();
        yield db.run(`INSERT INTO lobbies (lobbyName, host, players, scavengerItems, points, pin, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            lobbyName,
            userId,
            JSON.stringify([]),
            JSON.stringify(scavengerItems),
            JSON.stringify({}),
            pin,
            'waiting'
        ]);
        res.status(201).json({ message: `Lobby '${lobbyName}' created by ${userId}` });
    }
    catch (error) {
        console.error('Error creating lobby:', error);
        res.status(500).json({ error: 'Failed to create lobby' });
    }
}));
router.post('/join', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lobbyId, userId, pin } = req.body;
    try {
        const db = yield (0, db_1.connectDB)();
        const lobby = yield db.get(`SELECT * FROM lobbies WHERE id = ? AND pin = ?`, [lobbyId, pin]);
        if (!lobby) {
            return res.status(404).json({ error: 'Lobby not found or PIN is incorrect' });
        }
        const players = JSON.parse(lobby.players);
        if (!players.includes(userId)) {
            players.push(userId);
            yield db.run(`UPDATE lobbies SET players = ? WHERE id = ?`, [JSON.stringify(players), lobbyId]);
        }
        res.json({ message: `User ${userId} joined lobby ${lobbyId}` });
    }
    catch (error) {
        console.error('Error joining lobby:', error);
        res.status(500).json({ error: 'Failed to join lobby' });
    }
}));
exports.default = router;
