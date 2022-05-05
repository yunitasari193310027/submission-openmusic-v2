const InvariantError = require('../../exceptions/InvariantError');
const { CoverAlbumsSchema } = require('./schema');

const UploadsValidator = {
  validateCoverAlbumsHeaders: (headers) => {
    const validationResult = CoverAlbumsSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
