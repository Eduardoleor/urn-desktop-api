const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isString = (text: string): boolean => {
  return typeof text === 'string'
}

export { isDate, isString }
