// Firebase 專案：待建立（見 README 多人連線設定步驟）
// apiKey 含「貼上」字樣時，host.html / player.html 自動切換為 BroadcastChannel 本機測試模式
// 這組 config 設計上就是公開給瀏覽器用的，防護在資料庫規則層（database.rules.json）
const firebaseConfig = {
  apiKey: "請貼上你的 Firebase apiKey",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "0",
  appId: "1:0:web:0",
};
