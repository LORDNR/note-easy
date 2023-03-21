"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("./data/dictionary"));
class Filter {
    words;
    /**
     *
     */
    constructor(config) {
        let words = dictionary_1.default.english;
        if (config) {
            const languagesChecks = new Set(config?.languages);
            if (languagesChecks.size !== 0) {
                languagesChecks.forEach((lang) => {
                    words = [...words, ...dictionary_1.default[lang]];
                });
            }
        }
        this.words = new Set(words);
    }
    /**
     *
     * @param value
     * @returns
     */
    isProfane(value) {
        let sanitizedValue = value;
        for (const word of this.words) {
            const wordExp = new RegExp(`${word.replace(/(\W)/g, '\\$1')}`, 'gi');
            sanitizedValue = sanitizedValue.replace(wordExp, '*'.repeat(word.length));
        }
        return sanitizedValue;
    }
}
exports.default = Filter;
//# sourceMappingURL=Filter.js.map