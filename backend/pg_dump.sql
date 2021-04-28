--
-- PostgreSQL database dump
--

-- Dumped from database version 10.16
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: core_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_genre (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.core_genre OWNER TO postgres;

--
-- Name: core_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_genre_id_seq OWNER TO postgres;

--
-- Name: core_genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_genre_id_seq OWNED BY public.core_genre.id;


--
-- Name: core_likedmovie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_likedmovie (
    id integer NOT NULL,
    movie_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.core_likedmovie OWNER TO postgres;

--
-- Name: core_likedmovie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_likedmovie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_likedmovie_id_seq OWNER TO postgres;

--
-- Name: core_likedmovie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_likedmovie_id_seq OWNED BY public.core_likedmovie.id;


--
-- Name: core_movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_movie (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    image character varying(100),
    stock integer NOT NULL,
    rental_price numeric(5,2) NOT NULL,
    sale_price numeric(5,2) NOT NULL,
    availability boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.core_movie OWNER TO postgres;

--
-- Name: core_movie_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_movie_genre (
    id integer NOT NULL,
    movie_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.core_movie_genre OWNER TO postgres;

--
-- Name: core_movie_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_movie_genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_movie_genre_id_seq OWNER TO postgres;

--
-- Name: core_movie_genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_movie_genre_id_seq OWNED BY public.core_movie_genre.id;


--
-- Name: core_movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_movie_id_seq OWNER TO postgres;

--
-- Name: core_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_movie_id_seq OWNED BY public.core_movie.id;


--
-- Name: core_purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_purchase (
    id integer NOT NULL,
    date_bought timestamp with time zone NOT NULL,
    purchase_price numeric(5,2) NOT NULL,
    movie_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.core_purchase OWNER TO postgres;

--
-- Name: core_purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_purchase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_purchase_id_seq OWNER TO postgres;

--
-- Name: core_purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_purchase_id_seq OWNED BY public.core_purchase.id;


--
-- Name: core_rental; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_rental (
    id integer NOT NULL,
    date_out timestamp with time zone NOT NULL,
    date_returned timestamp with time zone,
    daily_rental_fee numeric(5,2) NOT NULL,
    movie_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.core_rental OWNER TO postgres;

--
-- Name: core_rental_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_rental_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_rental_id_seq OWNER TO postgres;

--
-- Name: core_rental_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_rental_id_seq OWNED BY public.core_rental.id;


--
-- Name: core_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL
);


ALTER TABLE public.core_user OWNER TO postgres;

--
-- Name: core_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.core_user_groups OWNER TO postgres;

--
-- Name: core_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_groups_id_seq OWNER TO postgres;

--
-- Name: core_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_user_groups_id_seq OWNED BY public.core_user_groups.id;


--
-- Name: core_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_id_seq OWNER TO postgres;

--
-- Name: core_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_user_id_seq OWNED BY public.core_user.id;


--
-- Name: core_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.core_user_user_permissions OWNER TO postgres;

--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_user_user_permissions_id_seq OWNED BY public.core_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blacklist_blacklistedtoken (
    id integer NOT NULL,
    blacklisted_at timestamp with time zone NOT NULL,
    token_id integer NOT NULL
);


ALTER TABLE public.token_blacklist_blacklistedtoken OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blacklist_blacklistedtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_blacklistedtoken_id_seq OWNER TO postgres;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blacklist_blacklistedtoken_id_seq OWNED BY public.token_blacklist_blacklistedtoken.id;


--
-- Name: token_blacklist_outstandingtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blacklist_outstandingtoken (
    id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    user_id integer,
    jti character varying(255) NOT NULL
);


ALTER TABLE public.token_blacklist_outstandingtoken OWNER TO postgres;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blacklist_outstandingtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_outstandingtoken_id_seq OWNER TO postgres;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blacklist_outstandingtoken_id_seq OWNED BY public.token_blacklist_outstandingtoken.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: core_genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_genre ALTER COLUMN id SET DEFAULT nextval('public.core_genre_id_seq'::regclass);


--
-- Name: core_likedmovie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_likedmovie ALTER COLUMN id SET DEFAULT nextval('public.core_likedmovie_id_seq'::regclass);


--
-- Name: core_movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie ALTER COLUMN id SET DEFAULT nextval('public.core_movie_id_seq'::regclass);


--
-- Name: core_movie_genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie_genre ALTER COLUMN id SET DEFAULT nextval('public.core_movie_genre_id_seq'::regclass);


--
-- Name: core_purchase id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_purchase ALTER COLUMN id SET DEFAULT nextval('public.core_purchase_id_seq'::regclass);


--
-- Name: core_rental id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_rental ALTER COLUMN id SET DEFAULT nextval('public.core_rental_id_seq'::regclass);


--
-- Name: core_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user ALTER COLUMN id SET DEFAULT nextval('public.core_user_id_seq'::regclass);


--
-- Name: core_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_groups ALTER COLUMN id SET DEFAULT nextval('public.core_user_groups_id_seq'::regclass);


--
-- Name: core_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.core_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: token_blacklist_blacklistedtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_blacklistedtoken_id_seq'::regclass);


--
-- Name: token_blacklist_outstandingtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_outstandingtoken_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add blacklisted token	6	add_blacklistedtoken
22	Can change blacklisted token	6	change_blacklistedtoken
23	Can delete blacklisted token	6	delete_blacklistedtoken
24	Can view blacklisted token	6	view_blacklistedtoken
25	Can add outstanding token	7	add_outstandingtoken
26	Can change outstanding token	7	change_outstandingtoken
27	Can delete outstanding token	7	delete_outstandingtoken
28	Can view outstanding token	7	view_outstandingtoken
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Can add genre	9	add_genre
34	Can change genre	9	change_genre
35	Can delete genre	9	delete_genre
36	Can view genre	9	view_genre
37	Can add movie	10	add_movie
38	Can change movie	10	change_movie
39	Can delete movie	10	delete_movie
40	Can view movie	10	view_movie
41	Can add rental	11	add_rental
42	Can change rental	11	change_rental
43	Can delete rental	11	delete_rental
44	Can view rental	11	view_rental
45	Can add purchase	12	add_purchase
46	Can change purchase	12	change_purchase
47	Can delete purchase	12	delete_purchase
48	Can view purchase	12	view_purchase
49	Can add liked movie	13	add_likedmovie
50	Can change liked movie	13	change_likedmovie
51	Can delete liked movie	13	delete_likedmovie
52	Can view liked movie	13	view_likedmovie
\.


--
-- Data for Name: core_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_genre (id, name, user_id) FROM stdin;
1	Classic	1
2	Action	1
3	Horror	1
4	Drama	1
5	Romance	1
6	Comedy	1
7	Sci-fi	1
8	Musical	1
9	Thriller	1
10	Crime	1
11	Documentary	1
12	Western	1
13	Romantic Comedy	1
14	Music	1
15	Fiction	1
16	War	1
17	Adventure	1
18	Noir	1
19	Historical	1
20	Epic	1
21	Disaster	1
22	Mystery	1
23	Martial Arts	1
24	Short	1
25	Science	1
26	Dark comedy	1
27	Sports	1
28	Fantasy	1
29	Superhero	1
30	Animation	1
31	Psychological Thriller	1
32	Spy	1
33	Thriller	1
34	Monster	1
35	Comedy Drama	1
\.


--
-- Data for Name: core_likedmovie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_likedmovie (id, movie_id, user_id) FROM stdin;
6	2	1
7	3	1
8	4	1
10	1	1
13	4	2
14	1	2
15	2	2
\.


--
-- Data for Name: core_movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_movie (id, title, description, link, image, stock, rental_price, sale_price, availability, user_id) FROM stdin;
4	The Dark Knight	When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.	https://www.imdb.com/title/tt0468569/	uploads/movie/468bc165-6d93-4552-8a38-9e1cbc4d97c0.jpg	4	2.10	10.00	t	1
3	The Great Gatsby	A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.	https://www.imdb.com/title/tt1343092/	uploads/movie/f4920cb0-cdc0-48f5-89fb-f87136845618.png	0	2.50	8.50	f	1
2	Avengers: Infinity War	The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.	https://www.imdb.com/title/tt4154756/	uploads/movie/875fc298-d0fb-48b8-a261-86ebde74c5c0.jpg	9	2.50	12.00	t	1
1	Interstellar	A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.	https://www.imdb.com/title/tt0816692/	uploads/movie/039d9017-1e53-4ff4-be9d-8c878289af38.jpg	11	2.50	12.00	t	1
\.


--
-- Data for Name: core_movie_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_movie_genre (id, movie_id, genre_id) FROM stdin;
1	1	17
2	1	4
3	1	7
4	2	17
5	2	2
6	2	7
7	3	4
8	3	5
9	4	2
10	4	10
11	4	4
\.


--
-- Data for Name: core_purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_purchase (id, date_bought, purchase_price, movie_id, user_id) FROM stdin;
4	2021-04-27 23:56:38.590083+00	10.00	4	2
5	2021-04-28 00:00:51.211155+00	12.00	1	2
6	2021-04-28 01:39:03.574404+00	10.00	4	2
7	2021-04-28 04:09:11.068243+00	10.00	4	2
\.


--
-- Data for Name: core_rental; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_rental (id, date_out, date_returned, daily_rental_fee, movie_id, user_id) FROM stdin;
2	2021-04-27 14:19:07.832531+00	2021-04-27 14:19:42.18139+00	2.50	2	2
3	2021-04-27 14:29:30.542002+00	2021-04-27 14:30:21.687346+00	2.10	4	2
5	2021-04-28 01:34:05.762723+00	2021-04-28 01:58:29.627753+00	2.50	2	2
4	2021-04-28 00:00:18.885923+00	2021-04-28 01:58:29.629662+00	2.10	4	2
6	2021-04-28 01:39:10.776075+00	2021-04-28 02:01:48.513291+00	2.10	4	2
9	2021-04-28 02:02:08.587755+00	2021-04-28 02:13:10.777382+00	2.50	2	2
8	2021-04-28 02:02:05.785642+00	2021-04-28 02:13:10.78215+00	2.50	1	2
7	2021-04-28 02:02:02.383077+00	2021-04-28 02:13:10.7801+00	2.10	4	2
12	2021-04-28 02:14:17.280199+00	2021-04-28 02:15:36.078749+00	2.10	4	2
10	2021-04-28 02:14:09.189382+00	2021-04-28 02:15:36.082276+00	2.50	2	2
11	2021-04-28 02:14:14.203164+00	2021-04-28 02:15:36.086612+00	2.50	1	2
14	2021-04-28 02:20:26.915155+00	2021-04-28 02:20:42.021565+00	2.50	2	2
13	2021-04-28 02:19:39.218028+00	2021-04-28 02:26:00.162592+00	2.50	2	2
15	2021-04-28 02:28:40.976207+00	2021-04-28 02:29:08.13084+00	2.50	1	2
16	2021-04-28 02:36:42.871814+00	2021-04-28 02:36:56.132211+00	2.50	1	2
17	2021-04-28 02:37:58.711266+00	2021-04-28 02:38:17.710393+00	2.10	4	2
18	2021-04-28 02:38:02.726802+00	2021-04-28 02:38:17.708672+00	2.50	2	2
19	2021-04-28 02:39:48.380762+00	2021-04-28 02:40:01.626944+00	2.50	1	2
20	2021-04-28 02:39:51.717101+00	2021-04-28 02:40:01.629441+00	2.50	2	2
21	2021-04-28 02:40:42.719752+00	2021-04-28 02:41:04.647265+00	2.50	1	2
22	2021-04-28 02:44:48.229755+00	2021-04-28 02:44:55.119868+00	2.10	4	2
23	2021-04-28 02:54:11.268233+00	2021-04-28 02:54:18.117311+00	2.50	2	2
24	2021-04-28 02:58:58.560514+00	2021-04-28 02:59:41.772441+00	2.50	2	2
25	2021-04-28 02:59:02.779567+00	2021-04-28 02:59:41.770384+00	2.10	4	2
28	2021-04-28 03:00:31.261123+00	2021-04-28 03:00:44.258617+00	2.10	4	2
27	2021-04-28 03:00:28.76016+00	2021-04-28 03:00:44.260957+00	2.50	1	2
26	2021-04-28 03:00:24.011987+00	2021-04-28 03:00:44.262933+00	2.50	2	2
1	2021-04-27 05:06:16.505745+00	2021-04-28 03:02:58.373609+00	2.50	1	2
29	2021-04-28 03:02:31.622306+00	2021-04-28 03:14:41.073138+00	2.10	4	2
30	2021-04-28 03:13:13.367619+00	2021-04-28 03:14:41.075416+00	2.10	4	2
31	2021-04-28 03:24:04.843661+00	2021-04-28 03:44:07.586199+00	2.10	4	2
32	2021-04-28 03:43:54.234555+00	2021-04-28 03:44:07.589246+00	2.10	4	2
33	2021-04-28 03:46:11.764875+00	2021-04-28 03:46:19.068047+00	2.10	4	2
34	2021-04-28 03:47:04.006016+00	2021-04-28 03:47:10.946925+00	2.10	4	2
35	2021-04-28 04:09:13.405794+00	\N	2.10	4	2
\.


--
-- Data for Name: core_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_user (id, password, last_login, is_superuser, email, name, is_active, is_staff) FROM stdin;
1	pbkdf2_sha256$216000$ddagyIiQCsqX$1avbACE3Ag3GYCqqLxAQbDghdN0rMnsnhIPh0QsfuWk=	2021-04-27 03:17:49.265433+00	t	brian.arriaga@gmail.com	Brian Arriaga	t	t
2	pbkdf2_sha256$216000$aEbIyF7LUOkt$dIrVFCSSzsvCmDqyz1cmpbgm1D3Dfh0jyh1ZnGVReZc=	\N	f	baxtor95@gmail.com	Brian Arriaga	t	f
\.


--
-- Data for Name: core_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: core_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-04-27 04:00:09.762603+00	1	Interstellar	1	[{"added": {}}]	10	1
2	2021-04-27 04:01:14.9141+00	2	Avengers: Infinity War	1	[{"added": {}}]	10	1
3	2021-04-27 04:02:05.097837+00	3	The Great Gatsby	1	[{"added": {}}]	10	1
4	2021-04-27 04:03:12.247813+00	4	The Dark Knight	1	[{"added": {}}]	10	1
5	2021-04-27 18:45:19.351636+00	2	Avengers: Infinity War	2	[{"changed": {"fields": ["Image"]}}]	10	1
6	2021-04-27 18:45:28.934129+00	4	The Dark Knight	2	[{"changed": {"fields": ["Image"]}}]	10	1
7	2021-04-27 18:45:39.164635+00	3	The Great Gatsby	2	[{"changed": {"fields": ["Image"]}}]	10	1
8	2021-04-27 18:45:48.620468+00	1	Interstellar	2	[{"changed": {"fields": ["Image"]}}]	10	1
9	2021-04-27 23:50:52.610566+00	2	baxtor95@gmail.com-The Dark Knight-2021-04-27 23:50:00.537261+00:00	3		12	1
10	2021-04-27 23:50:57.388601+00	1	baxtor95@gmail.com-Avengers: Infinity War-2021-04-27 05:34:23.636247+00:00	3		12	1
11	2021-04-27 23:53:31.784444+00	3	baxtor95@gmail.com-The Dark Knight-2021-04-27 23:52:35.110494+00:00	3		12	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	token_blacklist	blacklistedtoken
7	token_blacklist	outstandingtoken
8	core	user
9	core	genre
10	core	movie
11	core	rental
12	core	purchase
13	core	likedmovie
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-04-27 03:04:16.312131+00
2	contenttypes	0002_remove_content_type_name	2021-04-27 03:04:16.339461+00
3	auth	0001_initial	2021-04-27 03:04:16.430813+00
4	auth	0002_alter_permission_name_max_length	2021-04-27 03:04:16.525589+00
5	auth	0003_alter_user_email_max_length	2021-04-27 03:04:16.534496+00
6	auth	0004_alter_user_username_opts	2021-04-27 03:04:16.544132+00
7	auth	0005_alter_user_last_login_null	2021-04-27 03:04:16.55389+00
8	auth	0006_require_contenttypes_0002	2021-04-27 03:04:16.558658+00
9	auth	0007_alter_validators_add_error_messages	2021-04-27 03:04:16.570433+00
10	auth	0008_alter_user_username_max_length	2021-04-27 03:04:16.580133+00
11	auth	0009_alter_user_last_name_max_length	2021-04-27 03:04:16.588958+00
12	auth	0010_alter_group_name_max_length	2021-04-27 03:04:16.601828+00
13	auth	0011_update_proxy_permissions	2021-04-27 03:04:16.611805+00
14	auth	0012_alter_user_first_name_max_length	2021-04-27 03:04:16.622282+00
15	core	0001_initial	2021-04-27 03:04:16.899272+00
16	admin	0001_initial	2021-04-27 03:04:17.179627+00
17	admin	0002_logentry_remove_auto_add	2021-04-27 03:04:17.222597+00
18	admin	0003_logentry_add_action_flag_choices	2021-04-27 03:04:17.23963+00
19	core	0002_auto_20210426_1324	2021-04-27 03:04:17.253958+00
20	core	0003_auto_20210426_1439	2021-04-27 03:04:17.285105+00
21	core	0004_remove_rental_rental_debt	2021-04-27 03:04:17.316892+00
22	sessions	0001_initial	2021-04-27 03:04:17.343859+00
23	token_blacklist	0001_initial	2021-04-27 03:04:17.453398+00
24	token_blacklist	0002_outstandingtoken_jti_hex	2021-04-27 03:04:17.495971+00
25	token_blacklist	0003_auto_20171017_2007	2021-04-27 03:04:17.523845+00
26	token_blacklist	0004_auto_20171017_2013	2021-04-27 03:04:17.583483+00
27	token_blacklist	0005_remove_outstandingtoken_jti	2021-04-27 03:04:17.60246+00
28	token_blacklist	0006_auto_20171017_2113	2021-04-27 03:04:17.621649+00
29	token_blacklist	0007_auto_20171017_2214	2021-04-27 03:04:17.692742+00
30	core	0005_remove_likedmovie_liked	2021-04-27 21:45:11.912984+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
1jnl6v08ka7900emfplmb9vrd5hyszr0	.eJxVjMsOgjAUBf-la9NQ6Ou6dM83NPfRCmogobAy_ruQsNDtzJzzVgm3dUhbzUsaRV2VUZdfRsjPPB1CHjjdZ83ztC4j6SPRp626nyW_bmf7dzBgHfZ1gOI9tJaFbAGMYAJlNN46sJ20jTcN-p0SS7COuTAU8JGkddgRRfX5AtedN-0:1lbEEP:g4lGqo3KmayeJMklKdYsTR9MjuRmqBL29OAOB0326YM	2021-05-11 03:17:49.272417+00
\.


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_blacklistedtoken (id, blacklisted_at, token_id) FROM stdin;
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
1	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTU4MDA5MiwianRpIjoiYTQ4MTg0YTZiMzQ3NDBhMzk0YjYyMWEyYmJmYThhNzMiLCJ1c2VyX2lkIjoyfQ.rWAE5T_9M6D4IzGDCOkANwyQ_So2xWzorUai11a_oTQ	2021-04-27 03:21:32.464943+00	2021-04-28 03:21:32+00	2	a48184a6b34740a394b621a2bbfa8a73
34	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTU4MTk2OCwianRpIjoiNGRmYzdlMzRiZmJiNDlkMTgwMzE5M2RjYTgzYjlmMjEiLCJ1c2VyX2lkIjoxfQ.sF1TfEG4EpUPXYPYrAQ9xPCXQDQ3XHHGNi1nr9j2kNo	2021-04-27 03:52:48.531386+00	2021-04-28 03:52:48+00	1	4dfc7e34bfbb49d1803193dca83b9f21
35	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTU4NTQ2MiwianRpIjoiNDA3MDZhMWI4YzBhNDljMTgzMjk0YTgyNmI5N2FhN2UiLCJ1c2VyX2lkIjoyfQ.RUVITWz7V4b1NpWZ5V48TRH1vy-vqReCiAPWNDMLGsQ	2021-04-27 04:51:02.591424+00	2021-04-28 04:51:02+00	2	40706a1b8c0a49c183294a826b97aa7e
36	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYxNDg0MSwianRpIjoiNzlmOGMzNjUxYmI5NDU3M2I0YjZjZmQ2MWE3YzVlODEiLCJ1c2VyX2lkIjoyfQ.F_52ZGtlcBucww14cdrp3sZ1TO5z7qEzLL7wenaQapk	2021-04-27 13:00:41.118628+00	2021-04-28 13:00:41+00	2	79f8c3651bb94573b4b6cfd61a7c5e81
37	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYxNzM2MCwianRpIjoiOTg1YjZhOTFmODgwNDgyNGEwYThhM2YxY2UyMzhkNjIiLCJ1c2VyX2lkIjoyfQ.vov7-NQytcvfSO0HuivI83_27hcsF3V5L00fuomo118	2021-04-27 13:42:40.94185+00	2021-04-28 13:42:40+00	2	985b6a91f8804824a0a8a3f1ce238d62
38	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYxOTUwOCwianRpIjoiMDA0MGE5MGExM2RlNDFmNWFlMWY5NmJkMDk3Y2Y3NDYiLCJ1c2VyX2lkIjoyfQ.Pb-1inocaAl4UDd5swrrfrFDFECjVO6KruA13gzHq9k	2021-04-27 14:18:28.483204+00	2021-04-28 14:18:28+00	2	0040a90a13de41f5ae1f96bd097cf746
39	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYyMzYzNSwianRpIjoiNmVkMjdmODUyZmEwNGNkODk2MGI2Y2I4MzIzMDcyOTciLCJ1c2VyX2lkIjoyfQ.2VXfAS2tbhUsYyODhF7aSFozHvh0dgzA5lKctTECnw0	2021-04-27 15:27:15.923904+00	2021-04-28 15:27:15+00	2	6ed27f852fa04cd8960b6cb832307297
40	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYyNzE0MSwianRpIjoiNGM4MzNmY2E3ZjZhNGNhOWI3YTdjMzVmMTgzYTMyNzYiLCJ1c2VyX2lkIjoyfQ.ATyyRhjl84dP15xSV5M0lheOREVGgtmdb9ZSEKUfeec	2021-04-27 16:25:41.178682+00	2021-04-28 16:25:41+00	2	4c833fca7f6a4ca9b7a7c35f183a3276
41	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYyNzk4MiwianRpIjoiOThlMWQyN2FjN2NjNDk4ZTkwZWY3ZmJmMjU5OGU2MmYiLCJ1c2VyX2lkIjoyfQ.H5v1R2sdd_Vkgvn0ttqsABRrmJb4UuYW-d1zk1_jYtY	2021-04-27 16:39:42.459799+00	2021-04-28 16:39:42+00	2	98e1d27ac7cc498e90ef7fbf2598e62f
42	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTYzNzk2MCwianRpIjoiOTQ3NThlMTAyZTZmNDdiMWJmOTVkODk5YmZlOTU3MDYiLCJ1c2VyX2lkIjoyfQ.HOzjed4oOKKfJlvcxZOTEejTwLFGHgo38oRtp9AIKlU	2021-04-27 19:26:00.823065+00	2021-04-28 19:26:00+00	2	94758e102e6f47b1bf95d899bfe95706
43	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY0NDE5NCwianRpIjoiMjM1MDhjNGY5ZGM3NDQ2YmI5Yjg5MTM3MjMwY2RjMjUiLCJ1c2VyX2lkIjoxfQ.gsTior2IgVRlrzvx5isk_h-sVlTRpmxnWdY8GxZ4zCo	2021-04-27 21:09:54.946398+00	2021-04-28 21:09:54+00	1	23508c4f9dc7446bb9b89137230cdc25
44	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY0NDg2NiwianRpIjoiOTlhNTBkZGRkOWEyNDhjZWI4YjMzZmE1YmMyMjM3ZmUiLCJ1c2VyX2lkIjoxfQ.wYFeQIQT721u9F3tyZC1_fTD3S9AaXHi3oPXdooGOqo	2021-04-27 21:21:06.068041+00	2021-04-28 21:21:06+00	1	99a50dddd9a248ceb8b33fa5bc2237fe
45	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY0ODkyMiwianRpIjoiNDExMzhhMmViY2U0NDY2ZDg4ZjNkZjc2Mjg5NTRlOWYiLCJ1c2VyX2lkIjoxfQ.Nm2RNPCKE5lj4rzh41e5GUFzda9vPCtEIfkHBobW2Iw	2021-04-27 22:28:42.635999+00	2021-04-28 22:28:42+00	1	41138a2ebce4466d88f3df7628954e9f
46	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY1MDk4MywianRpIjoiNzk0ZjY5YmE5NmZjNDY4N2E3YzAxZmNjOGQ0ZDNlMzgiLCJ1c2VyX2lkIjoyfQ.2WR0vYqMSfg_aqpiWPkSDAbegLOlEEGJ_FT_g-q86Dk	2021-04-27 23:03:03.389261+00	2021-04-28 23:03:03+00	2	794f69ba96fc4687a7c01fcc8d4d3e38
47	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY1NjEwMywianRpIjoiYTAxNjZiMDkwNjY5NGM4Y2FmM2QxMDhjOTMxZmI1YmYiLCJ1c2VyX2lkIjoyfQ.oioZIJkjC0d4IfaExAL9kLTNp72DBVueOV8Loa9-pfI	2021-04-28 00:28:23.206881+00	2021-04-29 00:28:23+00	2	a0166b0906694c8caf3d108c931fb5bf
48	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY1NzA5OCwianRpIjoiMzFjNjdlYjgxNTIyNDNkOWJjOTlhZTFmZmYwYTJmODciLCJ1c2VyX2lkIjoyfQ.l6g6TeSo_g03wWsTqXFwYuOA_XMqPLti4tnLKljy3xE	2021-04-28 00:44:58.097284+00	2021-04-29 00:44:58+00	2	31c67eb8152243d9bc99ae1fff0a2f87
49	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2MDg0NSwianRpIjoiZmM4NDgyMmQ0N2I1NDZjYTg2ZDA4MjdiZWU3NjIzYWIiLCJ1c2VyX2lkIjoyfQ.nD9xZO7I4fyelnEfC-jtCaD8PFXnI0dcfJFhmMpG6E8	2021-04-28 01:47:25.487091+00	2021-04-29 01:47:25+00	2	fc84822d47b546ca86d0827bee7623ab
50	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2MjM4MSwianRpIjoiNjljYTVkN2VjNDk5NGQ1M2E3MzllZWIzZmE5N2RhYWUiLCJ1c2VyX2lkIjoyfQ.M_K6XrvPo7Gn6aAPglsTbYYDFmFhjFa9IcA8FP5RqaE	2021-04-28 02:13:01.129626+00	2021-04-29 02:13:01+00	2	69ca5d7ec4994d53a739eeb3fa97daae
51	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2Mjc5MSwianRpIjoiNWUwM2ZjZTBmM2I4NDVmNWEzMDEyYjVmZGU2ZmNhZmUiLCJ1c2VyX2lkIjoyfQ.1f4m4SP9xPlUQYt1SQn-ReT8ZDO1V5kcA0dPMTXJ5VQ	2021-04-28 02:19:51.669292+00	2021-04-29 02:19:51+00	2	5e03fce0f3b845f5a3012b5fde6fcafe
52	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2MzEwMSwianRpIjoiMGUxYTI0Y2M3ODA0NGRkMDkzNWFhYWY5MGVkZmRjMDUiLCJ1c2VyX2lkIjoxfQ.E5kESYLHAtNlMDeJJFuMJ-mufegmh82YmYth8E-yS6U	2021-04-28 02:25:01.499338+00	2021-04-29 02:25:01+00	1	0e1a24cc78044dd0935aaaf90edfdc05
53	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2MzExOCwianRpIjoiYjI5NjAwM2FiMWE0NDY1YzkwMThlMTM5Y2I4MTc5NGIiLCJ1c2VyX2lkIjoyfQ.EgSMGPXJiZYaOWMsoHQN4Ws-xzbxPstuifhKjhWjZAs	2021-04-28 02:25:18.340351+00	2021-04-29 02:25:18+00	2	b296003ab1a4465c9018e139cb81794b
54	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2Njc3MCwianRpIjoiZGZlZTU4YTAxZmQ5NDE0MjgzNzdhNDY2YzVhYTU5ZWYiLCJ1c2VyX2lkIjoyfQ.sWrZSKrpqGrn97ST-b8CIQ30Z5qmKGQL2AwYaWtKXtI	2021-04-28 03:26:10.457409+00	2021-04-29 03:26:10+00	2	dfee58a01fd941428377a466c5aa59ef
55	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2ODYxNCwianRpIjoiMGZmMWZjMzdhZDE1NDdjNTk1MTdjMzNlMjUxZDQ1MjciLCJ1c2VyX2lkIjoyfQ.BaL_avO5-OWG8ItIb-0JztAExrfp8G0GvofFb-FLUHQ	2021-04-28 03:56:54.178974+00	2021-04-29 03:56:54+00	2	0ff1fc37ad1547c59517c33e251d4527
56	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2ODg5OSwianRpIjoiMDcwNjJhN2YxMmU5NGYzZWJlMWM4NjhlYWE3YjdkYjgiLCJ1c2VyX2lkIjoyfQ.uOIRIDZa-Ba7PLTagHE2zFwqWu4G5fe2oLwdjCmy_Lw	2021-04-28 04:01:39.936584+00	2021-04-29 04:01:39+00	2	07062a7f12e94f3ebe1c868eaa7b7db8
57	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxOTY2OTE5OCwianRpIjoiNzI1ZTYwMGM3NDM4NDI2Nzg2YThmMWQyMmYyNjQ2YzMiLCJ1c2VyX2lkIjoyfQ.LEfcdUdt1q8FijQWk7IlE9GJtIQCbZIWDeizgG7o8so	2021-04-28 04:06:38.850777+00	2021-04-29 04:06:38+00	2	725e600c7438426786a8f1d22f2646c3
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 52, true);


--
-- Name: core_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_genre_id_seq', 35, true);


--
-- Name: core_likedmovie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_likedmovie_id_seq', 15, true);


--
-- Name: core_movie_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_movie_genre_id_seq', 11, true);


--
-- Name: core_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_movie_id_seq', 4, true);


--
-- Name: core_purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_purchase_id_seq', 7, true);


--
-- Name: core_rental_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_rental_id_seq', 35, true);


--
-- Name: core_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_user_groups_id_seq', 1, false);


--
-- Name: core_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_user_id_seq', 34, true);


--
-- Name: core_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 11, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 13, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 30, true);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 57, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: core_genre core_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_genre
    ADD CONSTRAINT core_genre_pkey PRIMARY KEY (id);


--
-- Name: core_likedmovie core_likedmovie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_likedmovie
    ADD CONSTRAINT core_likedmovie_pkey PRIMARY KEY (id);


--
-- Name: core_movie_genre core_movie_genre_movie_id_genre_id_433ff9a3_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie_genre
    ADD CONSTRAINT core_movie_genre_movie_id_genre_id_433ff9a3_uniq UNIQUE (movie_id, genre_id);


--
-- Name: core_movie_genre core_movie_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie_genre
    ADD CONSTRAINT core_movie_genre_pkey PRIMARY KEY (id);


--
-- Name: core_movie core_movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie
    ADD CONSTRAINT core_movie_pkey PRIMARY KEY (id);


--
-- Name: core_purchase core_purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_purchase
    ADD CONSTRAINT core_purchase_pkey PRIMARY KEY (id);


--
-- Name: core_rental core_rental_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_rental
    ADD CONSTRAINT core_rental_pkey PRIMARY KEY (id);


--
-- Name: core_user core_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user
    ADD CONSTRAINT core_user_email_key UNIQUE (email);


--
-- Name: core_user_groups core_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_pkey PRIMARY KEY (id);


--
-- Name: core_user_groups core_user_groups_user_id_group_id_c82fcad1_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_user_id_group_id_c82fcad1_uniq UNIQUE (user_id, group_id);


--
-- Name: core_user core_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user
    ADD CONSTRAINT core_user_pkey PRIMARY KEY (id);


--
-- Name: core_user_user_permissions core_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: core_user_user_permissions core_user_user_permissions_user_id_permission_id_73ea0daa_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_user_id_permission_id_73ea0daa_uniq UNIQUE (user_id, permission_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_token_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_key UNIQUE (token_id);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq UNIQUE (jti);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_pkey PRIMARY KEY (id);


--
-- Name: core_purchase unique movie bought; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_purchase
    ADD CONSTRAINT "unique movie bought" UNIQUE (user_id, movie_id, date_bought);


--
-- Name: core_likedmovie unique movie liked; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_likedmovie
    ADD CONSTRAINT "unique movie liked" UNIQUE (user_id, movie_id);


--
-- Name: core_rental unique movie returned; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_rental
    ADD CONSTRAINT "unique movie returned" UNIQUE (user_id, movie_id, date_returned);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: core_genre_user_id_d5cd828b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_genre_user_id_d5cd828b ON public.core_genre USING btree (user_id);


--
-- Name: core_likedmovie_movie_id_d3437283; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_likedmovie_movie_id_d3437283 ON public.core_likedmovie USING btree (movie_id);


--
-- Name: core_likedmovie_user_id_a09ee772; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_likedmovie_user_id_a09ee772 ON public.core_likedmovie USING btree (user_id);


--
-- Name: core_movie_genre_genre_id_b22e4a43; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_movie_genre_genre_id_b22e4a43 ON public.core_movie_genre USING btree (genre_id);


--
-- Name: core_movie_genre_movie_id_29f166a1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_movie_genre_movie_id_29f166a1 ON public.core_movie_genre USING btree (movie_id);


--
-- Name: core_movie_user_id_957190bb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_movie_user_id_957190bb ON public.core_movie USING btree (user_id);


--
-- Name: core_purchase_movie_id_b97a3d28; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_purchase_movie_id_b97a3d28 ON public.core_purchase USING btree (movie_id);


--
-- Name: core_purchase_user_id_5461a1ee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_purchase_user_id_5461a1ee ON public.core_purchase USING btree (user_id);


--
-- Name: core_rental_movie_id_0053a8a5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_rental_movie_id_0053a8a5 ON public.core_rental USING btree (movie_id);


--
-- Name: core_rental_user_id_c3d56350; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_rental_user_id_c3d56350 ON public.core_rental USING btree (user_id);


--
-- Name: core_user_email_92a71487_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_user_email_92a71487_like ON public.core_user USING btree (email varchar_pattern_ops);


--
-- Name: core_user_groups_group_id_fe8c697f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_user_groups_group_id_fe8c697f ON public.core_user_groups USING btree (group_id);


--
-- Name: core_user_groups_user_id_70b4d9b8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_user_groups_user_id_70b4d9b8 ON public.core_user_groups USING btree (user_id);


--
-- Name: core_user_user_permissions_permission_id_35ccf601; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_user_user_permissions_permission_id_35ccf601 ON public.core_user_user_permissions USING btree (permission_id);


--
-- Name: core_user_user_permissions_user_id_085123d3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX core_user_user_permissions_user_id_085123d3 ON public.core_user_user_permissions USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like ON public.token_blacklist_outstandingtoken USING btree (jti varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_user_id_83bc629a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_blacklist_outstandingtoken_user_id_83bc629a ON public.token_blacklist_outstandingtoken USING btree (user_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_genre core_genre_user_id_d5cd828b_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_genre
    ADD CONSTRAINT core_genre_user_id_d5cd828b_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_likedmovie core_likedmovie_movie_id_d3437283_fk_core_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_likedmovie
    ADD CONSTRAINT core_likedmovie_movie_id_d3437283_fk_core_movie_id FOREIGN KEY (movie_id) REFERENCES public.core_movie(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_likedmovie core_likedmovie_user_id_a09ee772_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_likedmovie
    ADD CONSTRAINT core_likedmovie_user_id_a09ee772_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_movie_genre core_movie_genre_genre_id_b22e4a43_fk_core_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie_genre
    ADD CONSTRAINT core_movie_genre_genre_id_b22e4a43_fk_core_genre_id FOREIGN KEY (genre_id) REFERENCES public.core_genre(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_movie_genre core_movie_genre_movie_id_29f166a1_fk_core_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie_genre
    ADD CONSTRAINT core_movie_genre_movie_id_29f166a1_fk_core_movie_id FOREIGN KEY (movie_id) REFERENCES public.core_movie(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_movie core_movie_user_id_957190bb_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_movie
    ADD CONSTRAINT core_movie_user_id_957190bb_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_purchase core_purchase_movie_id_b97a3d28_fk_core_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_purchase
    ADD CONSTRAINT core_purchase_movie_id_b97a3d28_fk_core_movie_id FOREIGN KEY (movie_id) REFERENCES public.core_movie(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_purchase core_purchase_user_id_5461a1ee_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_purchase
    ADD CONSTRAINT core_purchase_user_id_5461a1ee_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_rental core_rental_movie_id_0053a8a5_fk_core_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_rental
    ADD CONSTRAINT core_rental_movie_id_0053a8a5_fk_core_movie_id FOREIGN KEY (movie_id) REFERENCES public.core_movie(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_rental core_rental_user_id_c3d56350_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_rental
    ADD CONSTRAINT core_rental_user_id_c3d56350_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_groups core_user_groups_group_id_fe8c697f_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_group_id_fe8c697f_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_groups core_user_groups_user_id_70b4d9b8_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_groups
    ADD CONSTRAINT core_user_groups_user_id_70b4d9b8_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_permissions core_user_user_permi_permission_id_35ccf601_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permi_permission_id_35ccf601_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_user_user_permissions core_user_user_permissions_user_id_085123d3_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_user_user_permissions
    ADD CONSTRAINT core_user_user_permissions_user_id_085123d3_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_core_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_core_user_id FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blac_token_id_3cc7fe56_fk_token_bla; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blac_token_id_3cc7fe56_fk_token_bla FOREIGN KEY (token_id) REFERENCES public.token_blacklist_outstandingtoken(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outs_user_id_83bc629a_fk_core_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outs_user_id_83bc629a_fk_core_user FOREIGN KEY (user_id) REFERENCES public.core_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

