const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

const getMonthName = monthIndex => months[monthIndex]

const getMonthIndex = russianMonth => months.indexOf(russianMonth.toLowerCase()) + 1 < 10 ? '0' + (months.indexOf(russianMonth.toLowerCase()) + 1) : months.indexOf(russianMonth.toLowerCase()) + 1;

export {getMonthName, getMonthIndex};