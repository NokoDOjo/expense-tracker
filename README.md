# 老爸的私房錢
一個用 Express 和 MongoDB 建立的簡單記帳APP

## 功能介紹
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 可以在首頁和餐廳詳細資料頁面點擊Delete鍵來編輯餐廳資料
- 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。


## 環境建置 Environment Setup

1. nvm & Node.js & Express
2. mongoose
3. mongodb
4. Robo 3T
5. bootstrap
6. Font awesome

## 安裝 Installing

1. 在終端機輸入指令 Clone 此專案至本機電腦
```
git clone https://github.com/NokoDOjo/expense-tracker.git
```
2. 進入專案目錄
```
cd expense-tracker
```
3. 安裝相關套件
```
npm install
```
4. 新增種子資料
```
npm run seed
```
5. 啟動專案
```
npm run dev
```
6. 出現以下訊息後，即可在 http://localhost:3000 開始使用
```
Express is listening on localhost:3000
```

