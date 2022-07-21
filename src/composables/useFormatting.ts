export default () => {
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

  return { toHumanDate };
};
