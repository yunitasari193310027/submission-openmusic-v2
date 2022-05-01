/* eslint-disable max-len */
const ClientError = require('../../exceptions/ClientError');
// const InvariantError = require('../../exceptions/InvariantError');
// const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsHandler {
  constructor(playlistSongsService, songsService, playlistsService, collaborationsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._collaborationsService = collaborationsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongByIdHandler = this.getPlaylistSongByIdHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  /*
  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { id } = request.params;
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistOwner(id, credentialId);
      await this._songsService.getSongById.verifySongId(songId);
      const playlistsongId = await this._playlistSongsService.addPlaylistSong(id, songId, credentialId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan di playlist',
        data: {
          playlistsongId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
*/
  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      // console.log(`songId: ${songId} and playlistId: ${playlistId}`);
      await this._service.verifyPlaylistAccess(playlistId, credentialId);

      await this._service.addSongToPlaylist(playlistId, songId);
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan di playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistSongByIdHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      const playlist = await this._playlistSongsService.getPlaylistSongs(playlistId, credentialId);
      const songs = await this._playlistsSongsService.getPlaylistSongs(playlistId);
      return {
        status: 'success',
        data: {
          id: playlist.id,
          name: playlist.name,
          username: playlist.username,
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { playlistId, songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistSongsService.verifyPlaylistOwner(playlistId, songId, credentialId);
      await this._playlistSongsService.deletePlaylistById(id);
      return {
        status: 'success',
        message: 'Lagu Playlist berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlaylistSongsHandler;
