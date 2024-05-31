import { useTranslations } from "next-intl";
import HistoryList from "./history-list";

export default function TravelHistory() {
  const t = useTranslations("home");

  return (
    <div className="w-full h-fit relative flex flex-col rounded-xl">
      <fieldset className="w-full h-full md:h-[551px] grid gap-6 rounded-lg border p-4 overflow-y-auto">
        <legend className="-ml-1 px-1 text-sm font-medium">
          {t("travel-history")}
        </legend>

        <HistoryList />
      </fieldset>
    </div>
  );
}
