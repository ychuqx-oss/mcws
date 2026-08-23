import baseData from './timeline-2026-compendium-base';

const patched = baseData.map((story) => {
  if (story.id === 'c2-2026-001') {
    return {
      ...story,
      title: 'Miko Retweets Old MiComet Fanart',
      titleZh: 'Miko轉推舊miComet粉絲圖',
      titleEn: 'Miko Retweets Old MiComet Fanart',
      ctx: 'Miko revisited and retweeted older miComet fanart.',
      ctxZh: 'Miko重新翻出並轉推過去的miComet粉絲圖。',
      ctxEn: 'Miko revisited and retweeted older miComet fanart.',
    };
  }
  if (story.id === 'c2-2026-002') {
    return {
      ...story,
      title: 'Fubuki Spies on MiComet in Hololive Dreams',
      titleZh: '白上吹雪在Hololive Dreams偷看miComet',
      titleEn: 'Fubuki Spies on MiComet in Hololive Dreams',
      ctx: 'Fubuki spotted Miko and Suisei together in Hololive Dreams and watched the pair from nearby.',
      ctxZh: '白上吹雪在《Hololive Dreams》中發現Miko與星街待在一起，便在附近偷看兩人的互動。',
      ctxEn: 'Fubuki spotted Miko and Suisei together in Hololive Dreams and watched the pair from nearby.',
    };
  }
  if (story.id === 'c2-2026-003') {
    return {
      ...story,
      title: 'MiComet 6th Anniversary Meeting Minutes',
      titleZh: 'miComet六周年會議紀錄',
      titleEn: 'MiComet 6th Anniversary Meeting Minutes',
      ctx: 'Miko posted humorous meeting minutes commemorating miComet’s sixth anniversary.',
      ctxZh: 'Miko發布了一組幽默的「會議紀錄」，紀念miComet結成六周年。',
      ctxEn: 'Miko posted humorous meeting minutes commemorating miComet’s sixth anniversary.',
    };
  }
  if (story.id === 'c2-2026-004') {
    return {
      ...story,
      title: 'MiComet 6th Anniversary',
      titleZh: 'miComet六周年',
      titleEn: 'MiComet 6th Anniversary',
      ctx: 'Miko and Suisei held a special collaboration stream celebrating six years of miComet and looked back on their history together.',
      ctxZh: 'Miko與星街舉行miComet六周年特別連動直播，一同回顧兩人至今的歷程。',
      ctxEn: 'Miko and Suisei held a special collaboration stream celebrating six years of miComet and looked back on their history together.',
    };
  }
  return story;
});

const additions = [
  {
    id: 'c2-2026-109',
    displayId: '26-C2-109',
    date: '2026-07-28',
    phase: 6,
    side: 'miko' as const,
    emoji: '🌸',
    type: 'Stream',
    title: 'Miko Wants to Hear Suisei Say “I Love You” in Hololive Dreams',
    titleZh: 'Miko想在Hololive Dreams聽星街說「我愛你」',
    titleEn: 'Miko Wants to Hear Suisei Say “I Love You” in Hololive Dreams',
    ctx: 'While playing Hololive Dreams, Miko said she wanted to max out Suisei’s affection so she could hear Suisei say, “I love you.”',
    ctxZh: 'Miko遊玩《Hololive Dreams》時表示，她想把星街的好感度提升至最高，好聽到星街對她說「我愛你」。',
    ctxEn: 'While playing Hololive Dreams, Miko said she wanted to max out Suisei’s affection so she could hear Suisei say, “I love you.”',
    link: '',
    source: '2026 compendium update',
  },
  {
    id: 'c2-2026-110',
    displayId: '26-C2-110',
    date: '2026-07-31',
    phase: 6,
    side: 'shared' as const,
    emoji: '💛',
    type: 'Stream',
    title: 'Okayu Collaborates with Koyori and MiComet',
    titleZh: '貓又小粥與博衣小夜璃及miComet連動',
    titleEn: 'Okayu Collaborates with Koyori and MiComet',
    ctx: 'Okayu joined Koyori, Miko, and Suisei for a group collaboration.',
    ctxZh: '貓又小粥與博衣小夜璃、Miko及星街進行多人連動。',
    ctxEn: 'Okayu joined Koyori, Miko, and Suisei for a group collaboration.',
    link: '',
    source: '2026 compendium update',
  },
  {
    id: 'c2-2026-111',
    displayId: '26-C2-111',
    date: '2026-08-01',
    phase: 6,
    side: 'shared' as const,
    emoji: '💛',
    type: 'Stream',
    title: 'Miko Announces Her 2nd Solo Live with Fubuki, Subaru, and Suisei',
    titleZh: 'Miko與白上吹雪、大空昴及星街公布第二場個人演唱會',
    titleEn: 'Miko Announces Her 2nd Solo Live with Fubuki, Subaru, and Suisei',
    ctx: 'Miko appeared with Fubuki, Subaru, and Suisei to announce her second solo live.',
    ctxZh: 'Miko與白上吹雪、大空昴及星街一同登場，公布她的第二場個人演唱會。',
    ctxEn: 'Miko appeared with Fubuki, Subaru, and Suisei to announce her second solo live.',
    link: '',
    source: '2026 compendium update',
  },
  {
    id: 'c2-2026-112',
    displayId: '26-C2-112',
    date: '2026-08-06',
    phase: 6,
    side: 'others' as const,
    emoji: '⭐',
    type: 'Text',
    title: 'Fubuki Shows Off MiComet in Hololive Dreams',
    titleZh: '白上吹雪在Hololive Dreams展示miComet',
    titleEn: 'Fubuki Shows Off MiComet in Hololive Dreams',
    ctx: 'Fubuki posted about and showed off miComet in Hololive Dreams.',
    ctxZh: '白上吹雪發文展示《Hololive Dreams》中的miComet。',
    ctxEn: 'Fubuki posted about and showed off miComet in Hololive Dreams.',
    link: '',
    source: 'User-provided 2026 timeline note: Tweet 1, Tweet 2',
  },
  {
    id: 'c2-2026-113',
    displayId: '26-C2-113',
    date: '2026-08-07',
    phase: 6,
    side: 'suisei' as const,
    emoji: '☄️',
    type: 'Text',
    title: 'Suisei Has Swimsuit Miko in Hololive Dreams',
    titleZh: '星街在Hololive Dreams擁有泳裝Miko',
    titleEn: 'Suisei Has Swimsuit Miko in Hololive Dreams',
    ctx: 'Suisei posted that she had swimsuit Miko in Hololive Dreams.',
    ctxZh: '星街發文表示，她在《Hololive Dreams》中擁有泳裝Miko。',
    ctxEn: 'Suisei posted that she had swimsuit Miko in Hololive Dreams.',
    link: '',
    source: 'User-provided 2026 timeline note: Tweet',
  },
  {
    id: 'c2-2026-114',
    displayId: '26-C2-114',
    date: '2026-08-17',
    phase: 6,
    side: 'shared' as const,
    emoji: '💛',
    type: 'Stream',
    title: 'Surprise MiComet Off-Collab in Suisei’s Stream',
    titleZh: '星街直播中驚喜出現miComet線下連動',
    titleEn: 'Surprise MiComet Off-Collab in Suisei’s Stream',
    ctx: 'A surprise miComet off-collab took place during Suisei’s stream.',
    ctxZh: '星街的直播中驚喜出現miComet線下連動。',
    ctxEn: 'A surprise miComet off-collab took place during Suisei’s stream.',
    link: '',
    source: 'User-provided 2026 timeline note: Stream, Clip',
  },
];

export default [...patched, ...additions];
