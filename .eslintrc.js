module.exports = {
	extends: 'eslint:recommended',
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: '6',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	ecmaFeatures: {
		jsx: true,
		modules: true
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	plugins: [
		'import',
		'react'
	],
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': 'webpack'
	},
	rules: {
		// require file to end with single newline
		'eol-last': 'error',
		// use the type-safe equality operators === and !== instead of their regular counterparts == and !=
		'eqeqeq': 'error',
		// If a variable is never reassigned, using the const declaration is better
		'prefer-const': 'error',
		// disallow trailing spaces at the end of lines
		'no-trailing-spaces': 'error',
		// disallow the space around a semicolon
		'semi-spacing': 'error',
		// require space before blocks
		'space-before-blocks': ['error', { 'keywords': 'always' }],
		// require space before and after arrow function's arrow
		'arrow-spacing': ['error', { 'before': true, 'after': true }],
		// enforces spacing after commas
		'comma-spacing': ['error', {'before': false, 'after': true}],
		// we don't want trailing commas in our object literals
		'comma-dangle': ['error', 'never'],
		// prevent importing from the same module on multiple lines
		'no-duplicate-imports': 'error',
		// disallow mixed spaces and tabs for indentation
		'no-mixed-spaces-and-tabs': 'error',
		// don't assign something in a return statement
		'no-return-assign': 'error',
		// don't concat two literals, just write them as one
		'no-useless-concat': 'error',
		// semicolons must be used any place where they are valid.
		'semi': ['error', 'always'],
		// 'use strict' is unnecessary
		'strict': 'error',
		// only allow single quotes in javascript
		'quotes': ['error', 'single'],
		// Require comparisons to be in a readable order
		'yoda': 'error',
		// only allow double quotes for jsx attributes, unless the attr contains quotes (since escaping is impossible)
		'jsx-quotes': ['error', 'prefer-double'],
		// one space after a ':', no spaces before
		'key-spacing': 'error',
		// space between if/for/etc. and (
		'keyword-spacing': 'error',
		// try to avoid overusing whitespace
		'no-multiple-empty-lines': 'error',
		// require whitespace around {} of single-line blocks
		'block-spacing': 'error',
		// don't put extra whitepsace in computed properties
		'computed-property-spacing': 'error',
		// require {} around all blocks
		'curly': 'error',
		// no space before the ( of a function invocation
		'no-spaced-func': 'error',
		// don't put extra whitespace inside of ()
		'space-in-parens': 'error',
		// always put space around infix operators
		'space-infix-ops': 'error',
		// use camelCase for all variable names, but snake_case is fine in properties
		'camelcase': ['error', {'properties': 'never'}],
		// keep { on the same line as the block keyword, unless it fits in 1 line
		'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
		// don't chain variable declarations, put them each on their own line
		'one-var': ['error', 'never'],
		// keep consistent whitespace around operators
		'no-multi-spaces': 'error',
		// avoid ternary operators that return booleans
		'no-unneeded-ternary': 'error',
		// use obj.prop instead of obj['prop']
		'dot-notation': 'error',
		// don't use , to chain multiple expressions, use multiple lines
		'no-sequences': 'error',
		// pretend vars have block scoping
		'block-scoped-var': 'error',
		// use 0.1 instead of .1
		'no-floating-decimal': 'error',
		// use let or const instead of var
		'no-var': 'error',
		// don't declare vars in case statements without defining blocks
		'no-case-declarations': 'error',
		// warn when array functions don't return in their callback
		'array-callback-return': 'error',
		// no more than one ternary at a time
		'no-nested-ternary': 'error',
		// be consistent about newlines and .s
		'dot-location': ['error', 'property'],
		// require () around single arguments in => functions
		'arrow-parens': 'error',
		// disallow negating the left operand of relational operators
		'no-unsafe-negation': 'error',
		// prevent you from shadowing JS language features
		'no-shadow-restricted-names': 'error',
		// disallow spacing between a function call and its ()
		'func-call-spacing': ['error', 'never'],
		// don't allow unused vars, functions, and function params
		'no-unused-vars': 'error',
		// don't rely on variable hoisting
		'no-use-before-define': ['warn', {'functions': false, 'classes': false}],
		// be careful with lambdas in comparisons
		'no-confusing-arrow': 'warn',
		// disallow use of console
		'no-console': 'warn',

		// Ensure a default export is present, given a default import
		'import/default': 'error',
		// don't allow '.jsx' or '.js' extensions in require calls, but require other extensions
		'import/extensions': ['error', 'always', {
			'js': 'never',
			'jsx': 'never'
		}],
		// Ensure named imports correspond to a named export in the remote file
		'import/named': 'error',
		// Ensure imported namespaces contain dereferenced properties as they are dereferenced
		'import/namespace': 'error',
		// ensure an imported module can be resolved to a module on the local filesystem
		'import/no-unresolved': 'error',

		// all components must be defined in the module
		'react/jsx-no-undef': 'error',
		// all components should have a display name (es6 transpiler name is acceptable)
		'react/display-name': ['error', { 'ignoreTranspilerName': false }],
		// closing brackets on new line for multiline component def
		'react/jsx-closing-bracket-location': 'error',
		// only add spaces inside object def curlies, not jsx curlies
		'react/jsx-curly-spacing': ['error', 'never'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-no-duplicate-props': 'error',
		// don't mark `React` as unused
		'react/jsx-uses-react': 'warn',
		// don't marke vars only used in jsx as unused
		'react/jsx-uses-vars': 'warn',
		// checks for illegal state mutations:
		'react/no-did-update-set-state': 'warn',
		'react/no-direct-mutation-state': 'error',
		// don't allow unknown props like `class`
		'react/no-unknown-property': 'error',
		// jsx tags should be self closing if they don't have children
		'react/self-closing-comp': 'error',
		// multiline jsx should be wrapped in parens
		'react/jsx-wrap-multilines': 'error'
	}
};
