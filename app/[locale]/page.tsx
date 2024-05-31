import Form from "@/components/screens/home/form";
import Header from "@/components/screens/home/header/header";
import Informations from "@/components/screens/home/informations";
import Map from "@/components/screens/home/map/map";
import RefuelAlert from "@/components/screens/home/refuel-alert";
import TravelHistory from "@/components/screens/home/travel-history/travel-history";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("page-title"),
    description: t("page-description"),
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <div className="w-full h-screen bg-background flex flex-col">
      <Header locale={params.locale} />
      <div className="w-full h-fit bg-transparent py-8 px-4 flex flex-col">
        <div className="max-w-7xl w-full h-fit mx-auto grid grid-cols-1">
          <RefuelAlert />

          <div className="w-full h-fit mb-8 grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
            <div className="w-full h-fit relative flex-col items-start gap-8">
              <form className="grid w-full items-start gap-6">
                <Form />
                <Informations />
              </form>
            </div>
            <TravelHistory />
          </div>
          <Map />
        </div>
      </div>
    </div>
  );
}
