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
