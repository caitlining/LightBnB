const db = require('./index.js');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
  .catch(err => null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
  .catch(err => null);
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return db.query(`
  INSERT INTO users (name, email, password)
  VALUES($1, $2, $3)
  RETURNING *
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;

const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE end_date < now()::date
  AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, AVG (property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);

    queryString += `
    WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);

    if(options.city) {
      queryString += `
      AND properties.owner_id = $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.owner_id = $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);

    if(options.city || options.owner_id) {
      queryString += `
      AND properties.cost_per_night >= $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.cost_per_night >= $${queryParams.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);

    if(options.city || options.owner_id || options.minimum_price_per_night) {
      queryString += `
      AND properties.cost_per_night <= $${queryParams.length}`;
    } else {
      queryString += `
      WHERE properties.cost_per_night <= $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating, limit);

    queryString += `
    GROUP BY properties.id
    HAVING AVG (property_reviews.rating) >= $${queryParams.length -1}
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  } else {
    queryParams.push(limit);

    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

  return db.query(queryString, queryParams)
  .then(res => res.rows)
}
exports.getAllProperties = getAllProperties;



/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyDetails = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return db.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *
  `, propertyDetails)
  .then (res => res.rows[0]);
}
exports.addProperty = addProperty;