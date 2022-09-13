import { getMetadataForFileList } from './util/file_util.js';
import { csvToArray, csvNameParams } from './util/util.js';
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
let content = document.querySelector('.preview');
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
      records = csvToArray(reader.result);
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
  // Insert Loop Logic with using records[n] for every record. Use an Object an push Dates with Rates. If Date already exists then Don't make an API GET Request !

  if (!records[0]) {
    return;
  }

  let resultHTMLElement = document.createElement('body');

  let accumulatedDatesPreview = document.createElement('div');

  let DatesRecords = {};
  let result;
  // Use Loop to Extract Rate by Acquired OR Sold Dates and Immediately Calculate the Conversion... 
  // After that store the result for the current Row Transaction the Converted Values for the Acquired Amount and Sold Amount by the Date
  for (let idx = 0; idx < records.length; idx++) {
    const curRecord = records[idx];
    let acquiredDateRecord = curRecord[csvNameParams.acquiredDate];
    let soldDateRecord = curRecord[csvNameParams.soldDate];
    console.log(curRecord);

    if (DatesRecords?.acquiredDateRecord === undefined) {

      // Extract this code of block to reuse it for acquiredDate and soldDate
      let selectedDate = new Date(curRecord[csvNameParams.acquiredDate]);
      let dateObj = {
        day: selectedDate.getDate(),
        month: (selectedDate.getMonth() + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
        year: selectedDate.getFullYear(),
      };
      console.log(dateObj);
      result = await getConversionRateByDate(dateObj);
      //console.log(result);
      resultHTMLElement.innerHTML = result;
      //console.log(resultHTMLElement);
      let currentTable = resultHTMLElement.querySelector('.table_box tbody');
      let USDrow = currentTable.querySelector(
        'tbody>tr:nth-child(30)>td:nth-child(2)'
      ).parentElement;
      let USD_BGN_Rate = Number(
        USDrow.querySelector('td:nth-child(4)').innerText
      );
      console.log(USD_BGN_Rate);
      console.log(currentTable);
      accumulatedDatesPreview.innerText += `Date - ${csvNameParams.acquiredDate} : USD Rate - ${USD_BGN_Rate}`;

      DatesRecords[acquiredDateRecord] = USD_BGN_Rate;
      ///


    } 
    if (acquiredDateRecord!==soldDateRecord && DatesRecords?.soldDateRecord === undefined) {
      // reuse logic from acquiredDate code block above;
    }
    
    
    
      // If date is already had for this Stock Transaction Record Row then just Do the Maths and Store result in converted Units
    
  }
  content.innerHTML = '';

  content.appendChild(accumulatedDatesPreview);
}
