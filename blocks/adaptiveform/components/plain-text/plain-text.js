
import { getViewId } from "../../libs/afb-model.js";
import { subscribe } from "../../libs/afb-interaction.js";
import { Constants } from "../../libs/constants.js";
import * as builder from "../../libs/afb-builder.js";

export class PlainText {

    blockName = Constants.TEXT;
    block;
    element;
    model;

    constructor(block, model) {
        this.block = block;
        this.model = model;
    }

    renderField = () => {
        let state = this.model.getState();
        
        let element = builder?.default?.createWidgetWrapper(state, this.blockName);

        let child = document.createElement("div");
        child.className = this.blockName + "__widget";
        child.tabIndex = 0;
        child.textContent = state?.value;
        element.append(child);
        return element;
    }

    render() {
        this.element = this.renderField()
        this.block.appendChild(this.element);
        subscribe(this.model, this.element);
    }
}

export default async function decorate(block, model) {
    let text = new PlainText(block, model);
    text.render();
}
