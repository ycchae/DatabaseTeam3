const { BaseModel } = require("./BaseModel");

class Ticket extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "ticket";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "ticket_id";
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
        "ticket_id",
        "ticket_user_id",
        "ticket_ts_id",
        "ticiet_seat_number"
      ],

      properties: {
        ticket_id: { type: "integer" },
        ticket_user_id: { type: "integer" },
        ticket_date: { type: "date" },
        ticket_ts_id: { type: "integer" },
        ticket_seat_number: { type: "integer" }

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
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const path = require("path");

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: path.join(__dirname, "User"),
        join: {
          from: "ticket.ticket_user_id",
          to: "myuser.user_id"
        }
      },

      timeslot: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Timeslot"),
        join: {
          from: "ticket.ticket_ts_id",
          to: "timeslot.timeslot_id"
        }
      },

      movietimeslot: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, "MovieTimeslot"),
        join: {
          from: "ticket.ticket_ts_id",
          to: "MOVIE_TIMESLOT.timeslot_id"
        }
      }
    };
  }
}

module.exports = { Ticket };
