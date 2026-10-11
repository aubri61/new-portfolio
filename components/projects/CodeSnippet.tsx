export default function CodeSnippet({
  language,
  content,
}: {
  language: string;
  content: string;
}) {
  return (
    <div className="code-snippet">
      <span>{language}</span>
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}
