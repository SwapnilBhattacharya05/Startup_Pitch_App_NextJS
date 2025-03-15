import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title", // AUTO-GENERATED FOR US BY SANITY BASED ON TITLE
      },
    }),
    defineField({
      name: "select",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }], // EACH PLAYLIST WILL REFER TO MULTIPLE STARTUPS
      /*
       * FOR EXAMPLE
       * startup of the day, startup of the week, etc
       */
    }),
  ],
});
