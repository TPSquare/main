const DUT_SCHEDULE = await fetch("./dut-configs/schedule.json").then((res) => res.json());
const DUT_LECTURER_NOTE = await fetch("./dut-configs/lecturer-note.json").then((res) => res.json());
const DUTStartWeekDateText = await fetch("./dut-configs/start-date.json").then((res) => res.json());
const DUT_START_WEEK_DATE = new Date(DUTStartWeekDateText);

const TAG_COLOR = "#a1e7ff";

window.GET_TIMETABLE_DATA = (input) => {
  const htmlWrapper = document.createElement("div");
  htmlWrapper.innerHTML = input;
  const timetable = {};

  const rows = htmlWrapper.querySelectorAll(".GridRow:not(.kctHeader)");
  rows.forEach((row) => {
    const cells = row.querySelectorAll(".GridCell");
    const courseCode = cells[1].textContent;
    const courseName = cells[2].textContent;
    const lecturer = cells[6].textContent;
    const rawTimetable = cells[7].textContent;
    const rawWeeks = cells[8].textContent;

    const weeksGroups = rawWeeks.split(";");
    weeksGroups.forEach((weeksGroup) => {
      const [startWeek, endWeek] = weeksGroup.split("-").map(Number);
      for (let week = startWeek; week <= endWeek; week++) {
        const daysTimeable = rawTimetable.split("; ");
        daysTimeable.forEach((dayTimeable) => {
          const [day, lessons, place] = dayTimeable.split(",");
          const dayNumber = Number(day.replace("Thứ ", ""));

          const date = new Date(DUT_START_WEEK_DATE);
          date.setDate(date.getDate() + (week - 1) * 7 + (dayNumber - 2));
          const dateKey = date.toISOString().slice(0, 10);
          const timeKey = lessons
            .split("-")
            .map((e, i) => DUT_SCHEDULE[e][i])
            .join("-");

          if (!timetable[dateKey]) timetable[dateKey] = {};
          const data = { courseCode, courseName, lecturer, bgColor: TAG_COLOR };
          const note = DUT_LECTURER_NOTE[lecturer];
          if (note) data.note = note;
          timetable[dateKey][timeKey] = data;
        });
      }
    });
  });
  return JSON.stringify(timetable);
};
