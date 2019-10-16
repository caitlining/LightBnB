INSERT INTO users (name, email, password)
VALUES
('Eva Stanley', 'yoitsmeeva@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'meyerlemons@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Domino Parks', 'mynameisagame@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'lovegood@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(1, 'Cozy Cabin', 'description', 'https://lodgesmarter.com/wp-content/uploads/2018/04/aaaatoronto-house-for-sale-53-burnhamthorpe-crescent-1-803x603.jpg', 'https://lodgesmarter.com/wp-content/uploads/2018/04/aaaatoronto-house-for-sale-53-burnhamthorpe-crescent-1-803x603.jpg', 300, 2, 2, 2, 'Canada', 'Numpty', 'Vancouver', 'British Columbia', 'V8J1H5', true),
(1, 'Swanky Place', 'description', 'http://nhoffmanandco.com/blog/blog/wp-content/uploads/2017/04/Awesome-blue-building-cool-house-Favim_com-124117.jpg', 'http://nhoffmanandco.com/blog/blog/wp-content/uploads/2017/04/Awesome-blue-building-cool-house-Favim_com-124117.jpg', 600, 1, 5, 6, 'Canada', 'Bougie', 'Toronto', 'Ontario', 'V7K1H9', true),
(2, 'Oh La La House', 'description', 'https://i.pinimg.com/736x/9b/cf/80/9bcf80905381b887e41fa445761bc634.jpg', 'https://i.pinimg.com/736x/9b/cf/80/9bcf80905381b887e41fa445761bc634.jpg', 450, 2, 4, 4, 'Canada', 'Crepe', 'Montreal', 'Quebec', 'V9C5N1', true),
(2, 'Basic Home', 'description', 'https://lodgesmarter.com/wp-content/uploads/2018/04/aaaatoronto-house-for-sale-53-burnhamthorpe-crescent-1-803x603.jpg', 'https://lodgesmarter.com/wp-content/uploads/2018/04/aaaatoronto-house-for-sale-53-burnhamthorpe-crescent-1-803x603.jpg', 275, 1, 2, 3, 'Canada', 'Terrahue', 'Victoria', 'British Columbia', 'V8K1P9', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
('2019-11-22', '2019-11-30', 3, 2),
('2019-12-05', '2019-12-17', 1, 1),
('2020-01-08', '2020-01-15', 2, 4),
('2020-01-22', '2020-01-27', 4, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(2, 3, 1, 4, 'message'),
(1, 1, 2, 3, 'message'),
(4, 2, 3, 2, 'message'),
(2, 4, 4, 4, 'message');
