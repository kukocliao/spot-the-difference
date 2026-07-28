# 找不同大挑戰 (Find the Differences)

🔍 一款兼具視覺美感、動態微動畫與清脆合成音效的瞬間記憶與眼力極限測試網頁遊戲。本專案為單一 HTML 檔案實作，無須安裝任何依賴套件，直接在瀏覽器開啟即可暢玩。

---

## 🎮 遊戲特色

### 1. 完整遊戲狀態機 (Game State Machine)
遊戲流程依序控制，確保流暢的遊玩體驗：
*   **記憶階段 (MEMORIZE)**：卡片正面朝上，玩家需在限時內記憶所有卡片（Side A）的特徵。
*   **隱藏階段 (HIDE)**：卡片以 3D 翻轉效果翻至背面，系統於背景中隨機挑選一張卡片修改圖案（Side B）。
*   **答題階段 (REVEAL)**：卡片翻回正面，玩家需點出哪一張卡片發生了細微變化。
*   **結算階段 (FINISHED)**：答對時顯示勝利 Modal 並進行計分與連勝累計；超時或猜錯時顯示失敗 Modal，高亮顯示正確答案並提供重新挑戰選項。

### 2. 高質感 Web Audio API 合成音效
使用瀏覽器原生 Web Audio API 即時合成多種競技音效，100% 離線可用：
*   **開局魔幻音**：音調指數上升的旋律。
*   **翻牌音**：模擬卡片翻轉的滑音。
*   **倒數計時音**：緊張感十足的秒針滴答聲。
*   **答對勝利和弦**：明亮的四和弦升調。
*   **答錯低沉警示音**：鋸齒波滑落的警示效果。

### 3. 極限競技快捷鍵與多選續猜機制
*   **數字鍵快捷鍵**：卡片上標示有 `1` 到 `8`（或更多）的序號徽章，可直接按下鍵盤對應數字鍵進行搶答。
*   **多選續猜機制**：答錯時卡片會劇烈抖動並變暗排除，同時中斷連勝並輕微扣分。只要答題時間未結束，玩家即可繼續猜測其他卡片。

### 4. 奢華皇家競技視覺設計
*   結合**天鵝絨綠色桌布**、**質感木紋金邊**的外框設計。
*   卡片採用平滑的 3D 翻轉動畫（CSS 3D Transform）。
*   倒數計時低於 3 秒時，計時條轉為鮮紅並伴隨脈衝（Pulse）動畫，營造賽事的緊張氛圍。

---

## 🛠️ 如何在本地遊玩

1.  複製或下載此專案。
2.  在您的電腦中直接連按兩下開啟 `index.html`，即可在任何主流瀏覽器（Chrome、Safari、Edge 等）中直接開始競賽。

---

## 🚀 如何使用 GitHub 上線與部署

### 1. 初始化 Git 倉庫並推送到 GitHub
請在終端機中切換至本專案目錄，並執行以下指令：

```bash
# 初始化 Git
git init

# 將檔案加入追蹤
git add .

# 提交變更
git commit -m "feat: 建立大家來找碴競賽系統網頁與說明文件"

# 設定分支名稱為 main
git branch -M main

# 關聯到您的 GitHub 遠端倉庫（請將 URL 替換為您的倉庫網址）
git remote add origin https://github.com/您的帳號/倉庫名稱.git

# 推送到 GitHub
git push -u origin main
```

### 2. 部署到 GitHub Pages 讓所有人線上遊玩
本專案為純靜態網頁，非常適合使用 GitHub Pages 免費部署：

1.  登入 GitHub 並進入該專案倉庫頁面。
2.  點選上方的 **Settings**（設定）。
3.  在左側選單中找到 **Pages**（頁面）。
4.  在 **Build and deployment** 下方的 **Source** 選擇 `Deploy from a branch`。
5.  在 **Branch** 下拉選單中選擇 `main` 分支與 `/ (root)` 資料夾，並點選 **Save**（儲存）。
6.  等待約 1 至 2 分鐘，GitHub 會在該頁面上方提供一個專屬網址（例如：`https://您的帳號.github.io/倉庫名稱/`），任何人點擊該網址即可直接在線上遊玩！

