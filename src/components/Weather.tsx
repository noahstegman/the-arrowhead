"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Wind,
  Drop,
  ThermometerSimple,
  Eye,
} from "@phosphor-icons/react";

/* WMO weather codes → icon + label */
function weatherInfo(code: number) {
  if (code === 0) return { icon: Sun, label: "Clear sky" };
  if (code <= 3) return { icon: Cloud, label: "Partly cloudy" };
  if (code <= 48) return { icon: CloudFog, label: "Fog" };
  if (code <= 57) return { icon: CloudRain, label: "Drizzle" };
  if (code <= 67) return { icon: CloudRain, label: "Rain" };
  if (code <= 77) return { icon: CloudSnow, label: "Snow" };
  if (code <= 82) return { icon: CloudRain, label: "Rain showers" };
  if (code <= 86) return { icon: CloudSnow, label: "Snow showers" };
  if (code <= 99) return { icon: CloudLightning, label: "Thunderstorm" };
  return { icon: Cloud, label: "Cloudy" };
}

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  visibility: number;
  high: number;
  low: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    code: number;
  }[];
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=34.2583&longitude=-117.1892&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,visibility&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/Los_Angeles&forecast_days=5"
        );
        const json = await res.json();

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const forecast = json.daily.time.slice(1).map((date: string, i: number) => ({
          day: days[new Date(date + "T12:00:00").getDay()],
          high: Math.round(json.daily.temperature_2m_max[i + 1]),
          low: Math.round(json.daily.temperature_2m_min[i + 1]),
          code: json.daily.weather_code[i + 1],
        }));

        setData({
          temperature: Math.round(json.current.temperature_2m),
          feelsLike: Math.round(json.current.apparent_temperature),
          humidity: json.current.relative_humidity_2m,
          windSpeed: Math.round(json.current.wind_speed_10m),
          weatherCode: json.current.weather_code,
          visibility: Math.round(json.current.visibility / 1609.34), // meters → miles
          high: Math.round(json.daily.temperature_2m_max[0]),
          low: Math.round(json.daily.temperature_2m_min[0]),
          forecast,
        });
      } catch {
        // Silently fail — section just won't show
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-32">
          {/* Skeleton loader */}
          <div className="animate-pulse">
            <div className="h-3 w-32 bg-surface-high rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <div className="h-20 w-48 bg-surface-high rounded mb-4" />
                <div className="h-4 w-28 bg-surface-high rounded" />
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <div className="flex gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex-1">
                      <div className="h-3 w-10 bg-surface-high rounded mb-3" />
                      <div className="h-8 w-12 bg-surface-high rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const { icon: WeatherIcon, label } = weatherInfo(data.weatherCode);

  return (
    <section className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <ScrollReveal delay={0.05}>
          <p className="section-label mb-10 md:mb-14">Current conditions</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0 items-start">
          {/* Left: Big temperature */}
          <ScrollReveal className="md:col-span-5" delay={0.1}>
            <div className="flex items-start gap-5">
              <WeatherIcon size={40} weight="light" className="text-on-surface mt-2 shrink-0" />
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-serif text-[clamp(4rem,8vw,6.5rem)] text-on-surface font-light leading-none tracking-[-0.03em]"
                >
                  {data.temperature}°
                </motion.p>
                <p className="font-sans text-on-surface-muted text-[0.9375rem] font-light mt-2">
                  {label} · H:{data.high}° L:{data.low}°
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Details grid */}
          <ScrollReveal className="md:col-span-6 md:col-start-7" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <ThermometerSimple size={13} weight="regular" className="text-on-surface-muted" />
                  <p className="section-label">Feels like</p>
                </div>
                <p className="font-serif text-2xl text-on-surface font-light">{data.feelsLike}°</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Drop size={13} weight="regular" className="text-on-surface-muted" />
                  <p className="section-label">Humidity</p>
                </div>
                <p className="font-serif text-2xl text-on-surface font-light">{data.humidity}%</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Wind size={13} weight="regular" className="text-on-surface-muted" />
                  <p className="section-label">Wind</p>
                </div>
                <p className="font-serif text-2xl text-on-surface font-light">{data.windSpeed} mph</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Eye size={13} weight="regular" className="text-on-surface-muted" />
                  <p className="section-label">Visibility</p>
                </div>
                <p className="font-serif text-2xl text-on-surface font-light">{data.visibility} mi</p>
              </div>
            </div>

            {/* 4-day forecast strip */}
            <div className="mt-12 pt-10 border-t border-outline-variant/15">
              <div className="grid grid-cols-4 gap-4">
                {data.forecast.map((day) => {
                  const { icon: DayIcon } = weatherInfo(day.code);
                  return (
                    <div key={day.day} className="text-center">
                      <p className="section-label mb-3">{day.day}</p>
                      <DayIcon size={20} weight="light" className="text-on-surface mx-auto mb-2" />
                      <p className="font-sans text-sm text-on-surface font-light">
                        {day.high}°{" "}
                        <span className="text-on-surface-muted">{day.low}°</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
