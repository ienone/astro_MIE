export function remarkSpoiler() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === "html" && typeof node.value === "string") {
        node.value = renderInlineSpoilers(node.value);
        return;
      }

      if (!isSpoilerDirective(node)) return;

      node.data ||= {};
      node.data.hName = "span";
      node.data.hProperties = {
        className: ["spoiler-mask"],
        tabIndex: 0,
        "aria-label": "Spoiler content. Hover or focus to reveal."
      };
    });
  };
}

function isSpoilerDirective(node) {
  return (node.type === "textDirective" || node.type === "leafDirective") && node.name === "spoiler";
}

function walk(node, visitor) {
  visitor(node);

  if (!Array.isArray(node.children)) return;
  for (const child of node.children) walk(child, visitor);
}

function renderInlineSpoilers(value) {
  const marker = ":spoiler[";
  let output = "";
  let index = 0;

  while (index < value.length) {
    const start = value.indexOf(marker, index);
    if (start === -1) {
      output += value.slice(index);
      break;
    }

    const contentStart = start + marker.length;
    const end = findDirectiveEnd(value, contentStart);
    if (end === -1) {
      output += value.slice(index);
      break;
    }

    output += value.slice(index, start);
    output += `<span class="spoiler-mask" tabindex="0" aria-label="Spoiler content. Hover or focus to reveal.">${value.slice(contentStart, end)}</span>`;
    index = end + 1;
  }

  return output;
}

function findDirectiveEnd(value, start) {
  let depth = 1;

  for (let index = start; index < value.length; index += 1) {
    const char = value[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (depth === 0) return index;
  }

  return -1;
}
