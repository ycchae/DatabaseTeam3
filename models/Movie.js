const { BaseModel } = require("./BaseModel");
class Movie extends BaseModel {

  static get tableName() {
    return "movie";
  }

  static get idColumn() {
    return "movie_id";
  }
  
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
        movie_posterURL: { type: "string", maxLength: 255},
      }
    };
  }
}

module.exports = { Movie };
