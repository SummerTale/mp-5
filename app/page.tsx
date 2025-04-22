import UrlForm from './components/urlForm';

export default function Home() {
  return (
    <div className="card">
      <h1>URL Shortener</h1>
      <p>Your go-to solution for turning long URLs into sleek, shareable links!</p>
      <UrlForm />
    </div>
  );
}
