import { JSONContent } from "@tiptap/core";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { renderToReactElement } from "@tiptap/static-renderer";

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Image,
  Youtube,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Superscript,
  Subscript,
];

type Props = {
  content?: JSONContent;
};

const TiptapRenderer = ({ content }: Props) => {
  if (!content?.type) return null;

  return (
    <div className="text-text-base max-w-none [&_blockquote]:border-l-2 [&_blockquote]:border-accent-foreground [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-slate-800 [&_code]:px-1 [&_code]:py-0.5 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_h4]:text-lg [&_h4]:font-bold [&_hr]:my-6 [&_hr]:border-accent-foreground [&_img]:rounded-lg [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-slate-800 [&_pre]:p-4 [&_table]:border [&_table]:border-accent-foreground [&_td]:border [&_td]:border-accent-foreground [&_td]:p-2 [&_th]:border [&_th]:border-accent-foreground [&_th]:p-2 [&_ul]:list-disc [&_ul]:pl-6 [&>*+*]:mt-3 [&_a]:text-sky-400 [&_a]:underline">
      {renderToReactElement({ content, extensions })}
    </div>
  );
};

export default TiptapRenderer;
