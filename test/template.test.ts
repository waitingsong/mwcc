import { template } from '../src/template';
import assert = require('assert');
import ts = require('typescript');
import { getCode } from '../src/util';

describe('template', () => {
  it('should replace identifier', () => {
    const buildRequire = template('var IMPORT_NAME = require(SOURCE);');
    assert(buildRequire);

    const stmt = buildRequire({
      IMPORT_NAME: ts.createIdentifier('myModule'),
      SOURCE: ts.createStringLiteral('my-module'),
    })[0];

    assert(ts.isVariableStatement(stmt));

    const decl = stmt.declarationList.declarations[0];
    assert(ts.isVariableDeclaration(decl));
    assert(ts.isIdentifier(decl.name));
    assert.strictEqual(decl.name.text, 'myModule');

    assert(decl.initializer);
    assert(ts.isCallExpression(decl.initializer));
    const arg1 = decl.initializer.arguments[0];
    assert(ts.isStringLiteral(arg1));
    assert.strictEqual(arg1.text, 'my-module');

    assert.strictEqual(getCode(stmt), 'var myModule = require("my-module");');
  });
});
