type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

/**
 * Return a month name from the date
 * @param date instance of Date
 * @return month name
 */
export const getMonth = (date: Date = new Date()): Month => {
  const monthes: Month[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return monthes[date.getMonth()]
}

/**
 * Return a day name from the date
 * @param instance of Date
 * @return day name
 */
export const getWeekDay = (date: Date = new Date()): Day => {
  const weekday: Day[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  return weekday[date.getDay()]
}
