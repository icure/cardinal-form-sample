"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionPalette = void 0;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
class SuggestionPalette {
    constructor(schema, view, suggestionProvider, suggestionStopWordsProvider, delay) {
        var _a, _b;
        this.delay = () => false;
        this.lastTime = 0;
        this.hasFocus = false;
        this.suggestions = [];
        this.schema = schema;
        this.suggestionStopWordsProvider = suggestionStopWordsProvider;
        this.suggestionProvider = suggestionProvider;
        this.palette = document.createElement('div');
        this.palette.className = 'suggestion-palette';
        (_b = (_a = view.dom) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(this.palette);
        delay && (this.delay = delay);
        this.update(view, undefined);
    }
    focusItem(idx) {
        const ul = this.palette.getElementsByTagName('ul')[0];
        if (ul) {
            ul.classList.add('focused');
            const lis = ul.getElementsByTagName('li');
            this.currentFocus !== undefined && lis[this.currentFocus].classList.remove('focused');
            idx !== undefined && lis[idx].classList.add('focused');
            this.currentFocus = idx;
        }
    }
    focus() {
        if (this.palette.style.display === 'none')
            return false;
        this.hasFocus = true;
        this.focusItem(0);
        return true;
    }
    focusOrInsert(view, transactionProvider) {
        if (this.palette.style.display === 'none')
            return false;
        return this.hasFocus ? this.insert(view, transactionProvider) : this.focus();
    }
    insert(view, transactionProvider) {
        if (this.palette.style.display === 'none' || !this.hasFocus || this.currentFocus === undefined)
            return false;
        const sug = this.suggestions[this.currentFocus];
        if (sug) {
            const sel = view.state.selection;
            const stopWords = this.suggestionStopWordsProvider();
            let length = sug.terms.join(' ').length - 1;
            while (sel.to - length >= 0 &&
                !(0, fast_deep_equal_1.default)(view.state.doc
                    .textBetween(sel.to - length, sel.to)
                    .split(/\s+/)
                    .filter((x) => !stopWords.has(x)), sug.terms)) {
                length++;
            }
            if (length > sel.to) {
                length = sug.terms.join(' ').length;
                while (sel.to - length >= 0 && !view.state.doc.textBetween(sel.to - length, sel.to).startsWith(sug.terms[0])) {
                    length++;
                }
            }
            if (length <= sel.to) {
                transactionProvider(sel.to - length, sel.to, sug).then((tr) => tr && view.dispatch(tr.scrollIntoView()));
            }
            this.palette.style.display = 'none';
            return true;
        }
        return false;
    }
    arrowUp() {
        if (!this.hasFocus)
            return false;
        this.currentFocus && this.focusItem(this.currentFocus - 1);
        return true;
    }
    arrowDown() {
        if (!this.hasFocus)
            return false;
        this.currentFocus !== undefined && this.currentFocus < this.palette.getElementsByTagName('ul')[0].childElementCount - 1 && this.focusItem(this.currentFocus + 1);
        return true;
    }
    update(view, lastState) {
        const state = view.state;
        // Hide the palette if the selection is not empty
        this.focusItem(undefined);
        this.hasFocus = false;
        if (!state.selection.empty) {
            this.palette.style.display = 'none';
            return;
        }
        const $pos = state.selection.$head;
        if ((lastState === null || lastState === void 0 ? void 0 : lastState.doc.textContent) === state.doc.textContent) {
            this.palette.style.display = 'none';
            return;
        }
        const text = state.doc.textBetween($pos.pos && $pos.depth ? $pos.before() + 1 : 0, $pos.pos);
        const words = text.split(/\s+/);
        const lastWordDelta = Math.min(words
            .concat()
            .reverse()
            .reduce((d, w) => (d < 0 ? d : w.length ? -d - w.length : d + 1), 0), -1);
        console.log('lwd', lastWordDelta);
        if ($pos.pos > 1 && state.doc.rangeHasMark($pos.pos + lastWordDelta, $pos.pos, this.schema.marks['link'])) {
            console.log('Skip suggestion');
            this.palette.style.display = 'none';
            return;
        }
        const terms = words.filter((x) => x.length > 2 && !this.suggestionStopWordsProvider().has(x));
        const lastTerms = terms.length > 3 ? terms.slice(length - 3) : terms;
        const fingerprint = lastTerms.join(' ');
        const { to } = state.selection;
        if (this.previousFingerprint !== fingerprint) {
            this.previousFingerprint = fingerprint;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (this.previousFingerprint !== fingerprint)
                    return;
                const res = yield this.suggestionProvider(lastTerms);
                this.suggestions = res;
                if (res.length) {
                    this.palette.innerHTML = `<ul>${res
                        .map((x) => `<li id="${x.id}" data-code="${x.code}">${x.text}<div class="icn-container"><svg class="tab-icn" viewBox="0 0 24 24"><path d="M12.29 8.12L15.17 11H2c-.55 0-1 .45-1 1s.45 1 1 1h13.17l-2.88 2.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L13.7 6.7c-.39-.39-1.02-.39-1.41 0-.38.39-.39 1.03 0 1.42zM20 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg><svg class="return-icn" viewBox="0 0 24 24"><path d="M19 8v3H5.83l2.88-2.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L2.71 11.3c-.39.39-.39 1.02 0 1.41L7.3 17.3c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.83 13H20c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg></div></li>`)
                        .join('\n')}</ul>`;
                    // These are in screen coordinates
                    const end = view.coordsAtPos(to);
                    const start = view.coordsAtPos(Math.max(0, to - terms[terms.length - 1].length));
                    this.display(start.left > end.left ? end : start, (this.lastTime = +new Date()));
                }
                else {
                    this.palette.style.display = 'none';
                }
            }), 30);
        }
    }
    display(pos, time) {
        var _a;
        if (time !== this.lastTime)
            return;
        if (this.delay()) {
            setTimeout(() => this.display(pos, time), 100);
            return;
        }
        this.palette.style.display = '';
        const box = (_a = this.palette.offsetParent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const palBox = this.palette.getBoundingClientRect();
        if (box) {
            this.palette.style.left = Math.max(0, Math.min(pos.left - box.left - 12, box.width - palBox.width)) + 'px';
            this.palette.style.top = pos.bottom - box.top + 4 + 'px';
        }
    }
    destroy() {
        this.palette.remove();
    }
}
exports.SuggestionPalette = SuggestionPalette;
//# sourceMappingURL=suggestion-palette.js.map