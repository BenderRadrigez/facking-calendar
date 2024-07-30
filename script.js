const title = {
  title: document.querySelector(".title"),
  nameTitle: document.querySelector(".title-name"),
  nameSpan: document.querySelector(".name-span"),
  year: document.querySelector(".year"),
};
const calendar = {
  dataBox: document.querySelector(".data-box"),
  castomTitle: document.querySelector(".castom-title"),
  nameMonth: document.querySelector(".name-month"),
  btnPrev: document.querySelector(".prev"),
  btnNext: document.querySelector(".next"),
  btnReset: document.querySelector(".btn-reset"),
};
const tickets = {
  ticketsBox: document.querySelector(".tickets-box"),
};
const controlBtn = document.querySelector(".control-btn");

// получаем дату
const date = new Date();
// актуализируем ее
let actualDate = getDate();

console.log(actualDate)

//календарь или задачи
let isCalendar = true;

// тут все названия и колличества дней в месяце
const names = {
  days: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
  daysFull: [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
  ],
  daysCastom: [
    "ебаное начало",
    "ебаная работа",
    "ебаный ад",
    "ебаные встречи",
    "ебаный конец",
    "ебаные клубы",
    "ебаный отсыпной",
  ],
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  month: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  monthCastom: [
    "ебаный новый год",
    "ебаный холод",
    "ебаная грязь",
    "ебаные шутники",
    "ебаный день труда",
    "ебаные школьники",
    "ебаная жара",
    "ебаный отпуск",
    "ебаное 3 сентября",
    "ебаный дождь",
    "ебаные скидки",
    "ебаные подарки",
  ],
};

function conteinerCreator(nameElement, nameClass = "") {
  const element = document.createElement(nameElement);
  element.classList.add(nameClass);

  return element;
}
// костыль для рассчета дня недели для даты
function getMonthStartOffset(thatYear, month) {
  const firstDay = 0;

  if (month < 3) {
    month += 12;
    thatYear -= 1;
  }
  let k = thatYear % 100;
  let j = Math.floor(thatYear / 100);
  let f =
    firstDay +
    Math.floor((13 * (month + 1)) / 5) +
    k +
    Math.floor(k / 4) +
    Math.floor(j / 4) -
    2 * j;

  return ((((f % 7) + 7) % 7) + 6) % 7;
}
// ебаные названия месяца или дня недели
function makeTitle(actual, isMonth = true) {

  console.log(actual)
  console.log(names.daysCastom[actual - 1])

  const customTitle = isMonth ? names.monthCastom[actual - 1] : names.daysCastom[actual - 1];

  calendar.castomTitle.innerHTML = customTitle ?? customTitle.toUpperCase();
  calendar.nameMonth.innerHTML = isMonth
    ? names.month[actual - 1]
    : names.daysFull[actual - 1];
}
// создание списка дней в месяце с пустыми днями недели
function makeMonth(thatYear, month) {
  const listForShowingCalendar = [];

  const dayOff = getMonthStartOffset(thatYear, month);
  let daysInMonth = names.daysInMonth[month - 1];

  for (let i = 0; i < daysInMonth; i++) {
    listForShowingCalendar.push(i + 1);
  }
  for (let i = 0; i < dayOff; i++) {
    listForShowingCalendar.unshift(null);
  }

  let lastDayOff = 42 - listForShowingCalendar.length;
  if (listForShowingCalendar.length < 42) {
    for (let i = 0; i < lastDayOff; i++) {
      listForShowingCalendar.push(null);
    }
  }
  return listForShowingCalendar;
}
// создание и отрисовка календаря
function makeCalendar(monthArr) {
  const weeks = conteinerCreator("ul", "weeks");

  let dayNumber = 0;

  for (let i = 0; i < 7; i++) {
    dayNumber = i;
    // добавление всякой херни в контейнер
    const daysName = conteinerCreator("h6", "days-name");
    daysName.innerHTML = names.days[i];

    const days = conteinerCreator("ul", "days");

    for (let j = 0; j < 6; j++) {
      const day = conteinerCreator("li", "day");
      const dayBtn = conteinerCreator("button", "day-btn");
      // заполнение списков числами
      dayBtn.innerHTML = monthArr[dayNumber + j * 6];
      if (monthArr[dayNumber + j * 6] !== null) {
        day.append(dayBtn);
      }
      // а это так, выделялка нынешнего дня
      if (dayBtn.innerHTML == actualDate.day) {
        if (
          //если совпадает год месяц и день - красная
          actualDate.month == getDate().month &&
          actualDate.year == getDate().year
        ) {
          dayBtn.classList.add("active-day");
        } else {
          //если только день - синяя
          dayBtn.classList.add("like-active-day");
        }
      }

      dayNumber++;
      days.append(day);
    }
    days.prepend(daysName);
    weeks.appendChild(days);
  }

  calendar.dataBox.append(weeks);
}
// создание и отрисовка задач
function makeTickets() {
  const dayTickets = conteinerCreator("ul", "day-tickets");

  for (let i = 0; i < 24; i++) {
    const hour = conteinerCreator("li", "hour");
    const hourSpan = conteinerCreator("span", "hour-span");
    const ticketInput = conteinerCreator("input", "ticket-input");

    hourSpan.innerHTML = i < 10 ? `0${i}:00` : `${i}:00`;

    hour.append(hourSpan);
    hour.append(ticketInput);
    dayTickets.append(hour);
  }
  return dayTickets;
}
// стререть ебаный месяц с экрана
function removeCalendar() {
  document.querySelector(".weeks").remove();
}
// получить актуальную дату
function getDate() {
  // не спрашивай какого хуя так, когда можно через обычную GetUTC. потому что, бля, эта хуйня точнее работает, все варианты Get выдают не точный месяц, точнее пишет-то ок, но хуйню. на месяц назад. почему-то он живет еще в 6 месяцу.
  return date
    .toLocaleDateString()
    .split(".")
    .reduce(
      (acc, el, ind) => {
        ind === 0
          ? (acc.day = +el)
          : ind === 1
          ? (acc.month = +el)
          : (acc.year = +el);
        return acc;
      },
      { day: 0, month: 0, year: 0 }
    );
}
function prevOrNextMonth(monthNumber) {
  if (monthNumber > 12) {
    monthNumber = 1;
    actualDate.year++;
  } else if (monthNumber < 1) {
    monthNumber = 12;
    actualDate.year--;
  }
  title.year.innerHTML = actualDate.year;
  names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
  makeTitle(monthNumber);
  removeCalendar();
  makeCalendar(makeMonth(actualDate.year, monthNumber));
}
// возвращает индекс для недели если нету то -1
function numberDayToday() {
  const today = date.toLocaleString("ru-RU", { weekday: "long" });
  return names.daysFull.reduce((acc, el, ind) => {
    acc = el.includes(today) ? ind : acc;
    return acc;
  }, -1);
}

