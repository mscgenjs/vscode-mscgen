const test = require("tape");
const fixtures = require("./mscgen.fixtures.json");

const Registry = require("vscode-textmate").Registry;
const registry = new Registry();
const grammar = registry.loadGrammarFromPathSync("syntaxes/mscgen.tmLanguage.json");

const wok = pScopes => {
    return pScopes.map(pScope => `"${pScope}"`).join(", ");
}

test("mscgen", function (t) {
    fixtures.forEach(pFixture => {
        let lTokens = grammar.tokenizeLine(pFixture.input).tokens;
        // lTokens.forEach(pToken => console.log(`{ "startIndex": ${pToken.startIndex}, "endIndex": ${pToken.endIndex}, "scopes": [ ${wok(pToken.scopes)} ] },`))
        t.deepEqual(lTokens, pFixture.output, pFixture.name);
    })
    t.end();
});


