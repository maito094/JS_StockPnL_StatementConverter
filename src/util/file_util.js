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
    const size = file.size ? returnFileSize(file.size) : new Error();
  
    if (type instanceof Error) {
      throw type;
    }
  
    console.log({ file, name, type, size });
    //}
  }
  
  function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }


  export {getMetadataForFileList};