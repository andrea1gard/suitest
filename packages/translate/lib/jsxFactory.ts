/// <reference path="../types/intrinsicElements.d.ts" />
/// <reference path="../types/unistTestLine.d.ts" />
import ub from 'unist-builder';

const plainTypes = ['text', 'code', 'bold', 'emphasis'];
const isTextNode = (input: SingleNode): input is TextNode => plainTypes.includes(input.type);

type DeepArrayOrOne<T> = T | Array<T | DeepArrayOrOne<T>>;
export const flatten = <T extends any>(input: DeepArrayOrOne<T>): T[] => {
	if (Array.isArray(input)) {
		return input.reduce((acc: T[], item: DeepArrayOrOne<T>) => acc.concat(flatten(item)), []);
	}

	return [input];
};

/**
 * Normalize textual children - make them flat and merge sequential text items of same type
 */
const normalizePlainChildren = (
	children: Array<SingleNode | string>,
	parentType: keyof JSX.IntrinsicElements
): SingleNode[] =>
	children.reduce((output: SingleNode[], child: SingleNode | string) => {
		if (typeof child === 'string') {
			// Wrap plain strings into text nodes
			child = ub(plainTypes.includes(parentType) ? parentType : 'text', child) as PlainTextNode;
		}

		// Nested child is a textual node
		const lastChild = output[output.length - 1];

		if (isTextNode(child) && lastChild?.type === child.type) {
			// Textual node with same time as the previous one - merge them
			lastChild.value += child.value;
		} else {
			output.push(child);
		}

		return output;
	}, []);

const processLabel = (label?: string | SingleNode | Array<string | SingleNode>): SingleNode[] | undefined => {
	if (typeof label !== 'undefined') {
		return normalizePlainChildren(flatten([label]), 'text');
	}

	return undefined;
};

const isCellChildren = (children: SingleNode[]): children is CellNode[] =>
	children.every(child => child.type === 'cell');

const isRowChildren = (children: SingleNode[]): children is RowNode[] =>
	children.every(child => child.type === 'row');

const isDictionaryRowChildren = (children: SingleNode[]): children is DictionaryRowNode[] =>
	children.every(child => child.type === 'row' && child.children.length === 2);

const isTextChildren = (children: SingleNode[]): children is TextNode[] =>
	children.every(isTextNode);

const isSinglePlainTextChildren = (children: SingleNode[]): children is [TextNode] =>
	children.length === 1 && children[0].type === 'text';

const assertUnknownIntrinsicElementType = (type: never): never => {
	throw new Error(`Unknown intrinsic element type ${type}`);
};

export const assertUnknownSectionNode = (node: never): never => {
	throw new Error('Unknown node type: ' + JSON.stringify(node));
};

export const assertUnknownTextNode = (node: never): never => {
	throw new Error('Unknown plain text node: ' + JSON.stringify(node));
};

/**
 * A factory for JSX elements. Maps React-style JSX to unist-style nodes.
 * "any" is used for children and props because TypeScript can't infer JSX element types
 * anyway and always returns whatever is provided in JSX.Element type/interface.
 * Some validation is added to ensure correct data at least runtime.
 */
export const jsx = (
	type: keyof JSX.IntrinsicElements,
	props: {[key: string]: any} | null,
	...children: Array<Node | string>
): Node => {
	// Do not include empty children, to allow for ternary operations in JSX
	// Flatten the children - to support nested arrays in JSX and manage fragments
	const processedChildren = normalizePlainChildren(flatten(children.filter(Boolean)), type);

	switch (type) {
		case 'text':
		case 'bold':
		case 'emphasis':
		case 'code':
			return processedChildren[0];
		case 'fragment':
			return processedChildren;
		case 'cell':
			if (isTextChildren(processedChildren)) {
				return ub('cell', processedChildren);
			}

			throw new TypeError('Cell can only accept section or textual nodes');
		case 'row':
			if (isCellChildren(processedChildren)) {
				return ub('row', processedChildren);
			}

			throw new TypeError('Row can only accept Cell as its child');
		case 'table':
			if (isRowChildren(processedChildren)) {
				return ub('table', {label: processLabel(props?.label)}, processedChildren);
			}

			throw new TypeError('Table can only accept Row as its child');
		case 'dictionary':
			if (isDictionaryRowChildren(processedChildren)) {
				return ub('dictionary', {label: processLabel(props?.label)}, processedChildren);
			}

			throw new TypeError('Dictionary can only accept Row with 2 Cells as its child');
		case 'paragraph':
		case 'condition':
		case 'test-line':
			return ub(type, {title: processLabel(props?.title)}, processedChildren) as ConditionNode | TestLineNode;
		case 'code-block':
			if (isSinglePlainTextChildren(processedChildren)) {
				return ub('code-block', {label: processLabel(props?.label)}, processedChildren[0].value);
			}

			throw new Error('Code block can only accept plain text children');
		default:
			return assertUnknownIntrinsicElementType(type);
	}
};