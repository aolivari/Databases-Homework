CREATE TABLE mentors (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
years_in_Glasgow    INT NOT NULL,
  address   VARCHAR(120),
  favourite_programming_language      VARCHAR(30)
  
);


INSERT INTO mentors (name, years_in_glasgow , address , favourite_programming_language) VALUES ('John Smith','6','2-236 Buchanan St','javaScript');
INSERT INTO mentors (name, years_in_glasgow , address , favourite_programming_language) VALUES ('Juan Naranjo','16','43 Mitchell St','React');
INSERT INTO mentors (name, years_in_glasgow , address , favourite_programming_language) VALUES ('Roberto Gomez','11','Miller St 12','Node');
INSERT INTO mentors (name, years_in_glasgow , address , favourite_programming_language) VALUES ('Ximena Cabrera','35','432A St Vincent St','React');
INSERT INTO mentors (name, years_in_glasgow , address , favourite_programming_language) VALUES ('Pedro Alvarez','2','26 Partickhill Ct','SQL');


CREATE TABLE students (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  address   VARCHAR(120),
  graduated  VARCHAR(30)
  
);


INSERT INTO students (name, address , graduated) VALUES ('Alan Brown','25 Turnberry Rd','yes');
INSERT INTO students (name, address , graduated) VALUES ('Alba White','5 Queensborough Gardens','yes');
INSERT INTO students (name, address , graduated) VALUES ('Nathalie Black','110 Strathy Pl','no');
INSERT INTO students (name, address , graduated) VALUES ('Dominic Rouge','29 Sandbank Dr','yes');
INSERT INTO students (name, address , graduated) VALUES ('Blanche Snow','40 Cadder Rd','yes');
INSERT INTO students (name, address , graduated) VALUES ('Peter Bread','205 Tresta Rd','yes');
INSERT INTO students (name, address , graduated) VALUES ('Cristopher Bear','495 Ashgill Rd','no');
INSERT INTO students (name, address , graduated) VALUES ('Piero wood','40 Glasgow Rd','yes');
INSERT INTO students (name, address , graduated) VALUES ('Alice Wonder','5 Wheatsheaf Wynd','yes');
INSERT INTO students (name, address , graduated) VALUES ('Max Power','22 James Morrison St','yes');



select * from students;
select * from mentors;



CREATE TABLE classes (
  id        SERIAL PRIMARY KEY,
  mentors_id  INT references mentors(id),
  topic   VARCHAR(120),
  date   DATE NOT null,
  location varchar (30)
  
);

INSERT INTO classes (mentors_id, topic , date, location ) VALUES ('1','HTML','04/09/2020','74 Trongate');
INSERT INTO classes (mentors_id, topic , date, location ) VALUES ('4','javaScript,','10/08/2020','29-35 Union St');
INSERT INTO classes (mentors_id, topic , date, location ) VALUES ('5','Node','07/02/2020','22 Wilson St');
INSERT INTO classes (mentors_id, topic , date, location ) VALUES ('2','react','15/03/2019','69 Queen St');
INSERT INTO classes (mentors_id, topic , date, location ) VALUES ('3','SQL','14/02/2019','61 Buchanan St');

select * from classes;

CREATE TABLE Asistencia (
  id        SERIAL PRIMARY KEY,
  mentors_id  INT references mentors(id),
  students_id INT references students(id),
  classes_id INT references classes(id)
  
);

INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('1','1','1');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('1','3','1');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('1','5','1');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('1','10','1');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('1','7','1');

INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('2','1','2');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('2','5','2');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('2','4','2');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('2','6','2');
INSERT INTO Asistencia (mentors_id, students_id ,classes_id ) VALUES ('3','9','3');



select * from mentors where years_in_glasgow >10;
select * from mentors where favourite_programming_language='javaScript';
select * from students where graduated ='yes';
select * from classes c where "date" < '01/06/2020';
 
select students_id from asistencia a where classes_id = 2;

select "name" from students s where id in (1,5,4,6);










