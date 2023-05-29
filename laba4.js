const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Получаем имя пользователя из аргументов командной строки
const args = process.argv.slice(2);
const username = args[0];

// Получаем домашнюю директорию текущего пользователя
const homedir = path.join(require('os').homedir(), 'FileManager');

// Функция для получения текущей директории
function getCurrentDirectory() {
  return process.cwd();
}

// Функция для вывода приветственного сообщения
function showWelcomeMessage() {
  console.log(`Welcome to the File Manager, ${username}!`);
}

// Функция для вывода сообщения о завершении работы
function showGoodbyeMessage() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

// Функция для вывода текущей директории
function showCurrentDirectory() {
  console.log(`You are currently in ${getCurrentDirectory()}`);
}

// Функция для проверки существования файла или директории
function checkExistence(filepath) {
  try {
    fs.accessSync(filepath);
    return true;
  } catch (err) {
    return false;
  }
}

// Функция для выполнения команды ls
function executeLs() {
  const files = fs.readdirSync(getCurrentDirectory());
  console.log(files.join('\n'));
}

// Функция для выполнения команды cd
function executeCd(targetDir) {
  const newDir = path.join(getCurrentDirectory(), targetDir);
  if (checkExistence(newDir)) {
    process.chdir(newDir);
    showCurrentDirectory();
  } else {
    console.log('Operation failed');
  }
}

// Функция для выполнения команды mkdir
function executeMkdir(targetDir) {
  const newDir = path.join(getCurrentDirectory(), targetDir);
  if (!checkExistence(newDir)) {
    fs.mkdirSync(newDir);
  } else {
    console.log('Operation failed');
  }
}

// Функция для выполнения команды touch
function executeTouch(targetFile) {
  const newFile = path.join(getCurrentDirectory(), targetFile);
  if (!checkExistence(newFile)) {
    fs.writeFileSync(newFile, '');
  } else {
    console.log('Operation failed');
  }
}

// Функция для обработкиВ предыдущем сообщении был приведен только фрагмент кода, который отвечает за вывод сообщений и работу с текущей директорией. Для реализации полного функционала необходимо дополнительно написать обработчики команд, которые будут выполняться при вводе пользователем соответствующих команд.




// Функция для обработки пользовательского ввода
function processInput(input) {
  const tokens = input.trim().split(' ');
  const command = tokens[0];
  const arg = tokens[1];

  switch (command) {
    case 'ls':
      executeLs();
      break;
    case 'cd':
      if (arg) {
        executeCd(arg);
      } else {
        console.log('Invalid input');
      }
      break;
    case 'mkdir':
      if (arg) {
        executeMkdir(arg);
      } else {
        console.log('Invalid input');
      }
      break;     case 'touch':
      if (arg) {
        executeTouch(arg);
      } else {
        console.log('Invalid input');
      }
      break;
    case '.exit':
      rl.close();
      showGoodbyeMessage();
      break;
    default:
      console.log('Invalid input');
      break;
  }
}

// Основной код приложения
showWelcomeMessage();
showCurrentDirectory();

rl.on('line', (input) => {
  processInput(input);
  showCurrentDirectory();
});

rl.on('close', () => {
  showGoodbyeMessage();
});
