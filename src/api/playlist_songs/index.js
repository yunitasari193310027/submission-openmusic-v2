/* eslint-disable max-len */
const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, {
    playlistSongsService, songsService, playlistsService, validator,
  }) => {
    const playlistsongsHandler = new PlaylistSongsHandler(playlistSongsService, songsService, playlistsService, validator);
    server.route(routes(playlistsongsHandler));
  },
};
