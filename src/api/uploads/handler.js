const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadCoverAlbumHandler = this.postUploadCoverAlbumHandler.bind(this);
  }

  async postUploadCoverAlbumHandler(request, h) {
    try {
      const { cover } = request.payload;
      this._validator.validateCoverAlbumsHeaders(cover.hapi.headers);

      const { id } = request.params;

      const filename = await this._service.writeFile(cover, cover.hapi, id);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
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
}

module.exports = UploadsHandler;
