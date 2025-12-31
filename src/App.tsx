import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';

const AGENT_ARN = 'arn:aws:bedrock-agentcore:ap-northeast-1:282048599344:runtime/update_checker2-tk0kzH5wCo';
const REGION = 'ap-northeast-1';

function App() {
  const { signOut } = useAuthenticator();
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const callAgent = async () => {
    setLoading(true);
    setResponse('');

    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      if (!idToken) throw new Error('IDトークンが取得できません');

      const url = `https://bedrock-agentcore.${REGION}.amazonaws.com/runtimes/${encodeURIComponent(AGENT_ARN)}/invocations?qualifier=DEFAULT`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'Hello!' }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`エラー: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <button onClick={callAgent} disabled={loading}>
        {loading ? '処理中...' : 'エージェント呼び出し'}
      </button>
      <button onClick={signOut}>Sign out</button>
      {response && <pre>{response}</pre>}
    </main>
  );
}

export default App;
