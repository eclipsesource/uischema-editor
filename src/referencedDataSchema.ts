export const referencedSchema = {
  type: 'object',
  properties: {
    str: { type: 'string' },
    obj: {
      type: 'object',
      properties: {
        cascStr: { type: 'string' },
        cascNum: { type: 'number' }
      }
    }
  },
  required: ['str']
};

export const evaluationSchema = {
  'type': 'object',
  'properties': {
    'firstName': { 'type': 'string' },
    'lastName': { 'type': 'string'},
    'email': { 'type': 'string', 'format': 'email' },
    'dateOfBirth': {
      'type': 'string',
      'format': 'date'
    },
    'timeOfRegistration': {
      'type': 'string',
      'format': 'date-time'
    },
    'gender': { 'type' : 'string', 'enum': ['Male', 'Female'] },
    'nationality': {
      'type': 'string',
      'enum': ['UK', 'US', 'German', 'French', 'Russian']
    },
    'alive': { 'type': 'boolean' },
    'address': {
      'properties': {
        'street': { 'type': 'string' },
        'street-number': { 'type': 'integer' },
        'city': { 'type': 'string'}
      }
    }
  },
  'required': ['lastName', 'email']
};
