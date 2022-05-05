const ClientError = require('../../exceptions/ClientError');

class UserAlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postUserAlbumLikeHandler = this.postUserAlbumLikeHandler.bind(this);
    this.getUserAlbumLikesHandler = this.getUserAlbumLikesHandler.bind(this);
  }

  async postUserAlbumLikeHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { id: userId } = request.auth.credentials;
      // pengecekan pada albums duls
      await this._albumsService.getAlbumById(albumId);

      const verify = await this._service.verifyAlbumsLike(userId, albumId);

      if (verify) {
        await this._service.deleteAlbumsLike(verify, albumId);

        const response = h.response({
          status: 'success',
          message: 'Berhasil Menghapus Like',
        });
        response.code(201);
        return response;
      }
      await this._service.addAlbumsLike(userId, albumId);

      const response = h.response({
        status: 'success',
        message: `Berhasil Like Album ${verify}`,
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

  async getUserAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const jumlahLike = await this._service.getAlbumsLike(albumId);
    const likes = parseInt(jumlahLike[0].likes, 10);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    }).header('X-Data-Source', jumlahLike[1]);
    response.code(200);
    return response;
  }
}

module.exports = UserAlbumLikesHandler;
