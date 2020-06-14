import { arrToStr, getName } from '../../lib/util';
import { MusicSearchItem, Music } from '../../models/music.model';

function formatMusicSearchItem(music: Partial<Music>): MusicSearchItem {
  const url = music.uuid;

  const title = music.title;

  const metas = [];
  const meta = getName(music.musician)
    .slice(0, 2)
    .concat([music.publish_time, music.album_type, music.medium, music.genre]);
  metas.push(arrToStr(meta));

  const img = music.img;
  const saved = true;
  return { url, title, metas, img, saved };
}

export { formatMusicSearchItem };
