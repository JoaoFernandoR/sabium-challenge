export const formatDate = (date: string) => {
  return date.split('-').reverse().join('/');
};

export const getAge = (birthDayDateString: string): boolean => {
  const from = birthDayDateString.split('/');
  const birthdateTimeStamp = new Date(
    parseInt(from[2]),
    parseInt(from[1]) - 1,
    parseInt(from[0])
  );

  const today = new Date();

  var age = today.getFullYear() - birthdateTimeStamp.getFullYear();

  const month = today.getMonth() - birthdateTimeStamp.getMonth();

  if (
    month < 0 ||
    (month == 0 && today.getDate() < birthdateTimeStamp.getDate())
  ) {
    age = age - 1;
  }

  return age < 18 ? true : false;
};
