import { execSeriesOfCommands, sleep } from "./util.js";
import moment from "moment";

let textSwitch = true;

// Mon Mar 7 23:29:49 2022 +0300 => Git date format
const commit = (date) => {
  const dateString = date.format("ddd MMM D HH:mm:ss Y +0300");
  textSwitch = !textSwitch;

  execSeriesOfCommands(
    [
      `echo "${textSwitch}" > commit.txt`,
      // `git add .`,
      // `git commit -m 'Old commit'`,
      `GIT_COMMITTER_DATE="${dateString}" git commit --amend --date="${dateString}" --no-edit`,
      `sleep 0.2`,
    ],
    (err) => {
      if (err) {
        console.log(
          `Error while generating activity for ${date.format(
            "YYYY-MM-DD"
          )} - Error: ${err}`
        );
        console.log("-----------------------------------------------");
        return;
      }
      console.log(`Activity generated for ${date.format("YYYY-MM-DD")}`);
      console.log("-----------------------------------------------");
    }
  );
};

const generateActivity = async (startDate, endDate) => {
  for (
    var m = moment(startDate);
    m.diff(endDate, "days") < 0;
    m.add(1, "days")
  ) {
    console.log("-----------------------------------------------");
    console.log(`Generating activity for ${m.format("YYYY-MM-DD")}`);
    commit(m);
    await sleep(300);
  }
};

(async () => {
  await generateActivity("1971-01-01 12:00", "1971-01-01 12:00");
})();
