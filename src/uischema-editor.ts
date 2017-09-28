import { JsonForms, JsonSchema } from 'jsonforms';
import { JsonEditor } from '@eclipsesource/jsoneditor';
import '@eclipsesource/jsoneditor';
import './materialized.tree.renderer';
import { uiSchemaEditorConfig } from './uischema-config';
import './object.renderer';
import { evaluationSchema } from './referencedDataSchema';
import { uiSchema } from './ui-schema-metaschema';

export class UiSchemaEditor extends HTMLElement {
  private dataObject: Object;
  private connected = false;
  private editor: JsonEditor;

  constructor() {
    super();
  }
  connectedCallback(): void {
    this.connected = true;
    this.render();
  }
  diconnectedCallback(): void {
    this.connected = false;
  }

  set data(data: Object) {
    if (this.editor !== undefined && this.editor !== null) {
      this.editor.data = data;

      return;
    }
    console.warn('Could not set data of ui schema editor because it has not been rendered, yet.');
  }

  get data(): Object {
    if (this.editor !== undefined && this.editor !== null) {
      return this.editor.data;
    }

    return null;
  }

  get schema(): JsonSchema {
    return uiSchema;
  }

  set referencedDataSchema(dataSchema: JsonSchema) {
    if (this.editor !== undefined && this.editor !== null) {
      this.editor.registerResource('dataSchema', dataSchema);

      return;
    }
    console.warn('Could not set the reference data schema of the ui schema editor.');
  }

  get referencedDataSchema() {
    if (this.editor !== undefined && this.editor !== null) {
      return JsonForms.resources.getResource('dataSchema');
    }
    console.warn('Could not set the reference data schema of the ui schema editor.');
  }

  private render() {
    if (!this.connected) {
      return;
    }
    if (this.editor === undefined) {
      this.editor = document.createElement('json-editor') as JsonEditor;
      this.editor.configure(uiSchemaEditorConfig);
    }

    this.appendChild(this.editor);
    // this.editor.registerResource('dataSchema', evaluationSchema);
  }
}

if (!customElements.get('uischema-editor')) {
  customElements.define('uischema-editor', UiSchemaEditor);
}
