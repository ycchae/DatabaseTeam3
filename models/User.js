const { BaseModel } = require("./BaseModel");

class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "myuser";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "user_id";
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
      required: ["user_email", "user_password", "user_birthdate"],

      properties: {
        user_id : {type: "integer"},
        user_email : {type: "string"},
        user_password : { type: "string" },
        user_birthdate: { type: "date" },


        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }

  // This object defines the relations to other models.
  /*static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const path = require("path");

    return {
      movie: {
        relation: BaseModel.BelongsToOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: path.join(__dirname, "Movie"),
        join: {
          from: "timeslot.movie_id",
          to: "movie.movie_id"
        }
      },

      screen: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, ""),
        join: {
          from: "timeslot.screen_id",
          to: "screen.screen_id"
        }
      }
    };
  }*/
}

module.exports = { User };
