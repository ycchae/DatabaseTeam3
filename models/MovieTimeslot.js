const { BaseModel } = require("./BaseModel");

class MovieTimeslot extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "MOVIE_TIMESLOT";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return ["movie_id", "timeslot_id"];
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
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "movie_id",
        "movie_title",
        "movie_genre",
        "movie_rating",
        "movie_runtime",
        "movie_director",
        "movie_actors",
        "movie_plot",
        "movie_isAdult",
        "movie_posterURL",
        "screen_id",
        "start_date",
        "end_date",
        "timeslot_id"
      ],

      properties: {
        movie_id: { type: "number" },
        movie_title: { type: "string", maxLength: 50 },
        movie_genre: { type: "string", maxLength: 20 },
        movie_rating: { type: "number" },
        movie_runtime: { type: "number" },
        movie_director: { type: "string", maxLength: 100 },
        movie_actors: { type: "string", maxLength: 500 },
        movie_plot: { type: "string", maxLength: 1000 },
        movie_isAdult: { type: "boolean" },
        movie_posterURL: { type: "string", maxLength: 255 },
        timeslot_id: { type: "integer" },
        screen_id: { type: "integer" },
        start_date: { type: "date" },
        end_date: { type: "date", minLength: 3, maxLength: 300 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const path = require("path");

    return {
      // user: {
      //   relation: BaseModel.BelongsToOneRelation,
      //   // The related model. This can be either a Model
      //   // subclass constructor or an absolute file path
      //   // to a module that exports one. We use a model
      //   // subclass constructor `Animal` here.
      //   modelClass: path.join(__dirname, "User"),
      //   join: {
      //     from: "TICKET_TRACE.user_id",
      //     to: "myuser.user_id"
      //   }
      // },
      // timeslot: {
      //   relation: BaseModel.BelongsToOneRelation,
      //   modelClass: path.join(__dirname, ""),
      //   join: {
      //     from: "TICKET_TRACE.ticket_id",
      //     to: "ticket.ticket_id"
      //   }
      // },
      //   timeslotmovie: {
      //     relation: BaseModel.BelongsToOneRelation,
      //     // modelClass: path.join(__dirname, ""),
      //     join: {
      //       from: "TICKET_TRACE.ticket_id",
      //       to: "ticket.ticket_id"
      //     }
      //   },
    };
  }
}

module.exports = { MovieTimeslot };
