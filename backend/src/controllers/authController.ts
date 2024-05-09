import { Request, Response } from 'express';
import fs from 'fs';
import { User } from '../models/User';

// Läs in användare från JSON-filen
const users: User[] = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

let currentUser: User | null = null;

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  currentUser = user;
  console.log(user)
  res.json({ message: 'Login successful', user });
};

export const logout = (req: Request, res: Response) => {
  currentUser = null;
  res.json({ message: 'Logout successful' });
};
