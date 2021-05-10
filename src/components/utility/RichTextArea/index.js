import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import Styles from './richTextArea.module.scss';

// interface RichTextAreaProps {
//   onChange?: (text: string) => void;
//   defaultText?: string;
// }

const RichTextArea = ({ onChange = () => {}, defaultText = '' }) => {
  const [text, setText] = useState(defaultText);

  const handleChange = useCallback(
    (value) => {
      setText(value);
      onChange(value);
    },
    [setText, onChange],
  );

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
      </Helmet>
      <div className={Styles['rich-text']}>
        <ReactQuill theme="snow" value={text} onChange={handleChange} />
      </div>
    </>
  );
};

export default RichTextArea;
