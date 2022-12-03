export const countHours = (year: string, holidays: string[]) => {
  let acum = 0

  holidays.forEach((holiday) => {
    const date = new Date(holiday + ',' + year)
    if (date.getDay() === 6 || date.getDay() === 0) return
    acum += 2
  })

  return acum
}
