-- CREATE DATABASE frontapi;

\c frontapi;

-- to use uuid in postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('ADMIN','USER','SALES');

CREATE TABLE public.users(
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "email" VARCHAR(50) UNIQUE, -- or should we use email?
    "password" TEXT,
    "name" TEXT,
    "role" user_role,
    "created_at" TIMESTAMP DEFAULT now(),
    "updated_at" TIMESTAMP DEFAULT now(),
    "deleted_at" TIMESTAMP
);

CREATE TABLE public.sessions(
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "user_id" UUID REFERENCES users (id),
    "created_at" TIMESTAMP DEFAULT now(),
    "expired_at" TIMESTAMP
);

CREATE TABLE public.refresh_tokens(
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "session_id" UUID REFERENCES sessions (id),
    "created_at" TIMESTAMP DEFAULT now(),
    "expired_at" TIMESTAMP
);

-- create sample user
-- password = "asdasd123"
INSERT INTO public.users(id, email, "password", "name", "role")
VALUES('c617a0ee-5307-41f5-b133-6168dba40521', 'randomemail@mail.com', '$2a$10$fsFjJUfM2usK/B8banO8O.QRWtnpZfWzobwYBtQ6BHB8t/XcTNcKq','some-random-name','ADMIN');
