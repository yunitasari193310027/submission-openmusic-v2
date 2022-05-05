const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumsLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal Menyukai Album');
    }

    await this._cacheService.delete(`albumlike:${albumId}`);
    return result.rows[0].id;
  }

  async deleteAlbumsLike(id, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal Membatalkan like Albums. ID tidak ditemukan');
    }

    await this._cacheService.delete(`albumlike:${albumId}`);
  }

  async getAlbumsLike(albumId) {
    try {
      const result = await this._cacheService.get(`albumlike:${albumId}`);
      return [JSON.parse(result), 'cache'];
    } catch (error) {
      const query = {
        text: `SELECT count(album_id) AS likes FROM user_album_likes
        WHERE album_id = $1;`,
        values: [albumId],
      };
      const result = await this._pool.query(query);

      await this._cacheService.set(`albumlike:${albumId}`, JSON.stringify(result.rows[0]));

      return [result.rows[0], 'no cache'];
    }
  }

  async verifyAlbumsLike(userId, albumId) {
    const query = {
      text: `SELECT * FROM user_album_likes
      WHERE user_id = $1 AND album_id = $2;`,
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return result.rows.length;
    }
    return result.rows[0].id;
  }
}

module.exports = UserAlbumLikesService;
