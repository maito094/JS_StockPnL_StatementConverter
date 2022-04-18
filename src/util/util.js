function csvToArray(str, delimiter = ',') {
  const records = [];
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const [
    acquiredDate,
    soldDate,
    Symbol,
    Quantity,
    CostBasis,
    Amount,
    RealisedPnL,
  ] = str.slice(0, str.indexOf('\n')).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  for (const row of rows) {
    let [
      acquiredDate,
      soldDate,
      Symbol,
      Quantity,
      CostBasis,
      Amount,
      RealisedPnL,
    ] = row.split(delimiter);

    let recordObj = {
      acquiredDate,
      soldDate,
      Symbol,
      Quantity,
      CostBasis,
      Amount,
      RealisedPnL,
    };

    records.push(recordObj);
  }

  console.log(records);

  return records;
}

export { csvToArray };
