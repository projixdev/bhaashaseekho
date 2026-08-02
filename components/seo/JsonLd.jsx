// Renders a JSON-LD <script> tag. Escapes "<" so the serialized data can
// never prematurely close the script tag or inject markup.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
