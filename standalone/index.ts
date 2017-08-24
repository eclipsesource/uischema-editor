import '../src/materialized.tree.renderer';
import {
  configureDownloadButton,
  configureExportButton,
  configureUploadButton,
  createExportDataDialog,
  JsonEditor
} from '@eclipsesource/jsoneditor';
import '@eclipsesource/jsoneditor';
import '../src/uischema-editor';
import { UiSchemaEditor } from '../src/uischema-editor';
import { JsonSchema } from 'jsonforms';
import { applyMaterialStyle } from './material.styling';

window.onload = () => {
  const editor = document.createElement('uischema-editor') as UiSchemaEditor;

  // create export dialog that can be shown to copy the current model content
  const exportDialog = createExportDataDialog();
  document.body.appendChild(exportDialog);

  // configure button that opens the export dialog
  const exportButton = document.getElementById('export-data-button') as HTMLButtonElement;
  configureExportButton(editor, exportButton, exportDialog);

  // configure button to upload data to the editor
  const uploadButton = document.getElementById('upload-data-button') as HTMLButtonElement;
  configureUploadButton(editor, uploadButton);

  // configure button to download model data.
  const downloadButton = document.getElementById('download-data-button') as HTMLButtonElement;
  configureDownloadButton(editor, downloadButton);

  // initialize editor with empty root object
  editor.data = {};
  document.getElementById('editor').appendChild(editor);

  applyMaterialStyle();
};
