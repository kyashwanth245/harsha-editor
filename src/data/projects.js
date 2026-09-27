const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 1,
    title: 'AMV EDIT',
    category: 'Fast Paced',
    description: 'A high-energy brand promo cut for maximum retention.',
    video: `${base}videos/video-01.mp4`,
    thumbnail: `${base}thumbnails/video-01.jpeg`,
  },
  {
    id: 2,
    title: 'First Light',
    category: 'Cinematic',
    description: 'A moody narrative edit built around pacing and light.',
    video: `${base}videos/video-02.mp4`,
    thumbnail: `${base}thumbnails/video-02.jpeg`,
  },
  {
    id: 3,
    title: 'Loop & Hook',
    category: 'Social Media',
    description: 'A short-form hook edit built for the first three seconds.',
    video: `${base}videos/video-03.mp4`,
    thumbnail: `${base}thumbnails/video-03.jpeg`,
  },
  {
    id: 4,
    title: 'Signal',
    category: 'Motion Graphics',
    description: 'Animated typography and transitions carrying the story.',
    video: `${base}videos/video-04.mp4`,
    thumbnail: `${base}thumbnails/video-04.jpeg`,
  },
  {
    id: 5,
    title: 'Overdrive',
    category: 'Intro / Outro',
    description: 'A branded intro sequence designed to set the tone fast.',
    video: `${base}videos/video-05.mp4`,
    thumbnail: `${base}thumbnails/video-05.jpeg`,
  },
];
