// Simple Xata client setup
import { XataClient } from './xata';

export const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.XATA_DATABASE_URL,
});
