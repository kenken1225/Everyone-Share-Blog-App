import { defineQuery } from "next-sanity";

export const article_query = defineQuery(`
    *[_type == "article" && defined(slug.current) && !defined($search) || title match $search || category match $search || author match $search ]  | order(_createdAt desc)
    {
    _id, 
    title,
    _createdAt,
    author ->{
    _id, image, name, bio
    },
    views,
    description,
    category,
    image
    }
`);

export const article_by_id_query = defineQuery(`
    *[_type == "article" && _id == $id][0]{
    _id, 
    title,
    _createdAt,
    author ->{
    _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
    }
    `);

export const article_views_query = defineQuery(`
    *[_type == "article" && _id == $id][0]{
    _id,
    views
    }
`);

export const author_by_auth_id_query = defineQuery(`
    *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
    }
`);

export const author_by_id_query = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

// ここのやりたいことは、authorの_idと一致する記事を取得
export const article_by_author_query = defineQuery(`
    *[_type == "article" && author._ref == $id] | order(_createdAt desc)
    {
    _id, 
    title,
    _createdAt,
    author ->{
    _id, image, name, bio
    },
    views,
    description,
    category,
    image
    }
`);

export const playlist_by_slug_query = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
     id,
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
