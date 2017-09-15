import {
  RankedTester, rankWith, uiTypeIs, schemaMatches, and, JsonFormsRenderer,
  Renderer, RUNTIME_TYPE, Runtime, resolveSchema,
  ControlElement, JsonFormsElement, getElementLabelObject, JsonSchema, DataChangeListener
} from 'jsonforms';
/**
 * Default tester for a categorization.
 * @type {RankedTester}
 */
export const objectTester: RankedTester = rankWith(20, and(
  uiTypeIs('Control'),
  schemaMatches(schema => schema.additionalProperties instanceof Object)
));
@JsonFormsRenderer({
  selector: 'jsonforms-additionalproperties',
  tester: objectTester
})
export class AdditionalPropertiesRenderer extends Renderer implements DataChangeListener {
  private static ADHOC_VAR_REGEX = /\{([a-zA-Z0-9:.-]+)\}/g;
  private master: HTMLUListElement;
  private detail: HTMLDivElement;
  private selected: HTMLLIElement;
  private resolvedSchema: JsonSchema;

  private static unique = (value, index, self) => self.indexOf(value) === index;
  private static removeBraces = (variable) => variable.replace(/[\{\}]*/g, '');

  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  dispose(): void {
    // Do nothing
  }
  /**
   * @inheritDoc
   */
  runtimeUpdated(type: RUNTIME_TYPE): void {
    const runtime = this.uischema.runtime as Runtime;
    switch (type) {
      case RUNTIME_TYPE.VISIBLE:
        this.hidden = !runtime.visible;
        break;
      case RUNTIME_TYPE.ENABLED:
        if (!runtime.enabled) {
          this.setAttribute('disabled', 'true');
        } else {
          this.removeAttribute('disabled');
        }
        break;
      default:
    }
  }

  /**
   * @inheritDoc
   */
  render(): HTMLElement {
    const controlElement = this.uischema as ControlElement;
    this.resolvedSchema = resolveSchema(this.dataSchema,
                                        (this.uischema as ControlElement).scope.$ref)
                                          .additionalProperties as JsonSchema;
    const header = document.createElement('div');
    header.className = 'jsonforms-additionalproperties_header';
    this.appendChild(header);
    const label = document.createElement('label');
    const labelObject = getElementLabelObject(this.dataSchema, controlElement);
    if (labelObject.show) {
      label.textContent = labelObject.text;
    }
    header.appendChild(label);

    const content = document.createElement('div');
    this.appendChild(content);
    content.className = 'jsonforms-additionalproperties_content';
    this.master = document.createElement('ul');
    this.master.className = 'jsf-additionalproperties-master';
    content.appendChild(this.master);

    this.detail = document.createElement('div');
    this.detail.className = 'jsf-additionalproperties-detail';
    content.appendChild(this.detail);

    const dialog = document.createElement('dialog');
    {
      const keyLabel = document.createElement('label');
      keyLabel.textContent = 'Set new key:';
      dialog.appendChild(keyLabel);
      const input = document.createElement('input');
      input.type = 'text';
      dialog.appendChild(input);

      const validationLabel = document.createElement('label');
      dialog.appendChild(validationLabel);

      const button = document.createElement('button');
      button.textContent = 'Finish';
      input.oninput = () => {
        // tslint:disable:no-shadowed-variable
        const data = this.dataService.getValue(controlElement);
        // tslint:enable:no-shadowed-variable
        button.removeAttribute('disabled');
        validationLabel.textContent = null;
        const key = input.value;
        if (data && data.hasOwnProperty(key)) {
          validationLabel.textContent = `The object has already a property: '${key}'.`;
          button.setAttribute('disabled', 'true');
        }
      };
      button.onclick = () => {
        // tslint:disable:no-shadowed-variable
        const data = this.dataService.getValue(controlElement);
        // tslint:enable:no-shadowed-variable
        const key = input.value;
        this.addProperty(data, key);
        input.value = null;
        dialog['close']();
      };
      dialog.appendChild(button);
    }
    header.appendChild(dialog);
    const buttons = document.createElement('div');

    const addEntry = document.createElement('button');
    addEntry.textContent = 'Add Entry';
    addEntry.onclick = () => dialog['showModal']();
    buttons.appendChild(addEntry);
    const removeEntry = document.createElement('button');
    removeEntry.textContent = 'Remove Entry';
    removeEntry.onclick = () => {
      if (this.selected) {
        const dataObject = this.dataService.getValue(controlElement);
        delete dataObject[this.selected.textContent];
        this.selected.remove();
        this.selected = undefined;
        this.cleanDetail();
        this.selectFirst(data);
      } else {
        console.log('nothing selected');
      }
    };
    buttons.appendChild(removeEntry);
    header.appendChild(buttons);

    const data = this.dataService.getValue(controlElement);
    if (data) {
      Object.keys(data).forEach(key => {
        this.createEntry(data, key);
      });
      this.selectFirst(data);
    }

    return this;
  }