---

## 🖼️ 如何加入您自己的自訂卡片圖片

本專案支援「外部圖片載入」與「內建 SVG 圖案」的混合使用。如果您想要加入自己準備好的圖片，請依照以下步驟操作：

1.  **準備圖片**：每一張卡片需準備兩張圖片（A 代表修改前，B 代表修改後）。建議尺寸維持 140x200 或等比例的 7:10 縱橫比，以達最佳視覺呈現效果。
2.  **放入資料夾**：將這些圖片放入專案目錄下的 `images` 資料夾中。例如：`images/my_image_A.png` 與 `images/my_image_B.png`。
3.  **更新程式碼**：在 `index.html` 的 `<script>` 中尋找 `cardsDatabase` 陣列，並仿照內附的 `custom_example` 格式加入您自己的卡片設定：
    ```javascript
    {
        id: "unique_id",
        name: "您的卡片名稱",
        desc: "卡片變化的描述文字",
        imageA: "images/my_image_A.png",
        imageB: "images/my_image_B.png"
    },
    ```
4.  儲存變更並在瀏覽器中重新整理，遊戲在進行隨機抽卡時便會載入您的自訂圖片！

---

## 🌐 多人連線模式（主控端 + 玩家各自手機作答）

除了單機版 `index.html`，本專案另外提供**線上多人版**：你用 `host.html` 控制題目進度（記憶／隱藏／答題三階段跟單機版一樣），其他人用手機開 `player.html` 加入，畫面跟著你同步，但**各自獨立作答計分**（每人每題限猜一次，答對得分、答錯或超時 0 分，連勝有加成）。

### 檔案
| 檔案 | 用途 |
|------|------|
| `host.html` | 主控端：設定題目參數、控制記憶/隱藏/答題階段、即時排行榜 |
| `player.html` | 玩家端：輸入名字加入，跟隨主控端進度各自作答 |
| `shared.js` | 卡片資料庫、音效合成、卡片格線渲染（host/player 共用） |
| `sync.js` | 連線同步邏輯（Firebase 或本機測試模式自動切換） |
| `firebase-config.js` | ⚠️ 待填：Firebase 專案設定 |
| `database.rules.json` | Firebase 資料庫安全規則（存查用，須在 Firebase 主控台貼上生效） |

### 啟用步驟（一次性，約 10 分鐘）

**A. 本機先試玩（不需要 Firebase）**
1. 用任何本機伺服器開啟本資料夾（例如 VS Code 的 Live Server，或 `python3 -m http.server`）
2. 開兩個分頁：`host.html` 當主控、`player.html` 當玩家——`firebase-config.js` 預設含「貼上」字樣，兩個頁面會自動切成 BroadcastChannel 本機測試模式（僅同一瀏覽器分頁間互通，適合先驗證流程）

**B. 正式跨裝置連線——建 Firebase 資料庫**
3. 到 [Firebase Console](https://console.firebase.google.com/) 建立新專案
4. 左側「建構 → Realtime Database」→ 建立資料庫 → 地區選 `asia-southeast1` → 以**測試模式**啟動
5. 資料庫「規則」分頁貼上 `database.rules.json` 的內容並發布
6. 專案設定（齒輪）→ 一般 → 你的應用程式 → 新增「網頁應用程式」→ 把 `firebaseConfig` 整段貼進 `firebase-config.js`（這組 config 設計上就是公開給瀏覽器用的，防護在資料庫規則層）

**C. 部署（GitHub Pages 或 Vercel 皆可，做法同單機版）**
7. push 到 GitHub → 用 GitHub Pages 或 Vercel 部署整個資料夾
8. 你開 `https://你的網址/host.html` 主控，把 `https://你的網址/player.html` 分享給其他人手機加入

### 已知限制
- 純前端無帳號驗證，知道玩家網址的人都能加入、都能看到自己的分數（無法防止惡意改分數，僅適合親友／課堂等信任場合）
- 同名玩家會共用同一筆分數紀錄，請提醒大家用不同名字
- 沒有做伺服器時間校正，答題計時以雙方裝置各自時鐘為準（一般手機／電腦時鐘誤差通常可忽略）
