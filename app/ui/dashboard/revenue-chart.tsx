import { generateYAxis } from "@/app/lib/utils";
import { Calendar } from "lucide-react";
import { openSans } from "@/app/ui/fonts";
import { fetchRevenue } from "@/app/lib/data";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

// export default async function RevenueChart({
//   revenue,
// }: {
//   revenue: Revenue[];
// }) {
export default async function RevenueChart() {
  // Make component async, remove the props
  const revenue = await fetchRevenue(); // Fetch data inside the component
  const chartHeight = 300;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${openSans.className} mb-4 text-lg sm:text-xl font-semibold text-gray-900 md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-1 sm:gap-2 rounded-md bg-gray-50 p-2 sm:p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-xs sm:text-sm text-gray-500 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="font-medium">{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-1 sm:gap-2">
              <div
                className="w-full rounded-md bg-gradient-to-t from-secondaries_red-700 to-secondaries_red-800 transition-all duration-300 hover:from-secondaries_red-800 hover:to-secondaries_red-900"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-xs sm:text-sm font-medium text-gray-500 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-4 sm:pt-6">
          <div className="rounded-lg bg-secondaries_red-950/10 p-1.5 sm:p-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-secondaries_red-700" />
          </div>
          <h3 className="ml-2 text-xs sm:text-sm font-medium text-gray-600">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
