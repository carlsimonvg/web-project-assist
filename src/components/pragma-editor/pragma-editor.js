import {customElement, bindable, inject} from 'aurelia-framework';
import screenTemplate from './../../../../templates/schema/screen-template.json.template!text';

require("codemirror/mode/javascript/javascript");
require("codemirror/addon/edit/closebrackets");
const codeMirror = require("codemirror");

@customElement('pragma-editor')
@inject(Element)
export class PragmaEditor {
    element = null;

    @bindable language;
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    attached() {
        const options = {
            mode: this.language,
            lineNumbers: true,
            autoCloseBrackets: true,
            extraKeys: {
                "Ctrl-Space": "autocomplete",
                "Ctrl-S": cm => {
                    this.save();
                }
            }
        };

        if (this.language == "json") {
            options.mode = {
                name: "javascript",
                json: true
            }
        }

        this.editor = codeMirror.fromTextArea(this.codearea, options);
        this.editor.getDoc().setValue(screenTemplate);
        this.save();
    }

    save() {
        this.value = this.editor.getDoc().getValue();
    }
}