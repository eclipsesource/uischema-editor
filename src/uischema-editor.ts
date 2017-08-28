/* tslint:disable:no-invalid-this */
import { JsonForms, JsonSchema } from 'jsonforms';
import { JsonEditor } from '@eclipsesource/jsoneditor';
import '@eclipsesource/jsoneditor';
import './materialized.tree.renderer';
import { imageMapping, labelMapping, modelMapping } from './uischema-config';
import { uiSchema } from '../local-schemas/ui-schema-metaschema';
import {
  categoryView,
  categorizationView,
  controlView,
  layoutView
} from './uischemata';

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
    this.dataObject = data;
    this.render();
  }

  get data(): Object {
    return this.dataObject;
  }

  get schema(): JsonSchema {
    // if (this.editor !== undefined && this.editor !== null) {
    //   return this.editor.schema;
    // }
    //
    // return undefined;
    return uiSchema;
  }
  private registerUiSchemas(): void {
    register(categoryView, '#category');
    register(categorizationView, '#categorization');
    register(controlView, '#control');
    register(layoutView, '#layout');
    register(layoutView, '#rootlayout');
    // const callback = uischemas => {
    //   register(uischemas.attribute_view, 'http://www.eclipse.org/emf/2002/Ecore#//EAttribute');
    //   register(uischemas.eclass_view, 'http://www.eclipse.org/emf/2002/Ecore#//EClass');
    //   register(uischemas.datatype_view, 'http://www.eclipse.org/emf/2002/Ecore#//EDataType');
    //   register(uischemas.enum_view, 'http://www.eclipse.org/emf/2002/Ecore#//EEnum');
    //   register(uischemas.epackage_view, 'http://www.eclipse.org/emf/2002/Ecore#//EPackage');
    //   register(uischemas.reference_view, 'http://www.eclipse.org/emf/2002/Ecore#//EReference');
    // };
    // this.loadFromRest('ecoreUiSchema', callback);
  }

  private configureLabelMapping() {
    this.editor.setLabelMapping(labelMapping);
  }

  private configureImageMapping() {
    this.editor.setImageMapping(imageMapping);
  }

  private configureModelMapping() {
    this.editor.setModelMapping(modelMapping);
  }

  private configureSchema() {
    this.editor.schema = uiSchema;
  }

  private render() {
    if (!this.connected || this.dataObject === undefined
        || this.dataObject === null) {
      return;
    }
    if (this.editor === undefined) {
      this.editor = document.createElement('json-editor') as JsonEditor;
    }

    // TODO comment in when configured
    // this.configureImageMapping();
    this.configureLabelMapping();
    // this.configureModelMapping();
    this.registerUiSchemas();
    this.configureSchema();

    // JsonForms.config.setIdentifyingProp('_id');
    this.editor.data = this.dataObject;
    this.appendChild(this.editor);
  }
}

// method to register ui schemas
const register = (uischema, id) => {
  JsonForms.uischemaRegistry.register(uischema, (schema, data) =>
    data.eClass === id || schema.properties !== undefined
    && schema.id !== undefined
    && schema.id === id ? 2 : -1);
};

if (!customElements.get('uischema-editor')) {
  customElements.define('uischema-editor', UiSchemaEditor);
}
