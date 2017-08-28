// tslint:disable:max-line-length
export const layoutView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/type' }
    },
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/label' },
      'rule': {
        'effect': 'SHOW',
        'condition': {
          'scope': { '$ref': '#/properties/type' },
          'expectedValue': 'Group'
        }
      }
    }
    // {
    //   'type': 'Group',
    //   'label': 'Rule Configuration',
    //   'elements': [
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/effect' }
    //     },
    //     // {
    //     //   'type': 'Control',
    //     //   'scope': { '$ref': '#/properties/rule/properties/condition/properties/type' }
    //     // },
    //     {
    //       'label': 'Scope',
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/scope/properties/ref' }
    //     },
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/expectedValue' }
    //     }
    //   ]
    // }
  ]
};

export const controlView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/label' }
    },
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/type' }
    },
    {
      'type': 'Control',
      'label': 'Scope',
      'scope': { '$ref': '#/properties/scope/properties/$ref' }
    },
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/readOnly' }
    }
    // {
    //   'type': 'Group',
    //   'label': 'Rule Configuration',
    //   'elements': [
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/effect' }
    //     },
    //     // {
    //     //   'type': 'Control',
    //     //   'scope': { '$ref': '#/properties/rule/properties/condition/properties/type' }
    //     // },
    //     {
    //       'label': 'Scope',
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/scope/properties/$ref' }
    //     },
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/expectedValue' }
    //     }
    //   ]
    // }
  ]
};

export const categoryView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/label' }
    },
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/type' }
    }
    // {
    //   'type': 'Group',
    //   'label': 'Rule Configuration',
    //   'elements': [
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/effect' }
    //     },
    //     // {
    //     //   'type': 'Control',
    //     //   'scope': { '$ref': '#/properties/rule/properties/condition/properties/type' }
    //     // },
    //     {
    //       'label': 'Scope',
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/scope/properties/$ref' }
    //     },
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/expectedValue' }
    //     }
    //   ]
    // }
  ]
};

export const categorizationView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/label' }
    },
    {
      'type': 'Control',
      'scope': { '$ref': '#/properties/type' }
    }
    // {
    //   'type': 'Group',
    //   'label': 'Rule Configuration',
    //   'elements': [
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/effect' }
    //     },
    //     // {
    //     //   'type': 'Control',
    //     //   'scope': { '$ref': '#/properties/rule/properties/condition/properties/type' }
    //     // },
    //     {
    //       'label': 'Scope',
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/scope/properties/$ref' }
    //     },
    //     {
    //       'type': 'Control',
    //       'scope': { '$ref': '#/properties/rule/properties/condition/properties/expectedValue' }
    //     }
    //   ]
    // }
  ]
};
