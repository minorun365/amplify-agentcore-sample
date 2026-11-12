# amplify-agentcore-sample

Amplify Gen2 の画面から、Amazon Bedrock AgentCore Runtime で動くエージェントを呼ぶ最小構成のサンプルです。ログインは Cognito で行い、そのトークンで Runtime を直接呼びます。エージェントは Strands Agents で書いてあり、AWS の新着情報の RSS を読んで答えます。応答とツールの実行はストリーミングで画面に出ます。

| 場所 | 中身 |
|---|---|
| agent/ | AgentCore Runtime に載せるエージェント（Python） |
| amplify/ | Cognito の認証（Amplify Gen2） |
| src/ | React + Vite の画面 |

## 動かし方

1. agent/ を AgentCore Runtime へデプロイし、Runtime の ARN を控える
2. Amplify Hosting にこのリポジトリをつなぎ、環境変数 VITE_AGENT_ARN に1の ARN を入れる
3. デプロイが終わったら、画面でアカウントを作って話しかける

手元で画面だけ動かすときは、.env に VITE_AGENT_ARN を書いて npm run dev を打ちます。Runtime は東京リージョン（ap-northeast-1）を前提にしています。

## ライセンス

MIT Licenseです。詳細は [LICENSE](./LICENSE) を参照してください。
