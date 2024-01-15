const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const token = "6952973288:AAFnjhs45i-1tsRhYfxu9D2CqZSlwxS3v9Q";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

bot.setMyCommands([
  {
    command: "/start",
    description: "Начальное приветствие",
  },
  {
    command: "/info",
    description: "Получить информацию о пользователе",
  },
  {
    command: "/game",
    description: "Угадай цифру",
  },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сейчас я загадаю цифру от 0 до 9, а ты поробуй ее отгадать"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  console.log(chats[chatId]);
  return bot.sendMessage(chatId, "Отгадывай)", gameOptions);
};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/ef5/8e1/ef58e15f-94a2-3d56-a365-ca06e1339d08/11.webp"
      );
      return bot.sendMessage(
        chatId,
        `Добро пожаловать в телеграм бот рекламного агенства "Альфа Реклама"`
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз!");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    console.log(data);
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (Number(data) === chats[chatId]) {
      return bot.sendMessage(chatId, "Ты угадал!", againOptions);
    } else {
      return bot.sendMessage(
        chatId,
        `Не угадал, правильная цифра: ${chats[chatId]}`,
        againOptions
      );
    }

    bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);
  });
};

start();
