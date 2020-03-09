/// <reference path="./unistTestLine.d.ts" />

type ElementOrTextChildren = string | SingleNode | undefined | ElementOrTextChildren[];
type ElementChildren = SingleNode | undefined | ElementChildren[];

declare namespace JSX {
	interface ElementChildrenAttribute {
		children: {},  // specify children name to use
	}

	// This is return value of ANY jsx element
	// TypeScript can't infer correct type, unfortunately,
	// so will simply put it to any node at all
	// https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-result-type
	type Element = Node;

	interface IntrinsicElements {
		// Plain text, should accept only string or other textual elements to make
		// it easier to format text
		text: {children: string | string[]},
		bold: {children: string | string[]},
		emphasis: {children: string | string[]},
		code: {children: string | string[]},
		fragment: {children: ElementOrTextChildren},
		paragraph: {children: ElementOrTextChildren},
		cell: {children: ElementOrTextChildren},
		row: {children: ElementChildren},
		table: {children: ElementChildren, label?: ElementOrTextChildren},
		dictionary: {children: ElementChildren, label?: ElementOrTextChildren},
		'code-block': {children: string | string[], label?: ElementOrTextChildren},
		condition: {
			title: ElementOrTextChildren,
			children?: ElementChildren,
		},
		'test-line': {
			title: ElementOrTextChildren,
			children?: ElementChildren,
		},
	}
}