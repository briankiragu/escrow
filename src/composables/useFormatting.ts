export default () => {
  /**
   * Format an amount of money into a regional currency.
   *
   * @param {number} value The amount of money to format
   * @param {string} currency The currency to use. Defaults to 'KES'
   * @param {string} locale The locale to format with. Defaults to 'en-GB'
   *
   * @returns {string} Formatted currency string
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const toRegionalCurrency = (
    value: number,
    currency: string = 'KES',
    locale: string = 'en-GB'
  ): string =>
    value.toLocaleString(locale, {
      style: 'currency',
      currency,
    });

  /**
   * Format a date object to a human-readable long string.
   *
   * @param {Date}   date Date to format
   * @param {string} locale Region to use for formatting. Defaults to 'en-GB'
   *
   * @returns {string}
   * @author: Brian Kariuki <bkariuki@hotmail.com>
   */
  const toHumanDate = (date: Date, locale: string = 'en-GB'): string =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(date);

  return { toRegionalCurrency, toHumanDate };
};
