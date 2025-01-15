-- CREATE DATABASE frontapi;

\c frontapi;

-- to use uuid in postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE, -- or should we use email?
    password TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE public.sessions(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users (id),
    data JSONB,
    created_at TIMESTAMP,
    expired_at TIMESTAMP
);

CREATE TABLE public.refresh_tokens(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES sessions (id),
    created_at TIMESTAMP,
    expired_at TIMESTAMP
);