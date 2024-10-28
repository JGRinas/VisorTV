import { useState } from "react";
import AddSectionButton from "../../buttons/add-section-button";
import "./styles.css";
import { useScreenContext } from "~/modules/admin/screen_management/infrastructure/provider";
import { MarkdownEditor } from "~/modules/shared/presentation/components/markdown/markdown-editor";
import DeleteSectionButton from "../../buttons/delete-section-button";

const StaticInfoInput = () => {
  const { screenData, updateStaticInfoContent } = useScreenContext();
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const handleToggleEditor = () => {
    setIsEditorVisible(!isEditorVisible);
    updateStaticInfoContent("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateStaticInfoContent(event.target.value);
  };

  return (
    <div className="right-center-panel">
      {isEditorVisible ? (
        <>
          <MarkdownEditor
            content={screenData.staticInfoContent}
            handleChange={handleChange}
          />
          <DeleteSectionButton onClick={handleToggleEditor} />
        </>
      ) : (
        <AddSectionButton onClick={handleToggleEditor} />
      )}
    </div>
  );
};

export default StaticInfoInput;
