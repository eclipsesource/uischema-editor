import { Editor } from '@eclipsesource/jsoneditor';
import * as _ from 'lodash';

const filterOutInvalidRules = data => {
  if (typeof data === 'string') {
    return;
  }
  Object.keys(data).forEach(key => {
    if (key === 'rule') {
      const condition = data[key]['condition'];
      if (condition.hasOwnProperty('scope') && _.isEmpty(condition['scope'])) {
        const scope = condition['scope'];
        if (_.isEmpty(scope)) {
          data[key] = undefined;
        }
      }
    } else {
      filterOutInvalidRules(data[key]);
    }
  });
};

export const configureUISchemaExportButton =
   (editor: Editor,
    exportButton: HTMLElement,
    exportDialog) => {
      exportButton.onclick = () => {
        const cloned = _.cloneDeep(editor.data);
        filterOutInvalidRules(cloned);
        const json = JSON.stringify(cloned, null, 2);
        const textarea =
          exportDialog.getElementsByTagName('textarea').item(0) as HTMLTextAreaElement;
        textarea.textContent = json;
        exportDialog.showModal();
        textarea.focus();
        textarea.select();
     };
};

/**
 * Configures the given button to allow uploading data as a file from the given editor.
 *
 * @param {Editor} editor The editor for which data is uploaded
 * @param {HTMLElement} downloadButton The button that will trigger the download
 */
export const configureUISchemaDownloadButton = (editor: Editor, downloadButton: HTMLElement) => {
  downloadButton.onclick = () => {
    const a = document.createElement('a');
    const cloned = _.cloneDeep(editor.data);
    filterOutInvalidRules(cloned);
    const file = new Blob([JSON.stringify(cloned, null, 2)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'download.json';
    a.click();
  };
};
