const PASS_AVG = 50;
const MIN_ATTENDANCE = 75;
const MERCY_MIN = 40;
const MERCY_BONUS = 5;
const MAX_GRADE = 100;

class Student {
  constructor(name, id, grades, attendance) {
    this.name = name;
    this.id = id;
    this.grades = grades;
    this.attendance = attendance;
  }

  // المتوسط بـ reduce
  getAverage() {
    if (this.grades.length === 0) return 0;
    const total = this.grades.reduce((acc, grade) => acc + grade, 0);
    return total / this.grades.length;
  }

  // التقدير بـ if/else
  getGrade() {
    const avg = this.getAverage();
    if (avg >= 90) return 'A';
    else if (avg >= 80) return 'B';
    else if (avg >= 70) return 'C';
    else if (avg >= 60) return 'D';
    else if (avg >= 50) return 'E';
    else return 'F';
  }

  // النتيجة النهائية بـ &&
  getResult() {
    return this.getAverage() >= PASS_AVG && this.attendance >= MIN_ATTENDANCE
      ? 'ناجح'
      : 'راسب';
  }
}

// 4 طلاب (2 ناجح و 2 متعثر)
const studentsList = [
  new Student('شروق', 1, [85, 90, 88], 95),
  new Student('أحمد', 2, [70, 65, 72], 80),
  new Student('مصطفى', 3, [45, 42, 48], 88),
  new Student('سارة', 4, [40, 44, 41], 90),
];

// 1- تقرير لكل طالب
console.log('===== تقرير جميع الطلاب =====');
studentsList.forEach((s) => {
  console.log(
    `${s.name} | متوسط: ${s.getAverage().toFixed(2)} | تقدير: ${s.getGrade()} | نتيجة: ${s.getResult()}`
  );
});

// 2- لجنة الرأفة (filter): المتوسط من 40 لأقل من 50
const needSupport = studentsList.filter((s) => {
  const avg = s.getAverage();
  return avg >= MERCY_MIN && avg < PASS_AVG;
});
console.log('\nالمتعثرون للرأفة:', needSupport.map((s) => s.name));

// 3- إضافة 5 درجات بـ map (بحد أقصى 100)
const afterSupport = needSupport.map((s) => {
  const newGrades = s.grades.map((g) => Math.min(g + MERCY_BONUS, MAX_GRADE));
  return new Student(s.name, s.id, newGrades, s.attendance);
});

console.log('\nبعد الرأفة:');
afterSupport.forEach((s) => {
  console.log(
    `${s.name} | متوسط جديد: ${s.getAverage().toFixed(2)} | نتيجة: ${s.getResult()}`
  );
});

// 4- مجموع المتوسطات الجديدة بـ reduce
const totalNewAvgs = afterSupport.reduce((acc, s) => acc + s.getAverage(), 0);

// 5- درع الحماية من القسمة على صفر
let overallAverage = 0;
if (afterSupport.length === 0) {
  console.log('لا يوجد متعثرون - درع حماية');
} else {
  overallAverage = totalNewAvgs / afterSupport.length;
}
console.log(`\nالمتوسط العام للمتعثرين بعد الرأفة: ${overallAverage.toFixed(2)}`);
