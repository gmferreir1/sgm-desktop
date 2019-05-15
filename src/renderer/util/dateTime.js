const dateFormat = (date, format = null) => {
  if (!date) {
    return date
  }

  if (format == null) {
    return window.moment(date).format('DD/MM/YYYY')
  }

  if (format === 'YYYY-MM-DD') {
    return window.moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }

  return window.moment(date).format(format)
}

/**
 * Retorna o mes extenso de acordo o numero do mês passado
 * @param monthNumber
 */
const getMonthName = (monthNumber) => {
  let monthName = ''
  switch (monthNumber) {
    case '01':
      monthName = 'janeiro'
      break;
    case '02':
      monthName = 'fevereiro'
      break;
    case '03':
      monthName = 'março'
      break;
    case '04':
      monthName = 'abril'
      break;
    case '05':
      monthName = 'maio'
      break;
    case '06':
      monthName = 'junho'
      break;
    case '07':
      monthName = 'julho'
      break;
    case '08':
      monthName = 'agosto'
      break;
    case '09':
      monthName = 'setembro'
      break;
    case '10':
      monthName = 'outubro'
      break;
    case '11':
      monthName = 'novembro'
      break;
    case '12':
      monthName = 'dezembro'
      break;
  }

  return monthName
}

const compareDate = (initDate, endDate) => {
  if (!initDate || !endDate) {
    return
  }

  const arrayInitDate = initDate.split('/')
  const arrayEndDate = endDate.split('/')

  const inDate = `${arrayInitDate[2]}-${arrayInitDate[1]}-${arrayInitDate[0]}`
  const enDate = `${arrayEndDate[2]}-${arrayEndDate[1]}-${arrayEndDate[0]}`

  if(moment(inDate, 'YYYY-MM-DD').isBefore(enDate, 'YYYY-MM-DD') || moment(inDate, 'YYYY-MM-DD').isSame(enDate, 'YYYY-MM-DD')) {
    return true
  }
  return false
}

const diffDays = (date1, date2) => {

  date2 = !date2 ? moment().format("YYYY-MM-DD") : date2;
  
  const a = moment(date1);
  const b = moment(date2);

  return b.diff(a, 'days')
}

const getDaysYear = (year = window.moment().format('YYYY')) => {
  const checkYearBi = new Date(year, 1, 29).getMonth()
  if (checkYearBi === 1) {
    return 366
  }

  return 365
}

export {
  dateFormat,
  getMonthName,
  compareDate,
  getDaysYear,
  diffDays
}