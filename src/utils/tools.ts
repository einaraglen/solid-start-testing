export const classNames = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ')
}

export const debounce = (callback: Function, delay: number = 1000) => {
  let timeout: any

  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  }
}

export const user_id = "71aedb67-f656-4e62-aba2-cdb9dd9c9520"
