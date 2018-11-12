BEGIN TRANSACTION;

INSERT INTO users(name, email, entries, joined) VALUES ('a', 'a@gmail.com', 1337, '2018-01-01');
INSERT INTO login(hash, email) VALUES ('$2a$10$KAddqyVW3HmBCEGkyNXeIurAjMt8eDhFcVt1NBrWKgL4ox9KaBiNe', 'a@gmail.com');

COMMIT;