//базовая загрузка
title.nameTitle.innerHTML = "EБАНЫЙ";
title.nameSpan.innerHTML = "календарь";
names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
title.year.innerHTML = actualDate.year;
makeTitle(actualDate.month);
makeCalendar(makeMonth(actualDate.year, actualDate.month));
tickets.ticketsBox.append(makeTickets());

// ну и кнопки, тут и так понятно
calendar.btnNext.addEventListener("click", () => {
  actualDate.month++;
  prevOrNextMonth(actualDate.month);
});
calendar.btnPrev.addEventListener("click", () => {
  actualDate.month--;
  prevOrNextMonth(actualDate.month);
});
calendar.btnReset.addEventListener("click", () => {
  names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
  actualDate = getDate();
  title.year.innerHTML = actualDate.year;
  makeTitle(actualDate.month);
  removeCalendar();
  makeCalendar(makeMonth(actualDate.year, actualDate.month));
});
controlBtn.addEventListener("click", () => {
  isCalendar = !isCalendar;
  makeTitle(isCalendar ? actualDate.month : numberDayToday() + 1, isCalendar);
  title.nameTitle.innerHTML = isCalendar ? "EБАНЫЙ" : "EБАНЫЕ";
  title.nameSpan.innerHTML = isCalendar ? "календарь" : "задачи";
  controlBtn.innerHTML = isCalendar ? "ебаные задачи" : "ебаный календарь";

  if (isCalendar) {
    title.year.innerHTML = actualDate.year;
    title.year.classList.remove("hide");
    calendar.dataBox.classList.remove("hide");
    tickets.ticketsBox.classList.add("hide");
  } else {
    title.year.innerHTML = date.toLocaleDateString();
    console.log();
    calendar.dataBox.classList.add("hide");
    tickets.ticketsBox.classList.remove("hide");
  }
});
