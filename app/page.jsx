export const metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <div className="prose max-w-2xl">
      <h1>Privacy Policy</h1>
      <p>We keep it simple. Your session data is secured via NextAuth. Chat requests are sent to the configured model provider only when you press Send.</p>
    </div>
  );
}
