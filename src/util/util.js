let csvNameParams;

function csvToArray(str, delimiter = ',') {
  const records = [];
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter

  const  [
    acquiredDate,
    soldDate,
    Symbol,
    Quantity,
    CostBasis,
    Amount,
    RealisedPnL,
   ] =  str.slice(0, str.indexOf('\n')).split(delimiter);

   csvNameParams={ "acquiredDate":acquiredDate,
    "soldDate":soldDate,
    "Symbol":Symbol,
    "Quantity":Quantity,
    "CostBasis":CostBasis,
    "Amount":Amount,
    "RealisedPnL":RealisedPnL};
  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str
    .slice(str.indexOf('\n') + 1)
    .split('\n')
    .filter((x) => x !== '');

  for (const row of rows) {
    let [
      acquiredDateVal,
      soldDateVal,
      SymbolVal,
      QuantityVal,
      CostBasisVal,
      AmountVal,
      RealisedPnLVal,
    ] = row.split(delimiter);

    let recordObj = {
      [csvNameParams.acquiredDate]: acquiredDateVal,
      [csvNameParams.soldDate]: soldDateVal,
      [csvNameParams.Symbol]: SymbolVal,
      [csvNameParams.Quantity]: QuantityVal,
      [csvNameParams.CostBasis]: CostBasisVal,
      [csvNameParams.Amount]: AmountVal,
      [csvNameParams.RealisedPnL]: RealisedPnLVal,
    };

    records.push(recordObj);
  }

  console.log(records);

  return records;
}

export { csvToArray, csvNameParams };
