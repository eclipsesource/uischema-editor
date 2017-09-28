import { EditorConfiguration } from '@eclipsesource/jsoneditor';
import { uiSchema } from './ui-schema-metaschema';
import { schemaFourMod } from './schema-modified';
import { evaluationSchema } from './referencedDataSchema';
import {
  categoryView,
  categorizationView,
  controlView,
  groupView,
  layoutView,
  treeMasterDetailView
} from './uischemata';

const labelMapping = {
  '#control': 'label',
  // '#control': 'type',
  '#rootlayout': 'type',
  '#layout': 'type',
  '#categorization': 'label',
  '#category': 'label',
  '#masterdetaillayout': 'type',
  '#group': 'label'
};

const imageMapping = {
  '#control': 'control',
  '#group': 'group',
  '#masterdetaillayout': 'masterdetaillayout',
  '#layout': 'layout',
  '#rootlayout': 'view',
  '#categorization': 'categorization',
  '#category': 'category'
};

const modelMapping = {
  'attribute': 'type',
  'mapping': {
    'Control': '#control',
    'MasterDetailLayout': '#masterdetaillayout',
    'Category': '#category',
    'Categorization': '#categorization',
    'VerticalLayout': '#layout',
    'HorizontalLayout': '#layout',
    'Group': '#group'
  }
};

export const uiSchemaEditorConfig: EditorConfiguration = {
  dataSchema: uiSchema,
  labelMapping: labelMapping,
  imageMapping: imageMapping,
  modelMapping: modelMapping,
  detailSchemata: {
    '#category': categoryView,
    '#categorization': categorizationView,
    '#control': controlView,
    '#group': groupView,
    '#layout': layoutView,
    '#rootlayout': layoutView,
    '#masterdetaillayout': treeMasterDetailView
  },
  resources: {
    'json-schema-04': schemaFourMod
  }
};
