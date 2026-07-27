const data: Array<{
  id: string;
  displayId: string;
  date: string;
  phase: number;
  side: 'miko' | 'suisei' | 'shared' | 'others';
  emoji: string;
  title: string;
  titleZh: string;
  ctx: string;
  ctxZh: string;
  type: string;
  link: string;
  source: string;
}> = [
  {
    "id": "c2-2026-001",
    "displayId": "26-C2-1",
    "date": "2026-07-26",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko轉推舊miComet粉絲圖",
    "titleZh": "Miko轉推舊miComet粉絲圖",
    "ctx": "Miko轉推舊miComet粉絲圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "ctxZh": "Miko轉推舊miComet粉絲圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-002",
    "displayId": "26-C2-2",
    "date": "2026-07-23",
    "phase": 6,
    "side": "others",
    "emoji": "⭐",
    "title": "白上吹雪在Hololive Dreams偷看miComet",
    "titleZh": "白上吹雪在Hololive Dreams偷看miComet",
    "ctx": "白上吹雪在Hololive Dreams偷看miComet。這天以推文形式留下miComet相關互動，內容重點在兩人或粉絲圖文之間的連結。",
    "ctxZh": "白上吹雪在Hololive Dreams偷看miComet。這天以推文形式留下miComet相關互動，內容重點在兩人或粉絲圖文之間的連結。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-003",
    "displayId": "26-C2-3",
    "date": "2026-07-21",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "miComet六周年會議紀錄",
    "titleZh": "miComet六周年會議紀錄",
    "ctx": "miComet六周年會議紀錄。推文內容與後續直播或企劃安排相連，讓這天的文字互動成為活動前後脈絡的一部分。",
    "ctxZh": "miComet六周年會議紀錄。推文內容與後續直播或企劃安排相連，讓這天的文字互動成為活動前後脈絡的一部分。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-004",
    "displayId": "26-C2-4",
    "date": "2026-07-21",
    "phase": 6,
    "side": "shared",
    "emoji": "💛",
    "title": "miComet六周年直播",
    "titleZh": "miComet六周年直播",
    "ctx": "miComet六周年直播。這天兩人或包含兩人的成員組合進行同場內容，故事重點放在直播企劃中的實際互動。",
    "ctxZh": "miComet六周年直播。這天兩人或包含兩人的成員組合進行同場內容，故事重點放在直播企劃中的實際互動。",
    "type": "Stream",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-005",
    "displayId": "26-C2-5",
    "date": "2026-07-19",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko宣布miComet六周年直播將於7月21日舉行",
    "titleZh": "Miko宣布miComet六周年直播將於7月21日舉行",
    "ctx": "Miko宣布miComet六周年直播將於7月21日舉行。推文內容與後續直播或企劃安排相連，讓這天的文字互動成為活動前後脈絡的一部分。",
    "ctxZh": "Miko宣布miComet六周年直播將於7月21日舉行。推文內容與後續直播或企劃安排相連，讓這天的文字互動成為活動前後脈絡的一部分。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-006",
    "displayId": "26-C2-6",
    "date": "2026-07-13",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko轉推睡著的miComet圖",
    "titleZh": "Miko轉推睡著的miComet圖",
    "ctx": "Miko轉推睡著的miComet圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "ctxZh": "Miko轉推睡著的miComet圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-007",
    "displayId": "26-C2-7",
    "date": "2026-07-07",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko等待她的彥星星街",
    "titleZh": "Miko等待她的彥星星街",
    "ctx": "Miko等待她的彥星星街。這天兩人或包含兩人的成員組合進行同場內容，故事重點放在直播企劃中的實際互動。",
    "ctxZh": "Miko等待她的彥星星街。這天兩人或包含兩人的成員組合進行同場內容，故事重點放在直播企劃中的實際互動。",
    "type": "Stream",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-008",
    "displayId": "26-C2-8",
    "date": "2026-07-05",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko哄星街吃紅蘿蔔",
    "titleZh": "Miko哄星街吃紅蘿蔔",
    "ctx": "Miko哄星街吃紅蘿蔔。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "ctxZh": "Miko哄星街吃紅蘿蔔。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "type": "Stream",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-009",
    "displayId": "26-C2-9",
    "date": "2026-07-04",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko發布miComet短片",
    "titleZh": "Miko發布miComet短片",
    "ctx": "Miko發布miComet短片。短片內容把miComet相關畫面剪成獨立事件，故事重點放在影片中呈現的互動或同框。",
    "ctxZh": "Miko發布miComet短片。短片內容把miComet相關畫面剪成獨立事件，故事重點放在影片中呈現的互動或同框。",
    "type": "Clip",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-010",
    "displayId": "26-C2-10",
    "date": "2026-07-03",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko滿腦子都是miComet",
    "titleZh": "Miko滿腦子都是miComet",
    "ctx": "Miko滿腦子都是miComet。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "ctxZh": "Miko滿腦子都是miComet。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "type": "Stream",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-011",
    "displayId": "26-C2-11",
    "date": "2026-07-02",
    "phase": 6,
    "side": "suisei",
    "emoji": "☄️",
    "title": "星街抱怨Miko來家裡吃咖哩遲到",
    "titleZh": "星街抱怨Miko來家裡吃咖哩遲到",
    "ctx": "星街抱怨Miko來家裡吃咖哩遲到。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "ctxZh": "星街抱怨Miko來家裡吃咖哩遲到。直播中談到或發生miComet相關內容，內文保留當天的對話、反應與互動脈絡。",
    "type": "Stream",
    "link": "",
    "source": "uploaded 2026 list"
  },
  {
    "id": "c2-2026-012",
    "displayId": "26-C2-12",
    "date": "2026-07-01",
    "phase": 6,
    "side": "miko",
    "emoji": "🌸",
    "title": "Miko轉推miComet圖",
    "titleZh": "Miko轉推miComet圖",
    "ctx": "Miko轉推miComet圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "ctxZh": "Miko轉推miComet圖。當天透過推文或轉推呈現miComet相關圖文互動，時間線保留的是圖文動作與兩人關係的連結。",
    "type": "Text",
    "link": "",
    "source": "uploaded 2026 list"
  }
];

export default data;
