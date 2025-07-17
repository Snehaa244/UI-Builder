import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';

export const EDITOR_TOOLS = {
  header: Header,
  paragraph: Paragraph,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByUrl: (url) =>
          Promise.resolve({
            success: 1,
            file: { url },
          }),
      },
    },
  },
};
