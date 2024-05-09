import { Request, Response } from 'express';
import fs from 'fs';
import { User } from '../models/User';

// Läs in användare från JSON-filen
const users: User[] = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
let currentUser: User | null = null;

export const getUsers = (req: Request, res: Response) => {
  res.json(users.map(user => ({ username: user.username })));
};

export const getUserByUsername = (req: Request, res: Response) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
};


export const deleteAccount = (req: Request, res: Response) => {
  const { username } = req.params;
  if (currentUser && currentUser.username === username) {
    // Ta bort användaren från databasen
    const index = users.findIndex(user => user.username === username);
    users.splice(index, 1);
    // Logga ut användaren
    currentUser = null;
    res.json({ message: 'Account deleted successfully' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const getUserComments = (req: Request, res: Response) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user); // Returnerar de tre senaste kommentarerna
  }
};