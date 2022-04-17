let csvFile = document.getElementById('fileCSV');

csvFile.addEventListener('change', previewFile);

function previewFile(e) {
  e.preventDefault();

  try {
    const content = document.querySelector('.content');
    const file = csvFile.files[0];

    getMetadataForFileList(file);

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      content.innerText = reader.result;
      csvToArray(reader.result);
    });

    reader.readAsText(file);
  } catch (error) {
    alert(error.message);
  }
}

// USE A FUNCTION TO VALIDATE PROPER CSV TYPE OF FILE
function getMetadataForFileList(file) {
  if (!file) {
    throw new Error('empty file');
  }
  // Not supported in Safari for iOS.
  const name = file.name ? file.name : new Error();
  // Not supported in Firefox for Android or Opera for Android.
  const type = file.type
    ? file.type
    : new Error(
        'Not Supported File format. Only CSV file extension is allowed!'
      );
  // Unknown cross-browser support.
  const size = file.size ? file.size : new Error();

  if (type instanceof Error) {
    throw type;
  }

  console.log({ file, name, type, size });
  //}
}

let records = [];
function csvToArray(str, delimiter = ',') {
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
}
