/* eslint-disable max-len */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada user_id terhadap kolom id dari tabel users
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');

  // memberikan constraint foreign key pada album_id terhadap kolom id dari tabel albums
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_user_album_likes.user_id_users.id pada tabel user_album_likes
  pgm.dropConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id');

  // menghapus constraint fk_user_album_likes.album_id_albums.id pada tabel user_album_likes
  pgm.dropConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id');
};
