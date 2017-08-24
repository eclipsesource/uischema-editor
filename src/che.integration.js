function updateUiSchemaEditorData(element, data) {
  console.log("Initializing UiSchema Editor Example...");
  if (element.firstChild){
    element.firstChild.remove();
  }

  var uiSchemaEditor = document.createElement('uischema-editor');
  uiSchemaEditor.data = data;

  element.appendChild(ecoreEditor);
}
