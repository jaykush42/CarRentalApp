exports.isValidPhoneNumber = (number) => {
  return /^[6-9]\d{9}$/.test(number);
};

exports.isValidDateRange = (start, end) => {
  return new Date(start) < new Date(end);
};
