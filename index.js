import { series } from "./shellHelper.js";
import moment from "moment";

let textSwitch = true;

// Mon Mar 7 23:29:49 2022 +0300 => Git date format
const commit = (date) => {
  const dateString = date.format("ddd MMM D HH:mm:ss Y +0300");
  textSwitch = !textSwitch;
  series([
    `echo "${textSwitch}" > commit.txt`,
    "git add -A",
    `git commit -m "Old commit"`,
    `GIT_COMMITTER_DATE="${dateString}" git commit --amend --date="${dateString}" --no-edit`,
  ]);
};

const generateActivity = (startDate, endDate) => {
  for (
    var m = moment(startDate);
    m.diff(endDate, "days") <= 0;
    m.add(1, "days")
  ) {
    console.log(`Generating activity for ${m.format("YYYY-MM-DD")}`);
    commit(m);
  }
};

generateActivity("1996-03-23", "1996-03-23");
