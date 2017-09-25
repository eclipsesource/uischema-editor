// tslint:disable:max-line-length
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
          },
          'required': ['$ref']
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
          'enum': ['VerticalLayout', 'HorizontalLayout']
        },
        // 'elements': { '$ref': '#/definitions/layout-elements' }
        'elements': {
          'type': 'array',
          'items': {
            'anyOf': [
              {'$ref': '#/definitions/control'},
              {'$ref': '#/definitions/layout'},
              {'$ref': '#/definitions/group'}
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
          {'$ref': '#/definitions/layout'},
          {'$ref': '#/definitions/group'}
        ]
      }
    }
  },
  'required': ['type', 'elements'],
  'additionalProperties': false
};

export const uiSchema = {
  'definitions': {
    'elements': {
      // 'id': '#elements',
      'type': 'array',
      'items': {
        'anyOf': [
          { '$ref': '#/definitions/categorization' },
          { '$ref': '#/definitions/control' },
          { '$ref': '#/definitions/group' },
          { '$ref': '#/definitions/layout' },
          { '$ref': '#/definitions/masterdetaillayout' }
        ]
      }
    },
    'label-object': {
      'id': '#labelobject',
      'type': 'object',
      'properties': {
        'text': { 'type': 'string' },
        'show': { 'type': 'boolean' }
      }
    },
    'with-label': {
      'id': 'withlabel',
      'type': 'object',
      'properties': {
        'label': {
          'anyOf': [
            { 'type': 'string' },
            { 'type': 'boolean' },
            { '$ref': '#/definitions/label-object' }
          ]
        }
      }
    },
    'condition': {
      'id': '#condition',
      'type': 'object',
      'properties': {
        'type': { 'type': 'string' },
        'scope': {
          'type': 'object',
          'properties': {
            '$ref': { 'type': 'string' }
          },
          'links': [{
            'rel': 'full',
            'href': 'rs://dataSchema/{$ref}',
            'targetSchema': {
              '$ref': 'http://json-schema.org/draft-04/schema#'
            }
          }]
        },
        'expectedValue': { 'type': ['string', 'integer', 'number', 'object', 'array'] }
      },
      'required': ['type', 'scope', 'expectedValue']
    },
    'rule-effect': {
      'type': 'string',
      'enum': ['HIDE', 'SHOW', 'ENABLE', 'DISABLE']
    },
    'rule': {
      'id': '#rule',
      'type': 'object',
      'properties': {
        'effect': { '$ref': '#/definitions/rule-effect' },
        'condition': { '$ref': '#/definitions/condition' }
      },
      'required': ['effect', 'condition']
    },
    'uischema': {
      'id': '#uischema',
      'type': 'object',
      'properties': {
        'label': {
          'anyOf': [
            { 'type': 'string' },
            { 'type': 'boolean' },
            { '$ref': '#/definitions/label-object' }
          ]
        },
        'type': { 'type': 'string' },
        'rule': { '$ref': '#/definitions/rule' }
      },
      'required': ['type']
    },
    'control': {
      'id': '#control',
      'type': 'object',
      'properties': {
        'label': {
          'anyOf': [
            { 'type': 'string' },
            { 'type': 'boolean' },
            { '$ref': '#/definitions/label-object' }
          ]
        },
        'type': { 'type': 'string', 'enum': ['Control'], default: 'Control' },
        'rule': { '$ref': '#/definitions/rule' },
        'scope': {
          'type': 'object',
          'properties': {
            '$ref': { 'type': 'string' }
          },
          'required': ['$ref'],
          'links': [{
            'rel': 'full',
            'href': 'rs://dataSchema/{$ref}',
            'targetSchema': {
              '$ref': 'http://json-schema.org/draft-04/schema#'
            }
          }]
        },
        'readOnly': { 'type': 'boolean' },
        'options': {
          'additionalProperties': { 'type': 'string' }
        }
      },
      'required': ['scope', 'type']
    },
    'layout': {
      'id': '#layout',
      'type': 'object',
      'properties': {
        'label': { 'type': 'string' },
        'type': {
          'type': 'string',
          'enum': ['VerticalLayout', 'HorizontalLayout'],
          'default': 'VerticalLayout'
        },
        'rule': { '$ref': '#/definitions/rule' },
        'elements': {
          'type': 'array',
          'items': {
            'anyOf': [
              { '$ref': '#/definitions/categorization' },
              { '$ref': '#/definitions/control' },
              { '$ref': '#/definitions/group' },
              { '$ref': '#/definitions/layout' },
              { '$ref': '#/definitions/masterdetaillayout' }
            ]
          }
        }
        // 'elements': { '$ref': '#/definitions/elements'}
      },
      'required': ['elements', 'type']
    },
    'group': {
      'id': '#group',
      'type': 'object',
      'properties': {
        'type': {
          'type': 'string',
          'enum': ['Group'],
          'default': 'Group'
        },
        'label': { 'type': 'string' },
        // 'elements': { '$ref': '#/definitions/layout-elements' }
        'elements': {
          'type': 'array',
          'items': {
            'anyOf': [
              { '$ref': '#/definitions/categorization' },
              { '$ref': '#/definitions/control' },
              { '$ref': '#/definitions/group' },
              { '$ref': '#/definitions/layout' },
              { '$ref': '#/definitions/masterdetaillayout' }
            ]
          }
        }
      },
      'required': ['type', 'elements'],
      'additionalProperties': false
    },
    'array-control': {
      'id': '#arraycontrol',
      'type': 'object',
      'properties': {
        'label': {
          'anyOf': [
            { 'type': 'string' },
            { 'type': 'boolean' },
            { '$ref': '#/definitions/label-object' }
          ]
        },
        'type': { 'type': 'string', 'enum': ['Control'] },
        'rule': { '$ref': '#/definitions/rule' },
        'scope': {
          'type': 'object',
          'properties': {
            '$ref': { 'type': 'string' }
          }
        },
        'readOnly': { 'type': 'boolean' },
        'columns': {
          'type': 'array',
          'items': {'$ref': '#/definitions/control' }
        },
        'options': {
          'type': 'object'
        }
      },
      'required': ['scope', 'type']
    },
    'category': {
      'id': '#category',
      'type': 'object',
      'properties': {
        'label': { 'type': 'string' },
        'type': { 'type': 'string', 'enum': ['Category'], 'default': 'Category' },
        'rule': { '$ref': '#/definitions/rule' },
        'elements': {
          '$ref': '#/definitions/elements'
        }
      },
      'required': ['elements', 'label', 'type']
    },
    'categorization': {
      'id': '#categorization',
      'type': 'object',
      'properties': {
        'label': { 'type': 'string' },
        'type': { 'type': 'string', 'enum': ['Categorization'], 'default': 'Categorization' },
        'rule': { '$ref': '#/definitions/rule' },
        'elements': {
          'type': 'array',
          'items': {
            'anyOf': [
              { '$ref': '#/definitions/category' },
              { '$ref': '#/definitions/categorization' }
            ]
          }
        }
      },
      'required': ['elements', 'label', 'type']
    },
    'masterdetaillayout': {
      'id': '#masterdetaillayout',
      'type': 'object',
      'properties': {
        'label': {
          'anyOf': [
            { 'type': 'string' },
            { 'type': 'boolean' },
            { '$ref': '#/definitions/label-object' }
          ]
        },
        'type': {
          'type': 'string',
          'enum': ['MasterDetailLayout'],
          'default': 'MasterDetailLayout'
        },
        'rule': { '$ref': '#/definitions/rule' },
        'scope': {
          'type': 'object',
          'properties': {
            '$ref': { 'type': 'string' }
          },
          'required': ['$ref'],
          'links': [{
            'rel': 'full',
            'href': 'rs://dataSchema/{$ref}',
            'targetSchema': {
              '$ref': 'http://json-schema.org/draft-04/schema#'
            }
          }]
        }
      },
      'required': ['scope', 'type']
    }
  },
  // ref is illegal for root element
  'id': '#rootlayout',
  'type': 'object',
  'properties': {
    'label': { 'type': 'string' },
    'type': {
      'type': 'string',
      'enum': ['VerticalLayout', 'HorizontalLayout', 'Group'],
      'default': 'VerticalLayout'
    },
    'rule': { '$ref': '#/definitions/rule' },
    'elements': {
      '$ref': '#/definitions/elements'
    }
  },
  'required': ['elements', 'type']
};
