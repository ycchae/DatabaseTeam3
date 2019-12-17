## Objection Model
Instance Data Model -- written by yunchang refer from https://json-schema.org/draft/2019-09/json-schema-core.html
* null: A JSON "null" production
* boolean: A "true" or "false" value, from the JSON "true" or "false" productions
* object: An unordered set of properties mapping a string to an instance, from the JSON "object" production
* array: An ordered list of instances, from the JSON "array" production
* number: An arbitrary-precision, base-10 decimal number value, from the JSON "number" production
* string: A string of Unicode code points, from the JSON "string" production
***
## Poster URL
TMDB API poster size options -- written by yunchang refer from https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de
* size list: w92 w154 w185 w342 w500 w780 original
* https://image.tmdb.org/t/p/{size}/

* USAGE
```
<% var imgurl = "http://image.tmdb.org/t/p/w780"+movieDetails[i]['movie_posterURL']; %>  // Note: Don't put '/' after the prefix url
<img alt='Poster' src=<%= imgurl %> />
```
***
