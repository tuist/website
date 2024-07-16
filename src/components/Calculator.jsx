import { useState } from "preact/hooks";
import approx from "approximate-number";
import { useTranslations, getLangFromUrl } from "../i18n/utils";

export default function Calculator(
  { showTitle, showDescription, url } = { showTitle: true, showDescription: true }
) {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [developersCount, setDevelopersCount] = useState(20);
  const [buildTimeSaved, setBuildTimeSaved] = useState(70);
  const [averageBuildTime, setAverageBuildTime] = useState(10);
  const [averageMonthlySalary, setAverageMonthlySalary] = useState(7000);
  const [ciBuildCost, setCIBuildCost] = useState(8);
  const [localBuilds, setLocalBuilds] = useState(5);
  const [ciBuilds, setCIBuilds] = useState(20);
  const numberOfWorkingDaysPerYear = 251;
  const numberOfWorkingMinutesPerMonth = 160 * 60;
  /**
   * The factor to multiply the build time with to get the time saved.
   */
  const buildTimeSavedFactor = buildTimeSaved / 100;

  const ciMoneySaved =
    (ciBuildCost *
      ciBuilds *
      averageBuildTime *
      developersCount *
      numberOfWorkingDaysPerYear *
      buildTimeSavedFactor);
  const localMoneySaved =
    ((averageMonthlySalary / numberOfWorkingMinutesPerMonth) /* Developer price per minute */ *
      localBuilds *
      averageBuildTime *
      developersCount *
      numberOfWorkingDaysPerYear *
      buildTimeSavedFactor);
  const moneySaved = ciMoneySaved + localMoneySaved - (localBuilds + ciBuilds) * 0.5 * numberOfWorkingDaysPerYear;
  const timeSaved =
    ((ciBuilds + localBuilds) *
      developersCount *
      averageBuildTime *
      buildTimeSavedFactor *
      numberOfWorkingDaysPerYear * 1.0
    ) / 60.0;

  return (
    <div>
      {showTitle && (
        <h3 class="text-2xl text-white mb-5 font-bold">ROI Calculator</h3>
      )}
      {showDescription && (
        <p class="text-slate-400 text-sm flex-1 mb-5">
          The calculator presumes developers can't multitask during a build,
          whether locally or in CI. This may not always hold true, so use the
          saved time as a guideline and adjust accordingly.
        </p>
      )}
      <div class="grid grid-rows-3 grid-cols-2 grid-flow-row gap-8">
        <Slider
          min={1}
          max={100}
          value={developersCount}
          description={t('cloud.roi.calculator.developers.question')}
          setValue={setDevelopersCount}
          name={(value) => t('cloud.roi.calculator.developers.title', {developers: value})}
          id="developers"
        />
        <Slider
          min={1}
          max={60}
          value={averageBuildTime}
          description={t('cloud.roi.calculator.minutes.question')}
          setValue={setAverageBuildTime}
          name={(value) => t('cloud.roi.calculator.minutes.title', {minutes: value})}
          id="build-time"
        />
        <Slider
          min={1}
          max={100}
          value={buildTimeSaved}
          description={t('cloud.roi.calculator.time-saved.question')}
          setValue={setBuildTimeSaved}
          name={(value) => t('cloud.roi.calculator.time-saved.title', {percentage: value})}
          id="build-time-saved"
        />
        <Slider
          min={1000}
          max={15000}
          value={averageMonthlySalary}
          description={t('cloud.roi.calculator.salary.question')}
          setValue={setAverageMonthlySalary}
          name={(value) => t('cloud.roi.calculator.salary.title', {salary: value})}
          id="salary"
        />
        <Slider
          min={1}
          max={100}
          value={ciBuildCost}
          description={t('cloud.roi.calculator.ci-cost.question')}
          setValue={setCIBuildCost}
          name={(value) => t('cloud.roi.calculator.ci-cost.title', {cost: value/100})}
          id="ci-build-cost"
        />
        <Slider
          min={1}
          max={50}
          value={localBuilds}
          description={t('cloud.roi.calculator.local-builds.question')}
          setValue={setLocalBuilds}
          name={(value) => t('cloud.roi.calculator.local-builds.title', {builds: value})}
          id="local-builds"
        />
        <Slider
          min={1}
          max={50}
          value={ciBuilds}
          description={t('cloud.roi.calculator.ci-builds.question')}
          setValue={setCIBuilds}
          name={(value) => t('cloud.roi.calculator.ci-builds.title', {builds: value})}
          id="ci-builds"
        />
      </div>
      <div class="grid grid-cols-2 mt-10">
        <div class="flex flex-col gap-y-3 ">
          <div class="uppercase text-slate-500 text-xs">
            {t('cloud.roi.calculator.annual-hours-saved')}
          </div>
          <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-cyan-500">
            {approx(timeSaved)} {t('cloud.roi.calculator.annual-hours-saved.unit')}
          </div>
        </div>

        <div class="flex flex-col gap-y-3">
          <div class="uppercase text-slate-500 text-xs">
            {t('cloud.roi.calculator.annual-r&d-cost-recapture')}
          </div>
          <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-cyan-500">
            {t('cloud.roi.calculator.annual-r&d-cost-recapture.unit', {money: approx(moneySaved)})}
          </div>
        </div>
      </div>
      <a
        className="inline-flex text-white visited:text-white items-center justify-center w-full px-6 py-3 text-center text-white hover:to-indigo-400 duration-200 bg-gradient-to-r from-sky-400 to-indigo-500 font-medium rounded-xl hover:text-white focus:outline-none focus-visible:outline-black focus-visible:ring-black mt-8 no-underline"
        aria-label="Sign up for testing"
        href="https://docs.tuist.io/cloud/what-is-cloud"
      >
      {t('cloud.roi.calculator.cta', {money: approx(moneySaved)})}
      </a>
    </div>
  );
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
    setValue(Number(e.target.value));
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