  // specifc code, should be moved
  needsNotificationAbout(uiSchema: ControlElement): boolean {
    return uiSchema !== null;
  }
  dataChanged(controlElement: ControlElement, newValue: any, data: any): void {
    this.updateAdhocVariables(data);
  }

  private addProperty(data: Object, key: string) {
    if (!data) {
      data = {};
      this.dataService.notifyAboutDataChange(this.uischema as ControlElement, data);
    }
    switch (this.resolvedSchema.type) {
      case 'object': data[key] = {}; break;
      case 'string': data[key] = ''; break;
    }
    this.createEntry(data, key, true);
  }
  private selectFirst(data: Object): void {
    const toSelect = this.master.firstElementChild as HTMLLIElement;
    if (toSelect) {
      this.renderDetail(toSelect, data, Object.keys(data)[0]);
    }
  }
  private createEntry(data: Object, key: string, select = false): void {
    const entry = document.createElement('li');
    entry.textContent = key;
    this.master.appendChild(entry);
    entry.onclick = (ev: Event) => {
      this.renderDetail(entry, data, key);
    };
    if (select) {
      this.renderDetail(entry, data, key);
    }
  }

  private cleanDetail(): void {
    if (this.detail.hasChildNodes()) {
      while (this.detail.firstChild) {
        this.detail.removeChild(this.detail.firstChild);
      }
    }
  }

  private renderDetail(toselect: HTMLLIElement, data: Object, key: string): void {
    if (this.selected !== undefined) {
      this.selected.classList.toggle('selected');
    }
    toselect.classList.toggle('selected');
    this.selected = toselect;

    this.cleanDetail();
    const jsonForms = document.createElement('json-forms') as JsonFormsElement;
    if (typeof data[key] === 'object') {
      jsonForms.data = data[key];
      const resolvedSchema = resolveSchema(this.dataSchema,
                  (this.uischema as ControlElement).scope.$ref).additionalProperties as JsonSchema;
      jsonForms.dataSchema = resolvedSchema;
    } else {
      jsonForms.data = data;
      jsonForms.uiSchema = {
        type: 'Control',
        scope: { $ref: '#/properties/' + key, label: { show: false } }
      } as ControlElement;
    }
    jsonForms.addDataChangeListener(this);
    this.detail.appendChild(jsonForms);
  }

  private updateAdhocVariables(currentVariables) {
    const usedVariables = this.extractUsedAdhocVariables(currentVariables);
    if (usedVariables.length === 0) {
      return;
    }
    const declaredVariables = Object.keys(currentVariables);
    // add so far undeclared variables
    const undeclaredVariables =
      usedVariables.filter(usedVariable => declaredVariables.indexOf(usedVariable) === -1);
    undeclaredVariables
      .forEach(undeclaredVariable => this.addProperty(currentVariables, undeclaredVariable));

    // remove unused variables
    // TODO how to find variables which are not dynamic? do they have a prefix?
    // var unusedVariables = declaredVariables.filter(currentVariable =>
    //   !usedVariables.includes(currentVariable.name));
    // unusedVariables.forEach(unusedVariable =>
    //   currentVariables.splice(currentVariables.indexOf(unusedVariable), 1));
  }
  private extractUsedAdhocVariables(obj: any) {
    const values = Object.keys(obj).map(key => obj[key]);
    const simpleValues = values.filter(value => typeof value !== 'object');
    const valuesWithVariables =
      values.map(value => String(value).match(AdditionalPropertiesRenderer.ADHOC_VAR_REGEX));
    const variables = valuesWithVariables
                        .filter(Array.isArray)
                        .reduce((acc, val) => acc.concat(val), [])
                        .filter(AdditionalPropertiesRenderer.unique);
    return variables.map(AdditionalPropertiesRenderer.removeBraces);
  }
}
