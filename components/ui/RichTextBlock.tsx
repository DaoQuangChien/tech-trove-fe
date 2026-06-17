import React, { Fragment, JSX, ReactNode } from "react";

import Image from "@/components/ui/image";
import { RichTextNode } from "@/types/richtextBlock";

type Props = {
  content: RichTextNode[];
};

const RichTextRenderer = (props: Props) => {
  const { content } = props;
  const renderNode = (node: RichTextNode, index: number): ReactNode | null => {
    switch (node.type) {
      case "text":
        let text: ReactNode = node.text || "";

        if (node.format?.includes("bold")) text = <strong key={index}>{text}</strong>;
        if (node.format?.includes("italic")) text = <em key={index}>{text}</em>;

        return <React.Fragment key={index}>{text}</React.Fragment>;

      case "paragraph":
        return <p key={index}>{node.children?.map((child, i) => renderNode(child, i))}</p>;

      case "heading":
        const Tag = `h${node.level || 2}` as keyof JSX.IntrinsicElements;
        return <Tag key={index}>{node.children?.map((child, i) => renderNode(child, i))}</Tag>;

      case "list":
        const ListTag = node.format?.includes("ordered") ? "ol" : "ul";
        return (
          <ListTag key={index}>{node.children?.map((child, i) => renderNode(child, i))}</ListTag>
        );

      case "list-item":
        return <li key={index}>{node.children?.map((child, i) => renderNode(child, i))}</li>;

      case "image":
        return (
          <span key={index} className="relative my-2 block aspect-video w-full">
            <Image src={node.url} alt="" fill sizes="100vw" className="object-contain" />
          </span>
        );

      case "link":
        return (
          <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
            {node.children?.map((child, i) => renderNode(child, i))}
          </a>
        );

      case "quote":
        return (
          <blockquote key={index}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </blockquote>
        );

      case "code":
        return (
          <pre key={index}>
            <code>{node.text}</code>
          </pre>
        );

      default:
        return null;
    }
  };

  return <Fragment>{content.map((node, i) => renderNode(node, i))}</Fragment>;
};

export default RichTextRenderer;
