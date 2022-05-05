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
      // this._validator.validatePlaylistPayload(request.payload);
      const { id: albumId } = request.params;
      const { id: userId } = request.auth.credentials;

      // cek Album
      await this._albumsService.getAlbumById(albumId);

      const cek = await this._service.verifyAlbumsLike(userId, albumId);

      // const idLike = cek.id;

      if (cek) {
        await this._service.deleteAlbumsLike(cek, albumId);

        const response = h.response({
          status: 'success',
          message: 'Berhasil Menghapus Like',
        });
        response.code(201);
        return response;
      }

      // Jika Belum Pernah Like Album: Tambahkan Like
      await this._service.addAlbumsLike(userId, albumId);

      const response = h.response({
        status: 'success',
        message: `Berhasil Like Album ${cek}`,
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

    // return {
    //   status: 'success',
    //   data: {
    //     likes,
    //   },
    // };
  }
}

module.exports = UserAlbumLikesHandler;
