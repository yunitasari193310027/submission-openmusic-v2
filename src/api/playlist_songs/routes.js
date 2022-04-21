const playlistsongs = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'musicv2_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongByIdHandler,
    options: {
      auth: 'musicv2_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'musicv2_jwt',
    },
  },
];

module.exports = playlistsongs;
