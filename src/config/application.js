import { fileURLToPath } from "url";
import path from "path";
import botConfig, { validateConfig } from "./bot.js";
import { shopConfig as shop } from "./shop/index.js";
import { pgConfig } from "./postgres.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appConfig = {
  paths: {
    root: path.join(__dirname, "../.."),
    commands: path.join(__dirname, "../commands"),
    events: path.join(__dirname, "../events"),
    config: __dirname,
    utils: path.join(__dirname, "../utils"),
    services: path.join(__dirname, "../services"),
    handlers: path.join(__dirname, "../handlers"),
    interactions: path.join(__dirname, "../interactions"),
  },

  bot: {
    ...botConfig,
    token: process.env.DISCORD_TOKEN || process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,

    shop: {
      ...botConfig.shop,
      ...shop,
    },
  },

  // PostgreSQL configuration - Primary production database
  postgresql: {
    ...pgConfig,
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    file: {
      enabled: process.env.LOG_TO_FILE === "true",
      path: path.join(__dirname, "../../logs"),
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    },
    console: {
      enabled: true,
      colorize: true,
      timestamp: true,
    },
    sentry: {
      enabled: process.env.SENTRY_DSN ? true : false,
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
    },
  },

  api: {
    port: process.env.PORT || 3000,
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },

  shop,

  features: {
    
    economy: true,                  
    leveling: true,                 
    moderation: true,               
    logging: true,                  
    welcome: true,                  

    tickets: true,                  
    giveaways: true,                
    birthday: true,                 
    counter: true,                  

    verification: true,             
    reactionRoles: true,            
    joinToCreate: true,             

    voice: true,                    
    search: true,                   
    tools: true,                    
    utility: true,                  
    community: true,                
    fun: true,                      

    music: false,                   
  },

  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
};

Object.freeze(appConfig);

export default appConfig;

import { botConfig } from './config/botConfig.js'; // Ensure this matches your path!

client.on('messageCreate', async (message) => {
  // 1. Ignore text from other bots or system updates
  if (message.author.bot) return;

  // 2. Safely capture your configured prefix ("$")
  const prefix = botConfig.commands.prefix;

  // 3. Stop running if the message doesn't start with your prefix
  if (!message.content.startsWith(prefix)) return;

  // 4. Isolate the command and its arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // 5. Hardcoded test command to verify it works!
  if (commandName === 'ping') {
    return message.reply('Pong! 🏓 The prefix system is working!');
  }
});
