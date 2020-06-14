import database from '../../database';
import { Music } from '../../models/music.model';

async function insertMusic(music: Music): Promise<Partial<Music>> {
  const data = await database.raw(
    `INSERT INTO music (uuid, title, img, musician, genre, album_type, 
      medium, publish_time, publisher, cd_count, barcode, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING title, musician, album_type, medium, genre, publish_time, img`,
    [
      music.uuid,
      music.title,
      music.img,
      JSON.stringify(music.musician),
      music.genre,
      music.album_type,
      music.medium,
      music.publish_time,
      music.publisher,
      music.cd_count,
      music.barcode,
      new Date(),
    ]
  );

  return data.rows[0];
}

async function selectMusicByUuid(uuid: string): Promise<Music> {
  const data = await database.raw('SELECT * FROM music WHERE uuid = ?', [uuid]);
  return data.rows[0];
}

async function selectMusicRating(
  uuid: string,
  email: string
): Promise<{ rating: number }> {
  const data = await database.raw(
    `SELECT um.rating FROM user_music um
    INNER JOIN users ON users.id = um.user_id
    INNER JOIN music ON music.id = um.music_id
    WHERE users.email = ?
    AND music.uuid = ?`,
    [email, uuid]
  );

  return data.rows[0];
}

async function insertMusicRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `INSERT INTO user_music( user_id, music_id, rating, updatedat, createdat)
    SELECT users.id, music.id, ?, ?, ?
    FROM users, music
    WHERE users.email = ?
    AND music.uuid = ?
    RETURNING rating`,
    [rating, date, date, email, uuid]
  );
  return data.rows[0];
}

async function updateMusicRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `UPDATE user_music um
    SET rating = ?, updatedat = ?
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.music_id = (SELECT id FROM music WHERE music.uuid = ?)
    RETURNING rating
    `,
    [rating, date, email, uuid]
  );

  return data.rows[0];
}

async function deleteMusicRating(
  uuid: string,
  email: string
): Promise<boolean> {
  await database.raw(
    `DELETE FROM user_music um
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.music_id = (SELECT id FROM music WHERE music.uuid = ?)
    `,
    [email, uuid]
  );

  return true;
}

export {
  insertMusic,
  selectMusicByUuid,
  selectMusicRating,
  insertMusicRating,
  updateMusicRating,
  deleteMusicRating,
};
