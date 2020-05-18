import {jsx} from '@suitest/smst';
import {toText} from '../toText';

describe('AST renderers', () => {
	const plainText = <text>TEXT</text>;
	const subjectText = <subject>SUBJECT</subject>;
	const inputText = <input>INPUT</input>;
	const codeText = <code>CODE</code>;
	const mixedText = <fragment>TEXT <subject>SUBJ</subject> TEXT</fragment>;
	const emptyText = <text>{''}</text>;

	const simpleCodeBlock = <code-block>someJS();</code-block>;
	const longCodeBlock = <code-block>
		someJS(); someJS(); someJS(); someJS();{'\n'}someJS(); someJS(); someJS();{'\n'}someJS(); someJS(); someJS();
	</code-block>;

	const simpleProps = <props>
		<prop
			name={<text>prop name</text>}
			expectedValue={<text>expected value</text>}
			comparator="="
		/>
		<prop
			name={<text>prop name</text>}
			expectedValue={simpleCodeBlock}
			comparator=""
		/>
	</props>;
	const longProps = <props>
		<prop
			name={<text>prop name prop name prop name prop name prop name</text>}
			expectedValue={<text>expected value expected value expected value expected value expected value</text>}
			comparator="~"
			actualValue="expected value expected value expected value expected value expected value"
			status="fail"
		/>
		<prop
			name={<text>JavaScript expression</text>}
			expectedValue={longCodeBlock}
			comparator=""
			status="success"
		/>
	</props>;

	const simpleCondition = <condition
		title={<fragment>condition: element <subject>My element</subject> exists</fragment>}
	/>;
	const longCondition = <condition
		title={<fragment>condition: element <subject>My element</subject> exists</fragment>}
		status="fail"
	>{longProps}</condition>;
	const simpleLine = <test-line
		title={<fragment>Assert element <subject>My element</subject> is visible</fragment>}
	/>;
	const longLine = <test-line
		title={<fragment>Press <input>OK</input>, <input>LEFT</input> only if condition is met</fragment>}
	>
		{simpleCondition}
	</test-line>;

	const failResult = <test-line-result status="fail" message={<text>Condition was not met</text>}>
		<test-line
			title={<fragment>Run test <subject>My test</subject> until condition is met max 5x every 5s</fragment>}
			status="fail"
		>{longCondition}</test-line>
	</test-line-result>;
	const warningResult = <test-line-result status="warning" message={<text>Some warning message</text>}>
		<test-line
			title={<text>Assert application has exited</text>}
			status="warning"
		/>
	</test-line-result>;
	const exitResult = <test-line-result status="exit" message={<text>Condition was met</text>}>
		<test-line
			title={<text>Assert application has exited</text>}
			status="exit"
		/>
	</test-line-result>;
	const excludedResult = <test-line-result status="excluded" message={<text>Line was not executed</text>}>
		<test-line
			title={<fragment>Press <input>OK</input> only if condition is met</fragment>}
			status="excluded"
		>{simpleCondition}</test-line>
	</test-line-result>;
	const fatalResult = <test-line-result status="fatal" message={<text>Some generic error message</text>}>
		<test-line
			title={<text>Assert application has exited</text>}
			status="fatal"
		/>
	</test-line-result>;

	function runTests(formatted = false): void {
		it('should handle code blocks', () => {
			expect(toText(simpleCodeBlock, formatted)).toMatchSnapshot();
			expect(toText(longCodeBlock, formatted)).toMatchSnapshot();
		});

		it('should handle props', () => {
			expect(toText(simpleProps, formatted)).toMatchSnapshot();
			expect(toText(longProps, formatted)).toMatchSnapshot();
			expect(toText(<props>
				<prop
					name={<text>test</text>}
					expectedValue={<text>short</text>}
					actualValue="long long long"
				/>
			</props>, formatted)).toMatchSnapshot();
			expect(toText(<props>
				<prop
					name={<text>Empty string</text>}
					expectedValue={<text>{''}</text>}
					actualValue={''}
				/>
				<prop
					name={<text>Empty number</text>}
					expectedValue={<text>0</text>}
					actualValue={NaN}
				/>
				<prop
					name={<text>Empty code block</text>}
					expectedValue={<code-block>{''}</code-block>}
				/>
			</props>)).toMatchSnapshot();
		});

		it('should throw if trying to render a single prop', () => {
			expect(() => toText(<prop name={<text>prop</text>} expectedValue={<text>test</text>} />)).toThrow();
		});

		it('should render condition', () => {
			expect(toText(simpleCondition, formatted)).toMatchSnapshot();
			expect(toText(longCondition, formatted)).toMatchSnapshot();
		});

		it('should render test line', () => {
			expect(toText(simpleLine, formatted)).toMatchSnapshot();
			expect(toText(longLine, formatted)).toMatchSnapshot();
		});

		it('should render test line results', () => {
			expect(toText(failResult, formatted)).toMatchSnapshot();
			expect(toText(warningResult, formatted)).toMatchSnapshot();
			expect(toText(exitResult, formatted)).toMatchSnapshot();
			expect(toText(excludedResult, formatted)).toMatchSnapshot();
			expect(toText(fatalResult, formatted)).toMatchSnapshot();
		});
	}

	describe('plain text renderer', () => {
		it('should handle textual nodes', () => {
			expect(toText(plainText, false)).toEqual('TEXT');
			expect(toText(subjectText, false)).toEqual('SUBJECT');
			expect(toText(inputText, false)).toEqual('INPUT');
			expect(toText(codeText, false)).toEqual('CODE');
			expect(toText(mixedText, false)).toEqual('TEXT SUBJ TEXT');
			expect(toText(emptyText, false)).toEqual('');
		});

		runTests(false);
	});

	describe('formatted text renderer', () => {
		it('should handle textual nodes', () => {
			expect(toText(plainText, true)).toEqual('TEXT');
			expect(toText(subjectText, true)).toEqual('\u001b[32mSUBJECT\u001b[0m');
			expect(toText(inputText, true)).toEqual('\u001b[4mINPUT\u001b[0m');
			expect(toText(codeText, true)).toEqual('\u001b[36mCODE\u001b[0m');
			expect(toText(mixedText, true)).toEqual('TEXT \u001b[32mSUBJ\u001b[0m TEXT');
			expect(toText(emptyText, true)).toEqual('');
		});

		runTests(true);
	});
});
