const format = require('date-fns/format');
const locale = require('date-fns/locale/ru');

export default (date, dateFormat) => {
    return format(date, dateFormat, {
        locale: locale
    })
}