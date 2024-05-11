interface FuelBarProps {
  percentageOfFuelUsed: number;
}

export default function FuelBar({ percentageOfFuelUsed }: FuelBarProps) {
  return (
    <div
      id="progress-wrapper"
      className="w-full h-4 rounded-xl relative overflow-hidden"
    >
      <div className="w-full h-full absolute inset-0 z-0 bg-[linear-gradient(to_right,_red,_yellow,_green)]" />
      <div
        style={{
          width: `${percentageOfFuelUsed}%`,
        }}
        className="h-full bg-slate-100 dark:bg-slate-800 absolute right-0"
      />
      <div className="w-[calc(100%_+_2px)] h-full absolute top-0 bottom-0 left-[-1px] right-[-1px] z-10 flex items-center justify-between">
        {Array.from({ length: 10 }, (_, index) => index + 1).map(
          (_, anotherIndex) => (
            <div key={anotherIndex} className="w-[1px] h-full bg-white/60" />
          )
        )}
      </div>
    </div>
  );
}
