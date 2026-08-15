/**
 * API отдаёт дату как YYYY-MM-DD.
 * Для таблицы по заданию показываем DD/MM.
 */
export function formatForecastDate(date: string): string {
  const [, month, day] = date.split("-");

  return day && month ? `${day}/${month}` : date;
}
