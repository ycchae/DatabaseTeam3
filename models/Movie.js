const { BaseModel } = require("./BaseModel");
class Movie extends BaseModel {

  // constructor(movie_title, movie_genre, movie_rating, movie_runtime, movie_director,
  //   movie_actors, movie_plot, movie_isAdult, movie_posterURL){
  //     this.movie_title = movie_title;
  //     this.movie_genre = movie_genre;
  //     this.movie_rating = movie_rating;
  //     this.movie_runtime = movie_runtime;
  //     this.movie_director = movie_director;
  //     this.movie_actors = movie_actors;
  //     this.movie_plot = movie_plot;
  //     this.movie_isAdult = movie_isAdult;
  //     this.movie_posterURL = movie_posterURL;
  // }

  // Table name is the only required property.
  static get tableName() {
    return "movie";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "movie_id";
  }

  // Methods can be defined for model classes just as you would for
  // any JavaScript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.
  //   fullName() {
  //     return this.firstName + ' ' + this.lastName;
  //   }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  
  // Instance Data Model -- written by yunchang refer from https://json-schema.org/draft/2019-09/json-schema-core.html
  // null: A JSON "null" production
  // boolean: A "true" or "false" value, from the JSON "true" or "false" productions
  // object: An unordered set of properties mapping a string to an instance, from the JSON "object" production
  // array: An ordered list of instances, from the JSON "array" production
  // number: An arbitrary-precision, base-10 decimal number value, from the JSON "number" production
  // string: A string of Unicode code points, from the JSON "string" production
  static get jsonSchema() {
    return {
      type: "object",
      required: ["movie_id", "movie_title", "movie_genre", "movie_rating",
                "movie_runtime", "movie_director", "movie_actors", "movie_plot",
                "movie_isAdult", "movie_posterURL"],

      properties: {
        movie_id: { type: "number" },
        movie_title: { type: "string", maxLength: 50 },
        movie_genre: { type: "string", maxLength: 20},
        movie_rating: { type: "number"},
        movie_runtime: { type: "number"},
        movie_director: { type: "string", maxLength: 100},
        movie_actors: { type: "string", maxLength: 500},
        movie_plot: { type: "string", maxLength: 1000},
        movie_isAdult: {type: "boolean"},
        // movie_rated: { type: "string", maxLength: 10},
        movie_posterURL: { type: "string", maxLength: 255},

        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }
}

module.exports = { Movie };
