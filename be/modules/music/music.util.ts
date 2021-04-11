import { arrToStr, getName } from '../../lib/util';
import { MusicSearchItem, Music, MusicItem } from '../../models/music.model';

function formatMusicItem(music: Partial<Music>): MusicItem {
  const url = music.uuid;

  const title = music.title;

  const metas = [];
  const meta = getName(music.musician)
    .slice(0, 2)
    .concat([music.publish_time, music.album_type, music.medium, music.genre]);
  metas.push(arrToStr(meta));

  const img = music.img;
  return { url, title, metas, img };
}

function formatInternalMusicSearchItem(music: Partial<Music>): MusicSearchItem {
  const musicItem = formatMusicItem(music);
  return { ...musicItem, saved: true };
}

export { formatMusicItem, formatInternalMusicSearchItem };
