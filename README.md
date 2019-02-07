# JS DROP FILE

Easy and simple library to handle dragging and dropping of files on the browser.

> Optimized Production Build - https://github.com/dyingg/js-drop-file/blob/master/dist/main.js
> Running Example (download and use) - https://github.com/dyingg/js-drop-file/tree/master/examples

## Usage

Easily start using by downloading the optimized production build and importing, such as

```html
<head>
  <script src="main.js"></script>
  <head>
    <body>
      <h1>Drop Files</h1>
      <style>
        #box {
          height: 500px;
          width: 500px;
          border: 2px dashed darkblue;
        }
      </style>
      <div id="box"></div>
      <script>
        var DropHandler = new DropFile("box", {
          fileType: "json"
        });

        DropHandler.onError(msg => {
          console.log(msg);
        });
        DropHandler.onFile(msg => {
          console.log(msg);
        });
      </script>
    </body>
  </head>
</head>
```

## Documentation

The DropFile class is exposed globally by default.

```js
//Start by creating instance of drop file.

//Create an instance that handles drops on given target ID
var fileHandler = new DropFile("Target ID");

// Alternatively you can constraint the file extension by filtering using

var fileHandler = new DropFile("Target ID", {
  fileType: "json"
});

//The above created fileHandler instance will discord all files that do not have the extension .json
//File type by reading blob filter planned
```

### onFile

Called when a file has been dropped and consumed, it recieves raw UTF-8 encoded string for the file.
(Binary support planned)

```js
fileHandler.onFile(data => {
  console.log(data);

  var data = JSON.parse(data);

  //Do what you have to with the data file.
});
```

### onError

Called when an error occurs such as file type upload does not match filter, dragged element is not a file etc

```js
fileHandler.onError(msg => {});
```

Here the returned message is one of the following strings

    READ_ERROR  -> Dragged element was a file of the correct extension but read was interrupted
    FILE_FILTER_ERROR -> Dragged element was a file but the extension matching failed
    FILE_FAIL  -> Dragged element was not a file

#### implementation notes (ignore)

- Drag requires both ondrop and ondragover to be defined.
