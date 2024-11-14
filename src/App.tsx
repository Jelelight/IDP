import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  XAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

interface GoldData {
  name: string;
  bid: number; // bid สามารถเป็นตัวเลขหรือข้อความ
  ask: number; // ask สามารถเป็นตัวเลขหรือข้อความ
  diff: number; // diff สามารถเป็นตัวเลขหรือข้อความ
}

function App() {
  // const [count, setCount] = useState(0)
  // const [date, setDate] = React.useState<Date | undefined>(new Date())
  // const chartData1 = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ]

  const chartConfig1 = {
    buy: {
      label: "ราคาซื้อ",
      color: "#2563eb",
    },
    sell: {
      label: "ราคาขาย",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  // const totalVisitors = React.useMemo(() => {
  //   return circleChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  // }, []);

  const [data, setData] = useState<GoldData[]>([]);
  // const [data, setData] = useState<GoldData[]>([]);
  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   fetch("http://www.thaigold.info/RealTimeDataV2/gtdata_.txt")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data received:", data)
  //       setData(data)
  //       setDate(new Date())
  //     })
  //     .catch((error) => console.error("Error fetching data:", error))
  // }, [])

  useEffect(() => {
    fetch("/api/RealTimeDataV2/gtdata_.txt") // เปลี่ยน URL ให้เป็น `/api/...`
      .then((response) => response.text())
      .then((data) => {
        const parsedData: GoldData[] = JSON.parse(data);
        console.log("Data received:", parsedData);
        setData(parsedData);
        setDate(new Date());
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const chartData1: GoldData[] = data
    ?.filter((v) => v.name !== "Update")
    .map((item) => ({
      name: item.name, // ใช้ชื่อเดือนหรือชื่ออื่นๆ ตามข้อมูล
      buy: parseFloat(item.bid || 0), // ใช้ bid เป็นราคาซื้อ
      sell: parseFloat(item.ask), // ใช้ ask เป็นราคาขาย
    }));

    const circleChartData = [
      { browser: "ราคาขาย:สมาคม", visitors: parseFloat(data[4]?.ask || 0), fill: "var(--color-chrome)" },
      { browser: "ราคาซื้อ:สมาคม", visitors: parseFloat(data[4]?.bid || 0), fill: "var(--color-safari)" },
      { browser: "ราคาขาย:96.5%", visitors: parseFloat(data[5]?.ask || 0), fill: "var(--color-firefox)" },
      { browser: "ราคาซื้อ:96.5%", visitors: parseFloat(data[5]?.bid || 0), fill: "var(--color-edge)" },
      { browser: "ราคาขาย:99.99%", visitors: parseFloat(data[6]?.ask || 0), fill: "var(--color-other)" },
      { browser: "ราคาซื้อ:99.99%", visitors: parseFloat(data[6]?.bid || 0), fill: "var(--color-a)" },
    ];

    const circleChart = {
      visitors: { 
        label: "Visitors",
      },
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      },
      a: {
        label: "A",
        color: "hsl(var(--chart-6))",
      },
    } satisfies ChartConfig;
  return (
    <>
      <h1 className="mb-4">GOLD PRICE</h1>
      <p></p>
      {data && (
        <>
          <div className="mb-4">
            <Card className="flex flex-col">
              <div className="">
                <h1 className="text-xl m-2">ทองคำแท่ง 96.5%</h1>
                <hr className="border-t mb-4" />

                <div className="grid grid-cols-4 text-center text-sm mb-2">
                  <span> </span>
                  <span className="text-xl text-red-700">รับซื้อ</span>
                  <span className="text-xl text-green-700">ขายออก</span>
                  {/* <span className="text-xl text-red-900">ราคาเปลี่ยนแปลง</span> */}
                  <span className={`text-xl font-bold ${
                      data[4]?.diff < 0 ? "text-red-600" : "text-green-600"
                    }`}>ราคาเปลี่ยนแปลง</span>
                </div>

                {/* <div className="grid grid-cols-3 text-center py-2 border-b border-[#000000]">
              <span className="text-xl">ฮั่วเซ่งเฮง</span>
              <span className="text-xl font-bold">42,820</span>
              <span className="text-xl font-bold">42,870</span>
            </div> */}
                <div className="grid grid-cols-4 text-center py-2 border-b">
                  <span className="text-xl">ร้านค้า</span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[5]?.bid)}
                  </span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[5]?.ask)}
                  </span>
                  <span></span>
                </div>

                <div className="grid grid-cols-4 text-center py-2">
                  <span className="text-xl">สมาคม</span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[4]?.bid)}
                  </span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[4]?.ask)}
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      data[4]?.diff < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {data[4]?.diff}
                  </span>
                </div>

                <div className="grid text-center py-2 mt-4">
                  <span>
                    อัปเดตล่าสุด วันที่ {date.toLocaleDateString()} เวลา{" "} {date.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
          <div className="mb-4">
            <Card className="flex flex-col">
              <div className="">
                <h1 className="text-xl m-2">ทองคำแท่ง 99.99%</h1>
                <hr className="border-t mb-4" />

                <div className="grid grid-cols-2 text-center text-sm mb-2">
                  <span className="text-xl text-red-700">รับซื้อ</span>
                  <span className="text-xl text-green-700">ขายออก</span>
                </div>

                <div className="grid grid-cols-2 text-center py-2 border-b">
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[6]?.bid)}
                  </span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[6]?.ask)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
          <div className="mb-4">
            <Card className="flex flex-col">
              <div className="">
                <h1 className="text-xl m-2">ราคาทองคำต่างประเทศ</h1>
                <hr className="border-t mb-4" />

                <div className="grid grid-cols-2 text-center text-sm mb-2">
                  <span className="text-xl text-red-700">USD / TROY OZ.</span>
                  <span className="text-xl text-green-700">USD / THB</span>
                </div>

                <div className="grid grid-cols-2 text-center py-2 border-b">
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[1]?.ask)}
                  </span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat().format(data[3]?.ask)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mb-4">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                {/* <CardTitle>Gold Price</CardTitle> */}
                <Drawer>
                  {/* <CardTitle>Gold Price</CardTitle> */}
                  <DrawerTrigger><CardTitle>Gold Price</CardTitle></DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                      <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                      <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                          <CardTitle>Gold Price</CardTitle>
                          <CardDescription><TrendingUp className="h-4 w-4" /></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                          <ChartContainer
                            config={circleChart}
                            className="mx-auto aspect-square max-h-[250px]"
                          >
                            <PieChart>
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                              />
                              <Pie
                                data={circleChartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                              >
                                <Label
                                  content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                      return (
                                        <text
                                          x={viewBox.cx}
                                          y={viewBox.cy}
                                          textAnchor="middle"
                                          dominantBaseline="middle"
                                        >
                                          <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                          >
                                            {data[4]?.diff}
                                          </tspan>
                                          <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                          >
                                            ราคาเปลี่ยนแปลง
                                          </tspan>
                                        </text>
                                      )
                                    }
                                  }}
                                />
                              </Pie>
                            </PieChart>
                          </ChartContainer>
                        </CardContent>
                          <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                            วันที่ {date.toLocaleDateString()}
                            </div>
                            <div className="leading-none text-muted-foreground">
                            เวลา{" "} {date.toLocaleTimeString()}
                            </div>
                          </CardFooter>
                      </Card>
                    </DrawerHeader>
                    <DrawerFooter>
                      {/* <Button>Submit</Button> */}
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <CardDescription><TrendingUp className="h-4 w-4" /></CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={circleChart}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={circleChartData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {data[4]?.diff}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  ราคาเปลี่ยนแปลง
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                  วันที่ {date.toLocaleDateString()}
                  </div>
                  <div className="leading-none text-muted-foreground">
                  เวลา{" "} {date.toLocaleTimeString()}
                  </div>
                </CardFooter>
            </Card>
          </div>

          <div className="mb-4">
            <Card className="flex flex-col">
              <ChartContainer
                config={chartConfig1}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData1}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="buy" fill="var(--color-buy)" radius={4} />
                  <Bar dataKey="sell" fill="var(--color-sell)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Card>
          </div>
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <h1 className="mb-4">GOLD PRICE</h1>

  //     <div className="mb-4">
  //       <Card className="flex flex-col">
  //         <h1 className="text-xl m-2">ทองคำแท่ง 96.5%</h1>
  //         <hr className="border-t mb-4" />

  //         <div className="grid grid-cols-4 text-center text-sm mb-2">
  //           <span></span>
  //           <span className="text-xl text-red-700">รับซื้อ</span>
  //           <span className="text-xl text-green-700">ขายออก</span>
  //           <span className="text-xl text-red-900">ราคาเปลี่ยนแปลง</span>
  //         </div>

  //         {data && (
  //           <>
  //             <div className="grid grid-cols-4 text-center py-2 border-b">
  //               <span className="text-xl">ร้านค้า</span>
  //               <span className="text-xl font-bold">{data[5]?.bid}</span>
  //               <span className="text-xl font-bold">{data[5]?.ask}</span>
  //               <span className="text-xl font-bold text-green-400">
  //                 {data[5]?.diff}
  //               </span>
  //             </div>

  //             <div className="grid grid-cols-4 text-center py-2">
  //               <span className="text-xl">สมาคม</span>
  //               <span className="text-xl font-bold">{data[4].bid}</span>
  //               <span className="text-xl font-bold">{data[4].ask}</span>
  //               <span className="text-xl font-bold text-green-400">
  //                 {data[4].diff}
  //               </span>
  //             </div>
  //           </>
  //         )}

  //         <div className="grid text-center py-2 mt-4">
  //           <span>อัปเดตล่าสุด วันที่ {date.toLocaleDateString()} เวลา {date.toLocaleTimeString()} น.</span>
  //         </div>
  //       </Card>
  //     </div>

  //     <div className="mb-4">
  //       <Card className="flex flex-col">
  //         <h1 className="text-xl m-2">ทองคำแท่ง 99.99%</h1>
  //         <hr className="border-t mb-4" />

  //         <div className="grid grid-cols-2 text-center text-sm mb-2">
  //           <span className="text-xl text-red-700">รับซื้อ</span>
  //           <span className="text-xl text-green-700">ขายออก</span>
  //         </div>

  //         {data && (
  //           <div className="grid grid-cols-2 text-center py-2 border-b">
  //             <span className="text-xl font-bold">{data[6].bid}</span>
  //             <span className="text-xl font-bold">{data[6].ask}</span>
  //           </div>
  //         )}
  //       </Card>
  //     </div>

  //     <div className="mb-4">
  //       <Card className="flex flex-col">
  //         <h1 className="text-xl m-2">ราคาทองคำต่างประเทศ</h1>
  //         <hr className="border-t mb-4" />

  //         <div className="grid grid-cols-2 text-center text-sm mb-2">
  //           <span className="text-xl text-red-700">USD / TROY OZ.</span>
  //           <span className="text-xl text-green-700">USD / THB</span>
  //         </div>

  //         {data && (
  //           <div className="grid grid-cols-2 text-center py-2 border-b">
  //             <span className="text-xl font-bold">{data[1].bid}</span>
  //             <span className="text-xl font-bold">{data[3].bid}</span>
  //           </div>
  //         )}
  //       </Card>
  //     </div>
  //   </>
  // )
}

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//       <Button variant="outline">Button</Button>
//       <Calendar
//         mode="single"
//         selected={date}
//         onSelect={setDate}
//         className="rounded-md border"
//       />

// <ChartContainer config={chartConfig1} className="min-h-[200px] w-full">
//   <BarChart accessibilityLayer data={chartData1}>
//     <CartesianGrid vertical={false} />
//     <XAxis
//       dataKey="month"
//       tickLine={false}
//       tickMargin={10}
//       axisLine={false}
//       tickFormatter={(value) => value.slice(0, 3)}
//     />
//     <ChartTooltip content={<ChartTooltipContent />} />
//     <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//     <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//   </BarChart>
// </ChartContainer>

{/* <Card className="flex flex-col">
  <CardHeader className="items-center pb-0">
    <CardTitle>Pie Chart - Donut with Text</CardTitle>
    <CardDescription>January - June 2024</CardDescription>
  </CardHeader>
  <CardContent className="flex-1 pb-0">
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
</Card> */}

//     </>
//   )
// }

export default App;
