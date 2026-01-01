// 必要なパッケージをインポート
import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import "./index.css";

// Amplifyの初期化
Amplify.configure(outputs);

// アプリケーションのエントリーポイント（認証付きでレンダリング）
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
