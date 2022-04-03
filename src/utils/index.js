const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
  name,
  album_id,
  song_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
  name,
  albumId: album_id,
  songId: song_id,
});

module.exports = { mapDBToModel };
/*
const ClientError = require('../exceptions/ClientError');

const mapDBToModel = ({ id, title, performer, name, }) => ({
  id,
  title,
  performer,
  name,
});

const mapDBToModelDetail = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: created_at,
  updatedAt: updated_at,
});

const errorHandler = (error, h) => {
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
};

module.exports = { mapDBToModel, mapDBToModelDetail, errorHandler };
*/
