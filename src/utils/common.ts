const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isString = (text: string): boolean => {
  return typeof text === 'string'
}

const cleanError = (err: any): string => {
  if (isString(err)) {
    return err.replace('Error:', '')
  } else {
    return err
  }
}

export { isDate, isString, cleanError }
