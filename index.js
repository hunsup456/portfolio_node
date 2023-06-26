const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const express = require("express");
const $ = require("jquery");
const app = express();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-2.cqbdziwplqgi.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "11111111",
  database: "music",
  port: "3306",
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use('', express.static(__dirname + '/경로'))
app.use(express.static(`${__dirname}/public`));

// connection.query("insert into list(title,artist,location,description) values ('Fly Away','장윤주','cafe','한국의 모델 장윤주씨가 부른 노래, 이 노래를 듣고 있으면 모닝커피의 여유로움이 느껴진다.'),('Beautiful Things','Kenichiro Nishihara','bar','내적인 흥을 돋구우는 재즈힙합, 반복되는 훅 부분이 자연스럽게 몸을 움직이게 만든다.'),('Destination Moon','허소영','bar','콘트라 베이스의 독주가 인상적인 곡, 허소영의 보컬과 재즈 악기들의 화합이 어우러져 아름다운 선율을 이루고 있다.'),('수라','Chaos','club',''),('Uptown Funk','Mark Ronson','club','');",(error,results,fields)=>{
//   if(error) throw error;
//   console.log(results);
// })



app.get("/", (request, response) => {
  fs.readFile("index.html", "utf-8", (error, data) => {
    connection.query(`select * from list`, (error, results, fields) => {
      if (error) throw error;

      response.send(
        ejs.render(data, {
          data: results,
        })
      );
    });
  });
});

app.get("/modify/:id", (request, response) => {
  fs.readFile("listupdate.html", "utf-8", (error, data) => {
    connection.query(
      "SELECT * from list WHERE id =?",
      [request.params.id],
      (error, results) => {
        
        if (error) throw error;
        response.send(
          ejs.render(data, {
            data: results[0],
          })
        );
      }
    );
  });
});

//데이터 생성
app.get("/create", (request, response) => {
  fs.readFile("listcreate.html", "utf-8", (error, data) => {
    if (error) throw error;
    response.end(data);
  });
});

//데이터 수정
app.post("/modify/:id", (request, response) => {
  const body = request.body;
  connection.query(
    "update list set title = ?, artist = ?, location=?, description =?, link = ? where id=?;",
    [body.title, body.artist,body.location, body.description, body.link, request.params.id],
    (error) => {
      if (error) throw error;
      response.redirect("/");
    }
  );
});

//데이터 삭제
app.get("/delete/:id", (request, response) => {
  connection.query(
    "delete from list where id=?;",
    [request.params.id],
    (error, results) => {
      if (error) throw error;
      response.redirect("/");
    }
  );
});

//데이터 생성
app.post("/create", (request, response) => {
  const body = request.body;
  connection.query(
    "insert into list(title,artist,location,description,link) value (?,?,?,?,?);",
    [
      body.title,
      body.artist,
      body.location,
      body.description,
      body.link,
    ],
    () => {
      response.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Server on running port 3000!");
  connection.connect();
});
