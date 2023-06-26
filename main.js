const bodyParser = require("body-parser");
var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-2.cqbdziwplqgi.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "11111111",
  database: "music",
  port: "3306",
});

//RDS에 접속
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    // connection.query("create database music", function(err, rows, fields) {
    //     console.log(rows); // 결과를 출력합니다!

    //   });

    // connection.query("show databases", function(err, rows, fields) {
    //     console.log(rows); // 결과를 출력합니다!
    // })

    //   create 쿼리문 사용
    // connection.query('create table list (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45) NOT NULL, artist VARCHAR(45) NOT NULL, location VARCHAR(45) NOT NULL, description VARCHAR(200),link VARCHAR(200) NOT NULL);', (error, results, fields) => {
    //     if (error) throw error;
    //     console.log(results);
    //     });

    // Insert 쿼리문 사용
    connection.query(
      "insert into list(title,artist,location,description) values ('Fly Away','장윤주','cafe','한국의 모델 장윤주씨가 부른 노래, 이 노래를 듣고 있으면 모닝커피의 여유로움이 느껴진다.'),('Beautiful Things','Kenichiro Nishihara','bar','내적인 흥을 돋구우는 재즈힙합, 반복되는 훅 부분이 자연스럽게 몸을 움직이게 만든다.'),('Destination Moon','허소영','bar','콘트라 베이스의 독주가 인상적인 곡, 허소영의 보컬과 재즈 악기들의 화합이 어우러져 아름다운 선율을 이루고 있다.'),('수라','Chaos','club',''),('Uptown Funk','Mark Ronson','club','');",
      (error, results, fields) => {
        if (error) throw error;
        console.log(results);
      }
    );

    console.log("연결완료");
  }
});
