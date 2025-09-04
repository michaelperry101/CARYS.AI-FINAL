export const metadata = { title: "Carys — Your AI Assistant" };

export default function HomePage() {
  return (
    <main className="page-wrap p-6 md:p-10">
      <h1 className="text-4xl font-semibold mb-4">Meet Carys</h1>
      <p className="max-w-2xl mb-6">
        Your conversational assistant for rapid yielding solutions.
      </p>
      <a
        href="/chat"
        className="inline-flex items-center rounded-xl px-5 py-3 bg-blue-500/10 text-blue-700 border border-blue-200 hover:bg-blue-500/15"
      >
        Start Chatting
      </a>
    </main>
  );
}
