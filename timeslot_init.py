
#! python
import sys
import datetime
import cx_Oracle

con = cx_Oracle.connect('id/host/instance')
if len(sys.argv) != 7:
  print('Usage: ' + sys.argv[0] + ' <start_YYYY> <start_MM> <start_DD> <duration_day> <screen_num> <movie_num>')
  exit(1)
text = []
for screen_num in range(1, int(sys.argv[5]) + 1):
  duration = datetime.datetime(int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]))
  endtime = duration + datetime.timedelta(days=int(sys.argv[4]))
  duration -= datetime.timedelta(minutes=10)
  while duration < endtime:
    duration += datetime.timedelta(minutes=random.randint(10, 30))
    movie = random.randint(1, int(sys.argv[6]))
    cur = con.cursor()
    cur.execute('select movie_runtime from movie where movie_id=' + str(movie))
    row = cur.fetchone()
    nexttime = duration + datetime.timedelta(minutes=int(120 if row[0] == None else row[0]))
    text.append((screen_num, duration, nexttime, movie))
    duration = nexttime
  cur.bindarraysize = len(text)
  cur.setinputsizes(int, cx_Oracle.DATETIME, cx_Oracle.DATETIME, int)
  cur.executemany("insert into timeslot values (seq_ts_id.nextval, :1, :2, :3, :4)", text)
  con.commit()
con.close()