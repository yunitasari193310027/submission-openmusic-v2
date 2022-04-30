/* eslint-disable max-len */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // untuk menghindari duplikasi
  pgm.addConstraint('collaborations', 'unique_playlist_id_and_user_id', 'UNIQUE(playlist_id, user_id)');

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('collaborations', 'fk_collaborations.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint 'fk_playlists.owner_users.id pada tabel playlists
  pgm.dropConstraint('collaborations', 'fk_collaborations.playlist_id_playlists.id');

  // menghapus constraint 'fk_songs.album_id_albums.id songs
  pgm.dropConstraint('collaborations', 'fk_collaborations.user_id_users.id');
};
