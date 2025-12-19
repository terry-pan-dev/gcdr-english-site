import { useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote as QuoteIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Table,
  Strikethrough,
  Info,
  X,
  Video,
  AudioLines,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export function MarkdownEditor({ content, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Insert markdown syntax at cursor position
  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    if (selectedText) {
      // Wrap selected text
      newContent = beforeText + before + selectedText + after + afterText;
      newCursorStart = start + before.length;
      newCursorEnd = end + before.length;
    } else {
      // Insert with placeholder
      const insertText = before + placeholder + after;
      newContent = beforeText + insertText + afterText;
      newCursorStart = start + before.length;
      newCursorEnd = start + before.length + placeholder.length;
    }

    onChange(newContent);

    // Restore cursor position and scroll position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert heading at start of line
  const insertHeading = (level: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = content.substring(0, start);

    // Find the start of the current line
    const lineStart = beforeText.lastIndexOf("\n") + 1;
    const lineEnd = content.indexOf("\n", end);
    const actualLineEnd = lineEnd === -1 ? content.length : lineEnd;
    const currentLine = content.substring(lineStart, actualLineEnd);

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    // Check if line already starts with heading markers
    const headingMatch = currentLine.match(/^(#{1,6})\s+/);
    if (headingMatch) {
      // Replace existing heading
      const existingLevel = headingMatch[1].length;
      if (existingLevel === level) {
        // Remove heading if same level
        newContent =
          content.substring(0, lineStart) +
          currentLine.replace(/^#{1,6}\s+/, "") +
          content.substring(actualLineEnd);
        newCursorStart = start - (existingLevel + 1);
        newCursorEnd = end - (existingLevel + 1);
      } else {
        // Change heading level
        const headingPrefix = "#".repeat(level) + " ";
        newContent =
          content.substring(0, lineStart) +
          headingPrefix +
          currentLine.replace(/^#{1,6}\s+/, "") +
          content.substring(actualLineEnd);
        newCursorStart = start - existingLevel + level;
        newCursorEnd = end - existingLevel + level;
      }
    } else {
      // Add heading prefix
      const headingPrefix = "#".repeat(level) + " ";
      newContent =
        content.substring(0, lineStart) +
        headingPrefix +
        currentLine +
        content.substring(actualLineEnd);
      newCursorStart = start + headingPrefix.length;
      newCursorEnd = end + headingPrefix.length;
    }

    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert list item (bullet or numbered)
  const insertListItem = (isOrdered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    // Find the start of the current line
    const lineStart = beforeText.lastIndexOf("\n") + 1;
    const lineEnd = content.indexOf("\n", end);
    const actualLineEnd = lineEnd === -1 ? content.length : lineEnd;
    const currentLine = content.substring(lineStart, actualLineEnd);

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    // Check if line already has list marker
    const listMatch = currentLine.match(/^(\s*)([-*+]|\d+\.)\s+/);
    if (listMatch) {
      // Remove list marker
      const indent = listMatch[1];
      const withoutMarker = currentLine.replace(/^(\s*)([-*+]|\d+\.)\s+/, indent);
      newContent =
        content.substring(0, lineStart) + withoutMarker + content.substring(actualLineEnd);
      newCursorStart = start - (listMatch[0].length - indent.length);
      newCursorEnd = end - (listMatch[0].length - indent.length);
    } else if (selectedText && selectedText.includes("\n")) {
      // Multiple lines selected - prepend to each non-empty line
      const lines = selectedText.split("\n");
      const prefixedLines = lines.map((line, index) => {
        if (line.trim() === "") return line;
        const indent = line.match(/^(\s*)/)?.[1] || "";
        return isOrdered
          ? `${indent}${index + 1}. ${line.trimStart()}`
          : `${indent}- ${line.trimStart()}`;
      });
      newContent = content.substring(0, lineStart) + prefixedLines.join("\n") + afterText;
      newCursorStart = lineStart;
      newCursorEnd = lineStart + prefixedLines.join("\n").length;
    } else if (selectedText) {
      // Single line selected - add list marker
      const indent = currentLine.match(/^(\s*)/)?.[1] || "";
      const prefix = isOrdered ? `${indent}1. ` : `${indent}- `;
      newContent =
        content.substring(0, lineStart) +
        prefix +
        currentLine.trimStart() +
        content.substring(actualLineEnd);
      newCursorStart = lineStart + prefix.length;
      newCursorEnd = lineStart + prefix.length + currentLine.trimStart().length;
    } else {
      // No selection - insert with two example items
      const indent = currentLine.match(/^(\s*)/)?.[1] || "";
      const prefix1 = isOrdered ? `${indent}1. ` : `${indent}- `;
      const prefix2 = isOrdered ? `${indent}2. ` : `${indent}- `;
      const item1 = "item1";
      const item2 = "item2";
      const listContent = `${prefix1}${item1}\n${prefix2}${item2}`;
      newContent = content.substring(0, start) + listContent + content.substring(start);
      // Select "item1" for easy editing
      newCursorStart = start + prefix1.length;
      newCursorEnd = start + prefix1.length + item1.length;
    }

    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert blockquote (unused - kept for future use)
  /*
  const _insertBlockquote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    // Find the start of the current line
    const lineStart = beforeText.lastIndexOf("\n") + 1;
    const lineEnd = content.indexOf("\n", end);
    const actualLineEnd = lineEnd === -1 ? content.length : lineEnd;
    const currentLine = content.substring(lineStart, actualLineEnd);

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    // Check if line already has blockquote marker
    if (currentLine.trimStart().startsWith("> ")) {
      // Remove blockquote marker
      const indent = currentLine.match(/^(\s*)/)?.[1] || "";
      const withoutMarker = currentLine.replace(/^(\s*)>\s+/, indent);
      newContent =
        content.substring(0, lineStart) + withoutMarker + content.substring(actualLineEnd);
      newCursorStart = start - 2;
      newCursorEnd = end - 2;
    } else if (selectedText && selectedText.includes("\n")) {
      // Multiple lines selected - prepend > to each non-empty line
      const lines = selectedText.split("\n");
      const prefixedLines = lines.map((line) => {
        if (line.trim() === "") return line;
        const indent = line.match(/^(\s*)/)?.[1] || "";
        return `${indent}> ${line.trimStart()}`;
      });
      newContent = content.substring(0, lineStart) + prefixedLines.join("\n") + afterText;
      newCursorStart = lineStart;
      newCursorEnd = lineStart + prefixedLines.join("\n").length;
    } else if (selectedText) {
      // Single line selected - add blockquote marker
      const indent = currentLine.match(/^(\s*)/)?.[1] || "";
      newContent =
        content.substring(0, lineStart) +
        indent +
        "> " +
        currentLine.trimStart() +
        content.substring(actualLineEnd);
      newCursorStart = lineStart + indent.length + 2;
      newCursorEnd = lineStart + indent.length + 2 + currentLine.trimStart().length;
    } else {
      // No selection - insert with placeholder
      const indent = currentLine.match(/^(\s*)/)?.[1] || "";
      const placeholder = "quote";
      newContent =
        content.substring(0, start) + indent + "> " + placeholder + content.substring(start);
      newCursorStart = start + indent.length + 2;
      newCursorEnd = start + indent.length + 2 + placeholder.length;
    }

    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
      }
    }, 0);
  };
  */

  // Insert link
  const insertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText) {
      // Wrap selected text with link syntax
      insertMarkdown("[", "](url)", selectedText);
      // Select "url" part
      setTimeout(() => {
        if (textareaRef.current) {
          const urlStart = start + selectedText.length + 2;
          const urlEnd = urlStart + 3;
          textareaRef.current.setSelectionRange(urlStart, urlEnd);
        }
      }, 0);
    } else {
      // Insert link with placeholders
      insertMarkdown("[", "](url)", "text");
      // Select "text" first
      setTimeout(() => {
        if (textareaRef.current) {
          const textStart = start + 1;
          const textEnd = textStart + 4;
          textareaRef.current.setSelectionRange(textStart, textEnd);
        }
      }, 0);
    }
  };

  // Open image picker modal
  const openImageModal = () => {
    setSelectedImage("");
    setImageModalOpen(true);
  };

  // Handle image selection from modal
  const handleImageSelect = () => {
    if (!selectedImage) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Get filename for alt text
    const filename =
      selectedImage
        .split("/")
        .pop()
        ?.replace(/\.[^/.]+$/, "") || "image";
    const imageMarkdown = `![${filename}](${selectedImage})`;

    const newContent = beforeText + imageMarkdown + afterText;
    onChange(newContent);

    // Close modal
    setImageModalOpen(false);
    setSelectedImage("");

    // Focus back to textarea (cursor at end of inserted text, no selection)
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = start + imageMarkdown.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert horizontal rule
  const insertHorizontalRule = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";
    const hr = "---";

    const newContent = beforeText + before + hr + after + afterText;
    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = start + before.length + hr.length + (needsNewlineAfter ? 1 : 0);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert table
  const insertTable = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";
    const table = `| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |`;

    const newContent = beforeText + before + table + after + afterText;
    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        // Select first header cell
        const newPos = start + before.length + 2;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos + 8);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert styled Quote (blockquote with attribution)
  const insertQuote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    if (selectedText) {
      // Wrap selected text in blockquote with attribution
      const quote = `> ${selectedText}\n>\n> — *Author Name*`;
      newContent = beforeText + before + quote + after + afterText;
      newCursorStart = start + before.length + 2;
      newCursorEnd = newCursorStart + selectedText.length;
    } else {
      // Insert blockquote with placeholder
      const quoteText = "Your quote here";
      const quote = `> ${quoteText}\n>\n> — *Author Name*`;
      newContent = beforeText + before + quote + after + afterText;
      newCursorStart = start + before.length + 2;
      newCursorEnd = newCursorStart + quoteText.length;
    }

    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert Callout (info box style)
  const insertCallout = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";

    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    if (selectedText) {
      // Wrap selected text in callout
      const callout = `> 💡 **Note**\n>\n> ${selectedText}`;
      newContent = beforeText + before + callout + after + afterText;
      const textPosition = callout.lastIndexOf(selectedText);
      newCursorStart = start + before.length + textPosition;
      newCursorEnd = newCursorStart + selectedText.length;
    } else {
      // Insert callout with placeholder
      const calloutText = "Your important information here";
      const callout = `> 💡 **Note**\n>\n> ${calloutText}`;
      newContent = beforeText + before + callout + after + afterText;
      const textPosition = callout.lastIndexOf(calloutText);
      newCursorStart = start + before.length + textPosition;
      newCursorEnd = newCursorStart + calloutText.length;
    }

    onChange(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert YouTube video embed
  const insertYouTube = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";

    // YouTube embed iframe template
    const videoUrl = "https://www.youtube.com/embed/_5i0PuBUdbI?si=gsMTGG2QhuJvgx2x";
    const iframe = `<iframe width="560" height="315" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    const newContent = beforeText + before + iframe + after + afterText;
    onChange(newContent);

    // Select the video URL inside src for easy replacement
    const srcStart = iframe.indexOf('src="') + 5;
    const srcEnd = srcStart + videoUrl.length;

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + before.length + srcStart,
          start + before.length + srcEnd
        );
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Insert audio player
  const insertAudio = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Save scroll position
    const scrollTop = textarea.scrollTop;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Check if we need newlines
    const needsNewlineBefore = !beforeText.endsWith("\n\n") && beforeText !== "";
    const needsNewlineAfter = !afterText.startsWith("\n\n") && afterText !== "";

    const before = needsNewlineBefore ? "\n\n" : "";
    const after = needsNewlineAfter ? "\n\n" : "";

    // Audio element template
    const audioUrl =
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg";
    const audioHtml = `<audio controls>
  <source src="${audioUrl}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`;

    const newContent = beforeText + before + audioHtml + after + afterText;
    onChange(newContent);

    // Select the audio URL inside src for easy replacement
    const srcStart = audioHtml.indexOf('src="') + 5;
    const srcEnd = srcStart + audioUrl.length;

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + before.length + srcStart,
          start + before.length + srcEnd
        );
        textareaRef.current.scrollTop = scrollTop;
      }
    }, 0);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B for bold
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        insertMarkdown("**", "**", "bold");
      }
      // Ctrl+I for italic
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        insertMarkdown("*", "*", "italic");
      }
    };

    textarea.addEventListener("keydown", handleKeyDown);
    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-background p-2 flex-shrink-0">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Text Formatting Group */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("**", "**", "bold")}
                >
                  <Bold className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Bold</p>
                <p className="text-xs text-muted-foreground">Make text bold (Ctrl+B)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("*", "*", "italic")}
                >
                  <Italic className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Italic</p>
                <p className="text-xs text-muted-foreground">Make text italic (Ctrl+I)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("~~", "~~", "strikethrough")}
                >
                  <Strikethrough className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Strikethrough</p>
                <p className="text-xs text-muted-foreground">Cross out text</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Headings Group - Only H1, H2, H3 */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => insertHeading(1)}>
                  <Heading1 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Heading 1</p>
                <p className="text-xs text-muted-foreground">Large section heading</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => insertHeading(2)}>
                  <Heading2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Heading 2</p>
                <p className="text-xs text-muted-foreground">Medium section heading</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => insertHeading(3)}>
                  <Heading3 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Heading 3</p>
                <p className="text-xs text-muted-foreground">Small section heading</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Lists Group */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => insertListItem(false)}>
                  <List className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Bullet List</p>
                <p className="text-xs text-muted-foreground">Create an unordered list</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => insertListItem(true)}>
                  <ListOrdered className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Numbered List</p>
                <p className="text-xs text-muted-foreground">Create an ordered list</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Media Group */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertLink}>
                  <LinkIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Insert Link</p>
                <p className="text-xs text-muted-foreground">Add a hyperlink</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={openImageModal}>
                  <ImageIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Insert Image</p>
                <p className="text-xs text-muted-foreground">Choose an image to insert</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertYouTube}>
                  <Video className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Insert YouTube Video</p>
                <p className="text-xs text-muted-foreground">Embed a YouTube video</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertAudio}>
                  <AudioLines className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Insert Audio</p>
                <p className="text-xs text-muted-foreground">Embed an audio player</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Structure Group */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertTable}>
                  <Table className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Insert Table</p>
                <p className="text-xs text-muted-foreground">Add a 3-column table</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertHorizontalRule}>
                  <Minus className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Horizontal Rule</p>
                <p className="text-xs text-muted-foreground">Add a divider line</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Quote & Callout Group */}
          <div className="flex items-center gap-1 rounded-md border border-transparent p-1 hover:border-slate-200 transition-colors">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertQuote}>
                  <QuoteIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Quote</p>
                <p className="text-xs text-muted-foreground">
                  Insert a styled quote with attribution
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={insertCallout}>
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Callout</p>
                <p className="text-xs text-muted-foreground">
                  Insert an info box for important notes
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-6 font-mono text-sm resize-none focus:outline-none bg-background text-foreground overflow-auto"
          placeholder="Start writing your blog post in Markdown..."
          style={{
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
          }}
        />
      </div>

      {/* Image Picker Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="size-5" />
              Select an Image
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <ImageSelectorGrid value={selectedImage} onChange={setSelectedImage} />
          </div>

          <DialogFooter className="flex items-center justify-between border-t pt-4 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setImageModalOpen(false);
                setSelectedImage("");
              }}
            >
              <X className="size-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleImageSelect} disabled={!selectedImage}>
              <ImageIcon className="size-4 mr-2" />
              Select Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Image selector with 3-column grid layout
function ImageSelectorGrid({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [loadErrors, setLoadErrors] = useState<Set<string>>(new Set());
  const [s3Images, setS3Images] = useState<{ id: string; url: string; filename: string }[]>([]);
  const [loadingS3, setLoadingS3] = useState(true);

  // Static images from /public/assets folder
  const STATIC_IMAGES = [
    "/assets/hero-bg.png",
    "/assets/dharma-realm-temple.jpg",
    "/assets/temple-1.jpg",
    "/assets/temple-2.jpg",
    "/assets/temple-3.png",
    "/assets/temple-4.jpg",
    "/assets/temple-5.jpg",
    "/assets/temple-6.jpg",
    "/assets/master-hua.png",
    "/assets/master_hua.jpeg",
    "/assets/master-hua-giving-smile.jpg",
    "/assets/basic-teachings-of-buddha.jpg",
    "/assets/introduction-to-buddhism.jpg",
    "/assets/four-noble-truths.jpg",
    "/assets/noble-eightfold-path.jpg",
    "/assets/white-universe-snow.jpg",
    "/assets/Amitabha-Retreat.jpg",
    "/assets/Saturday-Lecture.jpg",
    "/assets/GuanYin-Hall-Sponsorship.jpg",
    "/assets/GCM.jpg",
    "/assets/Volunteer-Team.jpg",
    "/assets/SM-2025-1.png",
    "/assets/chan-meditation/DSC_0152-1-scaled.jpg",
    "/assets/chan-meditation/DSC_0186-scaled.jpg",
    "/assets/chan-meditation/DSC_0296-scaled.jpg",
    "/assets/chan-meditation/DSC_1462-scaled.jpg",
    "/assets/chan-meditation/DSC_1466-scaled.jpg",
    "/assets/chan-meditation/DSC_1470-scaled.jpg",
    "/assets/chan-meditation/DSC_1475-scaled.jpg",
    "/assets/chan-meditation/DSC_1480-scaled.jpg",
    "/assets/chan-meditation/DSC_1495-scaled.jpg",
    "/assets/chan-meditation/DSC_1630-scaled.jpg",
    "/assets/chan-meditation/DSC2188-scaled.jpg",
    "/assets/chan-meditation/mmexport1697577214414.jpg",
    "/assets/chan-meditation/mmexport1697577219970.jpg",
  ];

  // Load S3 images on mount
  useEffect(() => {
    loadS3Images();
  }, []);

  const loadS3Images = async () => {
    setLoadingS3(true);
    try {
      const { mediaApi } = await import("../../lib/admin-api");
      const result = await mediaApi.list();
      if (result.data) {
        const images = result.data.media.filter((m: any) => m.type === "image");
        setS3Images(images);
      }
    } catch (error) {
      console.error("Error loading S3 images:", error);
    } finally {
      setLoadingS3(false);
    }
  };

  const handleImageError = (src: string) => {
    setLoadErrors((prev) => new Set(prev).add(src));
  };

  return (
    <div className="h-[50vh] overflow-y-auto pr-2">
      {loadingS3 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Loading images...
        </div>
      )}

      {/* S3 Uploaded Images */}
      {s3Images.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-blue-500" />
            Uploaded Images ({s3Images.length})
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {s3Images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => onChange(img.url)}
                className={`
                  relative aspect-video rounded-lg overflow-hidden border-2 transition-all
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  ${
                    value === img.url
                      ? "border-primary ring-2 ring-primary/30 scale-[0.98]"
                      : "border-transparent hover:border-slate-300"
                  }
                `}
              >
                <img
                  src={img.url}
                  alt={img.filename}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(img.url)}
                  loading="lazy"
                />
                {value === img.url && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="size-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="text-xs text-white truncate block">{img.filename}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Static Assets */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-green-500" />
          Static Assets ({STATIC_IMAGES.filter((src) => !loadErrors.has(src)).length})
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {STATIC_IMAGES.filter((src) => !loadErrors.has(src)).map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => onChange(src)}
              className={`
                relative aspect-video rounded-lg overflow-hidden border-2 transition-all
                focus:outline-none focus:ring-2 focus:ring-primary/50
                ${
                  value === src
                    ? "border-primary ring-2 ring-primary/30 scale-[0.98]"
                    : "border-transparent hover:border-slate-300"
                }
              `}
            >
              <img
                src={src}
                alt={src.split("/").pop() || "Image"}
                className="w-full h-full object-cover"
                onError={() => handleImageError(src)}
                loading="lazy"
              />
              {value === src && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      className="size-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <span className="text-xs text-white truncate block">{src.split("/").pop()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
