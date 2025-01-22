"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInterpreter = void 0;
const makeInterpreter = () => {
    const sb = new Map();
    const cs = new Map();
    return (formula, sandbox) => {
        function compileCode(src) {
            if (cs.has(src)) {
                return cs.get(src);
            }
            src = 'with (sandbox) {' + src + '}';
            const code = new Function('sandbox', src);
            const wrapper = function (sandbox) {
                if (!sb.has(sandbox)) {
                    const sandboxProxy = new Proxy(sandbox, { has, get });
                    sb.set(sandbox, sandboxProxy);
                }
                return code(sb.get(sandbox));
            };
            cs.set(src, wrapper);
            return wrapper;
        }
        function has() {
            return true;
        }
        function get(target, key) {
            if (key === Symbol.unscopables)
                return undefined;
            return target[key];
        }
        let compiledCode;
        try {
            compiledCode = compileCode(formula);
        }
        catch (e) {
            console.info('Invalid Formula: ' + formula);
            return undefined;
        }
        try {
            const result = compiledCode(sandbox);
            return result;
        }
        catch (e) {
            console.info('Error while executing formula: ' + formula, e);
            return undefined;
        }
    };
};
exports.makeInterpreter = makeInterpreter;
//# sourceMappingURL=interpreter.js.map