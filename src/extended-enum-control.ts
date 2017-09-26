import { and, RankedTester, rankWith, schemaMatches, uiTypeIs } from 'jsonforms';
import { ControlElement } from 'jsonforms';
import { resolveSchema } from 'jsonforms';
import { JsonFormsRenderer } from 'jsonforms';
import { EnumControl } from 'jsonforms';
import * as _ from 'lodash';

/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumControlTester: RankedTester = rankWith(5, and(
    uiTypeIs('Control'),
    schemaMatches(schema => schema.hasOwnProperty('enum'))
  ));

/**
 * Enum Control showing a label when no option was selected, yet.
 */
@JsonFormsRenderer({
  selector: 'jsonforms-labelenum',
  tester: enumControlTester
})
export class ExtendedEnumControl extends EnumControl {
  protected configureInput(input: HTMLSelectElement): void {

    const propertySchema = resolveSchema(
        this.dataSchema,
        (this.uischema as ControlElement).scope.$ref
    );

    const options = propertySchema.enum;
    if (propertySchema.default === undefined) {
      // add default option which is displayed if no reference target has been selected
      const defaultOption = document.createElement('option');
      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.hidden = true;
      defaultOption.innerText = 'Select Value...';
      input.appendChild(defaultOption);
    }

    options.forEach(optionValue => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.label = optionValue;
      option.innerText = optionValue;
      input.appendChild(option);
    });
  }
}
