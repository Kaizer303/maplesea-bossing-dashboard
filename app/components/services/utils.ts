export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
