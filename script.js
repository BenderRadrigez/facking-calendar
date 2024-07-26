const dataBox = document.querySelector(".data-box");
const navigate = document.querySelector(".navigate");
const year = document.querySelector(".year");
const castomTitle = document.querySelector(".castom-title");
const nameMonth = document.querySelector(".name-month");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const btnReset = document.querySelector(".btn-reset");

// получаем дату
const date = new Date();

// актуализируем ее
let actualDate = getDate();

// тут все названия и колличества дней в месяце
const names = {
  days: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
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

// костыль для рассчета дня недели для даты
function getMonthStartOffset(year, month) {
  const firstDay = 0;

  if (month < 3) {
    month += 12;
    year -= 1;
  }
  let k = year % 100;
  let j = Math.floor(year / 100);
  let f =
    firstDay +
    Math.floor((13 * (month + 1)) / 5) +
    k +
    Math.floor(k / 4) +
    Math.floor(j / 4) -
    2 * j;

  return ((((f % 7) + 7) % 7) + 6) % 7;
}
// ебаные названия месяца
function makeTitle(actualMonth) {
  castomTitle.innerHTML = names.monthCastom[actualMonth - 1].toUpperCase();
  nameMonth.innerHTML = names.month[actualMonth - 1];
}
// создание списка дней в месяце с пустыми днями недели
function makeMonth(year, month) {
  const listForShowingCalendar = [];

  const dayOff = getMonthStartOffset(year, month);
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

    listForShowingCalendar;
  }
  return listForShowingCalendar;
}
// создание и отрисовка календаря
function makeCalendar(monthArr) {
  const weeks = document.createElement("ul");
  weeks.classList.add("weeks");

  let dayNumber = 0;

  for (let i = 0; i < 7; i++) {
    dayNumber = i;
    // добавление всякой херни в контейнер
    const daysLine = document.createElement("li");
    daysLine.classList.add("days-line");

    const daysName = document.createElement("h6");
    daysName.classList.add("days-name");
    daysName.innerHTML = names.days[i];

    const days = document.createElement("ul");
    days.classList.add("days");

    for (let j = 0; j < 6; j++) {
      const day = document.createElement("li");
      day.classList.add("day");
      // заполнение списков числами
      day.innerHTML = monthArr[dayNumber + j * 6];
      // а это так, выделялка нынешнего дня
      if (day.innerHTML == actualDate.day) {
        if (
          //если совпадает год месяц и день - красная
          actualDate.month == getDate().month &&
          actualDate.year == getDate().year
        ) {
          day.classList.add("active-day");
        } else {
          //если только день - синяя
          day.classList.add("like-active-day");
        }
      }

      dayNumber++;
      days.append(day);
    }
    days.prepend(daysName);
    weeks.appendChild(days);
  }

  dataBox.append(weeks);
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
      { day: 0, month: 0, year }
    );
}

//базовая загрузка
names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
year.innerHTML = actualDate.year;
makeTitle(actualDate.month);
makeCalendar(makeMonth(actualDate.year, actualDate.month));

// ну и кнопки, тут и так понятно
btnNext.addEventListener("click", () => {
  actualDate.month++;
  if (actualDate.month > 12) {
    actualDate.month = 1;
    actualDate.year++;
    year.innerHTML = actualDate.year;
    names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
  }
  makeTitle(actualDate.month);
  removeCalendar();
  makeCalendar(makeMonth(actualDate.year, actualDate.month));
});
btnPrev.addEventListener("click", () => {
  actualDate.month--;
  if (actualDate.month < 1) {
    actualDate.month = 12;
    actualDate.year--;
    year.innerHTML = actualDate.year;
    names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
  }
  makeTitle(actualDate.month);
  removeCalendar();
  makeCalendar(makeMonth(actualDate.year, actualDate.month));
});
btnReset.addEventListener("click", () => {
  names.daysInMonth[1] = actualDate.year % 4 == 0 ? 29 : 28;
  actualDate = getDate();
  year.innerHTML = actualDate.year;
  makeTitle(actualDate.month);
  removeCalendar();
  makeCalendar(makeMonth(actualDate.year, actualDate.month));
});
