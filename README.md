# JS DROP FILE

Easy and simple drag and drop files on the browser

Optimized Production Build - https://github.com/dyingg/js-drop-file/blob/master/dist/main.js

## Usage

Easily start using by downloading the optimized production build and importing, such as

```html
<head>
  <script src="https://raw.githubusercontent.com/dyingg/js-drop-file/master/dist/main.js"> </script>
<head>
```


## Documentation

The DropFile class is exposed publicly by the script.

```js
//Start by creating instance of drop file.
var fileHandler = new DropFile();

// Alternatively you can constraint the file extension by filtering using

var fileHandler = new DropFile({
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

- Drag required both ondrop and ondragover to be defined.
