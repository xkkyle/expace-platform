const getGenericDate = (value: Date | string) => {
  let _value =
    typeof value === "string" || value instanceof Date
      ? new Date(value)
      : value;

  const [year, month, date] = [
    _value.getFullYear(),
    _value.getMonth() + 1,
    _value.getDate(),
  ];

  return `${year}.${month}.${date}`;
};

export { getGenericDate };
