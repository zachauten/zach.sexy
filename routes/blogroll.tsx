const urls = [
  "https://marvinh.dev/",
  "https://jeremymorrell.dev/blog/",
  "https://steveklabnik.com/writing",
];

export default function Blogroll() {
  const sorted = urls.sort()
  return <ul>
    {sorted.map(url => <li key={url}><a href={url}>{url}</a></li>)}
  </ul>;
}
