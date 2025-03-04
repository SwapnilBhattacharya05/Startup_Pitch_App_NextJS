import {defineQuery} from "next-sanity";

export const STARTUPS_QUERY =
    /*
    * CHECKING WHETHER SEARCH EXISTS
    * OR
    * SEARCH MATCHES THE TITLE
    * OR
    * SEARCH MATCHES THE CATEGORY
    * OR
    * SEARCH MATCHES THE AUTHOR'S NAME
    */
    defineQuery(` *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author ->name match $search] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author ->{
    _id ,name, image, bio
  },
  views,
  description,
  category,
  image
}`);
