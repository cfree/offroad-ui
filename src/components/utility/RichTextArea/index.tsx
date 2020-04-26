import React, { FC, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import ReactQuill from 'react-quill';

import Styles from './richTextArea.module.scss';

interface RichTextAreaProps {
  onChange?: (text: string) => void;
  defaultText?: string;
}

const RichTextArea: FC<RichTextAreaProps> = ({
  onChange = () => {},
  defaultText = '',
}) => {
  const [text, setText] = useState<string>(defaultText);

  const handleChange = useCallback(
    (value: string) => {
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
        <ReactQuill value={text} onChange={handleChange} />
      </div>
    </>
  );
};

export default RichTextArea;
