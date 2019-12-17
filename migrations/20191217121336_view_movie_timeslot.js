
exports.up = function(knex) {
    return knex.raw(`
    create or replace view movie_timeslot AS
    SELECT m."movie_id", m."movie_title", m."movie_genre",
        m."movie_rating", m."movie_runtime", m."movie_director",
        m."movie_actors", m."movie_plot", m."movie_isAdult", m."movie_posterURL",
        t."timeslot_id", t."start_date", t."end_date", t."screen_id"
    FROM "movie" m
    JOIN "timeslot" t ON (m."movie_id" = t."movie_id")
    `).then(()=> console.log('view movie_timeslot created'));
};

exports.down = function(knex) {
    return knex.raw('DROP VIEW movie_timeslot')
    .then(()=> console.log('view movie_timeslot dropped'));
};
