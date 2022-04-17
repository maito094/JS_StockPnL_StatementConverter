import { getMetadataForFileList } from './util/file_util.js';

window.addEventListener(
  'dragover',
  function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'none';
  },
  false
);

window.addEventListener(
  'drop',
  function (e) {
    e.preventDefault();
  },
  false
);

let csvFile = document.getElementById('fileCSV');
let labelFile = document.querySelector('.dragNdrop label');
labelFile.addEventListener('click', triggerInputDialog);
csvFile.style.opacity = 0;

function triggerInputDialog() {
  csvFile.click();
}

let records = [];

csvFile.addEventListener('change', previewFile);

function previewFile(e) {
  e.stopPropagation();
  e.preventDefault();

  try {
    const content = document.querySelector('.content');
    const file = csvFile.files[0] || e.dataTransfer.files[0];

    getMetadataForFileList(file);
    csvFile.value = '';
    `${file.name}`;
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

const dropArea = document.querySelector('.dragNdrop label');

dropArea.addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  e.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (e) => previewFile(e));

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
