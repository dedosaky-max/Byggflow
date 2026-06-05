export function formatDate(date, lang) {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "medium"
  }).format(new Date(date));
}

export function formatNumber(num, lang) {
  return new Intl.NumberFormat(lang).format(num);
}
