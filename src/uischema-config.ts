export const labelMapping = {
  '#control': 'label',
  // '#control': 'type',
  '#rootlayout': 'type',
  '#layout': 'type',
  '#categorization': 'label',
  '#category': 'label',
  '#masterdetaillayout': 'type',
  '#group': 'label'
};

export const imageMapping = {
  '#control': 'control',
  '#group': 'group',
  '#masterdetaillayout': 'masterdetaillayout',
  '#layout': 'layout',
  '#rootlayout': 'view',
  '#categorization': 'categorization',
  '#category': 'category'
};

export const modelMapping = {
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
