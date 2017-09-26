import * as _ from 'lodash';

// import { JsonForms } from '../../core';
// import { BaseControl } from './base.control';
// import { ReferenceProperty } from '../../core/schema.service';
// import { ControlElement } from '../../models/uischema';
// import { resolveSchema } from '../../path.util';
import { JsonForms } from 'jsonforms';
import { BaseControl } from 'jsonforms';
import { ReferenceProperty } from 'jsonforms';
import { ControlElement } from 'jsonforms';
import { resolveSchema } from 'jsonforms';
import { RankedTester } from 'jsonforms';
import { JsonFormsRenderer } from 'jsonforms';
import { and, optionIs, rankWith, uiTypeIs, schemaMatches } from 'jsonforms';
import { JsonSchema } from 'jsonforms';



export const refPathTester: RankedTester = rankWith(20, and(
  uiTypeIs('Control'),
  optionIs('reference-control', 'path')
));
/**
 * Reference Control for path based referencing.
 * Use by setting key 'reference-control' with value 'path' as option on the control
 * describing the property containing the reference
 */
 @JsonFormsRenderer({
   selector: 'jsonforms-referencepath',
   tester: refPathTester
 })
export class ReferencePathControl extends BaseControl<HTMLSelectElement> {

  protected configureInput(input: HTMLSelectElement): void {
    this.addOptions(input);
  }

  protected get valueProperty(): string {
    return 'value';
  }

  protected get inputChangeProperty(): string {
    return 'onchange';
  }

  protected createInputElement(): HTMLSelectElement {
    return document.createElement('select');
  }

  protected convertModelValue(value: any): any {
    return (value === undefined || value === null) ? undefined : value.toString();
  }

  protected convertInputValue(value: any): any {
    // TODO validate that path exists
    return value;
  }

  /**
   * Returns the label of the default option.
   * Might be overwritten by implementing classes to change the label.
   *
   * @return the label of the default option.
   */
  protected getDefaultOptionLabel(): string {
    return 'Select Reference Path...';
  }

  /**
   * Adds all possible reference targets as options to the control's combo box.
   */
  protected addOptions(input) {
    const schema = this.getPropertySchema(this.uischema, this.dataSchema);

    // TODO properly retrieve property
    const referenceProperty: ReferenceProperty =
      _.head(JsonForms.schemaService.getReferenceProperties(schema));

    const referencees = referenceProperty.findReferenceTargets();

    // add default option which is displayed if no reference target has been selected
    const defaultOption = document.createElement('option');
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.hidden = true;
    defaultOption.innerText = this.getDefaultOptionLabel();
    input.appendChild(defaultOption);

    // add an option for every possible reference target
    Object.keys(referencees).forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.label = key;
      option.innerText = key;
      input.appendChild(option);
    });

    input.classList.add('form-control');
  }

  protected getPropertySchema(uischema, dataSchema): JsonSchema {
    const ref = (uischema as ControlElement).scope.$ref;
    const refSegments = ref.split('/');
    let schema;
    if (refSegments.length >= 3) {
      const schemaPath = refSegments.slice(0, -2).join('/');
      schema = resolveSchema(dataSchema, schemaPath);
    } else {
      schema = this.dataSchema;
    }
    return schema;
  }
}
