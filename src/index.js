class DropFile {
  /**
   * @param {String} [id]
   * @param  {Object} [options]
   * @param  {String} [options.fileType]
   *
   */
  constructor(id, options) {
    if (typeof id !== "string") {
      throw "Invalid value for field ID";
    }

    var element = document.getElementById(id);
    if (!element) {
      throw "No element found in document with given ID " + id;
    }

    element.ondrop = this.handle.bind(this);
    element.ondragover = this.dragover.bind(this);

    this.READ_ERROR = "READ_ERROR";
    this.FILE_FILTER_ERROR = "FILE_FILTER_ERROR";
    this.FILE_FAIL = "FILE_FAIL";

    console.log("Added drop handler.");

    this.handleFile = undefined;
    //Create the file reader
    this.fileReader = new FileReader();

    this.fileReader.onloadend = function(ev) {
      if (ev.target.result) {
        if (this.handleFile !== undefined) {
          //Takes raw utf-8 string data
          if (!ev.target.error) {
            this.handleFile(ev.target.result);
          } else {
            this.errorHandler(this.READ_ERROR);
          }
        }
      } else {
        this.errorHandler(this.READ_ERROR);
      }
    }.bind(this);

    //Set the file type constraint
    this.fileType = options.fileType || "ANY_FILE";
  }

  handle(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.files.length > 0) {
      var currentFile = ev.dataTransfer.files[0];

      if (
        this.fileType == "ANY_FILE" ||
        currentFile.name.split(".").pop() == this.fileType
      ) {
        this.fileReader.readAsText(currentFile);
      } else {
        console.log(this.errorHandler);
        this.errorHandler(this.FILE_FILTER_ERROR);
        console.log("Invalid file type");
      }
    } else {
      this.errorHandler(this.FILE_FAIL);
    }
  }

  onFile(cb) {
    //Set handle File to handle reading of files.
    this.handleFile = cb;
  }

  onError(cb) {
    //Save the error hanndler
    this.errorHandler = cb;
  }

  //Better if we abstract this out of the way.
  dragover(ev) {
    ev.preventDefault();

    //console.log(ev);
  }
}

window.DropFile = DropFile;
