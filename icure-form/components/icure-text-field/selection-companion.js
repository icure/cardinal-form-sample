"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionCompanion = void 0;
class SelectionCompanion {
    constructor(view, delay) {
        var _a, _b;
        this.delay = () => false;
        this.lastTime = 0;
        this.companion = document.createElement('div');
        this.companion.className = 'companion';
        (_b = (_a = view.dom) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(this.companion);
        this.delay = delay;
        this.update(view, undefined);
    }
    update(view, lastState) {
        const state = view.state;
        // Don't do anything if the document/selection didn't change
        if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection)) {
            return;
        }
        // Hide the companion if the selection is empty
        if (state.selection.empty) {
            this.companion.style.display = 'none';
            return;
        }
        // Otherwise, reposition it and update its content
        const { to } = state.selection;
        // These are in screen coordinates
        const end = view.coordsAtPos(to);
        this.display(end, (this.lastTime = +new Date()));
    }
    display(pos, time) {
        var _a;
        if (time !== this.lastTime)
            return;
        if (this.delay()) {
            setTimeout(() => this.display(pos, time), 100);
            return;
        }
        this.companion.style.display = '';
        const box = (_a = this.companion.offsetParent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (box) {
            this.companion.style.left = pos.right - box.left + 'px';
            this.companion.style.top = pos.top - box.top - 2 + 'px';
            this.companion.style.height = pos.bottom - pos.top + 2 + 'px';
            this.companion.textContent = '+';
        }
    }
    destroy() {
        this.companion.remove();
    }
}
exports.SelectionCompanion = SelectionCompanion;
//# sourceMappingURL=selection-companion.js.map