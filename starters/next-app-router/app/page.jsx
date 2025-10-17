import OpenAIExample from './OpenAIExample';

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: 40 }}>
      <h1>Welcome to Next.js App Router Starter!</h1>
      <p>Edit <code>app/page.jsx</code> and save to test HMR updates.</p>
      <OpenAIExample />
    </main>
  );
} 