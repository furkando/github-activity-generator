import { series } from "./shellHelper";
import moment from "moment";

let textSwitch = 0;

const commit = (date) => {
  series([
    `echo "${textSwitch}" > commit.txt`,
    "git add -A",
    "git commit --verbose",
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
  }
};

generateActivity("1996-03-23", "1996-03-23");
