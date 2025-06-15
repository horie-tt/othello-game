# オセロゲーム (Othello Game)

CPUと対戦可能なオセロゲームです。React + TypeScript + Tailwind CSSで構築されています。

## 🎯 特徴

- **3段階の難易度**: 初級（ランダム）、中級（評価関数）、上級（ミニマックス法）
- **視認性の良いUI**: グラデーション効果で黒石・白石を明確に区別
- **有効手の表示**: プレイヤーターンで置ける場所を視覚的に表示
- **TypeScript対応**: 型安全性を確保した開発
- **テストカバレッジ**: 47のテストケースで品質保証

## 🚀 クイックスタート

### 開発環境での実行

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:5173` にアクセス

### ビルド

```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

### テスト

```bash
# テスト実行
npm test

# テスト（ウォッチモード）
npm run test:ui

# カバレッジ
npm run test:coverage
```

## 🎮 遊び方

1. あなたは黒石、CPUは白石です
2. 相手の石を挟むように石を置きます
3. 置ける場所が点線で表示されます
4. 難易度を変更してCPUの強さを調整できます
5. ゲーム終了時に石の数で勝敗が決まります

## 🛠 技術スタック

- **フロントエンド**: React 19 + TypeScript
- **スタイリング**: Tailwind CSS
- **ビルドツール**: Vite
- **テスト**: Vitest + React Testing Library
- **リンター**: ESLint

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Board.tsx       # ゲームボード
│   ├── Cell.tsx        # 個別マス目
│   ├── Game.tsx        # メインゲーム
│   ├── GameInfo.tsx    # スコア・状態表示
│   └── DifficultySelector.tsx  # 難易度選択
├── hooks/              # カスタムフック
│   └── useOthelloGame.ts  # ゲーム状態管理
├── utils/              # ユーティリティ
│   ├── gameLogic.ts    # オセロのルール実装
│   └── aiPlayer.ts     # CPUの思考アルゴリズム
├── types/              # TypeScript型定義
│   └── game.ts         # ゲーム関連の型
└── test/               # テスト設定
    └── setup.ts
```

## 🧪 テストについて

- **gameLogic**: オセロのルール・ボード操作のテスト
- **aiPlayer**: 3段階のAI思考アルゴリズムテスト  
- **useOthelloGame**: ゲーム状態管理フックのテスト
- **Components**: UIコンポーネントの動作テスト

## 📝 開発者向け

### 新機能の追加

1. `src/types/game.ts`で必要な型を定義
2. `src/utils/`でロジックを実装
3. `src/components/`でUIコンポーネントを作成
4. `__tests__/`でテストコードを追加

### CPUアルゴリズムの改良

`src/utils/aiPlayer.ts`の評価関数やミニマックス法の深度を調整することで、CPUの強さを変更できます。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

MIT License

## 🏗 Built with Claude Code

このプロジェクトは[Claude Code](https://claude.ai/code)を使用して作成されました。