export const getValueMasked = (value: string): string => {
  value.includes('.') ? '' : value += '.00';
  return `R$ ${value.replace(".", ",")}`;
}
