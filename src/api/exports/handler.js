const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(service, validator, servicePlaylist) {
    this._service = service;
    this._validator = validator;
    this._servicePlaylist = servicePlaylist;

    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }

  async postExportPlaylistsHandler(request, h) {
    try {
      // validasi duls
      this._validator.validateExportPlaylistsPayload(request.payload);

      const userId = request.auth.credentials.id;
      const { playlistId } = request.params;

      // ini coba di buat di plyalist y kayak getsongplaylist tapi gaada username
      await this._servicePlaylist.getPlaylistSongDetails(playlistId);
      await this._servicePlaylist.verifyPlaylistOwner(playlistId, userId);

      const message = {
        playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this._service.sendMessage('export:playlists', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
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
}

module.exports = ExportsHandler;
