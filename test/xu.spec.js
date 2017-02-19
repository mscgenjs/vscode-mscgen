const test = require("tape");


const Registry = new require("vscode-textmate").Registry;
const registry = new Registry();
const grammar = registry.loadGrammarFromPathSync("syntaxes/xu.tmLanguage.json");

const replaceMscgenExtensionWithXu = (pFixture) => {
    let lFixture = Object.assign(
        {},
        pFixture
    );

    lFixture.output = pFixture.output.map( pToken => 
        (
            {
                startIndex: pToken.startIndex,
                endIndex: pToken.endIndex,
                scopes: pToken.scopes.map(pScope => pScope.replace(/\.mscgen$/g, ".xu"))
            }
        )
    );
    return lFixture;
};

const fixtures = require("./mscgen.fixtures.json").map(replaceMscgenExtensionWithXu);

test("xu - mscgen compatibles", function (t) {
    fixtures.forEach(pFixture => {
        let lTokens = grammar.tokenizeLine(pFixture.input).tokens;
        t.deepEqual(lTokens, pFixture.output, pFixture.name);
    })
    t.end();
});


