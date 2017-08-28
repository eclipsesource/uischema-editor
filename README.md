# UiSchema Editor

An editor to create and modify Ui Schemata for JsonForms.
The editor is based on [JsonEditor](https://github.com/eclipsesource/jsoneditor).

## Installation
To install the UI Schema Editor you need to checkout the following repositories:
- [JsonEditor](https://github.com/eclipsesource/jsoneditor) on branch master
- [JsonForms](https://github.com/eclipsesource/jsonforms/tree/jsonforms2) on branch jsonforms2

The directories should be located next to the UI schema editor,
e.g.
```
folder
  |- jsoneditor
  |- jsonforms
  |- uischema-editor
```
1. Install dependecies for JsonForms and JsonEditor by executing `npm install` in their directories.

1. Build JsonForms by executing `npm run build` in the jsonforms directory. In case the build fails due to TSLint errors, open the file webpack/webpack.build.js and search for `failOnHint` and set its value from `true` to `false`.

1. Install the result in JsonEditor by executing `npm install ../jsonforms` in the jsoneditor directory.

1. Build JsonEditor with `npm run build`

1. Got to the uischema-editor directory and execute `npm install`

1. Optional: Run `npm run build` to build a node module containing the ui schema editor element

## Run
Run the UI Schema Editor with `npm run dev`.

You can now use the editor at http://localhost:8080/

Note: You might not see the root element even if it's there. Just move the mouse to the top of the lower left box beneath the UI Schema Editor headline.

## Exclaimer
This demo is currently under development and might not work properly, yet.
