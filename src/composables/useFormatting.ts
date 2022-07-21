export default () => {
  /**
   * Format an amount of money into a regional currency.
   *
   * @param {number} value The amount of money to format
   * @param {string} currency The currency to use. Defaults to 'KES'
   * @param {string} region The region to format with. Defaults to 'en-GB'
   *
   * @returns {string} Formatted currency string
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const toRegionalCurrency = (
    value: number,
    currency: string = 'KES',
    region: string = 'en-GB'
  ): string =>
    value.toLocaleString(region, {
      style: 'currency',
      currency,
    });

  /**
   * Format a date object to a human-readable long string.
   *
   * @param {Date} date Date to format
   *
   * @returns {string}
   * @author: Brian Kariuki <bkariuki@hotmail.com>
   */
  const toHumanDate = (date: Date): string =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(date);

  return { toRegionalCurrency, toHumanDate };
};
