import { useState } from "preact/hooks";
import approx from "approximate-number";

export default function Calculator({showTitle, showDescription} = {showTitle: true, showDescription: true}) {
  const [developersCount, setDevelopersCount] = useState(20);
  const [buildTimeSaved, setBuildTimeSaved] = useState(70);
  const [averageBuildTime, setAverageBuildTime] = useState(10);
  const [averageMonthlySalary, setAverageMonthlySalary] = useState(7000);
  const [ciBuildCost, setCIBuildCost] = useState(8);
  const [localBuilds, setLocalBuilds] = useState(20);
  const [ciBuilds, setCIBuilds] = useState(20);

  const ciMoneySaved = ciBuildCost * ciBuilds * averageBuildTime * developersCount * 22 * 12 * buildTimeSaved / 100;
  const localMoneySaved = (averageMonthlySalary / 22 / 8 / 60 /* Developer price per minute */) * localBuilds * averageBuildTime * developersCount * 22 * 12 * buildTimeSaved / 100;
  const moneySaved = ciMoneySaved + localMoneySaved;
  const timeSaved = (ciBuilds + localBuilds) * developersCount * averageBuildTime * 22 * 12 * buildTimeSaved / 100 / 60;

  return (
    <div>
      { showTitle && <h3 class="text-2xl text-white mb-5 font-bold">ROI Calculator</h3>}
      {showDescription && <p class="text-slate-400 text-sm flex-1 mb-5">
      The calculator presumes developers can't multitask during a build, whether locally or in CI. This may not always hold true, so use the saved time as a guideline and adjust accordingly.
      </p>}
      <div class="grid grid-rows-3 grid-cols-2 grid-flow-row gap-8">
        <Slider
          min="1"
          max="100"
          value={developersCount}
          description={`How many developers are on the project?`}
          setValue={setDevelopersCount}
          name={(value) => `${value} developers`}
          id="developers"
        />
        <Slider
          min="1"
          max="60"
          value={averageBuildTime}
          description={`How long does the project take (minutes) to build?`}
          setValue={setAverageBuildTime}
          name={(value) => `${value} minutes`}
          id="build-time"
        />
        <Slider
          min="1"
          max="100"
          value={buildTimeSaved}
          description={`In average in every build.`}
          setValue={setBuildTimeSaved}
          name={(value) => `${value}% of time saved`}
          id="build-time-saved"
        />
        <Slider
          min="1000"
          max="20000"
          value={averageMonthlySalary}
          description={`What is the cost to the company?`}
          setValue={setAverageMonthlySalary}
          name={(value) => `Monthly salary of $${value}`}
          id="salary"
        />
        <Slider
          min="1"
          max="100"
          value={ciBuildCost}
          description={`On CI (e.g. GitHub Actions, Bitrise...)`}
          setValue={setCIBuildCost}
          name={(value) => `$${value / 100} per build minute`}
          id="ci-build-cost"
        />
        <Slider
          min="1"
          max="50"
          value={localBuilds}
          description={`Per developer and day.`}
          setValue={setLocalBuilds}
          name={(value) => `${value} local clean builds`}
          id="local-builds"
        />
        <Slider
          min="1"
          max="50"
          value={ciBuilds}
          description={`Per developer and day.`}
          setValue={setCIBuilds}
          name={(value) => `${value} CI clean builds`}
          id="ci-builds"
        />
      </div>
      <div class="grid grid-cols-2 mt-10">
        <div class="flex flex-col gap-y-3 ">
            <div class="uppercase text-slate-500 text-xs">
            Annual Developer Hours Saved
            </div>
            <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-cyan-500">
            {approx(timeSaved)} h/year
            </div>
        </div>

        <div class="flex flex-col gap-y-3">
            <div class="uppercase text-slate-500 text-xs">
            Annual R&D Cost Recapture
            </div>
            <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-cyan-500">
            ${approx(moneySaved)}
            </div>
        </div>
      </div>
    </div>
  );
}

function addDots(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
}

function Slider({
  min,
  max,
  name,
  id,
  value,
  setValue,
  description,
  className,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div class={`flex flex-col ${className}`}>
      <label for={id} class="block text-lg text-white font-semibold">
        {name(value)}
      </label>
      <p class="text-slate-400 text-sm flex-1 mb-2">{description}</p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onInput={handleChange}
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      ></input>
    </div>
  );
}
