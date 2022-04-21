/* eslint-disable max-len */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada playlist_id terhadap kolom id dari tabel playlists
  pgm.addConstraint('playlist_songs', 'fk_playlist_songs.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  // memberikan constraint foreign key pada song_id terhadap kolom id dari tabel songs
  pgm.addConstraint('playlist_songs', 'fk_playlist_songs.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_playlist_songs.playlist_id_playlists.id pada tabel playlist_songs
  pgm.dropConstraint('playlist_songs', 'fk_playlist_songs.playlist_id_playlists.id');

  // menghapus constraint fk_playlist_songs.song_id_songs.id pada tabel playlist_songs
  pgm.dropConstraint('playlist_songs', 'fk_playlist_songs.song_id_songs.id');
};
