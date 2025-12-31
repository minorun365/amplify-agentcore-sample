# 必要なライブラリをインポート
from strands import Agent
from strands_tools import rss
from bedrock_agentcore.runtime import BedrockAgentCoreApp

# AgentCoreランタイム用のAPIサーバーを作成
app = BedrockAgentCoreApp()

# エージェント呼び出し関数を、APIサーバーのエントリーポイントに設定
@app.entrypoint
async def invoke_agent(payload, context):

    # フロントエンドで入力されたプロンプトを取得
    prompt = payload.get("prompt")

    # AIエージェントを作成
    agent = Agent(
        model="jp.anthropic.claude-haiku-4-5-20251001-v1:0",
        system_prompt="aws.amazon.com/about-aws/whats-new/recent/feed からRSSを取得して",
        tools=[rss]
    )

    # エージェントの応答をストリーミングで取得
    stream = agent.stream_async(prompt)
    async for event in stream:
        yield event

# APIサーバーを起動
app.run()