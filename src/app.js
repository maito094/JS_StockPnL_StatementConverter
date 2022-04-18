import { getMetadataForFileList } from './util/file_util.js';
import { csvToArray } from './util/util.js';
import { getConversionRateByDate } from './api/data.js';

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
let fileName = document.querySelector('.dragNdrop p');
let content = document.querySelector('.content');
let btnStart = document.getElementById('startBtn');

btnStart.addEventListener('click', requestDataHandler);

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
    const file = csvFile.files[0] || e.dataTransfer.files[0];

    getMetadataForFileList(file);
    fileName.textContent = `${file.name}`;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      content.innerText = reader.result;
      records = [...csvToArray(reader.result)];
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

async function requestDataHandler(event) {
  if (!records[0]) {
    return;
  }
  let selectedDate = new Date(records[0].acquiredDate);
  let dateObj = {
    day: selectedDate.getDate(),
    month: (selectedDate.getMonth() - 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    year: selectedDate.getFullYear(),
  };

  let result = await getConversionRateByDate(dateObj);

  content.innerText = result.contents;
}
