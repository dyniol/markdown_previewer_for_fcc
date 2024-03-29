import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked'
import './App.scss';

const projectName = 'markdown-previewer';

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + `</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized
    ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
    : this.state.previewMaximized
      ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
      : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
      return (
        <div>
          <div className={classes[0]}>
            <Toolbar
            icon={classes[2]}
            onClick={this.handleEditorMaximize}
            text='Editor'
            />
            <Editor markdown={this.state.markdown} onChange={this.handleChange} />
          </div>
          <div className='converter' />
          <div className={classes[1]}>
            <Toolbar
            icon={classes[2]}
            onClick={this.handlePreviewMaximize}
            text='Previewer'
            />
            <Preview markdown={this.state.markdown} />
          </div>
        </div>
      );
  }
}

const Toolbar = props => {
  return (
    <div className='toolbar'>
      <i className='fa fa-free-code-camp' title='no-stack-dub-sack' />
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = props => {
  return (
    <textarea
    id='editor'
    onChange={props.onChange}
    type='text'
    value={props.markdown}
    />
  );
};

const Preview = props => {
  return (
    <div
    dangerouslySetInnerHTML={{
      __html: marked(props.markdown, {renderer: renderer})
    }}
    id='preview'
    />
  );
}

const placeholder =`
# Welcome to my React Markdown Previewer\n## This is a sub-heading..\n### And here's some other cool stuff:
Here is some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**.. łał!
Or _italic_.
Or **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
>Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
