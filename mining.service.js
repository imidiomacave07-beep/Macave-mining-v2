const axios = require("axios");
const API_KEY = process.env.NICEHASH_API_KEY; const API_SECRET = process.env.NICEHASH_API_SECRET; const ORG_ID = process.env.NICEHASH_ORG_ID;
const BASE_URL = "https://api2.nicehash.com";
// Verificar a configuração function validateConfig() { if (!API_KEY || !API_SECRET || !ORG_ID) { throw new Error( "Configuração incompleta: verifica NICEHASH_API_KEY, NICEHASH_API_SECRET e NICEHASH_ORG_ID." ); } }
