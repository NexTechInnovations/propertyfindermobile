export const getFormattedNumber = (input: number | string): string => {
    // If input is a string, attempt to parse it as a number
    const numberValue = typeof input === 'string' ? parseFloat(input.replace(/,/g, '')) : input;
  
    // Check if the parsed number is a valid number
    if (!isNaN(numberValue)) {
      // Format the number using Intl.NumberFormat
      return new Intl.NumberFormat('en-US').format(numberValue);
    } else {
      // If the input is not a valid number, return an error message or handle it accordingly
      return 'Invalid Number';
    }
  };
  