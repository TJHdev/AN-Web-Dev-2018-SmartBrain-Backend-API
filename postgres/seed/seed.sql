BEGIN TRANSACTION;

INSERT INTO users(name, email, entries, joined) VALUES ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login(hash, email) VALUES ('$2a$10$KAddqyVW3HmBCEGkyNXeIurAjMt8eDhFcVt1NBrWKgL4ox9KaBiNe', 'jessie@gmail.com');

COMMIT;