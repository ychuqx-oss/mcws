const rows = `
c2-2026-001|26-C2-1|2026-07-23|6|others|⭐|Text|白上吹雪在Hololive Dreams偷看miComet
c2-2026-002|26-C2-2|2026-07-21|6|miko|🌸|Text|miComet六周年會議紀錄
c2-2026-003|26-C2-3|2026-07-21|6|shared|💛|Stream|miComet六周年
c2-2026-004|26-C2-4|2026-07-19|6|miko|🌸|Text|Miko宣布miComet六周年直播將於7月21日舉行
c2-2026-005|26-C2-5|2026-07-13|6|miko|🌸|Text|Miko轉推睡著的miComet圖
c2-2026-006|26-C2-6|2026-07-07|6|shared|💛|Stream|Miko等待她的彥星星街
c2-2026-007|26-C2-7|2026-07-05|6|miko|🌸|Stream|Miko哄星街吃紅蘿蔔
c2-2026-008|26-C2-8|2026-07-04|6|miko|🌸|Clip|Miko發布miComet短片
c2-2026-009|26-C2-9|2026-07-03|6|miko|🌸|Stream|Miko滿腦子都是miComet
c2-2026-010|26-C2-10|2026-07-02|6|suisei|☄️|Stream|星街抱怨Miko來家裡吃咖哩遲到
c2-2026-011|26-C2-11|2026-07-01|6|miko|🌸|Text|Miko轉推miComet圖
c2-2026-012|26-C2-12|2026-06-25|6|shared|💛|Stream|miComet商業連動中Miko請星街再帶她去海外旅行
c2-2026-013|26-C2-13|2026-06-21|6|miko|🌸|Stream|Miko邀星街去鷹嶺琉依家吃飯，結果星街已經在場
c2-2026-014|26-C2-14|2026-06-21|6|miko|🌸|Text|Miko轉推貼貼miComet圖
c2-2026-015|26-C2-15|2026-06-13|6|suisei|☄️|Stream|星街因姊街做太多壽喜燒而叫Miko過來，並想冬天和Miko去露營
c2-2026-016|26-C2-16|2026-06-13|6|miko|🌸|Text|Miko冬天會和星街去露營
c2-2026-017|26-C2-17|2026-06-12|6|shared|💛|Stream|miComet的約會相關紀錄
c2-2026-018|26-C2-18|2026-06-12|6|others|⭐|Clip|Miko發布FubuMiComet短片
c2-2026-019|26-C2-19|2026-06-07|6|suisei|☄️|Stream|星街打電話給Miko
c2-2026-020|26-C2-20|2026-06-07|6|miko|🌸|Stream|Miko拿走星街手機並用它發文
c2-2026-021|26-C2-21|2026-06-07|6|miko|🌸|Text|Miko的幸運Hololive成員是星街
c2-2026-022|26-C2-22|2026-06-05|6|shared|💛|Stream|miComet麥塊連動
c2-2026-023|26-C2-23|2026-06-05|6|others|⭐|News|miComet JOYSOUND聯名
c2-2026-024|26-C2-24|2026-06-04|6|shared|💛|Stream|miComet麥塊連動
c2-2026-025|26-C2-25|2026-06-03|6|others|⭐|Stream|白上吹雪在Hololive通話中對miComet貼貼發狂
c2-2026-026|26-C2-26|2026-05-31|6|miko|🌸|Stream|Miko談到Biji Camp
c2-2026-027|26-C2-27|2026-05-29|6|miko|🌸|Text|miComet去露營
c2-2026-028|26-C2-28|2026-05-26|6|miko|🌸|Stream|Miko的露營、旅行相關紀錄
c2-2026-029|26-C2-29|2026-05-24|6|suisei|☄️|Stream|星街談到與FubuMio、Miko和姊街的旅行
c2-2026-030|26-C2-30|2026-05-24|6|others|⭐|Stream|白上吹雪的旅行相關紀錄
c2-2026-031|26-C2-31|2026-05-23|6|miko|🌸|Stream|Miko談到和姊街、FubuMio、星街旅行，以及姊街幫她吹頭髮
c2-2026-032|26-C2-32|2026-05-23|6|others|⭐|Text|大神澪對miComet推文打情罵俏作出反應
c2-2026-033|26-C2-33|2026-05-18|6|miko|🌸|Stream|Miko的旅行相關紀錄
c2-2026-034|26-C2-34|2026-05-18|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-035|26-C2-35|2026-05-17|6|miko|🌸|Stream|Miko的衣裝相關紀錄
c2-2026-036|26-C2-36|2026-05-15|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-037|26-C2-37|2026-05-15|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-038|26-C2-38|2026-05-15|6|others|⭐|Stream|大空昴騙Miko參加星街的肌肉訓練
c2-2026-039|26-C2-39|2026-05-14|6|others|⭐|Stream|Shiraken R.E.P.O. 白銀諾艾爾's 直播， 尾丸波爾卡's
c2-2026-040|26-C2-40|2026-05-13|6|miko|🌸|Stream|Miko的R.E.P.O.相關紀錄
c2-2026-041|26-C2-41|2026-05-13|6|others|⭐|Stream|miComet的告白相關紀錄
c2-2026-042|26-C2-42|2026-05-12|6|miko|🌸|Stream|Miko的咖哩、章魚燒、圖相關紀錄
c2-2026-043|26-C2-43|2026-05-11|6|others|⭐|Stream|miComet的互動相關紀錄
c2-2026-044|26-C2-44|2026-05-11|6|others|⭐|Stream|一條莉莉華的睡覺相關紀錄
c2-2026-045|26-C2-45|2026-05-09|6|miko|🌸|Stream|Miko的咖哩相關紀錄
c2-2026-046|26-C2-46|2026-05-08|6|others|⭐|Stream|大空昴的章魚燒、圖、睡覺相關紀錄
c2-2026-047|26-C2-47|2026-05-03|6|shared|💛|Stream|miComet的互動相關紀錄
c2-2026-048|26-C2-48|2026-04-29|6|miko|🌸|Stream|Miko的 朋友收藏集 直播
c2-2026-049|26-C2-49|2026-04-25|6|others|⭐|Stream|miComet的朋友收藏集、圖、交往相關紀錄
c2-2026-050|26-C2-50|2026-04-23|6|miko|🌸|Text|miComet的互動相關紀錄
c2-2026-051|26-C2-51|2026-04-21|6|miko|🌸|Text|Miko的朋友收藏集相關紀錄
c2-2026-052|26-C2-52|2026-04-21|6|others|⭐|Stream|白上吹雪的 unhinged 朋友收藏集 miComet 直播
c2-2026-053|26-C2-53|2026-04-19|6|shared|💛|Stream|miComet USJ 連動 影片
c2-2026-054|26-C2-54|2026-04-19|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-055|26-C2-55|2026-04-17|6|others|⭐|Stream|白上吹雪的互動相關紀錄
c2-2026-056|26-C2-56|2026-04-15|6|others|⭐|Clip|miComet together 在 Hololive Dreams
c2-2026-057|26-C2-57|2026-04-12|6|miko|🌸|Clip|Miko makes
c2-2026-058|26-C2-58|2026-04-12|6|miko|🌸|Text|Miko 發推 about 露營
c2-2026-059|26-C2-59|2026-04-11|6|others|⭐|Stream|大神澪 談到 露營 和 miComet， 姊街， 與 Inuchi
c2-2026-060|26-C2-60|2026-04-10|6|miko|🌸|Clip|Miko makes
c2-2026-061|26-C2-61|2026-04-08|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-062|26-C2-62|2026-04-08|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-063|26-C2-63|2026-04-05|6|suisei|☄️|Text|星街的ARK、推文相關紀錄
c2-2026-064|26-C2-64|2026-04-05|6|miko|🌸|Clip|Miko的互動相關紀錄
c2-2026-065|26-C2-65|2026-03-29|6|others|⭐|Stream|miComet的互動相關紀錄
c2-2026-066|26-C2-66|2026-03-26|6|others|⭐|Stream|miComet的互動相關紀錄
c2-2026-067|26-C2-67|2026-03-24|6|shared|💛|Stream|miComet的互動相關紀錄
c2-2026-068|26-C2-68|2026-03-22|6|miko|🌸|Text|miComet的互動相關紀錄
c2-2026-069|26-C2-69|2026-03-22|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-070|26-C2-70|2026-03-22|6|suisei|☄️|Clip|星街的互動相關紀錄
c2-2026-071|26-C2-71|2026-03-21|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-072|26-C2-72|2026-03-21|6|suisei|☄️|Audio|星街的廣播相關紀錄
c2-2026-073|26-C2-73|2026-03-20|6|others|⭐|Stream|鷹嶺琉依的互動相關紀錄
c2-2026-074|26-C2-74|2026-03-16|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-075|26-C2-75|2026-03-16|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-076|26-C2-76|2026-03-14|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-077|26-C2-77|2026-03-14|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-078|26-C2-78|2026-03-11|6|others|⭐|Stream|夏色祭的互動相關紀錄
c2-2026-079|26-C2-79|2026-03-10|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-080|26-C2-80|2026-03-09|6|suisei|☄️|Stream|星街 celebrates Miko的 生日
c2-2026-081|26-C2-81|2026-03-08|6|suisei|☄️|Stream|星街 談到 no miComet 在 HoloFes
c2-2026-082|26-C2-82|2026-03-05|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-083|26-C2-83|2026-03-05|6|others|⭐|News|miComet merch
c2-2026-084|26-C2-84|2026-03-01|6|others|⭐|Clip|另一次 miComet Lollipop 短片
c2-2026-085|26-C2-85|2026-02-22|6|others|⭐|Clip|另一次 miComet Lollipop 短片
c2-2026-086|26-C2-86|2026-02-21|6|shared|💛|Stream|miComet 在 角卷綿芽's 直播
c2-2026-087|26-C2-87|2026-02-21|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-088|26-C2-88|2026-02-17|6|suisei|☄️|Text|星街的互動相關紀錄
c2-2026-089|26-C2-89|2026-02-17|6|miko|🌸|Text|Miko轉推miComet圖
c2-2026-090|26-C2-90|2026-02-17|6|others|⭐|Stream|miComet的互動相關紀錄
c2-2026-091|26-C2-91|2026-02-16|6|others|⭐|Clip|miComet的互動相關紀錄
c2-2026-092|26-C2-92|2026-02-14|6|shared|💛|Stream|miComet的互動相關紀錄
c2-2026-093|26-C2-93|2026-02-13|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-094|26-C2-94|2026-02-12|6|others|⭐|Stream|miComet的互動相關紀錄
c2-2026-095|26-C2-95|2026-02-09|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-096|26-C2-96|2026-01-30|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-097|26-C2-97|2026-01-29|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-098|26-C2-98|2026-01-28|6|miko|🌸|Text|Miko的互動相關紀錄
c2-2026-099|26-C2-99|2026-01-24|6|shared|💛|Stream|miComet的互動相關紀錄
c2-2026-100|26-C2-100|2026-01-23|6|miko|🌸|Text|Miko轉推miComet圖
c2-2026-101|26-C2-101|2026-01-22|6|shared|💛|Stream|miComet的互動相關紀錄
c2-2026-102|26-C2-102|2026-01-20|6|miko|🌸|Stream|Miko與星街的推文相關紀錄
c2-2026-103|26-C2-103|2026-01-17|6|suisei|☄️|Stream|星街的互動相關紀錄
c2-2026-104|26-C2-104|2026-01-12|6|others|⭐|News|miComet的互動相關紀錄
c2-2026-105|26-C2-105|2026-01-03|6|miko|🌸|Stream|Miko的互動相關紀錄
c2-2026-106|26-C2-106|2026-01-02|6|miko|🌸|Text|Miko 發推 miComet 圖
c2-2026-107|26-C2-107|2026-01-01|6|shared|💛|Stream|miComet的互動相關紀錄
`.trim();

const typeLabel: Record<string, string> = {
  Clip: '剪輯',
  Stream: '直播',
  News: '消息',
  Text: '推文',
  Audio: '音訊',
  Music: '音樂',
};

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, side, emoji, type, title] = row.split('|');
  const ctx = `${typeLabel[type] ?? '故事'}條目：${title}。來源：MiComet Compendium II。`;
  return {
    id,
    displayId,
    date,
    phase: Number(phase),
    side: side as 'miko' | 'suisei' | 'shared' | 'others',
    emoji,
    title,
    titleZh: title,
    ctx,
    ctxZh: ctx,
    type,
    link: '',
  };
});

export default data;
