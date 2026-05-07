// miComet 編年史 - 三語言版本 (日本語 / English / 中文)
// 時間軸按時間順序整理，分左右兩條軸線
// 
// 資料來源:
// - miComet Moments Compendium Google 試算表: https://disp.cc/b/ACG/gu7D
// - PTT SakuraMiko版: https://www.ptt.cc/bbs/SakuraMiko/M.1709694215.A.D46.html
// - PTT SakuraMiko版: https://www.pttweb.cc/bbs/SakuraMiko/M.1711378184.A.D13

const miCometDataMultilang = {
  // 語言配置
  languages: ["ja", "en", "zh"],
  defaultLanguage: "zh",
  
  // 資料來源
  sources: [
    {
      title: "miComet Moments Compendium Google 試算表",
      url: "https://disp.cc/b/ACG/gu7D"
    },
    {
      title: "PTT SakuraMiko版 - miComet 故事整理文",
      url: "https://www.ptt.cc/bbs/SakuraMiko/M.1709694215.A.D46.html"
    },
    {
      title: "PTT SakuraMiko版 - miComet 互動文",
      url: "https://www.pttweb.cc/bbs/SakuraMiko/M.1711378184.A.D13"
    }
  ],

  // 左邊軸線 - 星街彗星視角
  left: [
    {
      id: "left-1",
      date: "2020/2/2",
      titles: {
        ja: "初めての出会い - Project Winter",
        en: "First Meeting - Project Winter",
        zh: "初次相遇 - Project Winter"
      },
      categories: {
        ja: "出会い",
        en: "Meeting",
        zh: "相遇"
      },
      descriptions: {
        ja: "Project Winterのコラボレーションで初めて出会った。当時の相互作用はまだ親密ではなく、Suiseiは美琴を『美琴さん』と呼んでいた。",
        en: "Met for the first time during a Project Winter collaboration. At that time, their interaction wasn't very intimate, and Suisei called Miko 'Miko-san'.",
        zh: "在 Project Winter 合作中初次相遇。當時互動不是很親密，星街彗星稱呼櫻巫女為『Miko-san』，顯示兩人當時還是比較生疏的。"
      },
      fullTexts: {
        ja: "Project Winterのゲームで初めて出会った。これはかなり短い相互作用だったが、miCometストーリーの始まりだった。Suiseiはより正式な『美琴さん』で美琴を呼び、当時二人はまだ非常に親しくなかったことを示していた。",
        en: "They first met in the Project Winter gaming collaboration. This was a rather brief interaction, but it marked the beginning of the miComet story. Suisei used the more formal 'Miko-san' to address Miko, showing they weren't very close at that time.",
        zh: "在 Project Winter 遊戲的合作中初次相遇。這是一個相當簡短的互動，但卻標誌著 miComet 故事的開始。星街彗星用更正式的『Miko-san』稱呼櫻巫女，顯示當時兩人還沒有建立起親密的關係。"
      },
      media: "🎮",
      side: "left"
    },
    {
      id: "left-2",
      date: "2020/7/19",
      titles: {
        ja: "VILLS Vol.1 初パフォーマンス",
        en: "VILLS Vol.1 First Performance",
        zh: "VILLS Vol.1 首次聯動演出"
      },
      categories: {
        ja: "マイルストーン",
        en: "Milestone",
        zh: "里程碑"
      },
      descriptions: {
        ja: "miCometはVILLS Vol.1の公演に参加した。パフォーマンス終了後、二人は抱き合った。この期間、Suiseiは肉体的疲労を経験していた美琴を継続的にサポートしていた。",
        en: "miComet participated in VILLS Vol.1 performance. After the performance, the two hugged each other. During this period, Suisei continuously supported Miko who was experiencing physical fatigue.",
        zh: "miComet 參加了 VILLS Vol.1 演出。表演結束後，兩人擁抱了彼此。在這段期間，星街彗星不斷支持正經歷身體疲勞的櫻巫女。"
      },
      fullTexts: {
        ja: "VILLS Vol.1ステージパフォーマンスで、miCometは正式なステージで初めてコラボレーションした。パフォーマンス終了時に二人は抱き合い、彼らの関係の深化を象徴していた。その間、Suiseiは美琴の練習と回復においてサポートを提供していた。",
        en: "At the VILLS Vol.1 stage performance, miComet collaborated for the first time on a formal stage. When the performance ended, the two hugged, symbolizing the deepening of their relationship. During this time, Suisei provided support in Miko's practice and recovery.",
        zh: "在 VILLS Vol.1 舞台表演中，miComet 在正式舞台上首次合作。演出結束時兩人擁抱，象徵著他們關係的深化。在這段期間，星街彗星一直在櫻巫女的練習和恢復中給予支持。"
      },
      media: "🎤",
      side: "left"
    },
    {
      id: "left-3",
      date: "2021/3/5",
      titles: {
        ja: "美琴の誕生日配信 - 重要な告白",
        en: "Miko's Birthday Stream - Important Confession",
        zh: "櫻巫女生日直播 - 重要告白"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "美琴の誕生日配信にSuiseiが電話をかけてきた。のどの調子が悪いにもかかわらず、彼女は来た。美琴は『私は本当にSuichanを尊敬しています』と言い、Suiseiは『あなたについての私の印象は：彼女は本当です』と応答した。",
        en: "Suisei called into Miko's birthday stream. Despite having a sore throat, she came. Miko said 'I really respect Suichan', and Suisei responded 'My impression of you is: you're genuine'.",
        zh: "星街彗星打電話進入櫻巫女的生日直播。儘管喉嚨不適，她還是來了。櫻巫女說『我真的很尊敬 Suichan』，星街彗星回應『我對你的印象是：你是真實的』。"
      },
      fullTexts: {
        ja: "美琴の誕生日配信で、のどの調子が悪いにもかかわらず、Suiseiは電話をかけてくることにした。二人は互いに敬意と賞賛を表現した。これは重要な瞬間であり、彼らが『仕事仲間』から真に親密な友人へと進化したことを示していた。",
        en: "In Miko's birthday stream, despite having a sore throat, Suisei decided to call in. Both expressed mutual respect and admiration for each other. This was a key moment, marking their evolution from 'work partners' to truly intimate friends.",
        zh: "在櫻巫女的生日直播中，儘管喉嚨不適，星街彗星還是打電話進來慶祝。兩人互相表達了對彼此的尊重和欣賞。這是一個關鍵時刻，標誌著他們從『工作夥伴』進化為真正親密的朋友。"
      },
      media: "💌",
      side: "left"
    },
    {
      id: "left-4",
      date: "2021/8/19",
      titles: {
        ja: "マリオカートチャレンジ - Suiseiがチャットに登場",
        en: "Mario Kart Challenge - Suisei Appears in Chat",
        zh: "馬里奧賽車挑戰 - 星街彗星在聊天中出現"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "美琴が6時間10分間のマリオカート耐久配信を行った時、Suiseiはチャットに登場し、新記録達成をサポートした。",
        en: "When Miko was streaming a 6 hour 10 minute Mario Kart endurance marathon, Suisei appeared in the chat to support Miko achieving a new record.",
        zh: "當櫻巫女進行 6 小時 10 分鐘的馬里奧賽車耐力直播時，星街彗星在聊天中出現，支持櫻巫女達成新紀錄。"
      },
      fullTexts: {
        ja: "美琴は6時間10分間の長いマリオカート配信を行い、5時間以内に新記録を作成しようとしていた。成功の寸前で、Suiseiはチャットに登場してサポートを提供した。最後に美琴は目標を達成し、勝利をSuiseiに捧げた。",
        en: "Miko streamed a lengthy 6 hour 10 minute Mario Kart session, attempting to set a new record within 5 hours. As she was about to succeed, Suisei appeared in the chat to provide support. In the end, Miko achieved her goal and dedicated the victory to Suisei.",
        zh: "櫻巫女進行了一場長達 6 小時 10 分鐘的馬里奧賽車直播，試圖在 5 小時內創造新紀錄。當她快要成功時，星街彗星在聊天中出現，提供支持。最後櫻巫女成功達成目標，並將勝利獻給星街彗星。"
      },
      media: "🏎️",
      side: "left"
    },
    {
      id: "left-5",
      date: "2021/11/27",
      titles: {
        ja: "Minecraft Disneyland - ペアリング選択",
        en: "Minecraft Disneyland - Paired Selection",
        zh: "Minecraft Disneyland - 配對選擇"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "Minecraft Disneylandでは、Suiseiはすべての青いアイテムを選択したが、青いシャツを除いて、彼女はピンクを選んだ。これは彼女が美琴の色に細心の注意を払っていることを示していた。",
        en: "In Minecraft Disneyland, Suisei selected all blue items, except for the blue shirt - she picked pink instead. This showed her careful attention to Miko's color theme.",
        zh: "在 Minecraft Disneyland 中，星街彗星選擇了所有藍色物品，除了藍色襯衫，她拿了粉紅色的。這顯示了她對櫻巫女顏色主題的細心注意。"
      },
      fullTexts: {
        ja: "Minecraft Disneylandの記念品店で、Suiseiは彼女の好きなアイテムを選びました。興味深いことに、彼女は故意にピンクのシャツを選んで青いのを選ばなかった、それは美琴のピンクテーマに合わせるためだったかもしれません。",
        en: "At the Minecraft Disneyland souvenir shop, Suisei picked items she liked. Interestingly, she deliberately chose a pink shirt instead of a blue one, possibly to match Miko's pink theme.",
        zh: "在 Minecraft Disneyland 的紀念品商店中，星街彗星挑選了她喜歡的物品。有趣的是，她刻意選擇了粉紅色的襯衫而不是藍色的，可能是為了與櫻巫女的粉紅色主題相搭配。"
      },
      media: "🏰",
      side: "left"
    }
  ],

  // 右邊軸線 - 櫻巫女視角
  right: [
    {
      id: "right-1",
      date: "2021/2/21",
      titles: {
        ja: "プロフィール質問 - 最初のサプライズ",
        en: "Profile Questionnaire - First Surprise",
        zh: "檔案問卷 - 第一次驚喜"
      },
      categories: {
        ja: "出会い",
        en: "Meeting",
        zh: "相遇"
      },
      descriptions: {
        ja: "Marineのプロフィール質問で、Suiseiは『相性の良いメンバー』欄に美琴の名前を書いた。美琴がそれを見た時、彼女は非常に喜んだ。",
        en: "In Marine's profile questionnaire, Suisei wrote Miko's name in the 'Members I Get Along With' column. When Miko saw it, she was very happy.",
        zh: "在海邊的檔案問卷中，星街彗星在『相處得好的成員』欄寫下了櫻巫女的名字。當櫻巫女看到時，她非常開心。"
      },
      fullTexts: {
        ja: "Hololiveメンバーのプロフィール質問活動で、『相性の良いメンバー』と尋ねられた時、Suiseiは美琴の名前を書きました。美琴が質問を見た時、彼女は喜びと驚きを感じ、これはSuiseiに親近感を持つようになったきっかけになりました。",
        en: "In Hololive members' profile questionnaire activity, when asked 'members I get along with', Suisei wrote Miko's name. When Miko saw the questionnaire, she felt surprised and happy, which became the catalyst for her to start getting closer to Suisei.",
        zh: "在 Hololive 成員的檔案問卷活動中，當被問到『相處得好的成員』時，星街彗星寫下了櫻巫女的名字。當櫻巫女看到問卷時感到驚喜和開心，這成為了她開始親近星街彗星的契機。"
      },
      media: "📋",
      side: "right"
    },
    {
      id: "right-2",
      date: "2021/3/22",
      titles: {
        ja: "Suiseiの誕生日配信 - 美琴の通話",
        en: "Suisei's Birthday Stream - Miko's Call",
        zh: "星街彗星生日直播 - 櫻巫女的來電"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "美琴はSuiseiの誕生日配信に電話をかけてきた。彼らはmiCometがどのように仕事関係から発展してきたか、そして彼らがどのように親密になったかについて議論した。",
        en: "Miko called into Suisei's birthday stream. They discussed how miComet developed from a work relationship and how they became so close.",
        zh: "櫻巫女打電話進入星街彗星的生日直播。他們討論了 miComet 如何從工作關係發展而來，以及他們變得多麼親近。"
      },
      fullTexts: {
        ja: "Suiseiの誕生日配信で、美琴は電話をかけてきた。彼らはmiCometの組み合わせがどのように形成されたかについて談論し、彼らの間の関係が純粋な『商業協力』から真の友情へどのように進化したかについて談論しました。",
        en: "In Suisei's birthday stream, Miko called in. They discussed how the miComet pairing was formed and how their relationship evolved from pure 'business collaboration' into genuine friendship.",
        zh: "在星街彗星的生日直播中，櫻巫女打電話進來。他們談論了 miComet 這個組合是如何形成的，以及他們之間的關係如何從純粹的『商業合作』演變成真實的友誼。"
      },
      media: "🎂",
      side: "right"
    },
    {
      id: "right-3",
      date: "2021/10/21",
      titles: {
        ja: "Sololive直前相互作用 - Twitter交換",
        en: "Pre-Sololive Interaction - Twitter Exchange",
        zh: "Sololive 直前互動 - Twitter 交換"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "Suiseiの Sololive 直前に、二人は Twitter で相互作用した。美琴は『私はあなたを見ています』と言い、Suiseiはいいねを押した。",
        en: "Before Suisei's Sololive, the two interacted on Twitter. Miko said 'I'm watching you', and Suisei liked it.",
        zh: "在星街彗星的 Sololive 直前，兩人在 Twitter 上互動。櫻巫女說『我正在看你』，星街彗星按了讚。"
      },
      fullTexts: {
        ja: "Suiseiの Sololive 開始前に、二人は Twitter で甘い相互作用を行いました。美琴は積極的に『私はあなたを見ています、Sui-chan』とツイートし、Suiseiが見てからいいねを押しました。このリアルタイムの相互作用は彼らの親密度を示していました。",
        en: "Before Suisei's Sololive started, the two had a sweet interaction on Twitter. Miko proactively tweeted 'I'm watching you, Sui-chan', and Suisei liked it after seeing it. This real-time interaction showed their closeness.",
        zh: "在星街彗星的 Sololive 開始前，兩人在 Twitter 上進行了甜蜜的互動。櫻巫女主動發推文『我正在看著你，Sui-chan』，星街彗星看到後按了讚，這種即時互動顯示了他們的親密度。"
      },
      media: "⭐",
      side: "right"
    },
    {
      id: "right-4",
      date: "2021/12/1",
      titles: {
        ja: "終夜通話",
        en: "All-Night Call",
        zh: "整夜通話"
      },
      categories: {
        ja: "重要な瞬間",
        en: "Important Moment",
        zh: "重要時刻"
      },
      descriptions: {
        ja: "美琴はツイッターで彼女が他の Hololive メンバーとボイスチャットをしていたと投稿した。同じ日に、Suiseiは配信でも終夜通話に参加していたと述べた。彼らは談話の他の端にいる可能性が非常に高い。",
        en: "Miko posted on Twitter that she had been voice chatting with other Hololive members all night. On the same day, Suisei mentioned in her stream that she was also in an all-night call. They most likely were on the other end of the conversation.",
        zh: "櫻巫女在推特上發文說她整晚都在和其他 Hololive 成員語音聊天。同一天，星街彗星在直播中提到她也在整夜通話中，兩人極可能是在談話的另一端。"
      },
      fullTexts: {
        ja: "朝8時58分、美琴は『私は他の Hololive メンバーとの音声チャットで一晩中楽しんでいました...朝食をしなければなりません。』とツイートしました。同じ日に、Suiseiは彼女も終夜通話中だったことを述べ、彼女の声がかすれていました。時間に基づいて推測すると、彼らは一晩中チャットしていた可能性があります。",
        en: "At 8:58 AM, Miko tweeted 'I spent the whole night voice chatting with other Hololive members, having a great time... I should eat breakfast.' On the same day, Suisei mentioned in her stream that she was also in an all-night call, her voice hoarse. Based on timing, they likely had been chatting all night.",
        zh: "早上 8:58，櫻巫女推文說『我整個晚上都在和其他 Hololive 成員語音聊天，玩得很開心...該吃早餐了。』同一天，星街彗星在直播中提到她也整夜在通話中，她的聲音沙啞。根據時間推測，他們可能一整晚都在聊天。"
      },
      media: "🌙",
      side: "right"
    },
    {
      id: "right-5",
      date: "2022/1/27",
      titles: {
        ja: "Animal カバー MV リリース",
        en: "Animal Cover MV Release",
        zh: "Animal 封面 MV 發布"
      },
      categories: {
        ja: "マイルストーン",
        en: "Milestone",
        zh: "里程碑"
      },
      descriptions: {
        ja: "miCometの最初の公式音楽 MV『Animal』がリリースされた。Suiseiは美琴に一緒にこの歌を歌うよう招待し、『爆速』で MV 全体を作成した。",
        en: "miComet's first official music MV 'Animal' was released. Suisei invited Miko to sing this song together, and created the entire MV at lightning speed.",
        zh: "miComet 首部官方音樂 MV『Animal』發布。星街彗星邀請櫻巫女一起唱這首歌，用『爆速』製作了整個 MV。"
      },
      fullTexts: {
        ja: "Suiseiは美琴に『Animal』という歌のカバーを作成するよう招待しました。Suiseiは信じられないほどの速度で記録、編集、公開を組織しました。これは miComet の最初の正式にリリースされた音楽ビデオであり、彼らの完璧な協力を示していました。",
        en: "Suisei invited Miko to create a cover for the song 'Animal'. Suisei organized recording, editing, and release at an incredibly fast pace. This was miComet's first officially released music video, showcasing their perfect collaboration.",
        zh: "星街彗星邀請櫻巫女一起為『Animal』這首歌製作封面。星街彗星用令人難以置信的速度組織錄製、編輯和發布，這是 miComet 首部正式發布的音樂視頻，展示了他們完美的合作。"
      },
      media: "🎵",
      side: "right"
    }
  ],

  // 篩選用的關鍵時刻/分類
  milestones: [
    {
      id: "all",
      labels: { ja: "すべて", en: "All", zh: "全部" },
      emoji: "📅"
    },
    {
      id: "出会い",
      labels: { ja: "✨ 出会い", en: "✨ Meeting", zh: "✨ 相遇" },
      emoji: "✨"
    },
    {
      id: "重要な瞬間",
      labels: { ja: "💫 重要な瞬間", en: "💫 Important Moment", zh: "💫 重要時刻" },
      emoji: "💫"
    },
    {
      id: "マイルストーン",
      labels: { ja: "❤️ マイルストーン", en: "❤️ Milestone", zh: "❤️ 里程碑" },
      emoji: "❤️"
    }
  ]
};

// 其他腳本使用匯出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = miCometDataMultilang;
}
