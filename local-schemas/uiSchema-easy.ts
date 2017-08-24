export const uiSchemaEasy = {
  'definitions': {
    'control': {
      'id': '#control',
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'enum': ['Control']
        },
        'label': { 'type': 'string' },
        'scope': {
          'type': 'object',
          'properties': {
            '$ref': { 'type': 'string' }
          }
        },
        'readOnly': { 'type': 'boolean' }
      },
      'required': ['type', 'scope'],
      'additionalProperties': false
    },
    'layout': {
      'id': '#layout',
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'enum': ['VerticalLayout', 'HorizontalLayout', 'Group']
        },
        'label': { 'type': 'string' },
        // 'elements': { '$ref': '#/definitions/layout-elements' }
        'elements': {
          'type': 'array',
          'items': {
            'anyOf': [
              {'$ref': '#/definitions/control'},
              {'$ref': '#/definitions/layout'}
            ]
          }
        }
      },
      'required': ['type', 'elements'],
      'additionalProperties': false
    }
    // 'layout-elements': {
    //   'id': '#layout-elements',
    //   'type': 'array',
    //   'items': {
    //     'anyOf': [
    //       {'$ref': '#/definitions/control'},
    //       {'$ref': '#/definitions/layout'}
    //     ]
    //   }
    // }
  },
  'id': '#rootlayout',
  'type': 'object',
  'properties': {
    'type': {
      'type': 'string',
      'enum': ['VerticalLayout', 'HorizontalLayout', 'Group']
    },
    'label': { 'type': 'string' },
    'elements': {
      'type': 'array',
      'items': {
        'anyOf': [
          {'$ref': '#/definitions/control'},
          {'$ref': '#/definitions/layout'}
        ]
      }
    }
  },
  'required': ['type', 'elements'],
  'additionalProperties': false
};
