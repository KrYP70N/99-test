import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './CodeBlock.css';

SyntaxHighlighter.registerLanguage('javascript', js);

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title = 'script.js' }) => {
    return (
        <div className="code-block-container">
            <div className="code-block-header">
                <div className="window-controls">
                    <span className="control-dot red"></span>
                    <span className="control-dot yellow"></span>
                    <span className="control-dot green"></span>
                </div>
                {title && <span className="window-title">{title}</span>}
            </div>
            <div className="code-block-body">
                <SyntaxHighlighter language={language} style={atomOneDark} customStyle={{ background: 'transparent' }}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
