import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { EyeIcon } from "~/assets/icons";

import "./styles.css";
import { TextGreen } from "../texts";

export const MarkdownEditor = ({
  content,
  isVisible = false,
  handleChange,
}: {
  content: string;
  isVisible?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(isVisible);

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };
  return (
    <div className="markdown-editor-container">
      <div className="markdown-header">
        <button onClick={togglePreview} className="preview-toggle-button">
          <EyeIcon className="eye-icon" />
        </button>
      </div>

      {!isPreviewVisible ? (
        <textarea
          className="markdown-textarea"
          placeholder="Escribe información en estática..."
          value={content}
          onChange={handleChange}
        />
      ) : (
        <div className="markdown-preview">
          <TextGreen>Preview</TextGreen>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
