import { SimpleEditor } from './tiptap-templates/simple/simple-editor';
import theoryContent from './tiptap-templates/simple/data/theory-content.json';

export default function TheoryContent() {
  return (
    <div className="bg-white mx-auto flex justify-center text-left items-center max-w-5xl">
        <SimpleEditor initialContent={theoryContent} />
    </div>
  );
}