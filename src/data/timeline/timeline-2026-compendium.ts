const rows = `
c2-2026-001|26-C2-1|2026-07-23|6|others|⭐|Text|白上吹雪在Hololive Dreams偷看miComet
c2-2026-002|26-C2-2|2026-07-21|6|miko|🌸|Text|miComet六周年會議紀錄
c2-2026-003|26-C2-3|2026-07-21|6|shared|💛|Stream|miComet六周年直播
c2-2026-004|26-C2-4|2026-07-19|6|miko|🌸|Text|Miko宣布miComet六周年直播將於7月21日舉行
c2-2026-005|26-C2-5|2026-07-13|6|miko|🌸|Text|Miko轉推睡著的miComet圖
c2-2026-006|26-C2-6|2026-07-07|6|miko|🌸|Stream|Miko等待她的彥星星街
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
c2-2026-017|26-C2-17|2026-06-12|6|others|⭐|Stream|輪堂千速直播中提到miComet約會話題
c2-2026-018|26-C2-18|2026-06-12|6|others|⭐|Clip|Miko發布FubuMiComet短片
c2-2026-019|26-C2-19|2026-06-07|6|suisei|☄️|Stream|星街打電話給Miko
c2-2026-020|26-C2-20|2026-06-07|6|miko|🌸|Stream|Miko拿走星街手機並用它發文
c2-2026-021|26-C2-21|2026-06-07|6|miko|🌸|Text|Miko的幸運Hololive成員是星街
c2-2026-022|26-C2-22|2026-06-05|6|shared|💛|Stream|miComet麥塊連動
c2-2026-023|26-C2-23|2026-06-05|6|others|⭐|News|miComet JOYSOUND聯名
c2-2026-024|26-C2-24|2026-06-04|6|shared|💛|Stream|miComet麥塊連動，星街因Miko和夏色祭通話而吃味
c2-2026-025|26-C2-25|2026-06-03|6|others|⭐|Stream|白上吹雪在Hololive通話中對miComet貼貼發狂
c2-2026-026|26-C2-26|2026-05-31|6|miko|🌸|Stream|Miko談到Biji Camp
c2-2026-027|26-C2-27|2026-05-29|6|miko|🌸|Text|miComet去露營
c2-2026-028|26-C2-28|2026-05-26|6|miko|🌸|Stream|Miko談到上次露營、星街的行動力，以及即將再和姊街、星街去露營
c2-2026-029|26-C2-29|2026-05-24|6|suisei|☄️|Stream|星街談到與FubuMio、Miko和姊街的旅行
c2-2026-030|26-C2-30|2026-05-24|6|others|⭐|Stream|白上吹雪談到旅行回程時星街因寂寞改坐FubuMio車，Miko和犬山坐在後座
c2-2026-031|26-C2-31|2026-05-23|6|miko|🌸|Stream|Miko談到和姊街、FubuMio、星街旅行，以及姊街幫她吹頭髮
c2-2026-032|26-C2-32|2026-05-23|6|others|⭐|Text|大神澪對miComet推文打情罵俏作出反應
c2-2026-033|26-C2-33|2026-05-18|6|miko|🌸|Stream|Miko覺得星街比一條莉莉華更容易在旅行中出包
c2-2026-034|26-C2-34|2026-05-18|6|miko|🌸|Stream|Miko寫給佃煮海苔男，說能在星街家看到犬山玉姬
c2-2026-035|26-C2-35|2026-05-17|6|miko|🌸|Stream|Miko注意到遊戲服裝像星街的衣服
c2-2026-036|26-C2-36|2026-05-15|6|suisei|☄️|Stream|星街不想有任何事輸給Miko
c2-2026-037|26-C2-37|2026-05-15|6|suisei|☄️|Stream|星街教Miko安排休息日
c2-2026-038|26-C2-38|2026-05-15|6|others|⭐|Stream|大空昴騙Miko參加星街的肌肉訓練
c2-2026-039|26-C2-39|2026-05-14|6|others|⭐|Stream|不知火建設R.E.P.O.連動
c2-2026-040|26-C2-40|2026-05-13|6|miko|🌸|Stream|Miko在R.E.P.O.又把大空昴叫成星街，還請星街陪她去廁所
c2-2026-041|26-C2-41|2026-05-13|6|others|⭐|Stream|Reine遊戲中出現miComet告白情節
c2-2026-042|26-C2-42|2026-05-12|6|miko|🌸|Stream|Miko談章魚燒派對、做咖哩，以及星街和別人玩Shadowverse
c2-2026-043|26-C2-43|2026-05-11|6|others|⭐|Stream|Reine遊戲中miComet也墜入愛河
c2-2026-044|26-C2-44|2026-05-11|6|others|⭐|Stream|一條莉莉華分享星街罵Miko吃完就睡在沙發上的故事
c2-2026-045|26-C2-45|2026-05-09|6|miko|🌸|Stream|Miko在姊街不在時煮咖哩給鷹嶺琉依與星街
c2-2026-046|26-C2-46|2026-05-08|6|others|⭐|Stream|大空昴提到Miko在星街沙發上睡著的章魚燒派對故事
c2-2026-047|26-C2-47|2026-05-03|6|shared|💛|Stream|miComet等人參加Cursed Companions連動
c2-2026-048|26-C2-48|2026-04-29|6|miko|🌸|Stream|Miko遊玩朋友收藏集
c2-2026-049|26-C2-49|2026-04-25|6|others|⭐|Stream|白上吹雪的朋友收藏集中miComet開始交往
c2-2026-050|26-C2-50|2026-04-23|6|miko|🌸|Text|miComet也在博衣小夜璃的島上配對
c2-2026-051|26-C2-51|2026-04-21|6|miko|🌸|Text|Miko在朋友收藏集中教星街什麼是商業違規
c2-2026-052|26-C2-52|2026-04-21|6|others|⭐|Stream|白上吹雪的朋友收藏集miComet直播
c2-2026-053|26-C2-53|2026-04-19|6|shared|💛|Stream|miComet USJ連動影片
c2-2026-054|26-C2-54|2026-04-19|6|miko|🌸|Text|Miko為星街家做燉菜
c2-2026-055|26-C2-55|2026-04-17|6|others|⭐|Stream|白上吹雪想知道Miko是不是想星街了
c2-2026-056|26-C2-56|2026-04-15|6|others|⭐|Clip|Hololive Dreams裡miComet同框
c2-2026-057|26-C2-57|2026-04-12|6|miko|🌸|Clip|Miko製作關於生日、鷹嶺琉依與星街事件的短片
c2-2026-058|26-C2-58|2026-04-12|6|miko|🌸|Text|Miko發推談露營
c2-2026-059|26-C2-59|2026-04-11|6|others|⭐|Stream|大神澪談到露營、miComet、姊街與犬山玉姬
c2-2026-060|26-C2-60|2026-04-10|6|miko|🌸|Clip|Miko製作與星街相關的短片
c2-2026-061|26-C2-61|2026-04-08|6|suisei|☄️|Stream|星街要求星詠注意言行，Miko說聞犬山味道會冷靜
c2-2026-062|26-C2-62|2026-04-08|6|miko|🌸|Text|Miko與姊街、鷹嶺琉依看電影，星街幫Miko日記上色
c2-2026-063|26-C2-63|2026-04-05|6|suisei|☄️|Text|星街在Twitter Space中被犬山叫聲暴露人在Miko家
c2-2026-064|26-C2-64|2026-04-05|6|miko|🌸|Clip|Miko錄製Chatter Chatter舞蹈短片
c2-2026-065|26-C2-65|2026-03-29|6|others|⭐|Stream|年輕粉絲向Hololive成員點播miComet現場表演
c2-2026-066|26-C2-66|2026-03-26|6|others|⭐|Stream|博衣小夜璃發現miComet互相在家裡擺對方娃娃
c2-2026-067|26-C2-67|2026-03-24|6|shared|💛|Stream|miComet開台商量星街新公司相關問題
c2-2026-068|26-C2-68|2026-03-22|6|miko|🌸|Text|miComet宣布要開台回答星街新公司相關問題
c2-2026-069|26-C2-69|2026-03-22|6|miko|🌸|Stream|Miko炫耀自己的Biji派對
c2-2026-070|26-C2-70|2026-03-22|6|suisei|☄️|Clip|星街〈Prima Donna〉MV出現scene 35
c2-2026-071|26-C2-71|2026-03-21|6|suisei|☄️|Stream|星街傳訊息給Miko
c2-2026-072|26-C2-72|2026-03-21|6|suisei|☄️|Audio|星街在廣播中談到miComet
c2-2026-073|26-C2-73|2026-03-20|6|others|⭐|Stream|鷹嶺琉依談到miComet互動
c2-2026-074|26-C2-74|2026-03-16|6|miko|🌸|Stream|Miko讓睡著的星街代打遊戲，結果星街還是輸了
c2-2026-075|26-C2-75|2026-03-16|6|suisei|☄️|Stream|星街睡著後被Miko叫醒代打遊戲
c2-2026-076|26-C2-76|2026-03-14|6|miko|🌸|Stream|Miko在遊戲輸掉時跑去叫醒星街幫忙
c2-2026-077|26-C2-77|2026-03-14|6|suisei|☄️|Stream|星街被Miko叫醒後幫她代打但仍然失敗
c2-2026-078|26-C2-78|2026-03-11|6|others|⭐|Stream|風真伊呂波不想介入miComet之間
c2-2026-079|26-C2-79|2026-03-10|6|miko|🌸|Text|Miko在副帳號上與星街互動
c2-2026-080|26-C2-80|2026-03-09|6|suisei|☄️|Stream|星街祝賀Miko生日
c2-2026-081|26-C2-81|2026-03-08|6|suisei|☄️|Stream|星街談到HoloFes沒有miComet
c2-2026-082|26-C2-82|2026-03-05|6|miko|🌸|Stream|Miko逆凸待中表示想煮飯給星街，星街回想最初是透過美少女遊戲認識Miko
c2-2026-083|26-C2-83|2026-03-05|6|others|⭐|News|miComet周邊開放預約
c2-2026-084|26-C2-84|2026-03-01|6|others|⭐|Clip|另一支miComet〈Lollipop〉短片
c2-2026-085|26-C2-85|2026-02-22|6|others|⭐|Clip|另一支miComet〈Lollipop〉短片
c2-2026-086|26-C2-86|2026-02-21|6|others|⭐|Stream|角卷綿芽直播中出現miComet
c2-2026-087|26-C2-87|2026-02-21|6|miko|🌸|Text|Miko送花籃給星街演唱會
c2-2026-088|26-C2-88|2026-02-17|6|suisei|☄️|Text|星街拍下Miko屁股照並與Miko互動
c2-2026-089|26-C2-89|2026-02-17|6|miko|🌸|Text|Miko轉推miComet圖
c2-2026-090|26-C2-90|2026-02-17|6|others|⭐|Stream|蘿蔔子見到miComet
c2-2026-091|26-C2-91|2026-02-16|6|others|⭐|Clip|miComet〈Lollipop〉短片
c2-2026-092|26-C2-92|2026-02-14|6|shared|💛|Stream|miComet情人節同場互動
c2-2026-093|26-C2-93|2026-02-13|6|miko|🌸|Text|Miko宣傳miComet情人節直播
c2-2026-094|26-C2-94|2026-02-12|6|others|⭐|Stream|Hololive成員提到miComet情人節連動
c2-2026-095|26-C2-95|2026-02-09|6|miko|🌸|Stream|Miko在情人節連動前談到星街與miComet安排
c2-2026-096|26-C2-96|2026-01-30|6|miko|🌸|Stream|Miko直播中談星街與miComet安排
c2-2026-097|26-C2-97|2026-01-29|6|miko|🌸|Stream|Miko直播中談星街相關事件
c2-2026-098|26-C2-98|2026-01-28|6|miko|🌸|Text|Miko發推miComet圖
c2-2026-099|26-C2-99|2026-01-24|6|shared|💛|Stream|miComet一月下旬同場連動
c2-2026-100|26-C2-100|2026-01-23|6|miko|🌸|Text|Miko轉推miComet圖
c2-2026-101|26-C2-101|2026-01-22|6|shared|💛|Stream|miComet一月麥塊同場互動
c2-2026-102|26-C2-102|2026-01-20|6|miko|🌸|Stream|Miko談到星街推文互動
c2-2026-103|26-C2-103|2026-01-17|6|suisei|☄️|Stream|星街直播中談miComet話題
c2-2026-104|26-C2-104|2026-01-12|6|others|⭐|News|miComet一月相關公告
c2-2026-105|26-C2-105|2026-01-03|6|miko|🌸|Stream|Miko新年直播中談星街
c2-2026-106|26-C2-106|2026-01-02|6|miko|🌸|Text|Miko發推miComet圖
c2-2026-107|26-C2-107|2026-01-01|6|shared|💛|Stream|miComet新年同場連動
`.trim();

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, side, emoji, type, title] = row.split('|');
  const ctx = `${title}。`;
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
    source: 'MiComet Compendium II',
  };
});

export default data;